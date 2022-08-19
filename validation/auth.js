import joi from 'joi';

const validateSignup = (data)=>{
    const Schema = joi.object({
        userid: joi.string().required().min(3),
        password:joi.string().min(4).required(),
    }); 
    return Schema.validateAsync(data);
}

const validateSignin = (data)=>{
    const Schema = joi.object({
        userid: joi.string().required(),
        password:joi.string().min(4).required(),
    }); 
    return Schema.validateAsync(data);
}


export {validateSignin,validateSignup};