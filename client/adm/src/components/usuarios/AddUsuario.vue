<template>
  <div class="d-flex flex-wrap align-items-start ">
     <div class="shadow mx-auto bg-light rounded-3 p-4 my-5 w-50">
       <form>
         <div class="container">
           <div class="row my-2">            
             <div class="col col-sm-4 col-md-6">
             <label for="nome" class="mb-0 form-label fw-bold ">*Nome:</label>
             <input type="text"  v-model="nomeUser" class="form-control  w-100 "  />
             </div>  
 
 
             <div class="mx-auto col col-sm-4 col-md-6">
               <label for="email" class="mb-0 form-label fw-bold ">*E-mail:</label>
               <input type="text"  v-model="emailUser" class="form-control  w-100 "  />        
             </div>
 
             <div class="col col-sm-4 col-md-6">
               <label for="cpf" class="mt-3 mb-0 form-label fw-bold ">*CPF:</label>
               <input type="text"  v-model="cpfUser" class="form-control w-100 "  /> 
             </div>
 
             <div class="mx-auto col col-sm-4 col-md-6">        
               <label for="endereço" class="mt-3 mb-0 form-label fw-bold ">*Endereço:</label>
               <input type="text"  v-model="endUser" class="form-control w-100 "  />
             </div>
             <div class="col col-sm-4 col-md-6">
               <label for="tipo" class="mt-3 mb-0 form-label fw-bold ">*Tipo:</label>
               <input type="text"  v-model="tipoUser" class="form-control  w-100 "  />
             </div>
             <div class="mx-auto col col-sm-4 col-md-6">
               <label for="telefone" class="mt-3 mb-0 form-label fw-bold ">*Telefone:</label>
               <input type="text"  v-model="telefoneUser" class="form-control  w-100 "  />
             </div>
             <div class="col col-sm-4 col-md-6">
               <label for="senha" class="mt-3 mb-0 form-label fw-bold ">*Senha:</label>
               <input type="text"  v-model="senhaUser" class="form-control  w-100 "  />
             </div>
           </div>
           <div class=" col col-sm-4 col-md-6">
             <button class="button mx-auto mt-2" @click="saveUsuario">Cadastrar</button>
           </div>
         </div>
       </form>
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
       try {
         await axios.post("http://localhost:5000/register", {
           nomeUsuario: this.nomeUser,
           emailUsuario: this.emailUser,
           cpfUSuario: this.cpfUSer,
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
   