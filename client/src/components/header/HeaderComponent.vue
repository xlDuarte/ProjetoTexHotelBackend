<!-- Header -->
<template>
  <div>
    <ModalSenha />
    <header class="header">
      <div class="logo">
        <img src="@/components/header/images/logo_hotel.png" alt="">
      </div>
      <nav>
        <div class="navigation-drop">
          <input class="dropbtn" type="checkbox" id="Menu" />
          <label class="navigation-drop-btn" for="Menu"><font-awesome-icon :icon="faBars" size="2x" /></label>
          <div class="navigation-drop-content">
            <div class="pub menu" v-show="visivel">
              <div><router-link to="/">Home</router-link></div>
              <div><router-link to="/Acomodacoes">Acomodações</router-link></div>
              <div><router-link to="/Reservas">Reservas</router-link></div>
            </div>
            <div class="adm menu" v-show="invisivel">
              <div><router-link to="/HomeAdm">Home</router-link></div>
              <div><router-link to="/AcomodacaoAdm">Acomodações</router-link></div>
              <div><router-link to="/ReservasAdm">Reservas</router-link></div>
              <div><router-link to="/ServicosAdm">Serviços</router-link></div>
              <div><router-link to="/Consumos">Consumo</router-link></div>
              <div><router-link to="/ComentariosAdm">Comentarios</router-link></div>              
              <div><router-link to="/Usuarios">Usuarios</router-link></div>
            </div>
            <form class="campologin" v-show="showLogin" action="post">
              <div>
                <label for="login"><strong>USUARIO</strong></label>
                <input class="box1 login" type="email" name="login" id="logindrop" v-model="login" autocomplete="on" />
                <label for="password"><strong>SENHA</strong></label>
                <input class="box1 pswd" type="password" name="password" id="passworddrop" v-model="pswd"
                  autocomplete="on" />
              </div>
              
              <div>
                <input class="btnLogin" @click="validate" type="button" value="OK" id="btnLogindrop" />
                <br>
                <a href=""><router-link to="/Cadastro">Cadastre-se!</router-link></a>
                <br>
                <a class="" data-bs-toggle="modal" href="#modalSenhaToggle" role="button">Esqueceu sua senha?</a>
              </div>
            </form>
            
            <div class="logedindrop" v-show="showLogOut">
              <div>
                <p id="userdrop"></p>
                <div>
                  <input class="button btnExit" @click="logOut" id="btnExit" type="button" value="Sair" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="navigation">
          <div class="pub menu" v-show="visivel">
            <div><router-link to="/">Home</router-link></div>
            <div><router-link to="/Acomodacoes">Acomodações</router-link></div>
            <div><router-link to="/Reservas">Reservas</router-link></div>
          </div>
          <div class="adm menu" v-show="invisivel">
            <div><router-link to="/HomeAdm">Home</router-link></div>
            <div><router-link to="/AcomodacaoAdm">Acomodações</router-link></div>
            <div><router-link to="/ReservasAdm">Reservas</router-link></div>
            <div><router-link to="/ServicosAdm">Serviços</router-link></div>
            <div><router-link to="/Consumos">Consumo</router-link></div>
            <div><router-link to="/ComentariosAdm">Comentários</router-link></div>            
            <div><router-link to="/Usuarios">Usuarios</router-link></div>
          </div>
        </div>
      </nav>
      <form class="campologin" v-show="showLogin" action="post">
        <div>
          <label for="login"><strong>USUARIO</strong></label>
          <input class="box1 login" type="email" name="login" id="login" v-model="login" autocomplete="on" />
          <label for="password"><strong>SENHA</strong></label>
          <input class="box1 pswd" type="password" name="password" id="password" v-model="pswd" autocomplete="on" />
          <input class="btnLogin" @click="validate" type="button" value="OK" id="btnLogin" />
        </div>
        <div>          
          <a href=""><router-link to="/Cadastro">Cadastre-se!</router-link></a>
          <a class="" data-bs-toggle="modal" href="#modalSenhaToggle" role="button">Esqueceu sua senha?</a>
        </div>
      </form>      
      <div class="logedin" v-show="showLogOut">
        <div>
          <p id="user"></p>
          <div>
            <input class="button btnExit" @click="logOut" id="btnExit" type="button" value="Sair" />
          </div>
        </div>
      </div>
    </header>
    
  </div>
</template>

<script>
import axios from "axios"
import ModalSenha from '../home/ModalSenha';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



