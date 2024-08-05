import { useFormContext,useFieldArray,Controller } from "react-hook-form"
import MenuItemInput from "./menuItemInput"
export default function MenuSection(){
    const {control}= useFormContext()
    const{fields,append,remove}=useFieldArray({
        control,
        name:"menuItems"
    })
    return (
        <>
            <h2 className=" text-2xl font-bold ">Menu</h2>
            <span className=" text-gray-500" >Create your menu and give each item a name and a price</span>
            <Controller
            name="menuItems"
            control={control}
            render={()=> (
                <div> 
                   {fields.map((_,index)=> (
                    <MenuItemInput 
                        index={index}
                        
                        removeMenuItem={()=> remove(index)}
                    />
                   ))}

                </div>
            )}
            />
            <div onClick={()=> append({
                name: "",
                price:""
            })}  
            className=" bg-black text-white w-fit px-4 py-2 rounded-lg cursor-pointer"
            >Add Menu Items</div>
        </>
    )
}