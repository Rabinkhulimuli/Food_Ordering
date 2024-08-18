
import SearchBox from "../components/searchBar";
export default function SubPage() {
 

  return (
    <div>
      <div className=" z-0">
        <img
          className=" w-full object-cover max-h-[600px] "
          src="/hero.png"
        ></img>
      </div>
      <div className="flex flex-col gap-12 mx-6 ">
        <div className=" bg-white rounded-lg shadow-md p-4 md:p-8 flex flex-col gap-5 text-center -mt-16">
          <h2 className="text-2xl md:text-5xl capitalize font-bold tracking-tight text-orange-600 ">
            Tuck into a takeaway today
          </h2>
          <p className="text-xl">Food is just a click away!</p>
          <SearchBox/>
        </div>
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
    </div>
  );
}
