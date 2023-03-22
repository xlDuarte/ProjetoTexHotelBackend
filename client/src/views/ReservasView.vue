<template>
  <div class="sec">
    <div>
      <FormReserva />
    </div>
    <hr>
    <div id="painelEsquerdo" class="row justify-content-left flex">
      <div class="col-7">
        <PainelAcomodacoes />
      </div>
      <div class="col-3">
        <PainelReserva />
      </div>
    </div>
  </div>
</template>

<script>
import FormReserva from "@/components/reserva/FormReserva.vue";
import PainelAcomodacoes from "@/components/reserva/PainelAcomodacoes.vue";
import PainelReserva from "@/components/reserva/PainelReserva.vue";

export default {
  name: "ReservasView",
  data() {
    // data
    return {
      //return
    };
  },
  components: {
    FormReserva,
    PainelReserva,
    PainelAcomodacoes,
  },
};
</script>

<style scoped>
@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.sec {
  position: relative;
  padding: 2vw;
  transition: all 0.3s ease;
  color: black;
}

.sec>div {
  max-width: 90%;
  margin: 2% 5%;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 5%;
}

.flex>div {
  flex: 1 1 420px;
  margin: 10px;
}
</style>
