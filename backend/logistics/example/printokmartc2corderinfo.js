/**
 * Created by ying.wu on 2017/6/27.
 */
const ecpay_logistics = require('../lib/ecpay_logistics.js');
// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值



exports.printokmartc2corderinfo = (AllPayLogisticsID,CVSPaymentNo) =>{ 
  let create = new ecpay_logistics();
  let base_param = {
    AllPayLogisticsID:AllPayLogisticsID, // 請帶20碼uid, ex: 84851681561813188188, 為Create時所得到的物流交易編號
    CVSPaymentNo:CVSPaymentNo, // 請帶15碼uid, ex: 848516815618131, 為Create時所得到的寄貨編號
    PlatformID:""
  };
  return new Promise((resolve,reject)=>{
    let res = create.c2c_process_client.printokmartc2corderinfo(parameters = base_param);
    if (typeof res === 'string'){
        console.log(res);
        resolve(res)
    } else {
      res.then(function (result) {
          console.log(result);
          resolve(res)
      }).catch(function (err) {
          console.log(err);
          reject(err)
      });
    }
  })
}

// {
//   14|banner  |   AllPayLogisticsID: '30747444',
//   14|banner  |   BookingNote: '',
//   14|banner  |   CheckMacValue: 'D2D9B79511CEE267F2877A7FE71F62AC',
//   14|banner  |   CVSPaymentNo: 'W4335671496',
//   14|banner  |   CVSValidationNo: '',
//   14|banner  |   GoodsAmount: '200',
//   14|banner  |   LogisticsSubType: 'OKMARTC2C',
//   14|banner  |   LogisticsType: 'CVS',
//   14|banner  |   MerchantID: '3322276',
//   14|banner  |   MerchantTradeNo: 'heyyoubypinkfloyddd',
//   14|banner  |   ReceiverAddress: '',
//   14|banner  |   ReceiverCellPhone: '0912345678',
//   14|banner  |   ReceiverEmail: 'tesy@gmail.com',
//   14|banner  |   ReceiverName: '綠界科技',
//   14|banner  |   ReceiverPhone: '0229768888',
//   14|banner  |   RtnCode: '300',
//   14|banner  |   RtnMsg: '訂單處理中(已收到訂單資料)',
//   14|banner  |   UpdateStatusDate: '2023/06/27 15:13:48'
//   14|banner  | }
  
// {
//   14|banner  |   AllPayLogisticsID: '2214383',
//   14|banner  |   BookingNote: '',
//   14|banner  |   CheckMacValue: 'E2AD639E146362252687E6C108133112',
//   14|banner  |   CVSPaymentNo: 'W5270416514',
//   14|banner  |   CVSValidationNo: '',
//   14|banner  |   GoodsAmount: '200',
//   14|banner  |   LogisticsSubType: 'OKMARTC2C',
//   14|banner  |   LogisticsType: 'CVS',
//   14|banner  |   MerchantID: '2000933',
//   14|banner  |   MerchantTradeNo: 'heyyoubypinkfloyddd',
//   14|banner  |   ReceiverAddress: '',
//   14|banner  |   ReceiverCellPhone: '0912345678',
//   14|banner  |   ReceiverEmail: 'tesy@gmail.com',
//   14|banner  |   ReceiverName: '綠界科技',
//   14|banner  |   ReceiverPhone: '0229768888',
//   14|banner  |   RtnCode: '300',
//   14|banner  |   RtnMsg: '訂單處理中(已收到訂單資料)',
//   14|banner  |   UpdateStatusDate: '2023/06/27 15:16:20'
//   14|banner  | }
  