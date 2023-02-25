import bcrypt from "bcryptjs"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { RowDataPacket } from "mysql2"
import { ENCookies } from "../constants"
import { loginUserSchema, registerUserSchema, User, UserLogin, UserRegister } from "../schemas/user"
import { connection } from "../services/mysql"

interface QueryUser extends RowDataPacket, User {}

export const register = (req: Request<{}, {}, UserRegister>, res: Response) => {
  const { username, password, email, name } = registerUserSchema.parse(req.body)

  const q = "SELECT * FROM users WHERE username = ?"

  connection.query<[]>(q, [username], async (error, user) => {
    if (error) return res.status(500).json(error)
    if (user.length) return res.status(409).json({ msg: "Esse usuário já existe." })

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = await bcrypt.hash(password, salt)

    connection.query(
      "INSERT INTO users (`username`, `email`, `password`, `name`) VALUE (?, ?, ?, ?)",
      [username, email, hashPassword, name],
      (error, user) => {
        if (error) return res.status(500).json(error)
        return res.status(201).json({ msg: "Usuário registrado!", user })
      }
    )
  })
}

export const login = (req: Request<{}, {}, UserLogin>, res: Response) => {
  /**
   * Checar se usuário possui algum cookie de acesso antes de prosseguir
   */

  const requestUser = loginUserSchema.parse(req.body)
  const q = "select * from users where username = ?"

  connection.query<QueryUser[]>(q, [requestUser.username], (error, result) => {
    if (error) return res.status(500).json(error)
    if (result.length === 0) return res.status(404).json({ msg: "Usuário não encontrado." })
    const { password, ...user } = result[0]

    const checkPassword = bcrypt.compareSync(requestUser.password, password)

    if (!checkPassword) return res.status(400).json({ msg: "Senha incorreta." })

    const token = jwt.sign({ id: user.id }, "namelessauth")
    return res
      .cookie(ENCookies.ACCESS_TOKEN, token, {
        httpOnly: true,
      })
      .json({
        msg: "Logado com sucesso!",
        user,
        token,
      })
  })
}

export const logout = (req: Request, res: Response) => {
  return res
    .clearCookie(ENCookies.ACCESS_TOKEN, {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({ msg: "Usuário foi desconectado." })
}
