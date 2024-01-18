const models = require("../../models");
const fs = require('fs')
const { error_message } = require("../../utils/error_messages")

const createOrder = async (req,res,next) => {  
  try {
    req.body.bannerImage = req.file.filename
    let result = await models.Custom_Order.create(req.body);
    res.json(result)
  }catch(e) {
    console.log(e)
    next(e)
  }
}

const getOrder = async (req,res,next) => {
  try {
    let order =  await models.Order.findOne({
      where :{id:req.params.id},
      include: { model: models.Logistics, as: 'Logistics' },
      raw: true,
      nest: true,
    })
    if(!order) return res.status(404).json({message:error_message('ORDER_NOT_FOUND')})
    let filename = order.bannerData
    fs.readFile(`banners/${filename}`, "utf8", function(err, data) {
      if (err)
        console.log(err);
      else {
        console.log(data)
        order.bannerJSON = JSON.parse(data)
        res.json(order)
      }
    });
    
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





module.exports = {
  createOrder,
  getOrder,
  sendPdf,
}