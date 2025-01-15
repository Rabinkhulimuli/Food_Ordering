import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserContext,
  UserContextType,
} from "../userContext/userContextProvide";
import { cartType } from "../type";
import ProfileForm, { profileFormType } from "../form/profileForm";
import { useGetMyProfile } from "../api/apiList";

type Prop = {
  cartItem: cartType[];
  setCartItem: React.Dispatch<SetStateAction<cartType[]>>;
  isLoading: boolean;
  onCheckout: (userFormData: profileFormType) => void;
};
export default function Checkout({
  cartItem,
  setCartItem,
  isLoading,
  onCheckout,
}: Prop) {
  const { login, user } = useContext<UserContextType>(UserContext);
  const { pathname, state } = useLocation();
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    if (state) {
      setCartItem(state);
    }
  }, [state, setCartItem]);

  const checkout = () => {
    if (login && cartItem.length !== 0) {
      setToggle(true);
    }

    if (isLoading) {
      return <div>Loading ...</div>;
    }
  };
  const { response: currentUser } = useGetMyProfile();
  if (!login || !user || !currentUser) {
    return (
      <Link
        to={`/login?redirect=${pathname}`}
        state={cartItem}
        className=" flex text-center items-center justify-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-lg p-1 text-lg font-bold text-white underline"
      >
        <b> Log In</b> to Checkout
      </Link>
    );
  }

  return (
    <>
      <div>
        {login && cartItem.length !== 0 && (
          <button
            onClick={checkout}
            className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-lg p-1 text-lg font-bold text-white"
          >
            Go To Check Out
          </button>
        )}
        <div
          className={`fixed  w-full  top-0 h-fit p-2 rounded-lg backdrop-blur-sm ${
            !toggle ? "hidden" : "block"
          }`}
        >
          <div className=" my-12 flex flex-row items-center justify-center self-center ">
            <div>
              <button
                onClick={() => setToggle(!toggle)}
                className=" float-right mr-4 mt-2  shadow rounded-md bg-red-500 text-white font-bold px-2"
              >
                xo
              </button>
              <div
              className="  max-w-[425px] md:min-w-[700px] bg-gray-50"
              >
                <ProfileForm
                onSave={onCheckout}
                isLoading={isLoading}
                currentUser={currentUser}
              />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
