import RestaurantForm from "../form/restaurant/restaurantForm"
import { useCreateMyRestaurant,useGetMyRestaurant } from "../api/myRestroApi"
export default function ManageRestaurantPage(){
    const {createRestro,isLoading} =useCreateMyRestaurant()
    const {restaurant}= useGetMyRestaurant()
    return <RestaurantForm restaurant={restaurant} onSave={createRestro} isLoading={isLoading} />
}