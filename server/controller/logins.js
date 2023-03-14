import bcrypt from "bcrypt"
//import jwt from "jsonwebtoken"
import db from "../config/database.js";

let sessionUser
let userId
export const registerValidation = (req, res, next) => {
    db.query(
        `SELECT * FROM usuario WHERE emailUsuario = ?`,
        [req.body.emailUsuario],
        (err, result) => {
            if(err){
                return res.status(500).send({
                    msg: 'algo deu errado!'
                });
            } else if (result.length) {
                console.log(result[0])
                return res.status(409).send({
                    msg: 'Email já cadastrado!'
                });
            } else {
                db.query(
                    `SELECT * FROM usuario WHERE cpfUsuario = ?`,
                    [req.body.cpfUsuario],
                    (err, result) => {
                        if(err){
                            return res.status(500).send({
                                msg: 'algo deu errado!'
                            });
                        } else if (result.length) {
                            console.log(result[0])
                            return res.status(409).send({
                                msg: 'CPF já cadastrado!'
                            });
                        } else {
                        // se o email estiver disponivel
                        bcrypt.hash(req.body.senhaUsuario, 10, (err, hash) => {
                            if (err) {
                                return res.status(500).send({
                                    msg: 'algo deu errado!'
                                });
                            } else {
                                // encripta o password => adiciona ao db
                                db.query(
                                    `INSERT INTO usuario SET nomeUsuario = ?, emailUsuario = ?, cpfUsuario = ?, endUsuario = ?, senhaUsuario = ?, telefoneUsuario = ?`,
                                    [
                                        req.body.nomeUsuario,
                                        req.body.emailUsuario,
                                        req.body.cpfUsuario,
                                        req.body.endUsuario,
                                        hash,
                                        req.body.telefoneUsuario
                                    ],
                                    (err, result) => {
                                        if (err) {
                                            console.log(err)
                                            //throw err;
                                            return res.status(400).send({
                                                msg: err
                                            });
                                        }
                                        return res.status(201).send({
                                            msg: 'Usuario registrado com sucesso!'
                                        });
                                    }
                                );
                            }
                        });    
                    }
                        
                }); 
            }
        }
    );
};

export const loginValidation = (req, res, next) => {
    db.query(
        `SELECT * FROM usuario WHERE emailUsuario = ?`,[req.body.emailUsuario],
        (err, result) => {
            // se o usuario nao existir
            if (err) {
                //throw err;
                return res.status(400).send({
                    msg: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                    msg: 'Usuario não existe'
                });
            }
            // checa o password
            bcrypt.compare(
                req.body.senhaUsuario,
                result[0]['senhaUsuario'],
                (bErr, bResult) => {
                    if (bErr) {
                        //throw bErr;
                        return res.status(401).send({
                            msg: 'Algo deu errado'
                        });
                    }
                    if (bResult) {
                        //const token = jwt.sign({id:result[0].idUsuario},'the-super-strong-secrect',{ expiresIn: '1h' });
                        sessionUser = req.session
                        userId = result[0].idUsuario
                        console.log(sessionUser)
                        db.query(
                            `UPDATE usuario SET ultimoLogin = now() WHERE idUsuario = ?`,[result[0].idUsuario]
                            );                        
                            return res.status(200).send({
                                msg: 'Logado!',
                                sessionUser,
                                data: result[0]})
                                
                    }
                    // se a senha estiver errada
                    return res.status(401).send({
                        msg: 'Senha incorreta'
                    });
                }
            );
       
        }
    );
};

export const signupValidation = (req,res)=>{
    sessionUser = req.session
    console.log("signupValidation", userId)
    if(sessionUser){        
        db.query('SELECT * FROM usuario where idUsuario=?', userId, (err, results) => {
            if (err){
                return res.status(400).send({
                    msg: err
                });
            }
            return res.send({data: results[0], msg: 'Logado!' });
        });
    } else{
        return res.status(422).json({
            msg: "sessão expirou! Faça login novamente.",
        });
    }
};

export const logOut = (req,res)=>{
    req.session.destroy()
    sessionUser = req.session
    userId = ""
    res.json({data: !sessionUser}) 
}

/*Validação com JWT
export const signupValidation = (req,res)=>{
    console.log(req.headers)
    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[0]
    ){
        return res.status(422).json({
            message: "Please provide the token",
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'the-super-strong-secrect');
    db.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
    });
};*/



/* Import das funcs do models
import { getUsers} from "../models/loginModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator";
import db from "../config/database.js";
// lista um usuario

export const loginUser = (req, res, next) => {
    const email = req.body.emailUsuario    
    const senha = req.body.senhaUsuario    
    console.log("Login", email)
    getUsers(email, loginValidation, (err, result)=>{
        console.log(result)
            // user does not exists
            if (err) {
                //throw err;
                return res.status(400).send({
                    msg: err
                });
                /*}if(!result.length) {
                return res.status(401).send({
                    msg: 'Email or password is incorrect!'
                });
            }
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(senha, 10)
            console.log(result[0])
            
            // check password
            bcrypt.compareSync(                
                bcrypt.hashSync(senha, 10),
                result[0]['senhaUsuario'],
                (bErr, bResult) => {
                    console.log(bResult)
                    // wrong password
                    if (bErr) {
                        //throw bErr;
                        return res.status(401).send({
                            msg: 'Email or password is incorrect!'
                        });
                    }
                    if (bResult) {
                        //const token = jwt.sign({id:result[0].idUsuario},'the-super-strong-secrect',{ expiresIn: '1h' });
                        //db.query(
                        //    `UPDATE usuario SET last_login = now() WHERE idUsuario = '${result[0].idUsuario}'`
                        //);
                        return res.status(200).send({
                            msg: 'Logged in!',
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(401).send({
                        msg: 'Username or password is incorrect!'
                    });
                }
            );
        }
    );
}

export const registerUser = (req, res, next)=>{
    const email = req.body.emailUsuario
    const senha = req.body.senhaUsuario
    console.log("regUser", email)
    getUsers(email, (err, result)=>{
        if (result.length) {
            return res.status(409).send({
                msg: 'This user is already in use!'
            });
        } else {
            // username is available
            bcrypt.hash(senha, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send({
                        msg: err
                    });
                } else {
                    const data = req.body
                    db.query(
                        `INSERT INTO usuario (nomeUsuario, emailUsuario, senhaUsuario, endUsuario, cpfUsuario, telefoneUsuario) VALUES (
                            '${data.nomeUsuario}',${db.escape(data.emailUsuario)},${db.escape(hash)}, '${data.endUsuario}','${data.cpfUsuario}','${data.telefoneUsuario}') `, 
                            (err, result) => {
                            if (err) {
                                throw err;
                                return res.status(400).send({
                                    msg: err
                                });
                            }
                            return res.status(201).send({
                                msg: 'The user has been registerd with us!'
                            });
                        }
                    );
                }
            });
        }
    })
}*/