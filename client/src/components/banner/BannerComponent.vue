<!-- Banner -->
<template>
    <div class="popup">
        <div class="contentBox">
            <div class="close"></div>
            <div class="imgBx">
                <img id="banners" src="1.png" alt="banners">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BannerComponent",
};

var popup = document.querySelector(".popup");
var close = document.querySelector(".close");
// Mostrar automaticamente a popup após 2 segundos da página carregada
window.onload = function () {
    setTimeout(function () {
        popup.style.display = "block";
        const images = "1.png 2.png 3.png 4.png 5.png".split(" ");
        document.querySelector("#banners").src = `./assets/images/banner/${images[Math.floor(Math.random() * images.length)]
            }`;
    }, 2000);
};
close.addEventListener("click", () => {
    popup.style.display = "none";
});
</script>

<style scoped>
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    z-index: 9999;
}

.contentBox {
    position: relative;
    width: 1450px;
    height: 650px;
    background: #fff;
    border-radius: 20px;
    display: flex;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    z-index: 9999;
}

#banners {
    position: fixed;
    width: 100%;
    height: 650px;
    background: #fff;
    border-radius: 20px;
    display: flex;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: #f3f3f3 url(./assets/banner/close.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 10px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
}

@media (max-width: 768px) {
    .contentBox {
        width: 300px;
        height: auto;
        flex-direction: column;
    }

    .close {
        top: -50px;
        right: -10px;
        background: #fff url(./assets/banner/close.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 10px;
    }
}
</style>