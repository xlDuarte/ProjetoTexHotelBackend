//import mysql
import mysql from 'mysql2'

//cria a conexao
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hotelcnp'
})

export default db