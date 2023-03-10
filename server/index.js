// import do express
import express from "express";
// import do cors(caso decidirmos publicar em algum lugar na net, todos podem acessar e usar)
import cors from "cors"; 
// import das rotas para usar os endpoints
import Router from "./routes/routes.js";
import session from "express-session";
import cookieParser from "cookie-parser";
  
// iniciando o express
const app = express();

const port = 5000
const dia = 1000 * 60 * 60 * 1 //1 horas em milisegundos

app.use(cookieParser())
app.use(session(
    {
    secret:'343re0598098098344wqiueoi93439483049',
    saveUninitialized:true,
    cookie:{maxAge:dia},
    resave:false
    }
))

// usar json
app.use(express.json());
app.use(express.urlencoded({extended: false}))
// usar cors
app.use(cors());  
// use o router
app.use(Router);

//Servidor rodando
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));