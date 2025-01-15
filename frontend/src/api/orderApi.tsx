import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const token = localStorage.getItem("token");
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const res = await axios.post(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      checkoutSessionRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
        
      }
    );
    return res.data;
  };
  const {
    mutateAsync: createCheckoutSession,
    isPending,
   error,
    reset,
  } = useMutation(createCheckoutSessionRequest,{
    onError:(err:any)=> {
        toast.error(err?.message || "Error creating checkout session");

    }
  });

  if (error) {
   
    reset();
  }

  return { createCheckoutSession, isPending };
};
