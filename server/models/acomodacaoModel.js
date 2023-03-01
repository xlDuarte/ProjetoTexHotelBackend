// importa o db
import db from "../config/database.js";

// lista todos os Acomodacao
export const getAcomodacao = (result) => {
  db.query("SELECT * FROM acomodacoes", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// lista um Acomodacao
export const getAcomodacaoById = (id, result) => {
  db.query(
    "SELECT * FROM acomodacoes WHERE idAcomodacao = ?",
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

// insere um Acomodacao ao banco
export const insertAcomodacao = (data, result) => {
  console.log("insertAcomodacao", data);
  db.query("INSERT INTO acomodacoes SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// atualiza um Acomodacao no banco
export const updateAcomodacaoById = (data, id, result) => {
  db.query(
    "UPDATE acomodacoes SET nomeAcomodacao = ?, descricaoAcomodacao = ?, valorAcomodacao = ?, tipoAcomodacao = ? WHERE idAcomodacao = ?",
    [
      data.nomeAcomodacao,
      data.descricaoAcomodacao,
      data.valorAcomodacao,
      data.tipoAcomodacao,      
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

// deleta um Acomodacao no banco
export const deleteAcomodacaoById = (id, result) => {
  db.query("DELETE FROM acomodacoes WHERE idAcomodacao = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
