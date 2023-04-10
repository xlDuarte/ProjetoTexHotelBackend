import comentarioModel from "../models/comentariosModel.js";

export const showComentarios = (req, res)=>{
    comentarioModel.find({}).then((comentarios)=>{
        try{
            res.send(comentarios);
        } catch(err){
            res.status(500).send(err);
        }
    });
}

export const createComentario = (req, res)=>{
    const comentarios = comentarioModel(req.body);
    try {
        comentarios.save();
        res.send(comentarios);
    } catch (err) {
        res.status(500).send(err);
    }
}