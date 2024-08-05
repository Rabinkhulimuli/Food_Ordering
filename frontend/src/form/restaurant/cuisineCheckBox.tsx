import {ControllerRenderProps,FieldValues} from "react-hook-form"
import React from 'react'
type Props= {
    cuisine:string  
    field:ControllerRenderProps<FieldValues,"cuisines">
}
export default function CuisineCheckBox({cuisine,field}:Props){
    const handleChange= (event:React.ChangeEvent<HTMLInputElement>)=> {
        const newValue= event.target.checked ? [...field.value,cuisine]:field.value.filter((item:string)=> item !== cuisine)
        field.onChange(newValue)
    }
    return(
        <>
            <label className=" text-lg font-medium" >
            <input type="checkbox"
               className=" mx-1  "
            {...field} checked={field.value.includes(cuisine)} 
            onChange={handleChange}
            />
            {cuisine} </label>
        </>
    )
}