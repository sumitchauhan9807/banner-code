/**
 * Created by ying.wu on 2017/6/27.
 */
const ecpay_payment = require('../lib/ecpay_payment.js')
//參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值
//若要測試非必帶參數請將base_param內註解的參數依需求取消註解 //
let base_param = {

  MerchantTradeNo: 'arrivingsomewhere', //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93  
}
//drivehomee23
//helllano2323232
const options = require('../conf/config-example'),
  query = new ecpay_payment(options),
  res = query.query_client.query_trade_info(parameters = base_param)

res.then(function (result) {
  setTimeout(()=>{
    console.log(result)
  },3000)
  console.log('\n')
  console.log('\n')
  console.log('\n')
  console.log('\n')
  console.log('\n')

  // console.log(result)
}).catch(function (err) {
  console.log(err)
})