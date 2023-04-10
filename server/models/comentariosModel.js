import mongoose from "mongoose";

const ComentarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    comentario:{
        type: String,
        required: true
    }
},
{
    versionKey: false
});

const Comentario = mongoose.model("Comentario", ComentarioSchema);

export default Comentario;