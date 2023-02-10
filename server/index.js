// import do express
import express from "express";
// import do cors(caso decidirmos publicar em algum lugar na net, todos podem acessar e usar)
import cors from "cors";
//import do bodyParser 
import bodyParser from "body-parser";
 
// import das rotas para usar os endpoints
import Router from "./routes/routes.js";
  
// iniciando o express
const app = express();
  
// usar json
app.use(express.json());
app.use(express.urlencoded({extended: true}))
  
// usar cors
app.use(cors());
  
// use o router
app.use(Router);

//depois criar uma const port para melhorar isso
app.listen(5000, () => console.log('Server running at http://localhost:5000'));