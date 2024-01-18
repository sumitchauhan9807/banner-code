const models = require("../../models");
const jwt = require("jsonwebtoken")
const { error_message } = require("../../utils/error_messages")

const getAllBannerImages = async (req,res,next) =>  {
  try {
    let siteData = await models.SiteData.findOne()
    res.json({data:siteData.bannerImages.split(",").filter(i => i.length >0)})
  }catch(e) {
    next(e)
    console.log(e)
  }
} 

const getBannerPrices = async (req,res,next) =>  {
  try {
    let siteData = await models.SiteData.findOne()
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
module.exports = {
  getAllBannerImages,
  getBannerPrices
}