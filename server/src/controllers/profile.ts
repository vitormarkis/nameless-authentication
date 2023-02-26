import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { ENCookies, ENKeys } from "../constants"
import { connection } from "../services/mysql"

export const getData = (req: Request, res: Response) => {
  const tokenFromCookies = req.cookies[ENCookies.ACCESS_TOKEN]
  if (!tokenFromCookies) res.status(401).json({ msg: "Você não está logado." })

  jwt.verify(tokenFromCookies, ENKeys.JWT_TOKEN_SECRET_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ msg: "Token é inválido." })

    const q = "select name, email, username, avatar_picture, cover_picture, city from users where id = (?)"

    connection.query(q, [userInfo.id], (error, userData) => {
      if (error) return res.status(500).json(error)
      return res.status(200).json(userData)
    })
  })
}
