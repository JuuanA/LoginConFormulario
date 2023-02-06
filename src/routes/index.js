import { Router } from "express";
import { authController } from "../controllers/index.js";
import { authMiddlewares } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/login")
  .get(authMiddlewares.checkNotLogged, authController.serverLogin)
  .post(authController.login);
router
  .route("/register")
  .get(authMiddlewares.checkNotLogged, authController.serverRegister)
  .post(authMiddlewares.checkNotLogged, authController.register);
router
  .route("/welcome")
  .get(authMiddlewares.authMiddleware, authController.serverWelcome);
router
  .route("/logout")
  .get(authMiddlewares.authMiddleware, authController.logout);

export default router;
