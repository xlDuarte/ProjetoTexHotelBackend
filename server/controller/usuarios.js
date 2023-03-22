// Import das funcs do models
import {
  getUsuario,
  getUsuarioById,
  insertUsuario,
  updateUsuarioById,
  deleteUsuarioById,
} from "../models/usuarioModel.js";

// lista todos os usuarios
export const showUsuario = (req, res) => {
  getUsuario((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// lista um usuario
export const showUsuarioById = (req, res) => {
  getUsuarioById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// cria um novo usuario
export const createUsuario = (req, res) => {
  const data = req.body;
  insertUsuario(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// atualiza o usuario
export const updateUsuario = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateUsuarioById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Deleta o usuario
export const deleteUsuario = (req, res) => {
  const id = req.params.id;
  deleteUsuarioById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
