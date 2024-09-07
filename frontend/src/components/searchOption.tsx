import { useState } from "react";

type Props = {
  sortOption: string;
  onChange: (value: string) => void;
};
export default function SearchOption({ sortOption, onChange }: Props) {
  const [toggle, setToggle] = useState(false);
  const sortmatch = [
    {
      label: "Best Match",
      value: "bestMatch",
    },
    
    {
      label: "delivery price",
      value: "deliveryPrice",
    },
    {
        label: "estimated delivery time",
        value: "estimatedDeliveryTime",
      },
  ];
  return (
    <>
      <div className=" w-fit tracking-tight  ">
        <div
          onClick={() => setToggle(!toggle)}
          className={`capitalize cursor-pointer font-bold border p-1  rounded shadow  hover:shadow-xl ${
            toggle ? " text-red-500 " : " underline"
          } `}
        >
          Sorted By
          <span className=" text-orange-500  font-semibold underline mx-1 ">
          
            {sortOption}
          </span>{" "}
        </div>
        <div className={`absolute ${toggle ? "block " : "hidden"} bg-white p-1 rounded-lg `}>
          {sortmatch.map((eh) => (
            <span
              key={eh.value}
              onClick={() => {
                onChange(eh.value);
                setToggle(!toggle);
              }}
              className="  hover:bg-gray-200  rounded-lg font-semibold mt-1 p-1 cursor-pointer capitalize flex"
            >
              {eh.label}{" "}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
