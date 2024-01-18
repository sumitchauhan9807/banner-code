/**
 * Created by ying.wu on 2017/6/27.
 */



exports.logistics_home_delivery = (
		MerchantTradeNo,
		MerchantTradeDate,
		LogisticsSubType,
		GoodsAmount,
		GoodsName,
		GoodsWeight,
		ReceiverName,
		ReceiverPhone,
		ReceiverCellPhone,
		ReceiverEmail,
		ReceiverZipCode,
		ReceiverAddress,
		order
	) => {
	const ecpay_logistics = require('../lib/ecpay_logistics.js');
// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值
	let base_param = {
		MerchantTradeNo:MerchantTradeNo, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93, 為aiocheckout時所產生的
		MerchantTradeDate:MerchantTradeDate, // 請帶交易時間, ex: 2017/05/17 16:23:45, 為aiocheckout時所產生的
		LogisticsType:"Home",
		LogisticsSubType:LogisticsSubType,
		GoodsAmount:order.paymentAmount,
		CollectionAmount:order.paymentAmount,
		IsCollection:order.paymentOption == 'cash_on_delivery' ? 'Y' : 'N',
		GoodsName:GoodsName,
		SenderName:process.env.SenderName,
		SenderPhone:process.env.SenderPhone,
		SenderCellPhone:process.env.SenderCellPhone,
		ReceiverName:ReceiverName.slice(0,5),
		ReceiverPhone:ReceiverPhone,
		ReceiverCellPhone:ReceiverCellPhone,
		ReceiverEmail:ReceiverEmail,
		TradeDesc:"",
		ServerReplyURL:`${process.env.BASE_URL}api/orders/create-order-logistics-hook`, // 物流狀況會通知到此URL
		ClientReplyURL:"",
		LogisticsC2CReplyURL:"",
		Remark:"",
		PlatformID:"",
		SenderZipCode:process.env.SenderZipCode,
		SenderAddress:process.env.SenderAddress,
		ReceiverZipCode:ReceiverZipCode,
		ReceiverAddress:ReceiverAddress,
		Temperature:"0001",
		Distance:"00",
		Specification:"0001",
		ScheduledPickupTime:"4",
		ScheduledDeliveryTime:"4",
		ScheduledDeliveryDate:"",
		PackageCount:""
	};
	console.log(base_param)
	return new Promise((resolve,reject)=>{
		let create = new ecpay_logistics();
		let res = create.create_client.create(parameters = base_param);
		if (typeof res === 'string'){
				console.log(res);
				resolve(res)
		} else {
			res.then(function (result) {
				console.log(result);
				let response = result.split("|")
				if(response[0] == '1') {
					return resolve(response[1])
				}else{
					console.log(response)
					return reject({message:response[1]})
				}
			}).catch(function (err) {
				reject(err)
				console.log(err);
			});
		}
	})
}



// {
// 	14|banner  |   AllPayLogisticsID: '2207647',
// 	14|banner  |   BookingNote: '100831847401',
// 	14|banner  |   CheckMacValue: '037E053A555946516F2FF6B2CF49409F',
// 	14|banner  |   CVSPaymentNo: '',
// 	14|banner  |   CVSValidationNo: '',
// 	14|banner  |   GoodsAmount: '100',
// 	14|banner  |   LogisticsSubType: 'TCAT',
// 	14|banner  |   LogisticsType: 'HOME',
// 	14|banner  |   MerchantID: '2000933',
// 	14|banner  |   MerchantTradeNo: 'godisdead2323',
// 	14|banner  |   ReceiverAddress: '台北市南港區三重路19-1號6-1樓',
// 	14|banner  |   ReceiverCellPhone: '0912345678',
// 	14|banner  |   ReceiverEmail: '',
// 	14|banner  |   ReceiverName: 'ASASkjasdh',
// 	14|banner  |   ReceiverPhone: '',
// 	14|banner  |   RtnCode: '300',
// 	14|banner  |   RtnMsg: '訂單處理中(已收到訂單資料)',
// 	14|banner  |   UpdateStatusDate: '2023/06/20 12:26:19'
// 	14|banner  | }

