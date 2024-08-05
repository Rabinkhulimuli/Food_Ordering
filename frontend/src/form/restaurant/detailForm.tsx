import { useFormContext, Controller } from "react-hook-form";

export default function DetailRerstro() {
  const { control,formState:{errors} } = useFormContext();
  return (
    <>
      <div>
        <h2 className=" text-2xl font-bold ">Details</h2>
        <span className=" text-gray-500">Enter the details about your restaurant</span>
        <Controller
          name="restaurantName"
          control={control}
          render={({ field }) => (
            <div>
              <label>Name</label>
              <input
                {...field}
                placeholder="Pizza Restro"
                className=" shadow-md block w-full"
              />
              {errors.restaurantName && <p className=" text-red-800 text-lg capitalize" >{`${errors.restaurantName.message}`} </p>}
            </div>
          )}
        />
        <div className=" flex  gap-2 " >
            <Controller 
            
                name="city"
                control={control}
                render={({field})=> (
                    <div className=" flex-1" >
                        <label>City</label>
                        <input {...field} className=" shadow-md block border w-full " />
                        {errors.city && <p className=" text-red-800 text-lg capitalize">{`${errors.city.message}`} </p>}
                         </div>
                )}

            />
            <Controller 
            
                name="country"
                control={control}
                render={({field})=> (
                    <div className="flex-1"> 
                        <label>Country</label>
                        <input {...field} className=" shadow-md block border w-full " />
                        {errors.country && <p className=" text-red-800 text-lg capitalize">{`${errors.country.message}`} </p>}
                    </div>
                )}
            />
        </div>
        <Controller
            name="deliveryPrice"
            control={control}
            render={({field})=> (
                <div> 
                    <label>Delivery Price ($) </label>
                    <input {...field} placeholder="1.88" className=" shadow-md block border  " />
                    {errors.deliveryPrice && <p className=" text-red-800 text-lg capitalize">{`${errors.deliveryPrice.message}`} </p>}
                </div>
            )}
        />
        <Controller 
            name="estimatedDeliveryTime"
            control={control}
            render={({field})=> (
                <div>
                    <label>Estimated Delivery Time (minutes) </label>
                    <input {...field} placeholder="30" className=" shadow-md block border  " />
                      {errors.estimatedDeliveryTime && <p className=" text-red-800 text-lg capitalize">{`${errors.estimatedDeliveryTime.message}`} </p>}
                    </div>
            )}
        />
      </div>
    </>
  );
}
