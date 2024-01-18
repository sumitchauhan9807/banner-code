/**
 * Created by ying.wu on 2017/6/27.
 */
const ecpay_logistics = require('../lib/ecpay_logistics.js');
// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值



exports.printtradedocument = (AllPayLogisticsID) => {
	let base_param = {
		AllPayLogisticsID:AllPayLogisticsID, // 請帶20碼uid, ex: 84851681561813188188, 為Create時所得到的物流交易編號
		PlatformID:"",
	};
	let create = new ecpay_logistics();
	let res = create.query_client.printtradedocument(parameters = base_param);
	if (typeof res === 'string'){
			console.log(res);
			return res
	} else {
		res.then(function (result) {
				console.log(result);
		}).catch(function (err) {
				console.log(err);
		});
	}
}
