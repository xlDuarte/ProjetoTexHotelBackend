<template>
  <div>
    <PreLoader />
    <!--Banner-->
    <!-- <BannerComponent/> -->
    <!--Header-->
    <HeaderComponent />
    <router-view class="content" />
    <FooterComponent />
  </div>
</template>

<script>
// import BannerComponent from './components/banner/BannerComponent.vue';
import HeaderComponent from "./components/header/HeaderComponent.vue";
import FooterComponent from "./components/footer/FooterComponent.vue";
import PreLoader from '@/components/preloader/PreloaderComponent.vue'

export default {
  name: 'AppVue',
  components: {
    HeaderComponent, FooterComponent, PreLoader
  },
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

.content {
  background-color: #f4f2e7;
  background-image: linear-gradient(90deg, #f4f2e7 0%, #f7f4e9 46%, #efe5d5 100%);
}

body {
  overflow-x: hidden;
  min-height: 100vh;
}

.hide {
  display: none;
}
</style>
