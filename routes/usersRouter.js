import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { getUserById, getRanking } from "../controllers/usersController.js"

const userRouter = Router();

userRouter.get("/users/:id", validateToken, getUserById);
userRouter.get("/ranking", getRanking);

export default userRouter;