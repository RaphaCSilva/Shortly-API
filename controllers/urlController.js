import { nanoid } from "nanoid";
import db from "../pg/db.js";

export async function shortenUrl(req, res){
    
    const { id } = res.locals.user;
    const { url } = req.body

    const charsUrl = 8;
    const shortUrl = nanoid(charsUrl);

    try {
        await db.query(`
            INSERT INTO urls(url, "userId", "shortUrl")
            VALUES ($1, $2, $3)
        `, [url, id, shortUrl]);
        
        res.status(201).send({shortUrl});

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}

export async function getUrlById(req, res){


}

export async function openUrl(req, res){


}

export async function deleteUrl(req, res){


}
