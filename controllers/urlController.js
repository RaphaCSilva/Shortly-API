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

    const { id } = req.params;

    try {
        
        const procuraUrl = await db.query(`
            SELECT urls.id, urls.url, urls."shortUrl" FROM urls WHERE id = $1`
        , [id]);

        if(procuraUrl.rowCount === 0){
            return res.sendStatus(404);
        }

        const [url] = procuraUrl.rows;

        res.send(url);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function openUrl(req, res){
    
    const { shortUrl } = req.params;

    try {

        const procuraUrl = await db.query(`
            SELECT * FROM urls WHERE "shortUrl" = $1 
        `, [shortUrl]);

        if(procuraUrl.rowCount === 0){
            return res.sendStatus(404);
        }

        const [url] = procuraUrl.rows;

        await db.query(`
            UPDATE urls 
            SET "visitantCount" = "visitantCount" + 1 
            WHERE id = $1
        `, [url.id])

        res.redirect(url.url);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}

export async function deleteUrl(req, res){

    const { id } = req.params;
    const { user } = res.locals;

    try {
        
        const procuraUrl = await db.query(`
            SELECT * FROM urls WHERE id = $1
        `, [id]);

        if(procuraUrl.rowCount === 0){
            return res.sendStatus(404);
        }
        const [url] = procuraUrl.rows;

        if(url.userId !== user.id){
            return res.sendStatus(401);
        }

        await db.query(`
            DELETE FROM urls WHERE id = $1
        `, [id]);

        res.sendStatus(204);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}
