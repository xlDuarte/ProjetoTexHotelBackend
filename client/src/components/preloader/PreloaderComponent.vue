<!-- Preloader
<template>
    <div id="preloader">
        <div class="inner">
            <img src="images/loader/loader.gif" alt="loader">
        </div>
    </div>
</template>

<script>
export default {
    name: "PreloaderComponent",
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
    z-index: 999;
}

#preloader .inner {
    position: absolute;
    top: 50%;
    /* centralizar a parte interna do preload (onde fica a animação)*/
    left: 50%;
    transform: translate(-50%, -50%);
}
</style> -->