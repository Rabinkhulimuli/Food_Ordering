import {body, validationResult} from 'express-validator'
import {Request,Response,NextFunction} from 'express'
const handleValidationError= async(req:Request,res:Response,next:NextFunction)=> {
    const errors=validationResult(req)
    if(!errors.isEmpty){
        res.status(400).json({errors:errors.array()})
    }
    next()
}
export  const validateMyUserRequest= [
    body('name').isString().notEmpty().withMessage("Name must be a string"),
    body('address').isString().notEmpty().withMessage("address must be a sstring"),
    body('city').isString().notEmpty().withMessage("city must be a valid one"),
    body('contact').isNumeric().notEmpty().withMessage("Contact must be a number"),
    handleValidationError,
]