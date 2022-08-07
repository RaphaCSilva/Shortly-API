import db from "../pg/db.js";
import bcrypt from 'bcrypt';

export async function registerUser(){
    const user = req.body;
    const { name, email, password } = user;
    try {
        const checaEmail = await db.query(`SELECT * FROM users WHERE email = $1`, [user.email]);
        
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

export async function login(){

}