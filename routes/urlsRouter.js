import { Router } from "express";
import { deleteUrl, getUrlById, openUrl, shortenUrl } from "../controllers/urlController.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validateUrl } from "../middlewares/validateUrl.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateUrl, validateToken, shortenUrl);
urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.get("/urls/open/:shortUrl", openUrl);
urlsRouter.delete("/urls/:id", validateToken, deleteUrl);

export default urlsRouter;