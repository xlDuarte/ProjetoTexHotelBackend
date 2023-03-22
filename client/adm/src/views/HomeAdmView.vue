<template>
  <div class="sec">
    <div>teste</div>
  </div>
</template>

<script>

export default {
  name: 'HomeAdmView',
  components: {
  },
  data() {
    return {
    };
  },
  beforeMount() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem("loginStatus")) {
        if (localStorage.getItem("loginStatus") == "admin")
          return true
        else if (localStorage.getItem("loginStatus") == "cliente")
          this.$router.push("/")
        return true
      } else {
        this.$router.push("/")
        return false
      }
    },
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