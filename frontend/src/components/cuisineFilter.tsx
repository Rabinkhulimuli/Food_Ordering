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
      <div className=" hidden md:block shadow mt-4 " >
        <div>
          <h2 className="inline font-semibold px-1">Filter By Cuisine </h2>
          <button onClick={handleCuisineReset} className=" underline text-red-500 float-right px-1">Reset Cuisines</button>
          {cuisineList.slice(0,isExpanded? cuisineList.length:7).map((cuisine) => {
            const isSelected = sellectedCuisines.includes(cuisine);
            return (
            <div key={cuisine} className={`p-1 m-1 border rounded-lg shadow  ${isSelected? " border border-2 border-orange-700 font-semibold text-green-600":""}`}>
               
                <label className=" flex gap-2 items-center px-2">
                  <input
                    id={`cuisine_${cuisine}`}
                    type="checkbox"
                    value={cuisine}
                    onChange={handleCuisineChange}
                    checked={isSelected}
                    className=" hidden peer   "
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
        <button onClick={onExpandedClick} className="w-full capitalize hover:underline font-semibold hover:text-red-500 flex items-center justify-center" >{isExpanded?"view less":"view more "} </button>
      </div>
    </>
  );
}
