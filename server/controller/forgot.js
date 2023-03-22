import db from "../config/database.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import randtoken from "rand-token";

//send email
function sendEmail(email, token) {
    var email = email;
    var token = token;
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hotelcasanapraiatex@gmail.com', // Your email id
            pass: 'jpvuggoqkozqnagy' // Your password
        }
    });
    var mailOptions = {
        from: 'hotelcasanapraiatex@gmail.com',
        to: email,
        subject: 'Recuperação de senha - hotelcasanapraiatex.com.br',
        html: 'Você solicitou a troca de senha. Por favor use este <a href="http://localhost:8080/#/resetpwd/'+ token +'">LINK</a> para resetar sua senha.'
    };
    mail.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(0)
        }
    });
}

/* send reset password link in email */ 
export const resetPassword = (req, res, next) => {
    var email = req.body.emailUsuario;

    //console.log(sendEmail(email, fullUrl));
    db.query('SELECT * FROM usuario WHERE emailUsuario ="' + email + '"', function(err, result) {
        if (err) throw err;
        var type = ''
        var msg = ''
        console.log("teste" ,result[0]);
        if (result[0].emailUsuario.length > 0) {
            var token = randtoken.generate(20);
            var sent = sendEmail(email, token);
            if (sent != '0') {
                var data = {
                    token: token
                }
                db.query('UPDATE usuario SET ? WHERE emailUsuario ="' + email + '"', data, function(err, result) {
                    if(err) throw err
                })
                type = 'success';
                msg = 'The reset password link has been sent to your email address';
            } else {
                type = 'error';
                msg = 'Something goes to wrong. Please try again';
            }
            console.log(msg)
        } else {
            console.log('2');
            type = 'error';
            msg = 'The Email is not registered with us';
        }
    });
}

/* update password to database */
export const updatePassword = (req, res, next) => {
    var token = req.params.token;
    var password = req.body.senhaUsuario;
    console.log(req.params.token)
    db.query('SELECT * FROM usuario WHERE token ="' + token + '"', function(err, result) {
        if (err) throw err;
        var type
        var msg
        if (result.length > 0) {
            var saltRounds = 10;
            // var hash = bcrypt.hash(password, saltRounds);
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    var data = {
                        senhaUsuario: hash
                    }
                    db.query('UPDATE usuario SET ? WHERE emailUsuario ="' + result[0].emailUsuario + '"', data, function(err, result) {
                        if(err) throw err
                        console.log(err)
                        console.log(result)
                    });

                });
            });
            type = 'success';
            msg = 'Your password has been updated successfully';
        } else {
            console.log(password)
            console.log('2',msg);
            type = 'success';
            msg = 'Invalid link; please try again';
        }
    });
}