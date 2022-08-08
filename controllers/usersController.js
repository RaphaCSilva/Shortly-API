import db from "../pg/db.js";

export async function getUser(req, res){
    
    const { user } = res.locals;

    try {

        //verificar user e devolver erro 404 se não achar

        const visitantsSoma = await db.query(`
            SELECT SUM(urls."visitCount") FROM urls WHERE urls."userId" = $1
        `, [user.id]);
        const [visitantsTotal] = visitantsSoma.rows;

        const buscaUrlsFromUser = await db.query(`
            SELECT * FROM urls WHERE urls."userId" = $1
        `, [user.id]);
        const userUrls = buscaUrlsFromUser.rows;

        res.send({
            id: user.id,
            name: user.name,
            visitCount: visitantsTotal || 0,
            shortenedUrls: userUrls
        }).sendStatus(200);

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
            ORDER BY "visitantCount" DESC
            LIMIT 10
        `);
        res.send(criaRanking.rows);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}