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
            <h2>Menu Section</h2>
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
            <button onClick={()=> append({
                name: "",
                price:""
            })} >Add Menu Items</button>
        </>
    )
}