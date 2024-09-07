import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetRestaurantId } from "../api/searchApi";
import { cartType } from "../type";
export default function SingleDetailPage() {
    const [cartItem,setCartItem]= useState<cartType[]>([])
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantId(restaurantId);
  if (isLoading || !restaurant) {
    return <div>Loading ...</div>;
  }
  return (
    <>
      <div className="flex flex-col gap-8">
        <img
          src={restaurant.imageUrl}
          className="aspect-[16/4] m-1 w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="p-2 m-2 shadow-lg border rounded-lg bg-gray-100">
          <h1 className="text-2xl  font-bold tracking-tight">
            {restaurant.restaurantName}{" "}
          </h1>
          <p className="text-gray-500 font-semibold">
            {restaurant.city}, {restaurant.country}
          </p>
          {restaurant.menuItems.map((eh) => (
            <span className="font-semibold">
              <span className="w-2 h-2 bg-black inline-block rounded-xl"></span>{" "}
              {eh.name}{" "}
            </span>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">Menu</h2>
          {restaurant.menuItems.map((eh) => (
            <div className="p-2 m-2 shadow-lg border rounded-lg bg-gray-100 font-semibold cursor-pointer">
              <p>{eh.name}</p>
              <p>${(eh.price/100).toFixed(2) }</p>
              <button className="" >Add</button>
            </div>
          ))}
        </div>
        <div>
            <h2 className="text-xl font-bold tracking-tight">Your Order</h2>
            <div className="">
                    
            </div>

        </div>
      </div>
    </>
  );
}
