<template>
    <div class="sec">
        <form style="max-width:500px;margin:auto">
            <center>
                <img src="@/assets/images/footer/logo_hotel.png">
            </center>
            <!-- Title  -->
            <center>
                <h2><span class=""></span>Cadastrar nova senha <span class=""></span></h2>
            </center>
            <div class="input-container">
                <input class="input-field" id="password-1" type="password" placeholder="Digite sua senha" name="password"
                    v-model="pwd1" @input=validate()>
            </div>
            <span id="pwd-length-1"></span>
            <div class="input-container">
                <input class="input-field" id="password-2" type="password" placeholder="Confirme sua senha"
                    name="confirmPassword" @input=validate()>
            </div>
            <!-- Length  -->
            <span id="pwd-length-2"></span>
            <!-- Validation Message - 1  -->
            <span id="message"></span>
            <center>
                <button class="btn" id="formSubmit" type="button" @click="updateSenha" disabled>Resetar Senha!</button>
            </center>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    name: 'NovaSenha',
    data() {
        return {
            pwd1: "",
            pwd2: "",
            token: "",
        }
    },

    methods: {
        check() {
            if (document.getElementById('password-1').value == document.getElementById('password-2').value) {
                document.getElementById("formSubmit").disabled = false;
                document.getElementById('message').style.color = 'green';
                document.getElementById('message').innerHTML = 'Tudo certo!';
            } else {
                document.getElementById("formSubmit").disabled = true;
                document.getElementById('message').style.color = 'red';
                document.getElementById('message').innerHTML = 'As senhas não são iguais';
            }
        },
        validate() {
            if (document.getElementById('password-1').value.length < 7) {
                document.getElementById('pwd-length-1').innerHTML = 'Minimo de 8 caracteres';
            } else {
                document.getElementById('pwd-length-1').innerHTML = '';
                this.check();
            }
            if (document.getElementById('password-2').value.length < 7) {
                document.getElementById('pwd-length-2').innerHTML = 'Minimo de 8 caracteres';
            } else {
                document.getElementById('pwd-length-2').innerHTML = '';
                this.check();
            }
        },
        async updateSenha() {
            try {
                const response = await axios.post(`http://localhost:5000/resetpwd/${this.$route.params.token}`, {
                    token: this.token,
                    senhaUsuario: this.pwd1
                });
                console.log("response", response)
                alert("sucesso!")
                window.location.href = "/"
            } catch (err) {
                alert(err)
                console.log("err", err);
            }
        }
    },
}
</script>
<style scoped>
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

.input-container {
    display: -ms-flexbox;
    /* IE10 */
    display: flex;
    width: 100%;
    margin-bottom: 15px;
}

.input-field {
    width: 100%;
    padding: 10px;
    outline: none;
}

.input-field:focus {
    border: 2px solid dodgerblue;
}

/* Set a style for the submit button */
.btn {
    background: transparent;
    color: black;
    padding: 0.4em;
    border-radius: 50px;
    cursor: pointer;
    overflow: hidden;
    font-size: 1.5em;
    margin-top: 10px;
}

.btn:hover {
    background: #112434;
    color: #fff;
    border-radius: 50px;
    padding: 0.4em;
}
</style>