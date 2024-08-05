import { useFormContext,Controller } from "react-hook-form"
export default function ImageSection(){
    const {control,formState:{errors}} = useFormContext()
    return(
        <>
            <div>
                <div>
                    <h2 className=" text-2xl font-bold ">Image</h2>
                    <span className=" text-gray-500">Add an image that will be displayed on your restaurant listing in the search results. Adding a new image will overwrite the existing one.</span>

                </div>
                <div>
                    <Controller 
                        name="imageFile"
                        control={control}
                        render={({field})=> (
                            <div className=" w-1/2 ">
                                <input type="file" {...field} accept=".jpg,.jpeg,.png"
                                onChange={(event)=> field.onChange(event.target.files ? event.target.files[0]:null)}
                                className=" "
                                />
                                {errors.imageFile &&<p>{`${errors.imageFile.message}`} </p>}
                                </div>
                        )}
                    />
                </div>
            </div>
        </>
    )
}