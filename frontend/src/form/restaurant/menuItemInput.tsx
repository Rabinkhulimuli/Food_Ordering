import { useFormContext,Controller } from "react-hook-form"
type Props ={
    index:number
    removeMenuItem:()=> void
}
export default function MenuItemInput({index,removeMenuItem}:Props){
    const {control,formState:{errors}}= useFormContext()
    const menuItemsError= Array.isArray(errors?.menuItems) ? errors?.menuItems[index] : undefined
   
    return(

        <>
            <div className=" flex gap-2  my-2 items-end"  >
            <div >
                <Controller
                name={`menuItems.${index}.name`}
                control={control}
                render={({field})=> (
                    <div className="flex flex-col gap-2 ">
                        <label>Name</label>
                        {menuItemsError?.name &&<p>{`${menuItemsError?.name?.message}`}</p>}
                        <input {...field} placeholder="pizza" className=" border block border-black rounded  h-10 px-1" />
                    </div>
                )}
             />
            </div>
            <div>
                <Controller
                
                    name={`menuItems.${index}.price`}
                    control={control}
                    render={({field})=> (
                            <div className="flex flex-col gap-2 " >
                                <label>Price ($) </label>
                                {menuItemsError?.price && <p>{`${menuItemsError?.price?.message}`}</p>}
                                <input {...field} placeholder="8.88" className=" border block border-black rounded  h-10 px-1" />

                            </div>
                    )}
                />
            </div>
             <div onClick={ removeMenuItem} className=" bg-orange-600 px-4 py-2 text-white    text-center font-bold h-10 cursor-pointer rounded-lg" >Remove</div>
            </div>
           
        </>
    )
}