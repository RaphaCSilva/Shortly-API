import db from "../pg/db.js"

export async function validateToken(req, res, next){

    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    
    try {

        if(!token){
            return res.sendStatus(401);
        }

        const { rows: sessions } = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
        const [session] = sessions;
        if(!session){
            return res.sendStatus(401);
        }

        const { rows: users } = await db.query(`SELECT * FROM users WHERE id = $1`, [session.userId]);
        const [user] = users;
        if(!user){
            return res.sendStatus(401);
        }

        res.locals.user = user;
        
        next();

    } catch (error) {
        
        console.log(error);
        res.sendStatus(500);

    }

}