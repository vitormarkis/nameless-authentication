import bodyParser from "body-parser"
import dotenv from "dotenv"
import express from "express"
import router from "./routes/router"
import cookieParser from 'cookie-parser'
import cors from 'cors';
import { log } from "./utils/functions"

dotenv.config()
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
app.use(router)

app.listen(process.env.PORT, () => log('Servidor começando na porta ' + process.env.PORT))
