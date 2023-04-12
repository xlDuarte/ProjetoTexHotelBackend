import mongoose from "mongoose";

const ComentarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    comentario: {
      type: String,
      required: true,
    },
    contatoComentario: {
      type: String,
      required: false,
    },
    idReserva: {
      type: String,
      required: true,
    },
    idUsuario: {
      type: String,
      required: true,
    },
    nota: {
      type: Number,
      required: true,
    },
    dataComentario: {
      type: String,
      required: true,
    },
    statusComentario: {
      type: String,
      required: true,
    },
    publicarDe: {
      type: String,
      required: false,
    },
    publicarAte: {
      type: String,
      required: false,
    },    
  },
  {
    versionKey: false,
  }
);

const Comentario = mongoose.model("Comentario", ComentarioSchema);

export default Comentario;
