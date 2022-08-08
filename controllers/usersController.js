import db from "../pg/db.js";

export async function getUser(req, res){
    
    const { user } = res.locals;

    try {
        
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
        });

    } catch (error) {
       console.log(error);
       return res.sendStatus(500); 
    }
}

export async function getRanking(req, res){
    
}