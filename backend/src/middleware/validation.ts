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
    body('addressLine1').isString().notEmpty().withMessage("address must be a string"),
    body('city').isString().notEmpty().withMessage("city must be a valid one"),
    body('contact').isNumeric().notEmpty().withMessage("Contact must be a number"),
    body('contact').isNumeric().notEmpty().withMessage("Phone number must be a number"),
    body('country').isString().notEmpty().withMessage("country mut be a valid string"),
    handleValidationError,
]
export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("deliveryPrice").isFloat({min:0}).withMessage("Delivery Price must be positive number"),
    body("estimatedDeliveryTime").isInt({min:0}).withMessage("Estimated delivery time must be a positive integer"),
    body("cuisines").isArray().withMessage("Cuisine must be an array").not().isEmpty().withMessage("cuisine array cannot be  empty"),
    body("menuItems").isArray().withMessage("Menu item must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price").isFloat({min:0}).withMessage("Menu items price is required and must be positive number"),
    handleValidationError,
]