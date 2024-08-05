import { useFormContext, Controller } from "react-hook-form";
import { cuisineList } from "../../config/restaurant-options-config";
import CuisineCheckBox from "./cuisineCheckBox";

export default function Cuisines() {
  const { control, formState: { errors } } = useFormContext();
  return (
    <div>
      <div className=" my-4">
        <h2 className=" text-3xl font-bold " >Cuisines</h2>
      <span className=" text-gray-500" >Select the cuisine that your restaurant serves</span>
      </div>
      
      <Controller
        name="cuisines"
        control={control}
        render={({ field }) => (
          <div  className=" grid grid-cols-2 md:grid-cols-6">
            {cuisineList.map((cuisine) => (
              <CuisineCheckBox key={cuisine} cuisine={cuisine} field={field} />
            ))}
            {errors.cuisines && <p className=" text-red-800 w-full text-lg text-center" > {`${errors.cuisines.message}`} </p>}
          </div>
        )}
      />
    </div>
  );
}
