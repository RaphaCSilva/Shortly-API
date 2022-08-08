import { Router } from "express";
import { deleteUrl, getUrlById, openUrl, shortenUrl } from "../controllers/urlController.js";
import { validateUrl } from "../middlewares/validateUrl.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateUrl, shortenUrl);
urlsRouter.get("/urls/:id", getUrlById)
urlsRouter.get("/urls/open/:shortUrl", openUrl)
urlsRouter.delete("urls/:id", deleteUrl)

export default urlsRouter;