import { useState } from "react";
export default function SubPage() {
  const [food, setFood] = useState("");
  return (
    <>
      <div className=" z-0">
        <img
          className=" w-full object-cover max-h-[600px] "
          src="/hero.png"
        ></img>
      </div>
      <div className="flex flex-col items-center rounded-md shadow-lg   p-4 px-8 mx-32">
        <h2 className="text-2xl font-bold tracking-tight text-orange-700 ">
          Tuck into a takeaway today
        </h2>
        <p>Food is just a click away!</p>
        <input
          value={food}
          onChange={(event) => setFood(event?.target.value)}
          className=" shadow w-full text-center rounded-xl p-2 "
          type="text"
          placeholder="Search By City Or Town"
        />
        <button className=" shadow w-full text-center rounded-xl p-2 my-1 bg-orange-500 font-bold text-lg text-white hover:bg-orange-600">
          Search
        </button>
      </div>
      <div className=" grid md:grid-cols-2 gap-5 py-5 ">
        <img className="" src="/landing.png"></img>
        <div className="flex flex-col items-center justify-center text-center ">
          <h2 className="text-3xl font-bold capitalize ">
            order takeaway even faster
          </h2>
          <p className="my-4 text-md capitalize font-semibold">
            Download the mern eats App for faster ordering and personalized
            recommendation
          </p>
          <img src="/appDownload.png"></img>
        </div>
      </div>
    </>
  );
}
