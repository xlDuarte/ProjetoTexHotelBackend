// Import das funcs do models
import {
  getConsumo,
  getConsumoById,
  insertConsumo,
  updateConsumoById,
  deleteConsumoById,
} from "../models/consumoModel.js";

// lista todos os Consumos
export const showConsumo = (req, res) => {
  getConsumo((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// lista um Consumo
export const showConsumoById = (req, res) => {
  getConsumoById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// cria um novo Consumo
export const createConsumo = (req, res) => {
  const data = req.body;
  insertConsumo(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// atualiza o Consumo
export const updateConsumo = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateConsumoById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Deleta o Consumo
export const deleteConsumo = (req, res) => {
  const id = req.params.id;
  deleteConsumoById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
