import React, { SetStateAction, useContext,useEffect} from "react";
import { Link,useLocation } from "react-router-dom";
import {
  UserContext,
  UserContextType,
} from "../userContext/userContextProvide";
import { cartType } from "../type";

type Prop={
  cartItem:cartType[]
  setCartItem:React.Dispatch<SetStateAction<cartType[]>>
  setToggle:React.Dispatch<SetStateAction<boolean>>
}
export default function Checkout({cartItem,setCartItem,setToggle}:Prop) {
  const { login } = useContext<UserContextType>(UserContext);
  const {pathname,state}= useLocation();
  useEffect(()=> {
    if(state){
      setCartItem(state)
    }
  },[state,setCartItem])
  
  const checkout = () => {
    if(login && cartItem.length !==0){
      setToggle(true);
    }
      
    
  };
  return (
    <>
      <div>
        {login && cartItem.length !== 0 && <button
          onClick={checkout}
          
          className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-lg p-1 text-lg font-bold text-white"
        >
          Go To Check Out
        </button>}
        {!login && cartItem.length !== 0 &&  (
          <Link to={`/login?redirect=${pathname}`} state={cartItem} className=" flex text-center items-center justify-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-lg p-1 text-lg font-bold text-white underline">
            <b> Log In</b> to Checkout
          </Link>
        )}
      </div>
      
    </>
  );
}
