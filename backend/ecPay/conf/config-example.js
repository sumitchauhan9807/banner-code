const options = {
  "OperationMode": process.env.EC_PAY_MODE == 'dev' ? 'Test' : "Production",  //Test or Production
  "MercProfile": {
    "MerchantID": process.env.EC_PAY_MODE == 'dev' ? '3002599' : "3322276", 
    "HashKey": process.env.EC_PAY_MODE == 'dev' ? 'spPjZn66i0OhqJsQ' : "n1drI73jcHNuyy82",
    "HashIV":  process.env.EC_PAY_MODE == 'dev' ? 'hT5OJckN45isQTTs' : "500jCbwMcX6bPHsL",
  },
  "IgnorePayment": [
//    "Credit",
//    "WebATM",
//    "ATM",
//    "CVS",
//    "BARCODE",
//    "AndroidPay"
  ],
  "IsProjectContractor": false
}

module.exports = options