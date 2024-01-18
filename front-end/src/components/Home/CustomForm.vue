<template>
 <PageLoader
    v-if="loading"
  />
    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-5 lg:py-5 mt-10">
        <!-- <h2>Design Request Form</h2> -->
        <div  class="border-2 p-5 shadow-xl rounded-xl">
            
            <div class=" grid grid-cols-2 gap-5 w-full">
                <div>
                    <label for="name">請填寫您的姓名:</label> <br>
                    <input class="w-full block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" type="text" id="name"
                        v-model="fullname" />
										<p v-if="fullname.length < 2 && formTouched" class="text-red-500 text-xs italic">{{basicError}}</p>
                </div>
                <div>
                    <label for="email">請填寫您的Email:</label> <br>
                    <input class="w-full block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" type="email" id="email"
                        v-model="email" />
									<p v-if="!checkMail && formTouched" class="text-red-500 text-xs italic">{{basicError}}</p>
                </div>
            </div>
            
						<div class="pt-5">
								<label for="phoneNumber">請填寫您的電話:</label>
								<input type="text" id="phoneNumber" class="w-full block w-full py-3 px-1 mt-2 
								text-gray-800 appearance-none 
								border-b-2 border-gray-100
								focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" v-model="phonenumber" />
						</div>
						<p v-if="phonenumber.length < 8 && formTouched" class="text-red-500 text-xs italic">{{basicError}}</p>
                
            
					<div class=" grid lg:grid-cols-2 grid-cols-1 py-5 gap-2  w-full">
							<div  class="pt-5 flex flex-wrap">
									<label for="fileUpload">在此上傳您的檔案:</label>
									<input ref="fileInput" type="file" id="fileUpload" class="px-10 mt-4" accept=".jpg, .jpeg, .png" />
									<!-- <span v-if="fileSizeExceeded">File size exceeds 3MB. Please email your file/material to
											xxxxx@gmail.com.</span> -->
							</div>
							<div class="pt-5">
								<label for="deliveryMethod" class="">選擇配送方式:</label><br>
								<select id="deliveryMethod" class="block w-full py-3 px-1 mt-2 
								text-gray-800 appearance-none 
								border-b-2 border-gray-100
								focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" v-model="deliveryMethod">
										<!-- <option value="">--  選擇寄件方式 --</option> -->
										<option value="home"> 宅配到府</option>
										<option value="pickup">超商取貨</option>
								</select>
						</div>
					</div>
						<div  class="pt-5">
                <label for="fileUpload">請描述您的設計需求:</label>
                <textarea type="text" id="deliveryAddress" class="w-full block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg"
                        v-model="customizationDetails" />
            </div>
						<p v-if="customizationDetails.length < 6 && formTouched" class="text-red-500 text-xs italic">{{basicError}}</p>
						<Transition name="fade">
							<div v-if="deliveryMethod == 'home'">
							<div  class="pt-5">
									<label for="fileUpload">請填寫您宅配到府地址:</label>
									<textarea type="text" id="deliveryAddress" class="w-full block w-full py-3 px-1 mt-2 
											text-gray-800 appearance-none 
											border-b-2 border-gray-100
											focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg"
													v-model="deliveryAddress" />
							</div>
							<p v-if="deliveryAddress.length < 6 && formTouched && deliveryMethod == 'home'" class="text-red-500 text-xs italic">{{basicError}}</p>
								<div class="pt-5 pb-5">
									<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
										郵遞區號
									</label>
									<input v-model="zipCode" class="w-full block rounded-lg py-3 px-1 mt-2 
													text-gray-800 appearance-none 
													border-b-2 border-gray-100
													focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg" id="grid-zip" type="text" max="50" min="1" placeholder="郵遞區號"/>
								<p v-if="zipCode.length < 3 && formTouched && deliveryMethod == 'home'" class="text-red-500 text-xs italic">{{basicError}}</p>
							</div>
						</div>
						</Transition>
            <button @click.prevent="submitForm" class="mt-4 btn bg-orange-400 py-3 px-2 w-full  rounded-lg shadow-lg text-white"
                >確認送出估價</button>
								<div role="alert">
						<div v-if="formError.length" class="border  border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 mt-4">
							<p>{{formError}}</p>
						</div>
							<div v-if="formSuccess" class="border  border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700 mt-4">
							<p>Thank You ! Your request has been received</p>
						</div>
					</div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
// import DuckPopup from './DuckPopup.vue';
import PageLoader from '@/components/PageLoader.vue'
	export default {
		components :{
			PageLoader
	// DuckPopup
	},
		
data() {
		return {
			basicError:"請填寫必要資訊",
			formTouched:false,
			customizationDetails: '',
			phonenumber: '',
			deliveryAddress: '',
			deliveryMethod: 'home',
			fullname: '',
			email: '',
			zipCode:'',
			formError:'',
			formSuccess:false
		};
	},
	methods: {
		async submitForm() {
			this.formTouched = true
       if(!this.validateForm()){
         this.$notify({ title: "Alert!", text: '請填入完整必要資訊' });
         return 
       }
			let fileInput = this.$refs.fileInput
			if(!fileInput.files[0]) {
				this.$notify({ title: "Alert!", text: 'Please select banner image file' });
         return
			}
			 let formData = new FormData()
			 formData.append("file", fileInput.files[0]);
				formData.append("customizationDetails", this.customizationDetails);
				formData.append("phonenumber", this.phonenumber);
				formData.append("deliveryMethod", this.deliveryMethod);
				formData.append("fullname", this.fullname);
				formData.append("email", this.email);
			if(this.deliveryMethod == 'home') {
        formData.append("zipCode", String(this.zipCode));
				formData.append("deliveryAddress", this.deliveryAddress);
       }
			try{
				this.loading = true;
				let {data} = await this.axios.post('cust-orders',formData)
				this.loading = false;
				this.resetForm()
				this.formError = ''
				this.formSuccess = true
				setTimeout(()=>{
					this.formSuccess = false
				},5000)
				this.$notify({ title: "Success", text: 'Request submitted successfully' });
			}catch(e) {
				this.loading = false;
				console.log(e)
				let { data : { message } } = e.response
				// this.error = message
				this.formError = message
				this.formSuccess = false
				this.$refs.fileInput = null
				this.$notify({ title: "Error", text: message });
			}
		},
		resetForm() {
				this.$refs.fileInput = null
			this.customizationDetails = '',
				this.phonenumber= '',
				this.deliveryAddress= '',
				this.fullname= '',
				this.email= '',
				this.zipCode=''
				this.formTouched = false
		},
		 validateForm() {
      if(this.fullname.length < 2) {
        return false
      }
      if(!this.checkMail) {
        return false
      }
      if(this.phonenumber.length < 8) {
        return false
      }
			if(this.customizationDetails.length < 8) {
        return false
      }
      if(this.deliveryMethod == 'home') {
        if(this.deliveryAddress.length < 4){
          return false
        }
        if(this.zipCode.length < 3){
          return false
        }
      }
      return true
    },
	},
	computed: {
		checkMail() {
      var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
      var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
      var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
      var sQuotedPair = '\\x5c[\\x00-\\x7f]';
      var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
      var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
      var sDomain_ref = sAtom;
      var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
      var sWord = '(' + sAtom + '|' + sQuotedString + ')';
      var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
      var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
      var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
      var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

      var reValidEmail = new RegExp(sValidEmail);

      return reValidEmail.test(this.email);
    },
	}
};
</script>
  
<style>/* Add your custom styles here */</style>