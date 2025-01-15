import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";


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

type CheckoutSessionResponse = {
  sessionId: string;
  url: string;
};

export const useCreateCheckoutSession = () => {
  try{
    const token = localStorage.getItem("token");
  
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ): Promise<CheckoutSessionResponse> => {
    const response = await axios.post(
      `/api/order/checkout/create-checkout-session`,
      checkoutSessionRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };

  const {mutateAsync:createCheckoutSession,isPending,error,reset} = useMutation(
   {mutationFn: createCheckoutSessionRequest,
    mutationKey:["checkout session"]
   }
  );
  if (error) {
    toast.error(error.toString());
    reset();
  }
  return {createCheckoutSession,isPending}
  }catch(err){
    console.log(err)
    throw new Error("error in create checkout session api")
  }
  
};
