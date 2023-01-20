<template>
  <div>
    <!--Banner-->
    <!-- <BannerComponent/> -->
    <!--Header-->
    <HeaderComponent/>
    <div class="banner">
      <img alt="" src="./assets/BANNER-CASANAPRAIA.png">
    </div>
    <router-view class="content"/>
    <div class="banner">
      <img alt="" src="./assets/footerborder.png">
    </div>
    <FooterComponent/>
  </div>
</template>

<script>
// import BannerComponent from './components/banner/BannerComponent.vue';
import HeaderComponent from "./components/header/HeaderComponent.vue";
import FooterComponent from "./components/footer/FooterComponent.vue";

export default {
  name: 'AppVue',
  components: {
    HeaderComponent,FooterComponent,
    // BannerComponent
  }
}

</script>

<style>
@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.content{
  background-color: #f4f2e7;
  background-image: linear-gradient(90deg, #f4f2e7 0%, #f7f4e9 46%, #efe5d5 100%);
}

body {
  overflow-x: hidden;
  min-height: 100vh;
}

.logo {
  color: #112434;
  font-weight: 700;
  font-size: 2em;
  text-decoration: none;
}

.hide {
  display: none;
}

.banner {
  width: 100%;
}

.banner img {
  display: block;
  object-fit: cover;
  width: 100%;
  object-position: center;  
}
</style>
