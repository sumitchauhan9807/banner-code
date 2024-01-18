const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Controller = require('./controller')
const { createOrderSchema  }  = require('./validations')
const fs = require('fs')

const upload = require("../../utils/upload").upload
var multipleUpload = upload.single("file");

router.post('/',function(req,res,next){
  multipleUpload(req,res,function(err){
    if(err) {
      console.log(err)
       return  res.status(500).json({
        message:'File extension is not correct'
      })
    }else{
      next()
    }
  })
},(req, res, next) => {
  const validator = createOrderSchema.validate(req.body, { errors: { wrap: { label: '' } } });
  if(validator.error) {
    fs.unlink(`./uploads/${req.file.filename}`,()=>{})
    return res.status(400).json({ message: _.get(validator, ["error", "message"], "Validation Error"), status: 0 })
  };
  next();
},Controller.createOrder)

// router.get('/',Controller.getAll)
router.get('/download-pdf/:id',Controller.sendPdf)

router.get('/:id',Controller.getOrder)










module.exports = router;
