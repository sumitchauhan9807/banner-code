/**
 * Created by ying.wu on 2017/6/27.
 */
//  `${process.env.BASE_URL}api/orders/webhook`,

exports.logistics_pickup = (MerchantTradeNo,MerchantTradeDate,LogisticsSubType,ReceiverName,ReceiverPhone,ReceiverCellPhone,email,storeId,orderId,order) => {
	return new Promise((resolve,reject) => {
		const ecpay_logistics = require('../lib/ecpay_logistics.js');
		// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值
		let base_param = {
			MerchantTradeNo:MerchantTradeNo, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93, 為aiocheckout時所產生的
			MerchantTradeDate:MerchantTradeDate, // 請帶交易時間, ex: 2017/05/17 16:23:45, 為aiocheckout時所產生的
			LogisticsType:"CVS",
			LogisticsSubType:LogisticsSubType,//UNIMART、FAMI、HILIFE、UNIMARTC2C、FAMIC2C、HILIFEC2C、OKMARTC2C
			GoodsAmount:order.paymentAmount,
			CollectionAmount:order.paymentAmount,
			IsCollection:order.paymentOption == 'cash_on_delivery' ? 'Y' : 'N',
			GoodsName:"Banner Delivery",
			SenderName:process.env.SenderName,
			SenderPhone:process.env.SenderPhone,
			SenderCellPhone:process.env.SenderCellPhone,
			ReceiverName:ReceiverName.slice(0,5),
			ReceiverPhone:ReceiverPhone,
			ReceiverCellPhone:ReceiverCellPhone,
			ReceiverEmail:email,
			TradeDesc:"",
			ServerReplyURL:`${process.env.BASE_URL}api/orders/create-order-logistics-hook`, // 物流狀況會通知到此URL
			ClientReplyURL:"",
			LogisticsC2CReplyURL:LogisticsSubType == 'UNIMARTC2C' ? `${process.env.BASE_URL}admin-order-details/${orderId}` : '',
			Remark:"",
			PlatformID:"",
			ReceiverStoreID:storeId, // 請帶收件人門市代號(統一):991182  測試商店代號(全家):001779 測試商店代號(萊爾富):2001、F227
			ReturnStoreID:""
		};
		console.log(base_param,"base_parm")
		let create = new ecpay_logistics();
		let res = create.create_client.create(parameters = base_param);
		if (typeof res === 'string'){
				// console.log(res);
				let response = res.split("|")
				console.log(response)
				return resolve(res)
		} else {
			res.then(function (result) {
					// console.log(result);
				let response = result.split("|")
				if(response[0] == '1') {
					return resolve(response[1])
				}else{
					console.log(response)
					return reject({message:response[1]})
				}
			}).catch(function (err) {
					reject(err)
			});
		}
	})
}

