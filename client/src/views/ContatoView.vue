<template>
    <div class="contato">
        <section class="sec">
            <h2>Fale Conosco!</h2>
            <form action="" method="post">
                <fieldset class="formularios">
                    <p>Fale conosco através de nossas redes sociais, telefone, ou preencha o formulário abaixo.</p>
                    <hr />
                    <br />
                    <label for="nome_mensagem">Nome:</label>
                    <input type="name" id="nome_mensagem" placeholder="JOSE DA SILVA - MATRICULA 999.9999" />
                    <br>
                    <label for="email_mensagem">E-mail:</label>
                    <input type="email" id="email_mensagem" placeholder="josedasilva@casanapraia.com.br" />
                    <br>
                    <label for="telefone_mensagem">Tel:</label>
                    <input type="telefone" id="telefone_mensagem" placeholder="Seu telefone aqui" required />
                    <br>
                    <label for="faleRhObs">Sua mensagem para nós!</label>
                    <br />
                    <textarea name="faleRhObs" id="faleRhObs" cols="30" rows="10"></textarea>
                    <br>
                    <button>Enviar</button>
                    <hr />
                    <br>
                </fieldset>
                <br>
            </form>
        </section>
    </div>
</template>


<script>
export default {
    name: 'ContatoView',
    components: {

    }
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
    background: #112434;
    transition: all 0.3s ease;
}

.sec h2 {
    font-size: 3em;
    color: #fff;
    margin-bottom: 1em;
}

.sec h3 {
    color: #fff;
    margin-bottom: 1em;
}

.sec h4 {
    color: #fff;
    margin-bottom: 1em;
}

.sec q {
    color: #fff;
}

.sec p {
    font-size: 1em;
    color: #fff;
    font-weight: 300;
}

.sec img,
.sec iframe {
    width: 35vw;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
}

.formularios {
    background-color: #112434;
    color: #fff;
    padding: 10px;
    font-size: 1.25rem;
}

.formularios li {
    list-style-type: none;
}
</style>