// importa o db
import db from "../config/database.js";

// lista todos os usuarios
export const getUsuario = (result) => {
  db.query("SELECT * FROM usuario", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// lista um usuario
export const getUsuarioById = (id, result) => {
  db.query(
    "SELECT * FROM usuario WHERE idUsuario = ?",
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

// insere um usuario ao banco
export const insertUsuario = (data, result) => {
  console.log("insertUsuario", data);
  db.query("INSERT INTO usuario SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// atualiza um usuario no banco
export const updateUsuarioById = (data, id, result) => {
  db.query(
    "UPDATE usuario SET nomeUsuario = ?, emailUsuario = ?, cpfUsuario = ?, endUsuario = ?, senhaUsuario = ?, tipoUsuario = ?, telefoneUsuario = ?  WHERE idUsuario = ?",
    [
      data.nomeUsuario,
      data.emailUsuario,
      data.cpfUsuario,
      data.endUsuario,
      data.senhaUsuario,
      data.tipoUsuario,
      data.telefoneUsuario,
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

// deleta um usuario no banco
export const deleteUsuarioById = (id, result) => {
  db.query("DELETE FROM usuario WHERE idUsuario = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
