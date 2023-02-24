// import express
import express from "express";

// import das funcs do controller
//import Usuarios
import {
  showUsuario,
  showUsuarioById,
  createUsuario,
  deleteUsuario,
  updateUsuario,
} from "../controller/usuarios.js";

//import Serviços
import {
  showServico,
  showServicoById,
  createServico,
  deleteServico,
  updateServico,
} from "../controller/servicos.js";

//import Login
import { showLogin } from "../controller/logins.js";

//import Acomodações
import {
  showAcomodacao,
  showAcomodacaoById,
  createAcomodacao,
  deleteAcomodacao,
  updateAcomodacao,
} from "../controller/acomodacao.js";

//import Consumo

//import Reservas
import {
  showReserva,
  showReservaById,
  createReserva,
  deleteReserva,
  updateReserva,
} from "../controller/reservas.js";

// init express router
const router = express.Router();

// rota para captura do login
router.get("/login", showLogin);

// rota para listar todos os usuarios
router.get("/usuario", showUsuario);

// rota para listar um usuario
router.get("/usuario/:id", showUsuarioById);

// rota para criar um usuario
router.post("/usuario", createUsuario);

// rota para atualizar um usuario
router.put("/usuario/:id", updateUsuario);

// rota para deletar um usuario
router.delete("/usuario/:id", deleteUsuario);

// Servicos
// rota para listar todos os servicos
router.get("/servico", showServico);

// rota para listar um servico
router.get("/servico/:id", showServicoById);

// rota para criar um servico
router.post("/servico", createServico);

// rota para atualizar um servico
router.put("/servico/:id", updateServico);

// rota para deletar um servico
router.delete("/servico/:id", deleteServico);

// Reservas
// rota para listar todas as reservas
router.get("/reserva", showReserva);

// rota para listar uma reserva
router.get("/reserva/:id", showReservaById);

// rota para criar uma reserva
router.post("/reserva", createReserva);

// rota para atualizar uma reserva
router.put("/reserva/:id", updateReserva);

// rota para deletar uma reserva
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

// export do router
export default router;
