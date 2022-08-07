import { Router } from "express";
import { registerUser, login } from "../controllers/authController.js";
import { validateLogin, validateRegister } from "../middlewares/validateAuth.js";

const authRouter = Router();

authRouter.post("/signup",validateRegister, registerUser);
authRouter.post("/signin",validateLogin, login);

export default authRouter;