<template>
  <main>
    <section class="sec">
      <div>
        <div>
          <h2>CADASTRO DE HOSPEDES</h2>
          <p>Preencha todos os campos</p>
        </div>
        <div>
          <form>
              <div class="formularios">
                  <br>
                  <div class="flex">
                    <div>
                      <label class="cadlabel" for="nome"><strong>Nome</strong></label>
                      <input class="cadinput" type="text" name="nome" id="nomeCli" v-model="nomeUser" required>
                    </div>
                    <div>
                      <label class="cadlabel" for="cpf"><strong>CPF</strong></label>
                      <input class="cadinput" type="text" name="cpf" id="cpf" v-model="cpfUSer" required>
                    </div>
                    <div>
                      <label class="cadlabel" for="telefone"><strong>Telefone</strong></label>
                      <input class="cadinput" type="number" name="telefone" id="telefoneCli" v-model="telefoneUser" required>
                    </div>
                    <div>
                      <label class="cadlabel" for="email"><strong>Email</strong></label>
                      <input class="cadinput" type="email" name="email" id="emailCli" v-model="emailUser" required>
                    </div>
                    <div>
                      <label class="cadlabel" for="nome"><strong>Senha</strong></label>
                      <input class="cadinput" type="text" name="senha" id="senha" v-model="senhaUser" required>
                    </div>
                    <div>
                      <div>
                      <!--<label class="cadlabel" for="genero"><strong>Genero</strong></label>
                      <select class="cadselect" name="genero" id="genCli" required>
                          <option selected disabled value="">Selecione</option>
                          <option>Homem</option>
                          <option>Mulher</option>
                          <option>Pessoa não-binaria</option>
                          <option>Prefiro não informar</option>
                      </select> -->
                      </div>
                    </div>  
                    <div>
                        <label class="cadlabel" for="endereco"><strong>Endereço</strong></label>
                        <br>
                        <textarea class="cadtextarea" rows="6" id="endCli" name="endereco" v-model="endUser"></textarea>
                        <div class="check">
                            <label for="notificaEmail"><strong>Notificações por E-mail?</strong></label>
                            <input class="checkbox" type="checkbox" id="npe" name="notificaEmail">
                        </div>
                    </div>
                  </div>              
                  <br>
                </div>
              <br>
              <button class="button" type="button" id="salvarCadastro" @click="saveUsuario">Salvar Cadastro</button>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import router from '@/router';
import axios from 'axios';
export default{
    name:"FormCadastro",
    data() {
        return {
            nomeUser: "",
            senhaUser: "",
            cpfUSer:"",
            emailUser: "",
            endUser: "",
            telefoneUser: "",
        };
    },
    methods:{
      async saveUsuario() {
            try {
                await axios.post("http://localhost:5000/register", {
                    nomeUsuario: this.nomeUser,
                    emailUsuario: this.emailUser,
                    cpfUsuario: this.cpfUSer,
                    endUsuario: this.endUser,
                    telefoneUsuario: this.telefoneUser,
                    senhaUsuario: this.senhaUser
                });
                this.nomeUser = "";
                this.emailUser="";
                this.cpfUSer="";
                this.endUser="";
                this.telefoneUser="";
                this.senhaUser="";   
                alert("Cadastro efetuado com sucesso")
                router.push("/");        
            } catch (err) {
                console.log(err);
            }
      },

    }

}
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

.sec > div{
  max-width: 90%;
  margin: 2% 5%; 
}
.sec h2 {
  font-size: 3em;
}

.sec h3,
.sec h4 {
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

.sec p {
  font-size: 1.2em;
  font-weight: 300;
}

.flex{
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 5%;  
}

.flex > div{
  flex: 1 1 420px;
  margin: 10px;
}
    
.cadinput{
  display: inline-block;
  width: 200px;
  margin: 5px;
}

.cadlabel {
  display: inline-block;
  width: 130px;
  margin-right: 15px;
  font-size: 1.2em;
}

.cadtextarea {
  width: 310px;
}

.checkbox {
  width: 1em;
  height: 1em;
  margin: 5px;
}

.button {
  background: transparent;
  color: black;
  padding: 0.4em;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  font-size: 1.5em;
  margin-top:10px;
}

.button:hover {
  background: #112434;
  color: #fff;
  border-radius: 50px;
  padding: 0.4em;
}

.formularios{
  border:solid;
}
</style>