// import express
import express from "express";
  
// import das funcs do controller
import { showUsuario, showUsuarioById, createUsuario, deleteUsuario, updateUsuario } from "../controller/usuarios.js";
  
// init express router
const router = express.Router();
  
// rota para listar todos os usuarios
router.get('/usuario', showUsuario);
  
// rota para listar um usuario
router.get('/usuario/:id', showUsuarioById);
  
// rota para criar um usuario
router.post('/usuario', createUsuario);
  
// rota para atualizar um usuario
router.put('/usuario/:id', updateUsuario);
  
// rota para deletar um usuario
router.delete('/usuario/:id', deleteUsuario);
  
// export do router
export default router;