import RestaurantForm from "../form/restaurant/restaurantForm"
import { useCreateMyRestaurant } from "../api/myRestroApi"
export default function ManageRestaurantPage(){
    const {createRestro,isLoading} =useCreateMyRestaurant()
    return <RestaurantForm onSave={createRestro} isLoading={isLoading} />
}