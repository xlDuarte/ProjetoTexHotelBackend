// importa o db
import db from "../config/database.js";


// lista o usuario a partir do email
export const getUsers = (email, result) => {
  db.query(`SELECT * FROM usuario WHERE emailUsuario = ${db.escape(email)};`,
  [email],
  (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

export const addUsers = (data, hash, result) => {
  console.log(result)
  db.query(`INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario, endUsuario, cpfUsuario, telefoneUsuario) VALUES ('${data.nomeUsuario}', 
  ${db.escape(data.emailUsuario)},${db.escape(hash)}, '${data.endUsuario}','${data.cpfUsuario}','${data.telefoneUsuario}') `, 
    (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};



