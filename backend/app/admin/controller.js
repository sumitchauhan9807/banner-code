const models = require("../../models");
const { logistics_pickup } = require('../../logistics/example/create_b2c_c2c');
const { logistics_home_delivery } = require('../../logistics/example/create_home');

const { printfamic2corderinfo } = require('../../logistics/example/printfamic2corderinfo');
const { printhilifec2corderinfo } = require('../../logistics/example/printhilifec2corderinfo');
const { printokmartc2corderinfo } = require('../../logistics/example/printokmartc2corderinfo');
const { printunimartc2corderinfo } = require('../../logistics/example/printunimartc2corderinfo');
const { printtradedocument } =require('../../logistics/example/printtradedocument')
const { error_message } = require("../../utils/error_messages")
const fs = require('fs')


const getAllOrders = async (req,res,next) => {
  try{
    let allOrders =  await models.Order.findAll({
      include: { model: models.Logistics, as: 'Logistics' },
      raw: true,
      nest: true,
      order: [
        ['createdAt', 'DESC'],
      ],
    })
    res.json({data:allOrders ,message:error_message('SUCCESS')})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const verifyPayment = async (req,res,next) => {
  try {
    await models.Order.update({
      paymentVerified : true,
      paymentAmount:req.body.paymentAmount
    },{
      where: {id : req.body.orderId}
    })
    res.json({message:"success"})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const getCustomAllOrders = async (req,res,next) => {
  try{
    let allOrders =  await models.Custom_Order.findAll({
      raw: true,
      nest: true,
      order: [
        ['createdAt', 'DESC'],
      ],
    })
    res.json({data:allOrders ,message:error_message('SUCCESS')})
  }catch(e) {
    next(e)
    console.log(e)
  }
}


const acknowledgeOrder = async (req,res,next) => {
  try {
    let order =  await models.Order.findOne({
      where :{id:req.body.orderId},
      include: { model: models.Logistics, as: 'Logistics' },
      raw: true,
      nest: true,
    })
    if(!order) return res.status(404).json({message:error_message('ORDER_NOT_FOUND')})
    if(order.isPaid && order.Logistics.id) {
      await models.Order.update({
        orderAcknowledged: !order.orderAcknowledged,
        orderAcknowledgedTimestamp: new Date()
      },{
        where: {id : req.body.orderId}
      })
      return res.json({message:!order.orderAcknowledged ? error_message('ORDER_ACK') : error_message('ORDER_ON_HOLD')})
    }
    return res.status(422).json({message:error_message('ORDER_UNPAID')})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const createLogisticsOrder = async (req,res,next) =>{ 
  // return res.json({message:req.body})
  try {
    let order =  await models.Order.findOne({
      where : { id:req.body.orderId },
      include: { model: models.Logistics, as: 'Logistics' },
      raw: true,
      nest: true,
    })
    if(!order) return res.status(404).json({message:error_message('ORDER_NOT_FOUND')})
    if(!order.isPaid){
      if(order.paymentOption == 'ecpay'){
        res.status(404).json({message: error_message('ORDER_PAYMENT_PENDING')})
      }
    }
    if(!order.Logistics.id) return res.status(404).json({message:error_message('LOGI_PENDING')})
    if(order.Logistics.AllPayLogisticsID) return res.status(404).json({message:error_message('LOGI_PROGRESS')})

  
  
    if(order.deliveryMethod == 'pickup') {
  
      let tradeNo = makeid(20)
      await models.Order.update({
        merchantTradeNo:tradeNo
      },{
        where: {id : req.body.orderId}
      })
      // console.log(order.Logistics,"order.Logistics.LogisticsSubType")
      let createLogisticsResponse = await logistics_pickup(
        tradeNo,
        getDateTime(),
        order.Logistics.logisticsSubType,
        req.body.fullname,
        req.body.phonenumber,
        req.body.cellPhonenumber,
        req.body.email,
        order.Logistics.CVSStoreID,
        order.id,
        order
      )
      console.log(createLogisticsResponse,"createLogisticsResponsecreateLogisticsResponsecreateLogisticsResponsecreateLogisticsResponse")
      let jsonResponse = queryStringToJSON(createLogisticsResponse)
      // logisticsOrderCreated
      await models.Order.update({
        logisticsOrderCreated: true,
      },{
        where: {id : req.body.orderId}
      })
      await models.Logistics.update({
        AllPayLogisticsID: jsonResponse.AllPayLogisticsID,
        CVSPaymentNo:jsonResponse.CVSPaymentNo,
        CVSValidationNo:jsonResponse.CVSValidationNo
      },{
        where: {orderId : req.body.orderId}
      })
      return res.json(jsonResponse)
    }
    if(order.deliveryMethod == 'home') {
      let tradeNo = makeid(20)
      await models.Order.update({
        merchantTradeNo:tradeNo
      },{
        where: {id : req.body.orderId}
      })
      let createLogisticsResponse = await logistics_home_delivery(
        tradeNo,
        getDateTime(),
        req.body.LogisticsSubType,
        order.paymentAmount,
        'test',                        // GoodsName
        '1',                           // GoodsWeight,
        req.body.fullname,
        req.body.phonenumber,
        req.body.cellPhonenumber,
        req.body.email,
        req.body.ReceiverZipCode,                      // order.Logistics.ReceiverZipCode,
        req.body.ReceiverAddress,  //order.Logistics.ReceiverAddress,
        order
      )
      let jsonResponse = queryStringToJSON(createLogisticsResponse)
      await models.Order.update({
        logisticsOrderCreated: true,
        },{
        where: {id : req.body.orderId}
      })
      await models.Logistics.update({
        AllPayLogisticsID: jsonResponse.AllPayLogisticsID,
        BookingNote:jsonResponse.BookingNote,
        CVSPaymentNo:jsonResponse.CVSPaymentNo,
        CVSValidationNo:jsonResponse.CVSValidationNo,
        ReceiverZipCode:req.body.ReceiverZipCode,
        ReceiverAddress:req.body.ReceiverAddress,
        logisticsSubType:req.body.LogisticsSubType
       },{
        where: {orderId : req.body.orderId}
      })
      return res.json(jsonResponse)
    }
    //logistics_home_delivery
    // return res.json({message:"delivery comig soon"})
  }catch(e) {
    next(e)
    console.log(e)
  }
}


const printTradeDocumentInfo = async (req,res,next) => {
  try {
    let order =  await models.Order.findOne({
      where : { id:req.body.orderId },
      include: { model: models.Logistics, as: 'Logistics' },
      raw: true,
      nest: true,
    })
    if(!order) return res.status(404).json({message:error_message('ORDER_NOT_FOUND')})
    if(!order.logisticsOrderCreated) return res.status(404).json({message:error_message('LOGI_ORDER_NOT_CREATED')})

    let AllPayLogisticsID = order.Logistics.AllPayLogisticsID

    let tradeDocHTML = printtradedocument(AllPayLogisticsID)
    // let CVSPaymentNo = order.Logistics.CVSPaymentNo
    // let logisticsOrderSubtype = order.Logistics.logisticsSubType
    // let CVSValidationNo = order.Logistics.CVSValidationNo
    
    // let orderInfo
    // if(logisticsOrderSubtype == 'FAMIC2C'){
    //   orderInfo = await printfamic2corderinfo(AllPayLogisticsID,CVSPaymentNo)
    // }else if(logisticsOrderSubtype == 'UNIMARTC2C'){
    //   orderInfo = await printunimartc2corderinfo(AllPayLogisticsID,CVSPaymentNo,CVSValidationNo)
    // }else if(logisticsOrderSubtype == 'HILIFEC2C'){
    //   orderInfo = await printhilifec2corderinfo(AllPayLogisticsID,CVSPaymentNo)
    // }else if(logisticsOrderSubtype == 'OKMARTC2C'){
    //   orderInfo = await printokmartc2corderinfo(AllPayLogisticsID,CVSPaymentNo)
    // }

    res.send(tradeDocHTML)  
  }catch(e) {
    next(e)
    console.log(e)
  }
}
const printFamiOrderInfo = async (req,res,next) => {
  try {
    let order =  await models.Order.findOne({
      where : { id:req.body.orderId },
      include: { model: models.Logistics, as: 'Logistics' },
      raw: true,
      nest: true,
    })
    if(!order) return res.status(404).json({message:error_message('ORDER_NOT_FOUND')})
    if(!order.logisticsOrderCreated) return res.status(404).json({message:error_message('LOGI_ORDER_NOT_CREATED')})

    let AllPayLogisticsID = order.Logistics.AllPayLogisticsID
    let CVSPaymentNo = order.Logistics.CVSPaymentNo
    let logisticsOrderSubtype = order.Logistics.logisticsSubType
    let CVSValidationNo = order.Logistics.CVSValidationNo
    
    let orderInfo
    if(logisticsOrderSubtype == 'FAMIC2C'){
      orderInfo = await printfamic2corderinfo(AllPayLogisticsID,CVSPaymentNo)
    }else if(logisticsOrderSubtype == 'UNIMARTC2C'){
      orderInfo = await printunimartc2corderinfo(AllPayLogisticsID,CVSPaymentNo,CVSValidationNo)
    }else if(logisticsOrderSubtype == 'HILIFEC2C'){
      orderInfo = await printhilifec2corderinfo(AllPayLogisticsID,CVSPaymentNo)
    }else if(logisticsOrderSubtype == 'OKMARTC2C'){
      orderInfo = await printokmartc2corderinfo(AllPayLogisticsID,CVSPaymentNo)
    }

    res.send(orderInfo)  
  }catch(e) {
    next(e)
    console.log(e)
  }
} 

const addBannerImage = async (req,res,next) => {
  try {
    let siteData = await models.SiteData.findOne()
    if(!siteData) {
      await models.SiteData.create({
        bannerImages:req.file.filename
      })
    }else{
      let bannerImages = siteData.bannerImages?.split(",")
      if(bannerImages) {
        bannerImages.push(req.file.filename)
      }else {
        bannerImages = [req.file.filename]
      }
      await models.SiteData.update({
        bannerImages:bannerImages.join(",")
      },{
        where: {id : siteData.id}
      })
    }
    siteData = await models.SiteData.findOne()
    res.json({data:siteData.bannerImages.split(",").filter(i => i.length >0)})
  }catch(e) {
    next(e)
    console.log(e)
  }
}
const deleteBannerImage = async (req,res,next) =>  {
  try {
    let image = req.params.name
    let siteData = await models.SiteData.findOne()
    let bannerImages = siteData.bannerImages.split(',')
    bannerImages = bannerImages.filter(i=>i != image)
    await models.SiteData.update({
      bannerImages:bannerImages.join(",")
    },{
      where: {id : siteData.id}
    })
    fs.unlink(`./uploads/${image}`,()=>{})
    siteData = await models.SiteData.findOne()
    res.json({data:siteData.bannerImages.split(",").filter(i => i.length >0)})
  }catch(e) {
    next(e)
    console.log(e)
  }
} 

const deletePreviousBannerImage = async (req,res,next) => {
  try {
    let previousBanner = await models.PreviousBanner.findOne({
      where: {id:req.body.id }
    }) 
    if(!previousBanner) return res.status(404).json({message:"Banner not found"})
    
    let image = req.params.name
    let bannerImages = previousBanner.images
    bannerImages = JSON.parse(bannerImages)
    bannerImages = bannerImages.filter(i => i != image)
    await models.PreviousBanner.update({
      images:JSON.stringify(bannerImages)
    },{
      where: {id : req.body.id}
    })
    fs.unlink(`./uploads/${image}`,()=>{})
    res.json({message:"success"})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const deleteEquipmentImage = async (req,res,next) => {
  try {
    let image = req.params.name
    let siteData = await models.SiteData.findOne()
    let equipmentImages = siteData.equipmentImages
    equipmentImages = JSON.parse(equipmentImages)
    equipmentImages = equipmentImages.filter(i => i.image != image)
    await models.SiteData.update({
      equipmentImages:JSON.stringify(equipmentImages)
    },{
      where: {id : siteData.id}
    })
    fs.unlink(`./uploads/${image}`,()=>{})
    siteData = await getSiteDataDB()
    res.json({data:siteData.equipmentImages})
  }catch(e) {
    next(e)
    console.log(e)
  }
}
const deleteServiceImage = async (req,res,next) => {
  try {
    let image = req.params.name
    let siteData = await models.SiteData.findOne()
    let serviceImages = siteData.servicesImage
    serviceImages = JSON.parse(serviceImages)
    serviceImages = serviceImages.filter(i => i != image)
    await models.SiteData.update({
      servicesImage:JSON.stringify(serviceImages)
    },{
      where: {id : siteData.id}
    })
    fs.unlink(`./uploads/${image}`,()=>{})
    siteData = await getSiteDataDB()
    res.json({data:siteData.servicesImage})
  }catch(e) {
    next(e)
    console.log(e)
  }
}
const deleteFormImage = async (req,res,next) => {
  try {
    let image = req.params.name
    let siteData = await models.SiteData.findOne()
    let formImages = siteData.formImage
    formImages = JSON.parse(formImages)
    formImages = formImages.filter(i => i != image)
    await models.SiteData.update({
      formImage:JSON.stringify(formImages)
    },{
      where: {id : siteData.id}
    })
    fs.unlink(`./uploads/${image}`,()=>{})
    siteData = await getSiteDataDB()
    res.json({data:siteData.formImage})
  }catch(e) {
    next(e)
    console.log(e)
  }
}
const deleteCompanyImage = async (req,res,next) => {
  try {
    let image = req.params.name
    let siteData = await models.SiteData.findOne()
    let companyImages = siteData.companyImage
    companyImages = JSON.parse(companyImages)
    companyImages = companyImages.filter(i => i != image)
    await models.SiteData.update({
      companyImage:JSON.stringify(companyImages)
    },{
      where: {id : siteData.id}
    })
    fs.unlink(`./uploads/${image}`,()=>{})
    siteData = await getSiteDataDB()
    res.json({data:siteData.companyImage})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const updateBannerText = async (req,res,next) => {
  try {
    
    await models.PreviousBanner.update({
      name:req.body.text
    },{
      where: {id : req.params.id}
    })
    res.json({message:"success"})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const getAllBannerImages = async (req,res,next) =>  {
  try {
    let siteData = await models.SiteData.findOne()
    if(!siteData) return res.status(404).json({message:'sited data not found'})
    if(!siteData.bannerImages) return res.json({data:[]})
    res.json({data:siteData.bannerImages.split(",").filter(i => i.length >0)})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const updateBannerPrices = async (req,res,next) => {
  try{ 
    let siteData = await models.SiteData.findOne()
    if(!siteData) {
      await models.SiteData.create({
        bannerPrices:JSON.stringify(req.body.bannerPrices)
      }) 
    }else{
      await models.SiteData.update({
        bannerPrices:JSON.stringify(req.body.bannerPrices)
      },{
        where: {id : siteData.id}
      })
    }
    siteData = await models.SiteData.findOne()
    res.json({data:siteData.bannerPrices})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const addPreviousBanner = async (req,res,next) => {
  try {
    let data = await models.PreviousBanner.create({
      name:req.body.name,
      images: JSON.stringify([])
    }) 
    res.json({data})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const getPreviousBanners = async (req,res,next) => {
  try {
    let allPreviousBanners = await models.PreviousBanner.findAll({
      raw:true
    }) 
    allBanners = allPreviousBanners.map((b)=>{
      return { ... b , images: JSON.parse(b.images) }
    })
    res.json({data:allBanners})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const addPreviousBannerImage = async (req,res,next) =>{ 
  try {
    console.log(req.file)
    console.log(req.body)
    let previousBanner = await models.PreviousBanner.findOne({
      raw:true,
      where : {id:req.body.id}
    }) 
    if(!previousBanner) return res.status(404).json({message:'Banner not found'})
    let currentImages = JSON.parse(previousBanner.images) 
    currentImages.push(req.file.filename)
      await models.PreviousBanner.update({
        images:JSON.stringify(currentImages)
      },{
        where: {id : req.body.id}
      })
    

    res.json({previousBanner})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const deletePreviousBanner = async (req,res,next) => { 
  try { 
    let previousBanner = await models.PreviousBanner.findOne({
      where : {id:req.params.id}
    }) 
    if(!previousBanner) return res.status(404).json({message:'Banner not found'})
    let allBannerImages = JSON.parse(previousBanner.images)
    allBannerImages.forEach(async (image)=>{
      fs.unlink(`./uploads/${image}`,()=>{})
    })
    await models.PreviousBanner.destroy({
      where : {id:req.params.id}
    });
    res.json({message:"success"})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const getBannerPrices = async (req,res,next) =>  {
  try {
    let siteData = await models.SiteData.findOne()
    if(!siteData) return res.status(404).json({message:'sited data not found'})
    let bannerPrices = siteData?.bannerPrices
    if(bannerPrices) {
      bannerPrices = JSON.parse(bannerPrices)
    } 
    res.json({data:bannerPrices})
  }catch(e) {
    next(e)
    console.log(e)
  }
}

const getSiteData = async (req,res,next) => { 
  try {
    let siteData = await getSiteDataDB()
    res.json({data:siteData})
   }catch(e) {
    next(e)
    console.log(e)
  }
}

const getSiteDataDB = async () => {
  try {
    let siteData = await models.SiteData.findOne({
      raw:true
    })
    if(!siteData)  throw Error('Site data not found')
    let previousBanners2 = await models.PreviousBanner.findAll({
      raw:true
    })
    previousBanners2 = previousBanners2.map((pb)=> { 
      return { ...pb , images:JSON.parse(pb.images)}
    })
    siteData.previousBanners2 = previousBanners2
    let materialImages = siteData.materialImages
    let previousBanners = siteData.previousBanners
    let equipmentImages = siteData.equipmentImages
    let servicesImage = siteData.servicesImage
    let formImage = siteData.formImage
    let companyImage = siteData.companyImage

    if(!materialImages){
      siteData.materialImages = [
        {material:'A',image:null},
        {material:'B',image:null},
        {material:'C',image:null},
      ]
    }else {
      siteData.materialImages = JSON.parse(siteData.materialImages)
      if(!siteData.materialImages.find(m => m.material == 'A')) siteData.materialImages.push({material:'A',image:null})
      if(!siteData.materialImages.find(m => m.material == 'B')) siteData.materialImages.push({material:'B',image:null})
      if(!siteData.materialImages.find(m => m.material == 'C')) siteData.materialImages.push({material:'C',image:null})
    }
    if(!previousBanners) {
      siteData.previousBanners = []
    }else{
      siteData.previousBanners = JSON.parse(siteData.previousBanners)
    }
    if(!equipmentImages) {
      siteData.equipmentImages = []
    }else{
      siteData.equipmentImages = JSON.parse(siteData.equipmentImages)
    }
    if(!servicesImage) {
      siteData.servicesImage = []
    }else{
      siteData.servicesImage = siteData.servicesImage.length ? JSON.parse(siteData.servicesImage) : []
    }
    if(!formImage) {
      siteData.formImage = []
    }else{
      siteData.formImage = siteData.formImage.length ? JSON.parse(siteData.formImage) : []
    }
    if(!companyImage) {
      siteData.companyImage = []
    }else{
      siteData.companyImage = siteData.companyImage.length ? JSON.parse(siteData.companyImage) : []
    }
    return siteData
  }catch(e) {
    throw Error(e)
  }
}

const editSiteData = async (req,res,next) => {
  try {
    let siteData = await models.SiteData.findOne()
    if(!siteData) return res.status(404).json({message:'sited data not found'})
    if(req.body.sitedata == 'material') {
      let materialImages = siteData.materialImages
      if(!materialImages) {
        let materialImage = [{
          image:req.file.filename,
          material:req.body.material
        }]
        await models.SiteData.update({
          materialImages:JSON.stringify(materialImage)
        },{
          where: {id : siteData.id}
        })
      }else{
        materialImages = JSON.parse(materialImages)
        let foundImage = materialImages.find(i=>i.material == req.body.material)
        if(foundImage) {
          console.log('FOUNDDD IMAGE')
          fs.unlink(`./uploads/${foundImage.image}`,()=>{})
          materialImages = materialImages.filter(i => i.material != req.body.material)
          materialImages.push({
            image:req.file.filename,
            material:req.body.material
          })
          await models.SiteData.update({
            materialImages:JSON.stringify(materialImages)
          },{
            where: {id : siteData.id}
          })
        }else {
          materialImages.push({
            image:req.file.filename,
            material:req.body.material
          })
          await models.SiteData.update({
            materialImages:JSON.stringify(materialImages)
          },{
            where: {id : siteData.id}
          })
        }
      }
      siteData = await getSiteDataDB()
      res.json({data:siteData.materialImages})
    }else if(req.body.sitedata == 'serviceImage') {
      let servicesImages = siteData.servicesImage
      if(!servicesImages) {
        await models.SiteData.update({
          servicesImage:JSON.stringify([req.file.filename]) 
        },{
          where: {id : siteData.id}
        })  
        res.json({images:[req.file.filename]})
      }else {
        servicesImages = JSON.parse(servicesImages)
        servicesImages.push(req.file.filename)
        await models.SiteData.update({
          servicesImage:JSON.stringify(servicesImages) 
        },{
          where: {id : siteData.id}
        })
        res.json({images:servicesImages})
      }
    }else if(req.body.sitedata == 'formImage') {
      let formImages = siteData.formImage
      if(!formImages) {
        await models.SiteData.update({
          formImage:JSON.stringify([req.file.filename]) 
        },{
          where: {id : siteData.id}
        })  
        res.json({images:[req.file.filename]})
      }else {
        formImages = JSON.parse(formImages)
        formImages.push(req.file.filename)
        await models.SiteData.update({
          formImage:JSON.stringify(formImages) 
        },{
          where: {id : siteData.id}
        })
        res.json({images:formImages})
      }
    }else if(req.body.sitedata == 'companyImage') {
      let companyImages = siteData.companyImage
      if(!companyImages) {
        await models.SiteData.update({
          companyImage:JSON.stringify([req.file.filename]) 
        },{
          where: {id : siteData.id}
        })  
        res.json({images:[req.file.filename]})
      }else {
        companyImages = JSON.parse(companyImages)
        companyImages.push(req.file.filename)
        await models.SiteData.update({
          companyImage:JSON.stringify(companyImages) 
        },{
          where: {id : siteData.id}
        })
        res.json({images:companyImages})
      }
    }else if(req.body.sitedata == 'termsImage') {
      fs.unlink(`./uploads/${siteData.termsImage}`,()=>{})
      await models.SiteData.update({
        termsImage:req.file.filename
      },{
        where: {id : siteData.id}
      })
      siteData = await getSiteDataDB()
      res.json({data:siteData.termsImage})
    }else if(req.body.sitedata == 'heading') {
      await models.SiteData.update({
        siteHeading:req.body.text
      },{
        where: {id : siteData.id}
      })
      siteData = await getSiteDataDB()
      // console.log(siteData.siteHeading,"siteData.siteHeadingsiteData.siteHeadingsiteData.siteHeading")
      res.json({data:siteData.siteHeading})
    }
    else if(req.body.sitedata == 'previousBanners') {
      let previousBanners = siteData.previousBanners
      if(!previousBanners) {
        await models.SiteData.update({
          previousBanners:JSON.stringify([{
            image:req.file.filename,
            text:req.body.text
          }])
        },{
          where: {id : siteData.id}
        })
      }else {
        previousBanners = JSON.parse(previousBanners)
        previousBanners.push({
          image:req.file.filename,
          text:req.body.text
        })
        await models.SiteData.update({
          previousBanners:JSON.stringify(previousBanners)
        },{
          where: {id : siteData.id}
        })
      }
      siteData = await getSiteDataDB()
      res.json({data:siteData.previousBanners})
    }else if(req.body.sitedata == 'equipmentImages') {
      let equipmentImages = siteData.equipmentImages
      if(!equipmentImages) {
        await models.SiteData.update({
          equipmentImages:JSON.stringify([{
            image:req.file.filename,
          }])
        },{
          where: {id : siteData.id}
        })
      }else {
        equipmentImages = JSON.parse(equipmentImages)
        equipmentImages.push({
          image:req.file.filename,
          text:req.body.text
        })
        await models.SiteData.update({
          equipmentImages:JSON.stringify(equipmentImages)
        },{
          where: {id : siteData.id}
        })
      }
      siteData = await getSiteDataDB()
      res.json({data:siteData.equipmentImages})
    }
    else {
      res.json({message:req.body})
    }
  }catch(e) {
    next(e)
    console.log(e)
  }
}



function queryStringToJSON(qs) {
  qs = qs || location.search.slice(1);

  var pairs = qs.split('&');
  var result = {};
  pairs.forEach(function(p) {
      var pair = p.split('=');
      var key = pair[0];
      var value = decodeURIComponent(pair[1] || '');

      if( result[key] ) {
          if( Object.prototype.toString.call( result[key] ) === '[object Array]' ) {
              result[key].push( value );
          } else {
              result[key] = [ result[key], value ];
          }
      } else {
          result[key] = value;
      }
  });

  return JSON.parse(JSON.stringify(result));
};

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

module.exports = {
  getAllOrders,
  acknowledgeOrder,
  createLogisticsOrder,
  printFamiOrderInfo,
  printTradeDocumentInfo,
  getCustomAllOrders,
  verifyPayment,
  addBannerImage,
  deleteBannerImage,
  getAllBannerImages,
  updateBannerPrices,
  getBannerPrices,
  getSiteData,
  editSiteData,
  deletePreviousBannerImage,
  updateBannerText,
  deleteEquipmentImage,
  addPreviousBanner,
  getPreviousBanners,
  addPreviousBannerImage,
  deletePreviousBanner,
  deleteServiceImage,
  deleteFormImage,
  deleteCompanyImage
}