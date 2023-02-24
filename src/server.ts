import bodyParser from "body-parser"
import dotenv from "dotenv"
import express from "express"
import router from "./routes/router"
import { log } from "./utils/functions"

dotenv.config()
const app = express()

app.use(bodyParser.json())
app.use(router)

app.listen(process.env.PORT, () => log('Servidor começando na porta ' + process.env.PORT))
