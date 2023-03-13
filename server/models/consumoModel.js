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
    "UPDATE consumo SET Reservas_idReservas = ?,localConsumo_idLocalConsumo=?,  produtos_idprodutos = ?, qtdConsumo = ?, dataConsumo = ? WHERE idConsumo = ?",
    [
      data.Reservas_idReservas,
      data.localConsumo_idLocalConsumo,
      data.produtos_idprodutos,
      data.qtdConsumo,
      data.dataConsumo,
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

export const getlocalConsumoById = (id, result) => {
  db.query(
    "SELECT nomeLocalConsumo FROM localconsumo WHERE idLocalConsumo = ?",
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

export const getProdutoById = (id, result) => {
  db.query(
    "SELECT nomeProdutos FROM produtos WHERE idProdutos = ?",
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

export const getValorProdutoById = (id, result) => {
  db.query(
    "SELECT valorProdutos FROM produtos WHERE idProdutos = ?",
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