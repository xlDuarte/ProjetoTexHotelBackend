// import do express
import express from "express";
// import do cors(caso decidirmos publicar em algum lugar na net, todos podem acessar e usar)
import cors from "cors";
// import das rotas para usar os endpoints
import Router from "./routes/routes.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger/openapi_output.json" assert{type: 'json'};//import do arquivo contendo os endpoint gerados pelo autogen
import mongoose from "mongoose";

// iniciando o express
const app = express();

mongoose.connect("mongodb://0.0.0.0:27017/hotelcnp",
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on("connected",()=>{
  console.log("conectado ao banco")
})

mongoose.connection.on("error", (err) => {
  console.log("Database error"+err);
});

const port = 5000;
const dia = 3600000; //1 horas em milisegundos

app.use('/docs',swaggerUI.serve, swaggerUI.setup(swaggerFile))//motagem da UI do swagger e como parametro o arquivo swagger.json gerado pelo autogen
app.use(cookieParser());
app.use(
  session({
    secret: "343re0598098098344wqiueoi93439483049",
    saveUninitialized: true,
    cookie: { maxAge: dia },
    resave: false,
  })
);

// usar json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// usar cors
app.use(cors());
// use o router
app.use(Router);

//Servidor rodando
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
