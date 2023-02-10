// Import das funcs do models
import {
  getServico,
  getServicoById,
  insertServico,
  updateServicoById,
  deleteServicoById,
} from "../models/servicoModel.js";
  
// lista todos os servicos
export const showServico = (req, res) => {
    getServico((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// lista um servico 
export const showServicoById = (req, res) => {
    getServicoById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// cria um novo servico
export const createServico = (req, res) => {
    const data = req.body;
    insertServico(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// atualiza o servico
export const updateServico = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateServicoById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Deleta o servico
export const deleteServico = (req, res) => {
    const id = req.params.id;
    deleteServicoById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}