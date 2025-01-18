import axios from "axios";
import { Order, restaurantType } from "../type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
export const useCreateMyRestaurant = () => {
  const createMyRestro = async (
    restroFormData: FormData
  ): Promise<restaurantType> => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/my/restaurant", restroFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.log("error creating restaurant");
      throw new Error("Error creating restaurant");
    }
  };
  const {
    mutate: createRestro,
    isPending: isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createMyRestro,
    mutationKey: ["createRerstaurant"],
  });
  if (isSuccess) {
    toast.message("successfully created");
  }
  if (isError) {
    toast.message("Error creating Restaurant ");
  }
  return { createRestro, isLoading };
};
export const useGetMyRestaurant = () => {
  const getMyRestaurant = async (): Promise<restaurantType> => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/my/restaurant", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (err) {
      console.log("error geting restaurant info");
      throw new Error("error retriving restaurant information");
    }
  };
  const { data: restaurant, isLoading } = useQuery({
    queryFn: getMyRestaurant,
    queryKey: ["getRestaurant"],
  });
  return { restaurant, isLoading };
};
export const useUpdateMyRestaurant = () => {
  try {
    const token = localStorage.getItem("token");
    const updateRestaurant = async (
      restroFormData: FormData
    ): Promise<restaurantType> => {
      const { data } = await axios.put("/api/my/restaurant", restroFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    };
    const {
      mutate: updateRestro,
      isPending,
      isSuccess,
      isError,
    } = useMutation({
      mutationFn: updateRestaurant,
      mutationKey: ["Update Restaurant"],
    });
    if (isSuccess) {
      toast.success("Successfully updated");
    }
    if (isError) {
      toast.error("Unable to update restaurant");
    }
    return { updateRestro, isPending };
  } catch (err) {
    throw new Error("error updating user");
  }
};

export const useGetMyRestaurantOrder = () => {
  const token = localStorage.getItem("token");
  const getMyRestaurantOrderRequest = async (): Promise<Order[]> => {
    try {
      const { data: orders } = await axios.get("/api/my/restaurant/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return orders;
    } catch (err) {
      console.log(err);
      throw new Error("error retriving order from restaurant");
    }
  };
  const { data: Orders, isLoading } = useQuery({
    queryFn: getMyRestaurantOrderRequest,
    queryKey: ["restaurantOrderRequest"],
  });
  return { Orders, isLoading };
};
type UpdateRestaurantOrderType = {
  orderId: string;
  status: string;
};
export const useUpdateMyrestaurantOrder = () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found in local storage");
    }
  
    const updateRestaurantOrder = async (
      updateStatusOrderRequest: UpdateRestaurantOrderType
    ) => {
      if (!token) {
        throw new Error("Authorization token is missing");
      }
  
      try {
        const { data } = await axios.patch(
          `/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
          { status: updateStatusOrderRequest.status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        return data;
      } catch (err) {
        console.error(err);
        throw new Error("Error updating order status");
      }
    };
  
    const mutation = useMutation({
        mutationFn:updateRestaurantOrder,
      mutationKey: ["UpdateRestaurantOrder"],
      onSuccess: () => {
        toast.success("Successfully updated the order status");
      },
      onError: (error:Error) => {
        console.error(error);
        toast.error("Unable to update the order status");
      },
    });
  
    return {
      updateRestaurantStatus: mutation.mutateAsync,
      isPending: mutation.isPending,
    };
  };