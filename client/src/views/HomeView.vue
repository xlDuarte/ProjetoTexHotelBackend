<template>
  <div class="sec">    
    <HomeMain/>
  </div>
</template>

<script>
import HomeMain from '@/components/home/HomeMain.vue'


export default {
  name: 'HomeView',
  components: {
    HomeMain
  }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
</style>