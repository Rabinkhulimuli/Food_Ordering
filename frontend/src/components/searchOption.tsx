import { useState } from "react"

type Props={
    sortOption:string  
    onChange:(value:string)=> void
}
export default function SearchOption({sortOption,onChange}:Props){
    const[toggle,setToggle]= useState(false)
    const sortmatch=[{
        label:"Best Match",
        value:"bestMatch"
    },{
        label:"estimated delivery time",
        value:"estimatedDeliveryTime"
    },
    {
        label:"delivery price",
        value:"deliveryPrice"
    }

]
    return(<>
        <div className=" w-56 tracking-tight ">
            <div onClick={()=> setToggle(!toggle)} className={`capitalize cursor-pointer font-bold hover:shadow-xl ${toggle?" text-red-500 ":""} `}>Sorted By <span className=" text-orange-500 font-semibold underline"> {sortOption} </span> </div>
            <div className={`absolute ${toggle? "block ":"hidden"}`}>
                {
                    sortmatch.map((eh)=> (
                        <span key={eh.value} onClick={()=> {onChange(eh.value)
                            setToggle(!toggle)
                        }} className=" bg-gray-200 hover:bg-orange-400  rounded-lg font-semibold mt-1 p-1 cursor-pointer capitalize flex">{eh.label} </span>
                    ))
                }
            </div>
        </div>
    </>)
}