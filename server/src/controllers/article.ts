import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { ENCookies, ENKeys } from "../constants"
import { connection } from "../services/mysql"

export const getArticles = (req: Request, res: Response) => {
  const tokenFromCookies = req.cookies[ENCookies.ACCESS_TOKEN]
  if (!tokenFromCookies) res.status(401).json({ msg: "Você não está logado." })

  console.log("Chegou no articles")

  jwt.verify(tokenFromCookies, ENKeys.JWT_TOKEN_SECRET_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ msg: "Token é inválido." })
    const q = `select * from posts where author_id = ${userInfo.id}`
    connection.query(q, [], (error, posts) => {
      if (error) return res.status(500).json(error)
      return res.status(200).json(posts)
    })
  })
}
