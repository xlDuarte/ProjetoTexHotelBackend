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
import{
  showLogin
} from "../controller/logins.js";
//import Acomodações

//import Consumo
import {
  showConsumo,
  showConsumoById,
  createConsumo,
  deleteConsumo,
  updateConsumo,
} from "../controller/consumo.js";

//import Reservas

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

// Consumos
// rota para listar todos os Consumos
router.get("/Consumo", showConsumo);

// rota para listar um Consumo
router.get("/Consumo/:id", showConsumoById);

// rota para criar um Consumo
router.post("/Consumo", createConsumo);

// rota para atualizar um Consumo
router.put("/Consumo/:id", updateConsumo);

// rota para deletar um Consumo
router.delete("/Consumo/:id", deleteConsumo);

// export do router
export default router;
