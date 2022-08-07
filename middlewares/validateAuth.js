import { loginSchema, registerSchema } from "../schemas/authSchema.js";


export function validateLogin(req, res, next){
    const {error} = loginSchema.validate(req.body);
    if(error){
        return res.sendStatus(422).send(error);
    }

    next();
    
}

export function validateRegister(req, res, next){
    const {error} = registerSchema.validate(req.body);
    if(error){
        return res.sendStatus(422).send(error);
    }

    next();

}
