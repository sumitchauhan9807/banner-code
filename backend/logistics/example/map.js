/**
 * Created by ying.wu on 2017/6/27.
 */
 // 作廢發票
const ecpay_logistics = require('../lib/ecpay_logistics.js');
// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值



exports.logisticsMap = (MerchantTradeNo,LogisticsSubType) =>{ 
	let base_param = {
		MerchantTradeNo:MerchantTradeNo, // 請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
		ServerReplyURL:`${process.env.BASE_URL}api/orders/setup-pickup-hook`, // 物流狀況會通知到此URL
		LogisticsType:"CVS",
		LogisticsSubType:LogisticsSubType,
		IsCollection:"N",
		ExtraData:"",
		Device:""
	};
	let create = new ecpay_logistics();
	let res = create.query_client.expressmap(parameters = base_param);
	if (typeof res === 'string'){
			console.log(res);
			return res
	} else {
			res.then(function (result) {
					console.log(result);
					return result
			}).catch(function (err) {
					console.log(err);
					return err
			});
	}
}



// {
// 	14|banner  |   MerchantID: '3322276',
// 	14|banner  |   MerchantTradeNo: '345345ertert5345',
// 	14|banner  |   LogisticsSubType: 'OKMARTC2C',
// 	14|banner  |   CVSStoreID: '000389',
// 	14|banner  |   CVSStoreName: 'OK士林芝東店',
// 	14|banner  |   CVSAddress: '台北市士林區士東路200巷21號1樓',
// 	14|banner  |   CVSTelephone: '02-66171089',
// 	14|banner  |   CVSOutSide: '',
// 	14|banner  |   ExtraData: ''
// 	14|banner  | }
	