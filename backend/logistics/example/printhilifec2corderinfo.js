/**
 * Created by ying.wu on 2017/6/27.
 */
const ecpay_logistics = require('../lib/ecpay_logistics.js');
// 參數值為[PLEASE MODIFY]者，請在每次測試時給予獨特值



exports.printhilifec2corderinfo = (AllPayLogisticsID,CVSPaymentNo) => {
	let base_param = {
		AllPayLogisticsID:AllPayLogisticsID, // 請帶20碼uid, ex: 84851681561813188188, 為Create時所得到的物流交易編號
		CVSPaymentNo:CVSPaymentNo, // 請帶15碼uid, ex: 848516815618131, 為Create時所得到的寄貨編號
		PlatformID:""
	};
    return new Promise((resolve,reject)=>{
			let create = new ecpay_logistics();
			let res = create.c2c_process_client.printhilifec2corderinfo(parameters = base_param);
			if (typeof res === 'string'){
					console.log(res);
          resolve(res)
			} else {
				res.then(function (result) {
						console.log(result);
						resolve(result)
				}).catch(function (err) {
						console.log(err);
						reject(result)
				});
			}
	})
}
