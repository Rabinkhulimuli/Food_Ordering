import React, { SetStateAction } from "react";
import { cartType, restaurantType } from "../type";
import Checkout from "./checkOut";
import { item } from "./singleDetailPage";
export type Prop = {
  restaurant: restaurantType;
  cartItem: cartType[];
  removeCart: (items: item) => void;
  subFromCart: (items: item) => void;
  setCartItem:React.Dispatch<SetStateAction<cartType[]>>
  setToggle:React.Dispatch<SetStateAction<boolean>>
};
export default function OrderBook({
  restaurant,
  cartItem,
  removeCart,
  subFromCart,
  setCartItem,
  setToggle
}: Prop) {
  const getTotalCost = () => {
    const totalInPence = cartItem.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <div className=" my-2 shadow-md bg-gray-100 border px-2 py-4 rounded-lg h-fit">
      <div className="text-2x px-2 font-bold tracking-tight flex justify-between">
        <span>Your Order</span>
        <span>${getTotalCost()} </span>
      </div>
      <div className="flex flex-col  gap-5">
        {cartItem.map((item) => (
          <div key={item._id} className="flex justify-between px-2">
            <span className=" my-2 ">
              <sub> {item.name}</sub>
              <sup className="text-red-600 bg-orange-100 rounded-xl text-sm mx-1 border shadow px-1 ">
                {item.quantity}{" "}
              </sup>
            </span>
            <span className="inline-flex items-center gap-2">
              <img
                onClick={() => subFromCart(item)}
                src="/remove.png"
                className="w-4 cursor-pointer active:shadow-xl"
              />
              <div> {(item.price / 100).toFixed(2)} </div>
              <img
                onClick={() => removeCart(item)}
                src="/trash.png"
                className="w-4 cursor-pointer active:shadow-xl "
              />
            </span>
          </div>
        ))}
      </div>
      <div>
        <span className="flex justify-between shadow-md p-2 my-2 border rounded-md">
          <span>Delivery Price</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)} </span>
        </span>
        <Checkout setCartItem={setCartItem} cartItem={cartItem} setToggle={setToggle}/>
      </div>
    </div>
  );
}
