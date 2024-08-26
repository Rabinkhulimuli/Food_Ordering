import { Link } from "react-router-dom"

type Props={
    total:number
    city:string
}
export default function SearchDetail({total,city}:Props){

    return(
        <>      
         <span className=" font-bold text-nowrap  mr-auto">
            {total} Restaurant found in {city}
             <Link to='/' className=" mx-2 text-blue-500 underline font-semibold">Change City</Link>
         </span>
         
        </>
    )
}