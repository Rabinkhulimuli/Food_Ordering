import { Request, Response } from "express";
import Restaurant from "../model/resturant";
const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    let query: any = {};
    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);
    if (cityCheck === 0) {
      res.status(404).json({
        data:[],
        pagination:{
            total:0,
            page:1,
            pages:1,
        }
      });
    }
    if (selectedCuisines) {
      const cuisineArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));
      query["cuisines"] = { $all: cuisineArray };
    }
    if (searchQuery) {
      const searchRegx = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegx },
        { cuisines: { $in: [searchRegx] } },
      ];
    }
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const restaurant = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip) 
      .limit(pageSize)
      .lean();
      const total = await Restaurant.countDocuments(query)
      const response= {
        data:restaurant,
        pagination:{
            total,
            page,
            pages:Math.ceil(total / pageSize),
        }
      }
      res.status(200).json(response)
  } catch (err) {
    res.status(500).json("Error in search parameter");
  }
};
export {
    searchRestaurant
}