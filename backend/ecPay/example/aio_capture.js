/**
 * Created by ying.wu on 2017/6/27.
 */
const ecpay_payment = require('../lib/ecpay_payment.js')
//參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值
//若要測試非必帶參數請將base_param內註解的參數依需求取消註解 //
let base_param = {
  MerchantTradeNo: '3322276', //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
  CaptureAMT: '70',
  UserRefundAMT: '30',
  // MerchantID: '',
  // Remark: '撥款備註'
}
const options = require('../conf/config-example'),
  create = new ecpay_payment(options),
  res = create.exec_grant_refund.aio_capture(parameters = base_param)
res.then(function (result) {
  console.log(result)
}).catch(function (err) {
  console.log(err)
})