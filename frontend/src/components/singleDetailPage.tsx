import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetRestaurantId } from "../api/searchApi";
import { cartType } from "../type";
import OrderBook from "./orderbook";
import UserProfileForm from "../form/userProfileForm";
import { useCreateCheckoutSession } from "../api/orderApi";
import { profileFormType } from "../form/profileForm";
export type item = {
  _id: string;
  name: string;
  price: number;
};
export default function SingleDetailPage() {
  const { restaurantId } = useParams();
  const [toggle, setToggle] = useState(false);
  const {createCheckoutSession,isPending:isCheckoutLoading}= useCreateCheckoutSession()
  const [cartItem, setCartItem] = useState<cartType[]>(() => {
  const storedItem = sessionStorage.getItem(`cartItem-${restaurantId}`);
    return storedItem ? JSON.parse(`cartItem-${restaurantId}`) : [];
  });

  const { restaurant, isLoading } = useGetRestaurantId(restaurantId);
  
  const addToCart = (eh: item) => {
    setCartItem((prev) => {
      const existingItem = cartItem.find((item) => item._id === eh._id);
      let updatedItem;
      if (existingItem) {
        updatedItem = prev.map((item) =>
          item._id === eh._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItem = [
          ...prev,
          {
            _id: eh._id,
            name: eh.name,
            price: eh.price,
            quantity: 1,
          },
        ];
      }
      //sessionStorage.setItem(`cartItem-${restaurantId}`,JSON.stringify(cartItem))
      return updatedItem;
    });
  };
  const removeFromCart = (items: item) => {
    setCartItem((prev) => {
      const updatedCart = prev.filter((eh) => eh._id != items._id);
      //sessionStorage.setItem(`cartItem-${restaurantId}`,JSON.stringify(cartItem))
      return updatedCart;
    });
  };
  const subFromCart = (items: item) => {
    setCartItem((prev) => {
      let updatedCart = prev.map((item) =>
        item._id === items._id ? { ...item, quantity: item.quantity - 1 } : item
      );
      updatedCart = updatedCart.filter((item) => item.quantity != 0);
      return updatedCart;
    });
  };
 const onCheckout=async(userFormData:profileFormType)=> {
  console.log("userFormData",userFormData)
  if(!restaurant){
    return
  }
  const checkoutData={
    cartItems:cartItem.map((cartItem)=> ({
      menuItemId:cartItem._id,
      name:cartItem.name,
      quantity:cartItem.quantity.toString(),

    })),
    restaurantId:restaurant?._id,
    deliveryDetails:{
      name:userFormData.name,
      addressLine1:userFormData.addressLine1,
      city:userFormData.city,
      country:userFormData.country,
      email:userFormData.email as string
    }
  }
  const data= await createCheckoutSession(checkoutData)
  window.location.href=data.url
 }
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
      <div className=" grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div>
          <div className="p-2 m-2 shadow-lg border rounded-lg bg-gray-100">
            <h1 className="text-2xl  font-bold tracking-tight">
              {restaurant.restaurantName}{" "}
            </h1>
            <p className="text-gray-500 font-semibold">
              {restaurant.city}, {restaurant.country}
            </p>
            {restaurant.menuItems.map((eh) => (
              <span className="font-semibold" key={eh._id}>
                <span className="w-2 h-2 bg-black inline-block rounded-xl"></span>{" "}
                {eh.name}{" "}
              </span>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Menu</h2>
            {restaurant.menuItems.map((eh) => (
              <div
                key={eh._id}
                onClick={() => addToCart(eh)}
                className="p-2 m-2 shadow-lg border rounded-lg bg-gray-100 font-semibold cursor-pointer"
              >
                <p>{eh.name}</p>
                <p>${(eh.price / 100).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <OrderBook
          restaurant={restaurant}
          cartItem={cartItem}
          setCartItem={setCartItem}
          removeCart={(items) => removeFromCart(items)}
          subFromCart={(items) => subFromCart(items)}
          setToggle={setToggle}
        />
      </div>
      <div
        className={`fixed  w-full  top-0 h-fit p-2 rounded-lg backdrop-blur-sm ${
          !toggle ? "hidden" : "block"
        }`}
      >
        
        <div className="my-32 flex flex-row items-center justify-center self-center ">
        
          <div>
          <button
          onClick={() => setToggle(!toggle)}
          className=" float-right mr-4 mt-2  shadow rounded-md bg-red-500 text-white font-bold px-2"
        >
          xo
        </button>
          <UserProfileForm />
          </div>
        </div>
      </div>
    </>
  );
}
