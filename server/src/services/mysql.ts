import dotenv from "dotenv"
import mysql from "mysql2"

dotenv.config()

export const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

connection.connect(error => {
  if (error) throw error
  console.log("Conectado com o banco de dados.")
})
