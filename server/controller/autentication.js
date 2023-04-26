import db from "../config/database.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import randtoken from "rand-token";
import jwt from "jsonwebtoken"

let jwtToken;
//send email
function sendEmail(email, token) {
  var email = email;
  var token = token;
  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hotelcasanapraiatex@gmail.com", // Your email id
      pass: "jpvuggoqkozqnagy", // Your password
    },
  });
  var mailOptions = {
    from: "hotelcasanapraiatex@gmail.com",
    to: email,
    subject: "Recuperação de senha - hotelcasanapraiatex.com.br",
    html:
      'Você solicitou a troca de senha. Por favor use este <a href="http://localhost:8080/#/resetpwd/' +
      token +
      '">LINK</a> para resetar sua senha.',
  };
  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(0);
    }
  });
}

/* send reset password link in email */
export const resetPassword = (req, res) => {
  var email = req.body.emailUsuario;
  db.query(
    'SELECT * FROM usuario WHERE emailUsuario = ?',
    [email],
    function (err, result) {
      if (err) throw err;
      var type = "";
      var msg = "";
      console.log("teste", result[0]);
      if (result[0].emailUsuario.length > 0) {
        var token = randtoken.generate(20);
        var sent = sendEmail(email, token);
        if (sent != "0") {
          var data = {
            token: token,
          };
          db.query(
            'UPDATE usuario SET ? WHERE emailUsuario = ?',
            [
              data,
              email
            ],
            function (err, result) {
              if (err) throw err;
            }
          );
          return res.status(201).send({
            msg: "Link para resetar a senha foi enviado para seu email",
          });
        } else {
          return res.status(500).send({
            msg: "Algo deu errado",
          });
        }
      } else {
        console.log("2");
        return res.status(401).send({
          msg: "Usuario não registrado conosco!",
        });
      }
    }
  );
};

/* update password to database */
export const updatePassword = (req, res, next) => {
  var token = req.params.token;
  var password = req.body.senhaUsuario;
  console.log(req.params.token);
  db.query(
    'SELECT * FROM usuario WHERE token = ?',
    [token],
    function (err, result) {
      if (err) return res.status(500).send({
        msg: err,
      });
      var type;
      var msg;
      if (result.length > 0) {
        var saltRounds = 10;
        // var hash = bcrypt.hash(password, saltRounds);
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            var data = {
              senhaUsuario: hash,
            };
            db.query(
              'UPDATE usuario SET ? WHERE emailUsuario = ?',
              [
                data,
                result[0].emailUsuario
              ],
              function (err, result) {
                if(err)
                  return res.status(500).send({
                  msg: err,
                });
              }
            );
          });
        });
        return res.status(200).send({
          msg: "Senha atualizada com sucesso",
        });
      } else {
        console.log(password);
        console.log("2", msg);
        return res.status(401).send({
          msg: "Link Invalido!",
        });
      }
    }
  );
};

export const userSignup = (req, res, next) => {
  db.query(
    `SELECT * FROM usuario WHERE emailUsuario = ?`,
    [req.body.emailUsuario],
    (err, result) => {
      if (err) {
        return res.status(500).send({
          msg: "algo deu errado!",
        });
      } else if (result.length) {
        console.log(result[0]);
        return res.status(409).send({
          msg: "Email já cadastrado!",
        });
      } else {
        db.query(
          `SELECT * FROM usuario WHERE cpfUsuario = ?`,
          [req.body.cpfUsuario],
          (err, result) => {
            if (err) {
              return res.status(500).send({
                msg: "algo deu errado!",
              });
            } else if (result.length) {
              console.log(result[0]);
              return res.status(409).send({
                msg: "CPF já cadastrado!",
              });
            } else {
              // se o email estiver disponivel
              var token = randtoken.generate(20)              
              bcrypt.hash(req.body.senhaUsuario, 10, (err, hash) => {
                if (err) {
                  return res.status(500).send({
                    msg: "algo deu errado!",
                  });
                } else {
                  // encripta o password => adiciona ao db
                  db.query(
                    `INSERT INTO usuario SET nomeUsuario = ?, emailUsuario = ?, cpfUsuario = ?, endUsuario = ?, senhaUsuario = ?, telefoneUsuario = ?, token = ?`,
                    [
                      req.body.nomeUsuario,
                      req.body.emailUsuario,
                      req.body.cpfUsuario,
                      req.body.endUsuario,
                      hash,
                      req.body.telefoneUsuario,
                      token
                    ],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                        //throw err;
                        return res.status(400).send({
                          msg: err,
                        });
                      }
                      return res.status(201).send({
                        msg: "Usuario registrado com sucesso!",
                      });
                    }
                  );
                }
              });
            }
          }
        );
      }
    }
  );
};

export const userLogin = (req, res, next) => {
  db.query(
    `SELECT * FROM usuario WHERE emailUsuario = ?`,
    [req.body.emailUsuario],
    (err, result) => {
      // se o usuario nao existir
      if (err) {
        //throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Usuario não existe",
        });
      }
      // checa o password
      bcrypt.compare(
        req.body.senhaUsuario,
        result[0]["senhaUsuario"],
        (bErr, bResult) => {
          if (bErr) {
            //throw bErr;
            return res.status(401).send({
              msg: "Algo deu errado",
            });
          }
          if (bResult) {
            jwtToken = jwt.sign({id:result[0].idUsuario, role:result[0].tipoUsuario},'the-super-strong-secrect',{ expiresIn: '2h' });
            console.log(jwtToken);
            console.log(result[0])
            db.query(
              `UPDATE usuario SET ultimoLogin = now() WHERE idUsuario = ?`,
              [result[0].idUsuario]
            );
            return res.status(200).send({
              msg: "Logado!",
              jwtToken,
              data: result[0],
            });
          }
          // se a senha estiver errada
          return res.status(401).send({
            msg: "Senha incorreta",
          });
        }
      );
    }
  );
};

export const userSignin = (req, res) => {
  console.log("signupValidation", jwtToken);
  let jToken = jwtToken
  const decoded = jwt.verify(jToken, 'the-super-strong-secrect');
  if(decoded) {
    db.query(
      "SELECT * FROM usuario where idUsuario=?",
      decoded.id,
      (err, results) => {
        if (err) {
          return res.status(400).send({
            msg: err,
          });
        }
        return res.send({ data: results[0], msg: "Logado!" });
      }
    );
  } else{
    return res.status(422).json({
      msg: "sessão expirou! Faça login novamente.",
    });
  }
};

export const logOut = (req, res) => {
  req.session.destroy();
  jwtToken = null
  res.json({ data: !req.session });
};
