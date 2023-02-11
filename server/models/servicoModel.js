// importa o db
import db from "../config/database.js";
  
// lista todos os servicos
export const getServico = (result) => {
    db.query("SELECT * FROM servicos", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
// lista um servico
export const getServicoById = (id, result) => {
    db.query("SELECT * FROM servicos WHERE idServicos = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}
  
// insere um servico ao banco
export const insertServico = (data, result) => {
    console.log("insertServico", data);
    db.query("INSERT INTO servicos SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
// atualiza um servico no banco
export const updateServicoById = (data, id, result) => {
    db.query("UPDATE servicos SET nomeServico = ?, vlrDiariaServico = ?, descricaoServico = ?, labelServico = ?  WHERE idServicos = ?", 
        [data.nomeServico, data.vlrDiariaServico, data.descricaoServico, data.labelServico,  id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
  
// deleta um servicos no banco
export const deleteServicoById = (id, result) => {
    db.query("DELETE FROM servicos WHERE idServicos = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}