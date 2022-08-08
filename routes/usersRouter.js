import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { getUser, getRanking } from "../controllers/usersController.js"

const userRouter = Router();

userRouter.get("/users/me", validateToken, getUser);
userRouter.get("/ranking", getRanking);

export default userRouter;