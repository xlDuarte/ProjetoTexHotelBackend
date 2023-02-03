<!-- Header -->
<template>
  <ModalSenha/>
  <nav>
    <header>
      <div class="navigation-drop">
        <input class="dropbtn" type="checkbox" id="Menu" />
        <label class="navigation-drop-btn" for="Menu">Menu</label>
        <div class="navigation-drop-content">
          <ul>
            <li><a href="" class="active">Home</a></li>
            <li><a href="">Acomodações</a></li>
            <li><a href="">Reservas</a></li>
            <div class="campologindrop">
              <form action="campologin" method="post">
                <label for="login"><strong>USUARIO</strong></label>
                <input class="box1" type="email" name="login" id="logindrop" />
                <label for="password"><strong>SENHA</strong></label>
                <input
                  class="box1"
                  type="password"
                  name="password"
                  id="passworddrop"
                />
                <div><input class="button" type="submit" value="OK" /></div>

                <br />
                <router-link to="/Cadastro">Cadastre-se!</router-link>
                <a class="links" href="">Esqueceu sua senha?</a>
              </form>
            </div>
          </ul>
        </div>
      </div>
      <div id="inicio" class="navigation">
        <div class="pub" v-show="visivel">
          <div><router-link to="/">Home</router-link></div>
          <div><router-link to="/Acomodacoes">Acomodações</router-link></div>
          <div><router-link to="/Reservas">Reservas</router-link></div>
        </div>
        <div class="adm =" v-show="invisivel">
          <div><router-link to="/HomeAdm">Home</router-link></div>
          <div><router-link to="/AcomodacoesAdm">Acomodações</router-link></div>
          <div><router-link to="/ReservasAdm">Reservas</router-link></div>
          <div><router-link to="/ReservasAdm">Consumo</router-link></div>
          <div><router-link to="/ReservasAdm">Avaliações</router-link></div>
        </div>
      </div>
      <div class="campologin">
        <form action="campologin" method="post">
          <label for="login"><strong>USUARIO</strong></label>
          <input class="box1 login" type="email" name="login" id="login" />
          <label for="password"><strong>SENHA</strong></label>
          <input
            class="box1 pswd"
            type="password"
            name="password"
            id="password"
          />
          <input
            class="button btnLogin"
            v-on:click="validate"
            type="button"
            value="OK"
            id="btnLogin"
          />
          <br />          
            <a href=""><router-link to="/Cadastro">Cadastre-se!</router-link></a>
            <a class="" data-bs-toggle="modal" href="#modalSenhaToggle" role="button">Esqueceu sua senha?</a>          
        </form>
      </div>
      <div class="logedin hide">
        <div>
          <p id="user"></p>
          <div>
            <input
              class="button btnExit"
              v-on:click="logOut"
              id="btnExit"
              type="button"
              value="Sair"
            />
          </div>
        </div>
      </div>
    </header>
  </nav>
</template>

<script>
import ModalSenha from '../home/ModalSenha';

