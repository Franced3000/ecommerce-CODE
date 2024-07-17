import { body, param } from 'express-validator';



export const userValidator = [
  body('name')
    .notEmpty()
    .withMessage('Il nome è obbligatorio')
    .isString()
    .withMessage('Il nome deve essere una stringa'),
  body('email')
    .notEmpty()
    .withMessage('L\'email è obbligatoria')
    .isEmail()
    .withMessage('Formato email non valido'),
  body('password')
    .notEmpty()
    .withMessage('La password è obbligatoria')
    .isLength({ min: 6 })
    .withMessage('La password deve essere lunga almeno 6 caratteri'),
];

export const idParamValidator = [
  param('id')
    .isInt()
    .withMessage('L\'ID deve essere un numero intero'),
];