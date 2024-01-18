<template>
<div ref="googleMap" style="width:100%;height:400px;"></div>
</template>
<script>

export default {
  mounted() {
    //22.631203,120.315409
    let google = window.google
    const myLatLng = { lat: 22.631203, lng: 120.315409 };
    const map = new google.maps.Map(this.$refs.googleMap, {
      zoom: 15,
      center: myLatLng,
    });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
 }
}

</script>
