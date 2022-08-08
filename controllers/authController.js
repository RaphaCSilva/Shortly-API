import db from "../pg/db.js";
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt';

export async function registerUser(req, res){
   
    const { name, email, password } = req.body;

    try {
        const checaEmail = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        
        if(checaEmail.rowCount > 0) {
            return res.sendStatus(409);
        }

        const SALT = 10;
        const passwordHash = bcrypt.hashSync(password, SALT);

        await db.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)`,
            [name, email, passwordHash]);

        res.sendStatus(201); 

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function login(req, res){

    const { email, password } = req.body; 

    try {
        const {rows: users} = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const [user] = users;
        if(!user){
            return res.sendStatus(401);
        }
        
        if(bcrypt.compareSync(password, user.password)){
            const token = uuid();
            await db.query(`
                INSERT INTO sessions (token, "userId") VALUES ($1, $2)
            `, [token, user.id]);
            return res.send(token).sendStatus(200);
        }
    
        res.sendStatus(401);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}