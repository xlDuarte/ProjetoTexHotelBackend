//import mysql
import mysql from "mysql2";

//cria a conexao
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "hotelcnp",
});

export default db;
