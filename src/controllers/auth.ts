import bcrypt from "bcryptjs"
import { Request, Response } from "express"
import { registerUserSchema, UserRegister } from "../schemas/user"
import { connection } from "../services/mysql"

export const register = (req: Request<{}, {}, UserRegister>, res: Response) => {
  const { username, password, email, name } = registerUserSchema.parse(req.body)

  connection.query(
    `
    SELECT * FROM users WHERE username = ?
  `,
    [username],
    async (error, user) => {
      if (error) return res.status(500).json(error)
      if ((user as any[]).length) return res.status(409).json({ msg: "Esse usuário já existe." })

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
    }
  )
}

export const login = (req: Request, res: Response) => {
  res.status(200).json({ msg: "OI" })
}

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ msg: "OI" })
}
