<template>
 <div class="text-center relative mx-auto sm:max-w-xl md:max-w-full  mt-8 mb-8" style="max-width:80%;height:780px">
  <div class="text-center  mx-auto sm:w-full md:w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
		<div>
				<div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
					<div class="flex">
						<div class="text-center mx-auto">
							<p class="font-bold">您的訂單已建立完成，訂單號碼如下
</p>
							<p class="text-sm">請記下訂單號碼，以便查詢訂單狀態</p>
						</div>
					</div>
					<div class=" mt-4 mb-4 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center">
						{{$route.params.id}}
						<a @click="copyToClipboard($route.params.id)" href="#"><svg class="w-[15px] h-[15px] ml-2 text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
							<path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"/>
							<path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"/>
						</svg></a>
					</div>
					<br>
					<router-link :to="'/orderdetails/'+$route.params.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						下一步
							<svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
					</router-link>
				</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	methods: {
		copyToClipboard(value){ 
			navigator.clipboard.writeText(value);
			this.$notify({ title: "Success", text: '訂單號碼已複製，請妥善保管 ' });
		}
	}
}
</script>
