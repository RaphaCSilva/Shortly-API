import db from "../pg/db.js";

export async function getUser(req, res){
    
    const { user } = res.locals;

    try {

        const procuraUser = await db.query(`
            SELECT * FROM users WHERE id = $1`
        , [user.id]);

        if(procuraUser.rowCount === 0){
            return res.sendStatus(404);
        }

        const visitantsSoma = await db.query(`
            SELECT SUM(urls."visitantCount") FROM urls WHERE urls."userId" = $1
        `, [user.id]);
        const [visitantsTotal] = visitantsSoma.rows;

        const buscaUrlsFromUser = await db.query(`
            SELECT urls.id, urls."shortUrl", urls.url, urls."visitantCount" as "visitCount"
            FROM urls WHERE urls."userId" = $1
        `, [user.id]);
        const userUrls = buscaUrlsFromUser.rows;

        res.send({
            id: user.id,
            name: user.name,
            visitCount: visitantsTotal.sum || 0,
            shortenedUrls: userUrls
        });

    } catch (error) {
       console.log(error);
       return res.sendStatus(500); 
    }
}

export async function getRanking(req, res){
    try {
        const criaRanking = await db.query(`
            SELECT users.id, users.name, COUNT(urls.id) as "linksCount", SUM(urls."visitantCount") as "visitCount"
            FROM urls
            JOIN users ON urls."userId" = users.id
            GROUP BY users.id
            ORDER BY "visitCount" DESC
            LIMIT 10
        `);
        res.send(criaRanking.rows);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}