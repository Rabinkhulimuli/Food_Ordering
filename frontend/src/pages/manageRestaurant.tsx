import RestaurantForm from "../form/restaurant/restaurantForm";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "../api/myRestroApi";
export default function ManageRestaurantPage() {
  const { createRestro, isLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestro, isPending } = useUpdateMyRestaurant();
  const isEditing = !!restaurant;
  return (
    <RestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestro : createRestro}
      isLoading={isLoading || isPending}
    />
  );
}