export default {
  name: "HeaderComponent",
  components:{
    ModalSenha
  },
  data() {
    return {
      btnLogin: document.getElementById("btnLogin"),
      regexLogin: /[A-Z.A-Z]@[A-Z.A-Z]/gi,
      regexLoginAdm: /[A-Za-z0-9]/gi,
      regexPswd: /[A-Za-z0-9]{8,14}/g,
      loged: localStorage.getItem("loged"),
      logedin: localStorage.getItem("loginStatus"),
      btnExit: document.getElementById("btnExit"),
      visivel: true,
      invisivel: false
    };
  },
  methods: {
    validate() {
      let login = document.getElementById("login").value;
      let pswd = document.getElementById("password").value;

      if (login != "" && pswd != "") {
        if (login.match(this.regexLogin) && pswd.match(this.regexPswd)) {
          let logedOn = 1;
          localStorage.setItem("loged", login);
          localStorage.setItem("loginStatus", logedOn);
          //this.logedin = localStorage.getItem("logedin");
          this.logedin = localStorage.getItem("loginStatus");
          alert("Logado com sucesso!");
          this.showHide(".logedin", "remove");
          this.showHide(".campologin", "add");
          document.getElementById(
            "user"
          ).innerText = `Olá ${localStorage.getItem("loged")}`;
          location.reload();
        } else if (
          login.match(this.regexLoginAdm) &&
          pswd.match(this.regexPswd)
        ) {
          let logedOn = 1;
          localStorage.setItem("loged", login);
          localStorage.setItem("loginStatus", logedOn);
          document.getElementById(
            "user"
          ).innerText = `Olá ${localStorage.getItem("loged")}`;
          // this.logedin = localStorage.getItem("logedin");
          this.logedin = localStorage.getItem("loginStatus");
          alert("Logado com sucesso como administrador!");
          this.$router.push("HomeAdm")
          this.showHide(".logedin", "remove");
          this.showHide(".campologin", "add");
          this.invisivel = true,
          this.visivel = false
        } else {
          alert("Usuario ou senha incorretos");
        }
      } else {
        alert("È preciso preencher os campos de login e senha");
      }
    },

    showHide(obj, action) {
      document.querySelector(obj).classList[action]("hide");
    },


    logOut() {
      let logedOut = 0;
      this.showHide(".campologin", "remove");
      this.showHide(".logedin", "add");
      this.invisivel = false,
      this.visivel = true
      localStorage.setItem("loginStatus", logedOut);
      localStorage.removeItem("loged");
      document.getElementById("login").value = "";
      document.getElementById("password").value = "";
      this.logedin = localStorage.getItem("logedOut");
      this.$router.push("/")
    },

    loginCheck() {
      //  if (this.logedin == 1) {
      if (localStorage.getItem("loginStatus") === 1) {
        this.showHide(".campologin", "add");
        this.showHide(".logedin", "remove");
        console.log("ok");
        document.getElementById("user").innerText = `Olá ${localStorage.getItem(
          "loged"
        )}`;
      }
    },
  },
  mounted() {
    // this.loginCheck();
    // verifica se usuario esta logado para ativar botão "Minhas Reservas"
    if (localStorage.getItem("loginStatus") === "1") {
      this.showHide(".campologin", "add");
      this.showHide(".logedin", "remove");
      console.log("ok");
      document.getElementById("user").innerText = `Olá ${localStorage.getItem(
        "loged"
      )}`;
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  overflow-x: hidden;
  background: #fff;
  min-height: 100vh;
}

header {
  position: absolute;
  margin-top: 0.5em;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.2, 1, 0.2, 1) ease;
}

.navigation-drop,
.navigation ul {
  display: none;
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

.campologin,
.campologindrop,
.logedin {
  padding: 5px 0;
  margin: 0 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  transition: all 0.3s ease;
  flex-wrap: wrap;
}

.campologin label {
  margin-right: 5px;
  margin-left: 5px;
}

.campologin a {
  text-decoration: none;
  color: #112434;
}

.campologin a:hover,
.campologin a.active {
  background: #112434;
  color: #fff;
  border-radius: 50px;
}

.button {
  background: transparent;
  color: black;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  font-size: 1em;
}

.button:hover {
  background: #112434;
  color: #fff;
  border-radius: 50px;
  padding: 10px;
}

.links {
  text-decoration: none;
  color: black;
  padding: 0.4em;
}

.navigation {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1% 0;
  margin: 0 20px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.navigation div {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 20px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}



.navigation div a {
  text-decoration: none;
  color: #112434;
}

.navigation div a:hover,
.navigation div a.router-link-active,
.campologin a.router-link-active,
.campologin a:hover {
  background: #112434;
  color: #fff;
  padding: 0.5em;
  border-radius: 50px;
}

.hide {
  display: none;
}
</style>
