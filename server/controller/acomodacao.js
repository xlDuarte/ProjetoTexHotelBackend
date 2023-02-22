// Import das funcs do models
import { getAcomodacao, getAcomodacaoById, insertAcomodacao, updateAcomodacaoById, deleteAcomodacaoById} from "../models/acomodacaoModel.js";
  
// lista todos os acomodacao
export const showAcomodacao = (req, res) => {
    getAcomodacao((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// lista um acomodacao 
export const showAcomodacaoById = (req, res) => {
    getAcomodacaoById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// cria um novo Acomodacao
export const createAcomodacao = (req, res) => {
    const data = req.body;
    insertAcomodacao(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// atualiza o Acomodacao
export const updateAcomodacao = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateAcomodacaoById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
  
// Deleta o Acomodacao
export const deleteAcomodacao = (req, res) => {
    const id = req.params.id;
    deleteAcomodacaoById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}