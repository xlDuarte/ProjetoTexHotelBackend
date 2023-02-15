// importa o db
import db from "../config/database.js";

// lista o usuario a partir do email e senha
export const getLogin = (email, senha, result) => {
  db.query("SELECT idUsuario, nomeUsuario, tipoUsuario FROM usuario WHERE emailUsuario = ? and senhaUsuario = ?",
  [email, senha],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};
