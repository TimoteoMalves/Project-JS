import Joi from 'joi';

const studentSchema = Joi.object({
    name: Joi.string().required().max(50),
    email: Joi.string().email().required().max(50),
    cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
    phone: Joi.string().length(9).pattern(/^[0-9]+$/).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
    status: Joi.boolean().required(),
});

const professorSchema = Joi.object({
    name: Joi.string().required().max(50),
    cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
    email: Joi.string().email().required().max(50),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
});

export {studentSchema, professorSchema};