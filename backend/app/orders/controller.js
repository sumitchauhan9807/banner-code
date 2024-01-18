const models = require("../../models");
const fs = require('fs')
const { payment } = require('../../ecPay/example/aio_check_out_all')
// const { logistics } = require('../../logistics/example/create_b2c_c2c');
const { logisticsMap } = require('../../logistics/example/map');
const { printfamic2corderinfo } = require('../../logistics/example/printfamic2corderinfo');
const { printokmartc2corderinfo } = require('../../logistics/example/printokmartc2corderinfo');
const { error_message } = require("../../utils/error_messages")
const { Op } = require("sequelize");


const puppeteer = require('puppeteer')

const createOrder = async (req,res,next) => {  
  try {
    let filename = new Date().toISOString() + Math.floor(Math.random()*90000) + 10000
    fs.writeFile(`banners/${filename}.json`, JSON.stringify(req.body.bannerData), async (err) => {
      if (err)
        console.log(err);
      else {
        let totalAmount =  await calculatePaymentAmount(req.body,filename+'.json')
        if(req.body.quantity <= 50) {
          req.body.paymentAmount = totalAmount
        }
        req.body.cellPhonenumber = String(req.body.cellPhonenumber)
        req.body.cellPhonenumber = "09" +req.body.cellPhonenumber 
        req.body.bannerData = filename+'.json'
        req.body.paymentVerified = true
        let result = await models.Order.create(req.body);
        if(req.body.deliveryMethod == 'home') {
          await models.Logistics.create({
            orderId:result.id,
            ReceiverZipCode:req.body.zipCode,
            ReceiverAddress:req.body.deliveryAddress,
          })
        }
        res.json(result)
      }
    });
  }catch(e) {
    console.log(e)
    next(e)
  }
}

const getAll = async (req,res,next) => {
  try {
    let allOrders =  await models.Order.findAll()
    res.send(allOrders); 
  }catch(e) {
    console.log(e)
    next(e)
  }
}

const getOrder = async (req,res,next) => {
  try {
    let orders =  await models.Order.findAll({
      where : {
        [Op.or]: [
          { id:req.params.id},
          { email:req.params.id },
          {phonenumber:req.params.id}
        ]
      },
      include: { model: models.Logistics, as: 'Logistics' },
      raw: true,
      nest: true,
    })
    if(!orders.length) return res.status(404).json({message:error_message('ORDER_NOT_FOUND')})
    let AllPromises = orders.map(async (order)=>{
      let filename = order.bannerData
      let bannerJSON = await getJSON(filename)
      order.bannerJSON = bannerJSON
      return order
    })
   Promise.all(AllPromises).then((values) => {
      res.json(values)

    });
  }catch(e) {
    console.log(e)
    next(e)
  }
}

const getJSON = (filename) => {
  return new Promise((resolve,reject)=>{
    fs.readFile(`banners/${filename}`, "utf8", function(err, data) {
      if (err)
        resolve(null)
      else {
        resolve(JSON.parse(data))
        // order.bannerJSON = JSON.parse(data)
      }
    });
  })
}
const getCustomOrder = async (req,res,next) => {
  try {
    let order =  await models.Custom_Order.findOne({
      where :{id:req.params.id},
      raw: true,
      nest: true,
    })
    if(!order) return res.status(404).json({message:error_message('ORDER_NOT_FOUND')})
    res.json(order)
    
  }catch(e) {
    console.log(e)
    next(e)
  }
}
//http://localhost:3030/api/orders/download-pdf/7f99635a-48ef-4436-81e3-801d373f4e4c
const sendPdf = (req,res,next) => {
  let orderId = req.params.id
  var data = fs.readFileSync(`pdf/${orderId}.pdf`);
  res.contentType("application/pdf");
  res.send(data);
 }
