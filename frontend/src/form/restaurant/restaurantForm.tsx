import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import DetailRerstro from "./detailForm";
import Cuisines from "./cuisines";
import MenuSection from "./menuSection";
import ImageSection from "./imageSection";

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
type restaurantFormData = z.infer<typeof formSchema>;
type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};
export default function RestaurantForm({ onSave, isLoading }: Props) {
  const method = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });
  const onSubmit = (formDataJson: restaurantFormData) => {};
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
