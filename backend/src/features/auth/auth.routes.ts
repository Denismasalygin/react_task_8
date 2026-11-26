import { Router } from "express";
import { loginController, signupController, logoutController } from "./auth.controller";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
