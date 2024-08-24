import { Link } from "react-router-dom"
import { restaurantType } from "../type"
type Props ={
    restaurant:restaurantType
}
export default function SearchCard({restaurant}:Props){
   
    return(
        <>
            <Link to={`/detail/${restaurant._id}`} className=" py-4  shadow-md grid lg:grid-cols-[2fr_3fr] gap-5 group " > 
                    <div className="  aspect-[16/6]"> 
                    <img className="  rounded-md w-full h-full object-cover " src={restaurant.imageUrl} ></img>
                    </div>
                    
                    <div className=" px-4 ">
                    <span className="block text-xl font-bold capitalize mb-1 tracking-tight group-hover:underline" >{restaurant.restaurantName} </span>
                    <div className=" grid lg:grid-cols-[250px_1fr] h-32 " >
                        <div className="   " >
                            
                            {restaurant.cuisines?.map((item,index)=> 
                                (<span className="inline-flex items-center" >
                                     <span key={index}> {item} </span>
                                   {restaurant.cuisines.length-1 > index  && <div className=" rounded-xl bg-black w-2 h-2 mx-1 "></div>}
                              
                                </span>)
                            )}
                        </div>
                        <div>
                        <span className="text-green-600" >
                            <img src="/clock.png" className=" inline w-6"/>
                            {restaurant.estimatedDeliveryTime} min
                            </span>
                            <span className=" flex items-center  gap-1" >
                                <img src="/cash.png" className="inline w-6 " />
                                Delivery From $ 
                                 { (restaurant.deliveryPrice /100).toFixed(2)}
                            </span>
                        </div>
                       
                        </div>
                    </div>
               
            </Link>
        </>
    )
}