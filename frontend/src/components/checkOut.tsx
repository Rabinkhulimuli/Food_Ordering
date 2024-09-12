import React, { SetStateAction, useContext, useState ,useEffect} from "react";
import { Link,useLocation } from "react-router-dom";
import {
  UserContext,
  UserContextType,
} from "../userContext/userContextProvide";
import { cartType } from "../type";

type Prop={
  cartItem:cartType[]
  setCartItem:React.Dispatch<SetStateAction<cartType[]>>
}
export default function Checkout({cartItem,setCartItem}:Prop) {
  const { login } = useContext<UserContextType>(UserContext);
  const [toggle, setToggle] = useState(false);
  const {pathname,state}= useLocation();
  useEffect(()=> {
    if(state){
      setCartItem(state)
    }
  },[state,setCartItem])
  
  const checkout = () => {
    
      setToggle(true);
    
  };
  return (
    <>
      <div>
        <button
          onClick={checkout}
          disabled={!login ? true : false}
          className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-lg p-1 text-lg font-bold text-white"
        >
          Go To Check Out
        </button>
        {!login && (
          <Link to={`/login?redirect=${pathname}`} state={cartItem} className="text-red-600 underline">
            <b> Log In</b> to Checkout
          </Link>
        )}
      </div>
      
    </>
  );
}
