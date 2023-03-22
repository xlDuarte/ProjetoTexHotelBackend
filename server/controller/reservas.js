// Import das funcoes do models
import {
  getReserva,
  getReservaById,
  insertReserva,
  updateReservaById,
  deleteReservaById,
} from "../models/reservaModel.js";

// lista todas as reervas
export const showReserva = (req, res) => {
  getReserva((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// lista uma reserva
export const showReservaById = (req, res) => {
  getReservaById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// cria uma novo reserva
export const createReserva = (req, res) => {
  const data = req.body;
  insertReserva(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// atualiza a reserva
export const updateReserva = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateReservaById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Deleta a reserva
export const deleteReserva = (req, res) => {
  const id = req.params.id;
  deleteReservaById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
