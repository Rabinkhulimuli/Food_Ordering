export type menuItemsType={
    _id:string;
    name:string;
    price:number;
}
export type restaurantType ={
    _id:string;
    user:string;
    restaurantName:string;
    city:string;
    country:string;
    deliveryPrice:number;
    estimatedDeliveryTime:number;
    cuisines:string[];
    menuItems:menuItemsType[];
    imageUrl:string;
    lastUpdated:string;
    imageFile?:File
}