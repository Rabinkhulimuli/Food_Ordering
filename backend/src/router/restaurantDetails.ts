import express from "express";
import { param } from "express-validator";
import { searchRestaurant,getRestaurantID } from "../controller/restaurantDetailController";
const router = express.Router();

//api/restaurant/search
router
  .route("/search/:city")
  .get(
    param("city")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("city parameter must be a valid string"),
    searchRestaurant
  );
router.route("/:restaurantId").get(
  param("restaurantID")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantID parameter must be a valid string"),
  getRestaurantID
);
export default router;
