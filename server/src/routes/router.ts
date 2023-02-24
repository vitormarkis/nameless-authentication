import express from "express"
// import * as UserController from "../controllers/user"
import * as AuthController from "../controllers/auth"

const router = express.Router()

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/logout", AuthController.logout)

export default router
