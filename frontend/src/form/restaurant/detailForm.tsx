import { useFormContext, Controller } from "react-hook-form";

export default function DetailRerstro() {
  const { control } = useFormContext();
  return (
    <>
      <div className=" bg-red-200  px-4 space-y-2" >
        <div>Details</div>
        <span>Enter the details about your restaurant</span>
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
                </div>
            )}
        />
        <Controller 
            name="deliveryTime"
            control={control}
            render={({field})=> (
                <div>
                    <label>Estimated Delivery Time (minutes) </label>
                    <input {...field} placeholder="30" className=" shadow-md block border  " />
                    </div>
            )}
        />
      </div>
    </>
  );
}
