
const ERROR_MODE = 'ch'
const API_ERRORS =  {
 SUCCESS:{
   en: "success",
   ch: "成功"
 },
 ORDER_NOT_FOUND: {
   en :"Order not found",
   ch:"找不到訂單"
 },
 ORDER_ACK: {
   en:"Order acknowledged successfully",
   ch:"訂單確認成功"
 },
 ORDER_ON_HOLD: {
   en :"Order is put on hold",
   ch:"訂單等待處理中"
 },
 ORDER_UNPAID:{ 
   en :"Order is unpaid/Logistics not setup",
   ch:"訂單未完成付款/物流尚未設定"
 },
 ORDER_PAYMENT_PENDING:{ 
   en:"Order payment pending",
   ch:"訂單未完成付款"
 },
 LOGI_PENDING: {
   en:"Order logistics is not setup",
   ch:"訂單物流尚未設定"
 },
 LOGI_PROGRESS: {
   en:"Logistics in progress",
   ch:"物流處理中"
 },
 LOGI_ORDER_NOT_CREATED: {
   en:"Logistic order not created",
   ch:"物流訂單未建立"
 },
 ORDER_ALREADY_PAID: {
  en:"Order already paid",
  ch:"訂單已完成付款"
 },
 LOGGEDIN_SUCCESS: {
  en:"Loggedin Successfully",
  ch:"登入成功"
 },
 INVALID_PASS: {
  en:"Invalid username/password",
  ch:"使用者名稱/密碼無效"
 },
 PAYMENT_NOT_VERIFIED: {
  en:"Payment is not verifed by seller",
  ch:"Payment is not verifed by seller"
 }
}
exports.error_message = (message) => {
  return API_ERRORS[message][ERROR_MODE]
}