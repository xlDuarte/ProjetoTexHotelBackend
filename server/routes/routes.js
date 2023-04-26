// import express
import express from "express";
import checkTokenAdm from "../middleware/auth.check.adm.js";
import checkToken from "../middleware/auth.check.js";

// import das funcs do controller
//import Usuarios
import {
  showUsuario,
  showUsuarioById,
  showUsuarioCliente,
  deleteUsuario,
  updateUsuario,
} from "../controller/usuarios.js";

//import Serviços
import {
  showServico,
  showServicoAdm,
  showServicoById,
  createServico,
  deleteServico,
  updateServico,
} from "../controller/servicos.js";

//import Serviços_Reservas
import {
  showServicoReserva,
  showServicoByIdReserva,
  createServicoReserva,
  deleteServicoReserva,
  updateServicoReserva,
  updateSelectedServicoReserva,
} from "../controller/servicosReservas.js";

//import Login
import { 
  userLogin,
  userSignin,
  userSignup,
  logOut,
  resetPassword, 
  updatePassword,
} from "../controller/autentication.js";

//import Acomodações
import {
  showAcomodacao,
  showAcomodacaoById,
  createAcomodacao,
  deleteAcomodacao,
  updateAcomodacao,
} from "../controller/acomodacao.js";

//import Consumo
import {
  showConsumo,
  showConsumoById,
  createConsumo,
  deleteConsumo,
  updateConsumo,
  showlocalConsumoById,
  showProdutoById,
  showValorProdutoById,
} from "../controller/consumo.js";

//import Reservas
import {
  showReserva,
  showReservaById,
  createReserva,
  ultimoIdReserva,
  deleteReserva,
  updateReserva,
  showReservaByUsuarioId,
} from "../controller/reservas.js";

import { 
  createComentario,
  showComentarios 
} from "../controller/comentarios.js";
// init express router
const router = express.Router();

//Login e Autenticação
// rota para captura do login
router.post('/login', userLogin);

//rota para deslogar e destruir seção
router.get('/logout', logOut);

//rota para registrar o usuario
router.post('/register', userSignup);

//rota para checar se logdado
router.get('/get-user', userSignin);

router.post('/resetpwd-email', resetPassword);

router.post('/resetpwd/:token', updatePassword);

//Usuarios
// rota para listar todos os usuarios
router.get("/usuario", showUsuario);

// rota para listar todos os usuarios tipo cliente
router.get("/usuario/cliente", showUsuarioCliente);

// rota para listar um usuario
router.get("/usuario/:id", showUsuarioById);

// rota para atualizar um usuario
router.put("/usuario/:id", updateUsuario);

// rota para deletar um usuario
router.delete("/usuario/:id", deleteUsuario);

// Servicos
// rota para listar todos os servicos
router.get("/servico", showServico);

// rota para listar todos os servicos - adm
router.get("/servicoAdm", showServicoAdm);

// rota para listar um servico
router.get("/servico/:id", showServicoById);

// rota para criar um servico
router.post("/servico", createServico);

// rota para atualizar um servico
router.put("/servico/:id", updateServico);

// rota para deletar um servico
router.delete("/servico/:id", deleteServico);

// Servicos x Reservas
// rota para listar todos os servicos selecionados por reserva
router.get("/servicoReserva", showServicoReserva);

// rota para listar um servico
router.get("/servicoReserva/:id", showServicoByIdReserva);

// rota para criar um servico
router.post("/servicoReserva", createServicoReserva);

// rota para atualizar um servico
router.put("/servicoReserva/:id", updateServicoReserva);

// rota para atualizar o campo selected de servico
router.put("/servicoReservaSelected/", updateSelectedServicoReserva);

// rota para deletar um servico
router.delete("/servicoReserva/:id", deleteServicoReserva);

// Consumos
// rota para listar todos os Consumos
router.get("/Consumo", checkTokenAdm, showConsumo);

// rota para listar um Consumo
router.get("/Consumo/:id", checkTokenAdm, showConsumoById);

// rota para listar um local de consumo
router.get("/localConsumo/:id", checkTokenAdm, showlocalConsumoById);

// rota para listar um produto
router.get("/produto/:id", checkTokenAdm, showProdutoById);

// rota para listar um valor do produto
router.get("/valorProduto/:id", checkTokenAdm, showValorProdutoById);

// rota para criar um Consumo
router.post("/Consumo", checkTokenAdm, createConsumo);

// rota para atualizar um Consumo
router.put("/Consumo/:id", checkTokenAdm, updateConsumo);

// rota para deletar um Consumo
router.delete("/Consumo/:id", checkTokenAdm, deleteConsumo);

// Reservas
// rota para listar todas as reservas
router.get("/reserva", showReserva);

// rota para listar uma reserva
router.get("/reserva/:id", showReservaById);

// rota para listar reservas de um usuario
router.get("/reservaUsuario/:id", showReservaByUsuarioId);    

// rota para criar uma reserva
router.post("/reserva", createReserva);

// rota para obter ultimo idReserva criado, para utilizar na persistencia dos serviços
router.post("/reserva/ultima",  ultimoIdReserva);

// rota para atualizar uma reserva
router.put("/reserva/:id", updateReserva);

// rota para deletar uma reserva
// router.delete("/reserva/:id", deleteReserva);
// reservas não serao mais excluidas, mudar somente o status...
router.delete("/reserva/:id", deleteReserva);

// Acomodações
// rota para listar todas as acomodacoes
router.get("/acomodacao", showAcomodacao);

// rota para listar uma acomodacao
router.get("/acomodacao/:id", showAcomodacaoById);

// rota para criar uma aomodacao
router.post("/acomodacao", createAcomodacao);

// rota para atualizar uma aomodacao
router.put("/acomodacao/:id", updateAcomodacao);

// rota para deletar uma acomodacao
router.delete("/acomodacao/:id", deleteAcomodacao);

router.get("/comentarios", showComentarios);

router.post("/novoComentario", createComentario)

// export do router
export default router;
