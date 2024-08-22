  import { useForm,Controller} from "react-hook-form";
  import { z } from "zod";
  import { Toaster } from "sonner";
  import { zodResolver } from "@hookform/resolvers/zod";
import { UserD } from "../type";
import { useEffect } from "react";
  const formSchema= z.object({
    email:z.string({
      required_error:"Email is required"
    }).optional(),
    name:z.string({
      required_error:"Name is required !"
    }),
    addressLine1:z.string({
      required_error:"Address is required !"
    }),
    city:z.string({
      required_error:"City is required !"
    }),
    country:z.string({
      required_error:"Country is required !"
    }),
    contact:z.coerce.number({
      required_error:"Phone Number is required !",
      invalid_type_error:"Phone Number must be a number !"
    }).min(10,"Phone Number must be of 10 digits")
   /*  email:z.string().optional(),
    name:z.string().min(1,"name is required"),
    addressLine1:z.string().min(1,"Address is required"),
    city:z.string().min(1,"City is Required"),
    country:z.string().min(1,"Country is required"),
    number:z.number().min(10,"Phone number is required") */
  })
  export type profileFormType= z.infer<typeof  formSchema>
  type Props={
    onSave:(profileFormData:profileFormType)=> void
    isLoading:boolean  
    currentUser:UserD
    title?:string;
    buttonText?:string
  }
  export default function ProfileForm({onSave,isLoading,currentUser,title="user Profile",buttonText="Submit"}:Props){
    const {handleSubmit,control,formState:{errors},reset}= useForm<profileFormType>({
      resolver:zodResolver(formSchema),
      defaultValues:currentUser
    })
    useEffect(()=> {
      reset(currentUser)
    },[currentUser,reset])
    return (
      <>
      <Toaster richColors/>
      <div className=" bg-gray-200 mx-2 p-2">
           <h2 className=" text-xl font-bold capitalize tracking-tight" >{title}</h2>
      <span className=" text-gray-500" >view and change your profile information here</span>
      <span className=" block font-semibold text-gray-500" >Email</span>
      <span className=" block shadow bg-white px-2 text-gray-500" >{currentUser?.email} </span>
      <form onSubmit={handleSubmit(onSave)} className=" " >
      <Controller 
      name="name"
      control={control}
      render={({field})=> (
        <div>
          <label className=" font-semibold" >Name</label>
        <input type="text" {...field} 
          className=" block px-2 w-1/2 shadow-md w-full"
        />
        {errors?.name && (<p className=" text-red-800 w-full text-center" >{`${errors?.name?.message}`} </p>)}
        </div>
        
      )}
      />

      <Controller
        name="addressLine1"
        control={control}
        render={({field})=> (
          <div>
            <label className=" font-semibold" >Address Line 1</label>
            <input type="text" {...field}
              className=" block px-2 w-1/2 shadow-md w-full"
            />
            {errors.addressLine1 && <p className=" text-red-800 w-full text-center" >{`${errors.addressLine1.message}`} </p>}
          </div>
        )}
      />
      <Controller
        name="contact"
        control={control}
        render={({field})=> (
          <div>
            <label className=" font-semibold" >Phone Number</label>
            <input type="text" {...field}
              className=" block px-2 w-1/2 shadow-md w-full"
            />
            {errors?.contact && <p className=" text-red-800 w-full text-center" >{`${errors.contact.message}`} </p>}
          </div>
        )}
      />
      <Controller 
        name="city"
        control={control}
        render={({field})=> (
          <div>
            <label className=" font-semibold" >City</label>
            <input type="text" {...field}
              className=" block px-2 w-1/2 shadow-md w-full"
            />
            {errors?.city && <p className=" text-red-800 w-full text-center" >{`${errors.city.message}`} </p>}
          </div>
        )}
      />
      <Controller
        name="country"
        control={control}
        render={({field})=> (
          <div>
            <label className=" font-semibold" >Country</label>
            <input type="text" {...field}
              className=" block px-2 w-1/2 shadow-md w-full"
            />
            {errors?.country && <p className=" text-red-800 w-full text-center" >{`${errors.country.message}`}</p>}
          </div>
        )}
      />
      {isLoading? <div>Loading ...</div>:<button  className=" bg-orange-500 px-4 py-2 rounded-lg text-lg font-bold text-white my-1" >{buttonText} </button>}
      </form>
      </div>
        </>
    )
  }