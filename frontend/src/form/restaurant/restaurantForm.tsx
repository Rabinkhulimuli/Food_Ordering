import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import DetailRerstro from "./detailForm";
import Cuisines from "./cuisines";
import MenuSection from "./menuSection";
import ImageSection from "./imageSection";
import { useEffect } from "react";
import { restaurantType } from "../../type";
const formSchema = z.object({
  restaurantName: z.string({
    required_error: "restaurant name is required",
  }),
  city: z.string({
    required_error: "city is required",
  }),
  country: z.string({
    required_error: "country is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
    invalid_type_error: "Must be a valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "delivery time is required",
    invalid_type_error: "Must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select at least one item",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is required" }),
});
export type restaurantFormData = z.infer<typeof formSchema>;
type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  restaurant?:restaurantType
};
export default function RestaurantForm({ onSave, isLoading,restaurant }: Props) {
  const method = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
      defaultValues: {
        restaurantName: restaurant?.restaurantName || '',
        city: restaurant?.city || '',
        country: restaurant?.country || '',
        deliveryPrice: restaurant ? parseInt((restaurant.deliveryPrice / 100).toFixed(2)) : 0,
        estimatedDeliveryTime: restaurant?.estimatedDeliveryTime || 0,
        cuisines: restaurant?.cuisines || [],
        menuItems: restaurant?.menuItems.map((item) => ({
          name: item.name || '',
          price: parseInt((item.price / 100).toFixed(2)) || 0,
        })) || [{ name: '', price: 0 }],
        imageFile: restaurant?.imageFile || new File([], ''),
      },
  });
useEffect(()=> {
  if(!restaurant){
    return
  }
  const deliveryPriceFormatted= parseInt(
    (restaurant.deliveryPrice /100).toFixed(2)
  )
  const menuItemFormatted= restaurant.menuItems.map((item)=> ({...item,price: parseInt((item.price / 100).toFixed(2))}) )
  const updatedRestaurant= {
    ...restaurant,deliverryPrice:deliveryPriceFormatted,menuItems: menuItemFormatted
  }
  method.reset(updatedRestaurant)
},[method,restaurant])
  const onSubmit = (formDataJson: restaurantFormData) => {
    const formData = new FormData()
    formData.append("restaurantName",formDataJson.restaurantName)
    formData.append("city",formDataJson.city)
    formData.append("country",formDataJson.country)
    formData.append("deliveryPrice",(formDataJson.deliveryPrice * 100).toString())
    formData.append("estimatedDeliveryTime",formDataJson.estimatedDeliveryTime.toString())
    formDataJson.cuisines.forEach((cuisine,index)=> {
      formData.append(`cuisines[${index}]`,cuisine)

    })
    formDataJson.menuItems.forEach((item,index)=> {
      formData.append(`menuItems[${index}][name]`,item.name.toString())
      formData.append(`menuItems[${index}][price]`,(item.price * 100).toString())
    })
    formData.append(`imageFile`,formDataJson.imageFile)
    onSave(formData)
    
  };
  
  return (
    <>
      
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(onSubmit)} className=" bg-gray-100 px-4 space-y-2" >
          <DetailRerstro />
          <div className=" w-full shadow-xl border border-gray-200 border-2 "> </div>
          <Cuisines />
          <div className=" w-full shadow-xl border border-gray-200 border-2 "> </div>
          <MenuSection />
          <div className=" w-full shadow-xl border border-gray-200 border-2 "> </div>
          <ImageSection />
          <button type="submit" disabled={isLoading ? true : false}
            className=" bg-black px-4 py-2 text-xl font-bold text-white rounded-lg "
          >
            {" "}
            {isLoading ? "Loading ..." : "Submit"}{" "}
          </button>
        </form>
      </FormProvider>
    </>
  );
}
