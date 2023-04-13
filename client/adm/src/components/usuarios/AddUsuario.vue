<template>
  <div class="container">
  <div class="row justify-content-center">
    <div class="col-sm-12 col-md-8 col-lg-6">
      <div class="shadow bg-light rounded-3 p-4 my-5">
        <form>
           <div class="row">
            <div class="form-group col-12 col-sm-6">
              <label for="nome" class="mb-0 form-label fw-bold">*Nome:</label>
              <input type="text" v-model="nomeUser" class="form-control" />
            </div>
            <div class="form-group col-12 col-sm-6">
              <label for="email" class="mb-0 form-label fw-bold">*E-mail:</label>
              <input type="text" v-model="emailUser" class="form-control" />
            </div>
            <div class="form-group col-12 col-sm-6">
              <label for="cpf" class="mt-3 mb-0 form-label fw-bold">*CPF:</label>
              <input type="text" v-model="cpfUSer" class="form-control" />
            </div>
            <div class="form-group col-12 col-sm-6">
              <label for="endereco" class="mt-3 mb-0 form-label fw-bold">*Endereço:</label>
              <input type="text" v-model="endUser" class="form-control" />
            </div>
            <div class="form-group col-12 col-sm-6">
              <label for="tipo" class="mt-3 mb-0 form-label fw-bold">*Tipo:</label>
              <input type="text" v-model="tipoUser" class="form-control" />
            </div>
            <div class="form-group col-12 col-sm-6">
              <label for="telefone" class="mt-3 mb-0 form-label fw-bold">*Telefone:</label>
              <input type="text" v-model="telefoneUser" class="form-control" />
            </div>
            <div class="form-group col-12 col-sm-6">
              <label for="senha" class="mt-3 mb-0 form-label fw-bold">*Senha:</label>
              <input type="text" v-model="senhaUser" class="form-control" />
            </div>
            <div class="form-group text-center col-12 col-sm-6">
              <button class="button mt-4" @click="saveUsuario">Cadastrar</button>
            </div>
          </div> 
        </form>
      </div>
    </div>
  </div>
</div>

 </template>
   
 <script>
 // import axios
 import axios from "axios";
 
 export default {
   name: "AddUsuario",
   data() {
     return {
       nomeUser: "",
       senhaUser: "",
       cpfUSer: "",
       emailUser: "",
       endUser: "",
       telefoneUser: "",
       tipoUser: "",
     };
   },
   methods: {
     // cria novo usuario
     async saveUsuario() {
        console.log("save usuario...",this.nomeUser, this.cpfUSer)
       try {
         await axios.post("http://localhost:5000/register", {
           nomeUsuario: this.nomeUser,
           emailUsuario: this.emailUser,
           cpfUsuario: this.cpfUSer,
           endUsuario: this.endUser,
           telefoneUsuario: this.telefoneUser,
           tipoUsuario: this.tipoUser,
           senhaUsuario: this.senhaUser
         });
         this.nomeUser = "";
         this.emailUser = "";
         this.cpfUSer = "";
         this.endUser = "";
         this.telefoneUser = "";
         this.tipoUser = "";
         this.senhaUser = "";
         this.$emit('updateList')
       } catch (err) {
         console.log(err);
       }
     },
   },
 };
 </script>
 <style scoped>
 .sec {
   position: relative;
   padding: 2vw;
   transition: all 0.3s ease;
   color: black;
 }
 
 .button {
   background: transparent;
   color: black;
   padding: 5px;
   border-radius: 50px;
   cursor: pointer;
   overflow: hidden;
 }
 
 .button:hover {
   background: #112434;
   color: #fff;
   border-radius: 50px;
   padding: 5px;
 }
 </style>
   
