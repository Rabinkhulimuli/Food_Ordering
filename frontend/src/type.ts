export type UserD = {
  id: string;
  email?: string;
  name?: string;
  contact?: number;
  addressLine1?: string;
  city?: string;
  country?: string;
};
export type menuItemsType = {
  _id: string;
  name: string;
  price: number;
};
export type restaurantType = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: menuItemsType[];
  imageUrl: string;
  lastUpdated: string;
  imageFile?: File;
};
export type restaurantSearchResponse = {
  data: restaurantType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
export type cartType = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};
export type orderStatus =
  | "placed"
  | "Paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";
export type Order = {
  _id: string;
  restaurant: restaurantType;
  user: UserD;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: orderStatus;
  createdAt: string;
  restaurantId: string;
};
