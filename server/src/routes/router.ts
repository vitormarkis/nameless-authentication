import express from "express"
// import * as UserController from "../controllers/user"
import * as ArticleController from "../controllers/article"
import * as AuthController from "../controllers/auth"
import * as ProfileController from "../controllers/profile"

const router = express.Router()

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/logout", AuthController.logout)

router.get("/articles", ArticleController.getArticles)

router.get("/profile", ProfileController.getData)
router.post("/update-profile-info", ProfileController.updateProfileData)

export default router