export default {
  name: "HeaderComponent",
  components: {
    ModalSenha,
    FontAwesomeIcon
  },

  data() {
    return {
      items: [],
      login: "",
      pswd: "",
      x: "",
      logedin: false,
      visivel: true,
      invisivel: false,
      showLogin: true,
      showLogOut: false,
      faBars
    };
  },
  
  methods: {
    async validate() {
      if (this.login != "" && this.pswd != "") {
        try {
          const response = await axios.post("http://localhost:5000/login", {
            emailUsuario: this.login,
            senhaUsuario: this.pswd,
          });
          this.items = response.data.data
          console.log(this.items)
          console.log(response.data.jwtToken)
          if (this.items) {
            let loged = this.items.nomeUsuario;
            let logedOn = this.items.tipoUsuario;
            let idUser = this.items.idUsuario;
            let jToken = response.data.jwtToken
            console.log(jToken)
            this.logedin = true
            this.showLogOut = true
            this.showLogin = false
            sessionStorage.setItem('token', jToken)
            console.log(this.items.nomeUsuario)
            console.log('ok')
            if (logedOn == 'cliente') {
              localStorage.setItem("userId", idUser);
              localStorage.setItem("loged", loged);
              localStorage.setItem("loginStatus", logedOn);
              alert("Logado com sucesso!");
              document.getElementById(
                "user"
              ).innerText = `Olá ${loged}`;
              document.getElementById(
                "userdrop"
              ).innerText = `Olá ${loged}`;
            } else if (logedOn == 'admin') {
              localStorage.setItem("userId", idUser);
              localStorage.setItem("loged", loged);
              localStorage.setItem("loginStatus", logedOn);
              document.getElementById(
                "user"
              ).innerText = `Olá ${loged}`;
              document.getElementById(
                "userdrop"
              ).innerText = `Olá ${loged}`;
              this.logedin = localStorage.getItem("loginStatus");
              alert("Logado com sucesso como administrador!");
              this.$router.push("HomeAdm")
              this.invisivel = true
              this.visivel = false
            }
          } else {
            alert("Usuario não encontrado")
          }
        } catch (err) {
          alert(err.response.data.msg)
          console.log(err);
        }
      } else {
        alert("È preciso preencher os campos de login e senha");
      }
    },

    showHide(obj, action) {
      document.querySelector(obj).classList[action]("hide");
    },

    async logOut() {
      const response = await axios.get("http://localhost:5000/logout");
      let logedOut = response.data;
      this.showLogOut = false
      this.showLogin = true
      this.invisivel = false,
      this.visivel = true
      localStorage.setItem("loginStatus", logedOut);
      localStorage.removeItem("loged");
      localStorage.removeItem("userId")
      localStorage.removeItem("loginStatus");
      
      // validar!! - FRC 
      localStorage.clear();
      document.getElementById("login").value = "";
      document.getElementById("password").value = "";
      this.logedin = localStorage.getItem("logedOut");
      console.log("logout", response)
      window.location.href = "/"
    },

    async loginCheck() {
      if (!this.logedin) {
        try {
          const response = await axios.get("http://localhost:5000/get-user")
          this.items = response.data.data
          let loged = this.items.nomeUsuario;
          let logedOn = this.items.tipoUsuario;
          let idUser = this.items.idUsuario;
          this.logedin = true
          this.showLogin = false
          this.showLogOut = true
          console.log(this.items.nomeUsuario)
          console.log('ok')
          if (logedOn == 'cliente') {
            localStorage.setItem("userId", idUser)
            localStorage.setItem("loged", loged);
            localStorage.setItem("loginStatus", logedOn);
            alert("Logado com sucesso!");
            document.getElementById(
              "user"
            ).innerText = `Olá ${loged}`;
            document.getElementById(
              "userdrop"
            ).innerText = `Olá ${loged}`;
          } else if (logedOn == 'admin') {
            localStorage.setItem("loged", loged);
            localStorage.setItem("loginStatus", logedOn);
            this.invisivel = true,
              this.visivel = false
            document.getElementById(
              "user"
            ).innerText = `Olá ${loged}`;
            document.getElementById(
              "userdrop"
            ).innerText = `Olá ${loged}`;
            this.logedin = localStorage.getItem("loginStatus");
            alert("Logado com sucesso como administrador!");
            this.$router.push("HomeAdm")
          }
        } catch (err) {
          console.log(err.response.data.msg);
        }
      } else {
        this.$router.push("/")
      }
    },
  },
  beforeMount() {
    this.loginCheck();
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  max-height: 100vh;
  max-width: 100vw;
}

body {
  margin-bottom: 100px;
}

a {
  text-decoration: none;
  color: black;
}

.hide {
  display: none;
}

.header {
  width: 100%;
  position: relative;
  background-image: url('./images/background.jpg');
  /*background: #FC7138;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;  
  z-index: 9999;
}

.logo{
  margin:  5px;
  width: 150px;
  height: 110px;
  box-shadow: 10px #FC7138;
}

.logo > img{
  width: 100%;
  height: 100%;
}

.menu {
  display: flex;
  width: 90%;
  justify-content: space-between;
}

.menu div {
  margin-left: 10px;
}

.menu div a {
  display: block;
  padding: 10px;
}

.campologin label,
.campologin a {
  margin-left: 5px;
  margin-right: 5px;
}

.navigation-drop-btn {
  background: transparent;
  color: black;
  padding: 6px 15px;
  border-radius: 50px;
  cursor: pointer;
  right: 1vw;
  top: 1vw;
}

.button {
  background: transparent;
  color: black;
  padding: 10px;
  border-radius: 25px;
  cursor: pointer;
  overflow: hidden;
  font-size: 1em;
  margin: 5px;
}

.btnLogin {
  background: transparent;
  color: black;
  padding: 10px;
  border-radius: 25px;
  cursor: pointer;
  overflow: hidden;
  font-size: 1em;
  margin: 0 5px;
  margin-left: 20px;
}

.button:hover,
.btnLogin:hover {
  background: #112434;
  color: #fff;
  border-radius: 25px;
  padding: 10px;
}

.menu div a:hover,
.menu div a.router-link-active,
.campologin a.router-link-active,
.campologin a:hover {
  background: #112434;
  color: #fff;
  padding: 10px;
  border-radius: 50px;
}

.banner img {
  display: block;
  object-fit: cover;
  width: 25%;
  object-position: center;
}

.navigation-drop,
.campologindrop,
.navigation ul {
  display: none;
}

@media (max-width: 768px) {

  .navigation,
  .campologin,
  .logedin,
  .banner {
    display: none;
  }

  .header {
    position: inherit;
    background-image: url('./images/background.jpg');
    display: flex;
    height: 140px;
    justify-content: space-around;
    padding: 10px;
    z-index: 9998;
  }

  html,
  body {
    overflow-x: hidden;
  }

  .dropbtn {
    display: none;
  }

  .navigation-drop .campologin {
    display: block;
  }

  .navigation-drop {
    padding: 1%;
    display: inline-block;

  }

  .navigation-drop-btn {
    background: white;
    color: black;
    padding: 5px;
    border-radius: 50px;
    cursor: pointer;
    overflow: hidden;
    right: 1vw;
    top: 1vw;
    font-size: 1.5em;
    z-index: 9999;
  }

  .dropbtn:checked~.navigation-drop-content {
    -webkit-transform: translate(300px);
    -moz-transform: translate(300px);
    -ms-transform: translate(300px);
    -o-transform: translate(300px);
    transform: translate(300px);
  }

  .navigation-drop-btn:hover,
  .navigation-drop-btn:active {
    background: #112434;
    color: #fff;
    border-radius: 50px;
    padding: 0.4em;
    z-index: 9999;
  }

  .navigation-drop-content {
    width: 300px;
    position: fixed;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(20px);
    border: 5px solid transparent;
    background-clip: padding-box;
    box-shadow: 10px 10px 10px rgba(45, 55, 68, 0.3);
    line-height: 1.5;
    left: -300px;
    -webkit-transition: all 0.25s linear;
    -moz-transition: all 0.25s linear;
    -ms-transition: all 0.25s linear;
    -o-transition: all 0.25s linear;
    transition: all 0.25s linear;
    z-index: 999;
  }

  .navigation-drop .menu {
    display: block;
  }
}


@media (max-width:768px){

  .navigation,
  .campologin,
  .logedin {
    display: none;
  }

  html,
  body {
    overflow-x: hidden;
  }

  .dropbtn {
    display: none;
  }

  .navigation-drop .campologin {
    display: block;
  }

  .navigation-drop {
    padding: 1%;
    display: inline-block;

  }

  .navigation-drop-btn {
    background: transparent;
    color: white;
    padding: 5px;
    border-radius: 50px;
    cursor: pointer;
    overflow: hidden;
    right: 1vw;
    top: 1vw;
    font-size: 1.5em;
    z-index: 9999;
  }

  .dropbtn:checked~.navigation-drop-content {
    -webkit-transform: translate(300px);
    -moz-transform: translate(300px);
    -ms-transform: translate(300px);
    -o-transform: translate(300px);
    transform: translate(300px);
  }

  .navigation-drop-btn:hover,
  .navigation-drop-btn:active {
    background: #ffffff;
    color: #000000;
    border-radius: 50px;
    padding: 0.4em;
    z-index: 9999;
  }

  .navigation-drop-content {
    width: 300px;
    position: fixed;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(20px);
    border: 5px solid transparent;
    background-clip: padding-box;
    box-shadow: 10px 10px 10px rgba(45, 55, 68, 0.3);
    line-height: 1.5;
    left: -300px;
    -webkit-transition: all 0.25s linear;
    -moz-transition: all 0.25s linear;
    -ms-transition: all 0.25s linear;
    -o-transition: all 0.25s linear;
    transition: all 0.25s linear;
    z-index: 998;
  }

  .navigation-drop .menu {
    display: block;
  }
  .logo {
    position: relative;
    left: 0px; /* Ajuste o valor conforme necessário */
  }
}
</style>
