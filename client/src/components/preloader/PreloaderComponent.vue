<!-- Preloader-->
<template>
    <div id="preloader" v-if="!isloaded">
        <div class="inner">
            <img src="@/assets/images/loader/loader.gif" alt="loader">
        </div>
    </div>
</template>

<script>
export default {
    name: "PreloaderComponent",
    data() {
        return {
            isloaded: false,
            countDown: 3
        }
    },
    methods: {
        countDownTimer() {
            for (let i = 3; i > 0; i--) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.isLoaded()
                }, 1000)
            }
        },
        isLoaded() {
            if (this.countDown == 0) {
                this.isloaded = true;
            }
        }
    },
    mounted() {
        this.countDownTimer();
    },
};

// $(window).on('load', function () {
//     $('#preloader .inner').fadeOut();
//     $('#preloader').delay(150).fadeOut('slow');
//     $('body').delay(150).css({ 'overflow': 'visible' });
// })

</script>

<style scoped>
#preloader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 99999;
}

#preloader .inner {
    position: absolute;
    top: 50%;
    /* centralizar a parte interna do preload (onde fica a animação)*/
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>