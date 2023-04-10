// Import das funcs do models
import {
  getServicoReserva,
  getServicoByIdReserva,
  insertServicoReserva,
  updateSelectedServicoByIdReserva,
  updateServicoByIdReserva,
  deleteServicoByIdReserva,
} from "../models/servicoReservaModel.js";

// lista todos os servicos
export const showServicoReserva = (req, res) => {
  getServicoReserva((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// lista um servico
export const showServicoByIdReserva = (req, res) => {
  getServicoByIdReserva(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// cria um novo servico
export const createServicoReserva = (req, res) => {
  const data = req.body;
  insertServicoReserva(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// atualiza o servico
export const updateServicoReserva = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateServicoByIdReserva(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// atualiza o selected do servico
export const updateSelectedServicoReserva = (req, res) => {
  const data = req.body;
  // const idReserva = req.params.idReserva;
  // const idServico = req.params.idServico;
  
  updateSelectedServicoByIdReserva(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// updateSelectedServicoByIdReserva;

// Deleta o servico
export const deleteServicoReserva = (req, res) => {
  const id = req.params.id;
  deleteServicoByIdReserva(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
