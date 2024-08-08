import RestaurantForm from "../form/restaurant/restaurantForm"
import { useCreateMyRestaurant } from "../api/myRestroApi"
export default function ManageRestaurantPage(){
    const {mutate,isLoading} =useCreateMyRestaurant()
    return <RestaurantForm onSave={mutate} isLoading={isLoading} />
}