const pdfPreview = async (req,res,next) => {
  try{
    let order =  await models.Order.findOne({
      where :{id:req.body.orderId},
      raw:true
    })
    if(!order) return res.status(404).json({message:error_message('ORDER_NOT_FOUND')})

    const browser = await puppeteer.launch({ headless: true ,args: ['--no-sandbox']});
    const page = await browser.newPage();
    let url = `${process.env.BASE_URL}pdf-preview/${order.id}`
    await page.goto(url, {waitUntil: 'networkidle0'});
    // const dom = await page.$eval('div.banner-box', (element) => {
    //       return element.innerHTML
    // })
    // await page.setContent(dom)
    const pdf = await page.pdf({ format: 'A4',height:'40px' });
    await browser.close();
    fs.writeFileSync(`pdf/${order.id}.pdf`, pdf, { encoding: 'base64' })
    // const txtFile = fs.readFileSync('index.txt')
    // console.log(pdf)
    res.json({
      message:true
    })
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const paymentForm = async (req,res,next) => {
  try{
    let orderId = req.body.orderId
    let order =  await models.Order.findOne({
      where :{id:orderId},
      raw:true
    })
    if(!order) return res.status(404).json({message:error_message('ORDER_NOT_FOUND')})
    if(!order.paymentVerified) return res.status(404).json({message:error_message('PAYMENT_NOT_VERIFIED')})

    if(order.isPaid) return res.status(422).json({message:error_message('ORDER_ALREADY_PAID')})

    let tradeNo = makeid(20)
    await models.Order.update({
      merchantTradeNo:tradeNo
    },{
      where: {id : orderId}
    })
    // let totalAmount =  await calculatePaymentAmount(order,order.bannerData)
    // totalAmount = totalAmount + deliveryCharges
    let paymentHtml = payment(
      tradeNo,
      getDateTime(),
      order.paymentAmount,
      `Banner order for ${order.fullname}`,
      `Banner order for ${order.fullname}`,
      orderId
    );
    // console.log(paymentHtml)
    res.send(paymentHtml)
    // res.send('hello')
  }catch(e){
    console.log(e)
    next(e)
  }
}

const handlePaymentSuccess = async (req,res,next) => {
  try{
    console.log("here")
    console.log(req.body)
    if(req.body.RtnCode == '1'){
      await models.Order.update({
        isPaid:true,
        paymentAmount:req.body.TradeAmt,
        paidAt:new Date(),
        paymentMethod:req.body.PaymentType
      },{
        where: {merchantTradeNo : req.body.MerchantTradeNo}
      })
    }
    res.status(200).json({message:true})
  }catch(e){
    console.log(e)
    next(e)
  }
}


const handleCreateLogisticsHook = async (req,res,next) => { 
  console.log("handleCreateLogisticsHook ======================================== handleCreateLogisticsHook")
  console.log(req.body)
  res.status(200).json({
    message:true
  })
  console.log("handleCreateLogisticsHook ======================================== handleCreateLogisticsHook")
}

const handleStorePickupHook = async (req,res,next) => {
  try{ 
    let order = await models.Order.findOne({
      where : {merchantTradeNo:req.body.MerchantTradeNo }
    })
    if(!order) return res.status(422).json({message:error_message('ORDER_NOT_FOUND')})

    await models.Logistics.destroy({
      where : { orderId:order.id}
    })

    await models.Logistics.create({
      orderId:order.id,
      logisticsSubType:req.body.LogisticsSubType,
      CVSStoreID: req.body.CVSStoreID,
      CVSStoreName: req.body.CVSStoreName,
      CVSAddress: req.body.CVSAddress,
      CVSTelephone: req.body.CVSTelephone,
      CVSOutSide: req.body.CVSOutSide,
    });
    res.redirect(`/orderdetails/${order.id}`);
  }catch(e) {
    console.log(e)
    next(e)
  }
}



function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}

function getDateTime() {
  var today = new Date();
  var date = today.getFullYear() + '/' + pad((today.getMonth()+1)) + '/' + pad(today.getDate());
  var time = pad(today.getHours()) + ":" + pad(today.getMinutes()) + ":" + pad(today.getSeconds());
  console.log(date + ' ' + time)
  return date + ' ' + time
}
//26995492-9f71-48ac-858c-48dee3ece5aa
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function calculatePaymentAmount(orderData,bannerData) {
  return new Promise((resolve,reject)=>{
    fs.readFile(`banners/${bannerData}`, "utf8", async function(err, data) {
      if (err)
        reject(err);
      else {
        let siteData = await models.SiteData.findOne()
        let prices = siteData?.bannerPrices
        if(prices) {
          prices = JSON.parse(prices)
        }else{
          reject('PRICES NOT DEFINED')
        }
        let quantity = orderData.quantity
        let parsedData = JSON.parse(data)
        let dimensions =  `${parsedData.dimensions.width}x${parsedData.dimensions.height}`
        let totalPayment
        if(dimensions == '150x60'){
          if(quantity == 1) {
            totalPayment = quantity * prices['150x60']['1']
          }else if(quantity >= 2 && quantity <= 9 ){
            totalPayment = quantity * prices['150x60']['2|9']
          }else if(quantity >= 10 && quantity <=29){
            totalPayment = quantity * prices['150x60']['10|29']
          }else if(quantity >= 30){
            totalPayment = quantity * prices['150x60']['30']
          }
        }else if(dimensions == '300x60'){
          totalPayment = quantity * prices['300x60']
        }else if(dimensions == '300x90'){
          totalPayment = quantity * prices['300x90']

        }else if(dimensions == '450x90'){
          totalPayment = quantity * prices['450x90']
        }
        let deliveryCharges = orderData.deliveryMethod == 'home' ? prices['home_shipping'] : prices['pickup_shipping']
        totalPayment = totalPayment + deliveryCharges
        return resolve(totalPayment)
        // res.json(order)
      }
    });
  })
  console.log(bannerData)
    return 123123
}
// if(dimensions == '150x60'){
//   if(quantity == 1) {
//     totalPayment = quantity * 200
//   }else if(quantity >= 2 && quantity <= 9 ){
//     totalPayment = quantity * 150
//   }else if(quantity >= 10 && quantity <=29){
//     totalPayment = quantity * 130
//   }else if(quantity >= 30){
//     totalPayment = quantity * 100
//   }
// }else if(dimensions == '300x60'){
//   totalPayment = quantity * 300
// }else if(dimensions == '300x90'){
//   totalPayment = quantity * 450

// }else if(dimensions == '450x90'){
//   totalPayment = quantity * 675
// }
// await models.otp_infos.create({
//   email,
//   otp_code,
// });

const logiTest = (req,res,next) => {
  // logistics()
  res.send('asd')
}

const setupPickupStore = async (req,res,next) => {
  try{
    let order =  await models.Order.findOne({
      where :{id:req.body.orderId},
      raw:true
    })
    if(!order) return res.status(404).json({message:error_message('ORDER_NOT_FOUND')})

    let tradeNo = makeid(20)
    await models.Order.update({
      merchantTradeNo:tradeNo
    },{
      where: {id : req.body.orderId}
    })
    let LogisticsSubType = req.body.store
    let FormHtml = logisticsMap(tradeNo,LogisticsSubType)
    res.send(FormHtml)
  }catch(e) {
    console.log(e)
    next(e)
  }
}

const printinfo = (req,res,next) => {
  printokmartc2corderinfo()
  res.send('printinfo')
}

const addOrderLogisticsInfo = async (req,res,next) => {
  try{
    let order =  await models.Order.findOne({
      where :{id:req.body.orderId},
      raw:true
    })
    if(!order) return res.status(404).json({message:error_message('ORDER_NOT_FOUND')})
    await models.Logistics.destroy({
      where : { orderId:req.body.orderId}
    })
    let result = await models.Logistics.create(req.body);
    res.send(result)
  }catch(e) {
    next(e)
    console.log(e)
  }
}
module.exports = {
  createOrder,
  getAll,
  getOrder,
  getCustomOrder,
  paymentForm,
  handlePaymentSuccess,
  pdfPreview,
  sendPdf,
  logiTest,
  setupPickupStore,
  printinfo,
  addOrderLogisticsInfo,
  handleStorePickupHook,
  handleCreateLogisticsHook
}