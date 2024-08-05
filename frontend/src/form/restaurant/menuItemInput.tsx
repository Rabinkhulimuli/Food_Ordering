import { useFormContext,Controller } from "react-hook-form"
type Props ={
    index:number
    removeMenuItem:()=> void
}
export default function MenuItemInput({index,removeMenuItem}:Props){
    const {control,formState:{errors}}= useFormContext()
    return(

        <>
            <div className=" flex gap-5 items-center justify-center shadow-lg" >
            <div >
                <Controller
                name={`menuItems.${index}.name`}
                control={control}
                render={({field})=> (
                    <div>
                        <label>Name</label>
                        {errors.menuItems &&<p>{`${errors.menuItems.message}`}</p>}
                        <input {...field} placeholder="pizza" className=" border border-black rounded mx-2 px-1" />
                    </div>
                )}
             />
            </div>
            <div>
                <Controller
                    name={`menuItems.${index}.price`}
                    control={control}
                    render={({field})=> (
                            <div>
                                <label>Price ($) </label>
                                {errors.menuItems && <p>{`${errors.menuItems.message}`}</p>}
                                <input {...field} placeholder="8.88" className=" border border-black rounded mx-2 px-1" />

                            </div>
                    )}
                />
            </div>
             <div onClick={ removeMenuItem} className=" bg-orange-600 w-16 h-8 text-center font-bold text-2xl   rounded-lg" >X</div>
            </div>
           
        </>
    )
}