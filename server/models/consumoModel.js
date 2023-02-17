// importa o db
import db from "../config/database.js";

// lista todos os Consumo
export const getConsumo = (result) => {
  db.query("SELECT * FROM consumo", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// lista um Consumo
export const getConsumoById = (id, result) => {
  db.query(
    "SELECT * FROM consumo WHERE idConsumo = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

// insere um Consumo ao banco
export const insertConsumo = (data, result) => {
  console.log("insertConsumo", data);
  db.query("INSERT INTO consumo SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// atualiza um Consumo no banco
export const updateConsumoById = (data, id, result) => {
  db.query(
    "UPDATE Consumo SET dataConsumo = ?, qtdConsumo = ?, Reservas_idReservas = ?, produtos_idprodutos = ?, localConsumo_idLocalConsumo=?  WHERE idConsumo = ?",
    [
      data.dataConsumo,
      data.nomeConsumo,
      data.qtdConsumo,
      data.Reservas_idReservas,
      data.produtos_idprodutos,
      data.localConsumo_idLocalConsumo,
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

// deleta um Consumo no banco
export const deleteConsumoById = (id, result) => {
  db.query("DELETE FROM consumo WHERE idConsumo = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
