<template>
  <textarea
    type="text"
    id="deliveryAddress"
    class="w-full block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 shadow-lg"
    v-model="text"
  />
  <button @click.prevent="addSiteHeading" type="button" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">更新標題</button>
</template>
<script>
export default {
  props: ["siteHeading"],
  data() {
    return {
      text: "",
    };
  },
  mounted() {
    this.text = this.siteHeading
  },
  methods: {
    async addSiteHeading() {
      let formData = new FormData();
      formData.append("text", this.text);
      formData.append("sitedata", "heading");
      try {
        this.loading = true;
        let { data } = await this.axios.post("admin/edit-site-data", formData);
        this.text = data.data;
        // this.text = ''
        this.loading = false;
        this.$notify({ title: "Success", text: "Added Successfully" });
      } catch (e) {
        let {
          data: { message },
        } = e.response;
        this.loading = false;
        this.$notify({ title: "Error", text: message });
      }
    },
  },
};
</script>
