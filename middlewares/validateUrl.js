import urlSchema from "../schemas/urlSchema.js";

export function validateUrl(req, res, next){
    const {error} = urlSchema.validate(req.body);
    if(error){
        return res.sendStatus(422).send(error);
    }

    next();
    
}