//import mysql
import mysql from "mysql2";

//cria a conexao
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bizo@00tk",
  database: "hotelcnp",
});

export default db;
