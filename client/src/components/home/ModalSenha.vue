<template>
    <div>
        <!--Inicio Modal-->
    <div class="modal fade" id="modalSenhaToggle" aria-hidden="true" aria-labelledby="modalSenhaToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="modalSenhaToggleLabel">Informe o E-mail Cadastrado</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="row">
      <div class="modal-body">
        
        <div class="mb-3 input-group">
            <label for="recipient-name" class="input-group-text text-white bg-info col-2 col-form-label">E-mail:</label>
            <input type="text" class="col-10 form-control" id="email" placeholder="Digite seu email" v-model="email">
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn btn-outline-primary" data-bs-target="#modalSenhaToggle2" data-bs-toggle="modal" data-bs-dismiss="modal" @click="resetSenha" require>Enviar</button>
      </div>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="modalSenhaToggle2" aria-hidden="true" aria-labelledby="modalSenhaToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="modalSenhaToggleLabel2">Obrigado pelas confirmações!</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <br>
        <p class="text-success">Um link com instruções foi enviado para seu email.</p>
        <br>
        <p>Caso não tenha recebido, por gentileza <a class="" data-bs-toggle="modal" href="#modalSenhaToggle" role="button">Clique aqui !</a></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Fechar</button>       
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import axios from 'axios'
//const bootstrap = require('bootstrap')

export default {
  name:'ModalSenha',
  data() {
    return {
      email: "",
    };
  },
  
  methods: {
    async resetSenha() {
      if (this.email != "") {
        try {
          const response = await axios.post("http://localhost:5000/resetpwd-email", {
            emailUsuario: this.email
          });
          console.log(response.data)
        }catch (err) {
          alert(err.response.data.msg)
          console.log(err);
        }
      } else {
        alert("È preciso preencher o campo");
      }       
    }
  },
}
 

</script>

<style scoped>

</style>