// importa o db
import db from "../config/database.js";

// lista todos os servicos de todas as reservas...não utilizado
export const getServicoReserva = (result) => {
  db.query(
    "SELECT * FROM hotelcnp.Reservas_has_servicos ORDER BY Reservas_idReservas ASC",
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// lista servicos de uma reserva
export const getServicoByIdReserva = (id, result) => {
  console.log("Executando getServicoByIdReserva...");
  db.query(
    "SELECT * FROM Reservas_has_servicos WHERE Reservas_idReservas = ? ORDER BY servicos_idservicos",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// insere um servico ao banco
export const insertServicoReserva = (data, result) => {
  console.log("Executando insertServicoReserva...", data);
  db.query(
    "INSERT INTO Reservas_has_servicos SET ?",
    [data],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// atualiza um servico no banco
export const updateSelectedServicoByIdReserva = (data, idReserva,idServico, result) => {
  db.query(
    "UPDATE Reservas_has_servicos SET isSelected = ? WHERE Reservas_idReservas = ? AND servicos_idservicos = ?",
    [
      data.isSelected,
      idReserva,
      idServico,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// atualiza um servico no banco
export const updateServicoByIdReserva = (data, id, result) => {
  db.query(
    "UPDATE Reservas_has_servicos SET nomeServico = ?, vlrDiariaServico = ?, descricaoServico = ? WHERE Reservas_idReservas = ? AND servicos_idservicos = ?",
    [
      data.nomeServico,
      data.vlrDiariaServico,
      data.descricaoServico,
      data.labelServico,
      id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// deleta um servicos no banco
export const deleteServicoByIdReserva = (id, result) => {
  console.log("Executando deleteServicoByIdReserva...");
  db.query(
    "DELETE FROM Reservas_has_servicos WHERE Reservas_idReservas = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
  //console.log("Executando deleteServicoByIdReserva...",result);  
};
