import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";

const userRouter = Router();

userRouter.get("/users/:id", validateToken);
userRouter.get("/ranking");

export default userRouter;