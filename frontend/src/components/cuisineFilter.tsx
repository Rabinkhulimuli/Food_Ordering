import { ChangeEvent } from "react";
import { cuisineList } from "../config/restaurant-options-config";
type Props = {
  onChange: (cuisines: string[]) => void;
  sellectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};
export default function CuisineFilter({
  onChange,
  sellectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) {
  const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event?.target.value;
    const isChecked = event?.target.checked;
    const newCuisineList = isChecked
      ? [...sellectedCuisines, clickedCuisine]
      : sellectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);
    onChange(newCuisineList);
  };
  const handleCuisineReset = () => onChange([]);
  return (
    <>
      <div className=" hidden md:block" >
        <div>
          <h2>Filter Cuisine By </h2>
          <button onClick={handleCuisineReset}>Reset Cuisines</button>
          {cuisineList.map((cuisine) => {
            const isSelected = sellectedCuisines.includes(cuisine);
            return (
              <div key={cuisine} className=" p-1 bg-gray-200 m-1 border rounded-lg shadow  ">
               
                <label className=" flex gap-2 items-center ">
                  <input
                    id={`cuisine_${cuisine}`}
                    type="checkbox"
                    value={cuisine}
                    onChange={handleCuisineChange}
                    checked={isSelected}
                    className=" bg-red-800 hidden peer   "
                  />
                   
                  {cuisine}
                  <img
                    src="/check.png"
                    className="  aspect-square w-4 h-4 hidden peer-checked:block"
                  />
                </label>
               
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
