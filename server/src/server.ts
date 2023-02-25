import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import router from "./routes/router"
import { log } from "./utils/functions"

dotenv.config()
const app = express()

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Credentials", 'true')
  next()
})
app.use(bodyParser.json())
app.use(
  cors({
    origin: "http://localhost:5173",
  })
)
app.use(cookieParser())
app.use(router)

app.listen(process.env.PORT, () => log("Servidor começando na porta " + process.env.PORT))
