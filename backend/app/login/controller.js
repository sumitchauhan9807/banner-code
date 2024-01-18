const models = require("../../models");
const jwt = require("jsonwebtoken")
const { error_message } = require("../../utils/error_messages")

const login = async (req,res,next) => {
  try{
    let username = process.env.ADMIN_USERNAME
    let password = process.env.ADMIN_PASSWORD
    if(req.body.username == username && req.body.password == password) {
      let token = jwt.sign({  source: 'BANNER-USER', }, process.env.JWT_SECRET, {});
      return res.json({ login:true,token,message:error_message('LOGGEDIN_SUCCESS') }) 
    }
    res.status(422).json({ login:false ,message:error_message('INVALID_PASS') })
  }catch(e) {
    next(e)
    console.log(e)
  }
}
module.exports = {
  login
}