
/**
 * Created by ying.wu on 2017/6/27.
 */
const ecpay_payment = require('../lib/ecpay_payment.js')
//參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值
//若要測試非必帶參數請將base_param內註解的參數依需求取消註解 //


// 若要測試開立電子發票，請將inv_params內的"所有"參數取消註解 //
let inv_params = {
  // RelateNumber: 'PLEASE MODIFY',  //請帶30碼uid ex: SJDFJGH24FJIL97G73653XM0VOMS4K
  // CustomerID: 'MEM_0000001',  //會員編號
  // CustomerIdentifier: '',   //統一編號
  // CustomerName: '測試買家',
  // CustomerAddr: '測試用地址',
  // CustomerPhone: '0123456789',
  // CustomerEmail: 'johndoe@test.com',
  // ClearanceMark: '2',
  // TaxType: '1',
  // CarruerType: '',
  // CarruerNum: '',
  // Donation: '2',
  // LoveCode: '',
  // Print: '1',
  // InvoiceItemName: '測試商品1|測試商品2',
  // InvoiceItemCount: '2|3',
  // InvoiceItemWord: '個|包',
  // InvoiceItemPrice: '35|10',
  // InvoiceItemTaxType: '1|1',
  // InvoiceRemark: '測試商品1的說明|測試商品2的說明',
  // DelayDay: '0',
  // InvType: '07'
}
const options = require('../conf/config-example');
  

exports.payment = (merchantTradeNo,dateTime,totalAmount,tradeDesc,itemName,orderId) => {
  console.log(merchantTradeNo,"merchantTradeNo")
  let base_param = {
    MerchantTradeNo: merchantTradeNo, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    MerchantTradeDate: dateTime, //ex: 2017/02/13 15:45:30
    TotalAmount: String(totalAmount),    //2023/6/17 17:45:42
    TradeDesc: tradeDesc,
    ItemName: itemName,
    ReturnURL: `${process.env.BASE_URL}api/orders/webhook`,
    // ChooseSubPayment: '',
    // OrderResultURL: 'http://192.168.0.1/payment_result',
    // NeedExtraPaidInfo: '1',
    ClientBackURL: `${process.env.BASE_URL}orderdetails/${orderId}`,
    // ItemURL: 'http://item.test.tw',
    // Remark: '交易備註',
    // HoldTradeAMT: '1',
    // StoreID: '',
    // CustomField1: '',
    // CustomField2: '',
    // CustomField3: '',
    // CustomField4: ''
  }

  const create = new ecpay_payment(options)
  const htm = create.payment_client.aio_check_out_all(parameters = base_param, invoice = inv_params)
  return htm
}

// {
//   14|banner  |   CustomField1: '',
//   14|banner  |   CustomField2: '',
//   14|banner  |   CustomField3: '',
//   14|banner  |   CustomField4: '',
//   14|banner  |   MerchantID: '3002599',
//   14|banner  |   MerchantTradeNo: 'helllano2323232',
//   14|banner  |   PaymentDate: '2023/06/17 16:29:02',
//   14|banner  |   PaymentType: 'Credit_CreditCard',
//   14|banner  |   PaymentTypeChargeFee: '15',
//   14|banner  |   RtnCode: '1',
//   14|banner  |   RtnMsg: '交易成功',
//   14|banner  |   SimulatePaid: '0',
//   14|banner  |   StoreID: '',
//   14|banner  |   TradeAmt: '500',
//   14|banner  |   TradeDate: '2023/06/17 16:28:25',
//   14|banner  |   TradeNo: '2306171628251951',
//   14|banner  |   CheckMacValue: 'C068CC12A9C7631AA83045D1F2991B67878ECC01D2817E0A075060516B51B49B'
//   14|banner  | }
  