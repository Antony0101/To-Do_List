import joi from 'joi';

const validateCreate = (data)=>{
    const Schema = joi.object({
        name: joi.string().required(),
        priority:joi.number().integer().min(1).max(9).required(),
        description:joi.string()
    }); 
    return Schema.validateAsync(data);
}


export {validateCreate};