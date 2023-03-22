//import mysql
import mysql from "mysql2";

//cria a conexao
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "maylo366",
  database: "hotelcnp",
});

export default db;
