import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm ,FormProvider,Controller} from 'react-hook-form';
const formSchema = z.object({
    searchQuery:z.string({
        required_error:"Restaurant name is required",
    }),
})
type Props={
    onSubmit:(formData:SearchForm)=> void;
    placeHolder:string  
    onReset?:()=> void
}
export type SearchForm=z.infer<typeof formSchema>

export default function SearchBox({onSubmit,onReset,placeHolder}:Props){
    const method = useForm<SearchForm>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            searchQuery:""
        }
    })
   const handleReset=()=> {
    method.reset({
        searchQuery : "",
    })
    if(onReset){
        onReset()
    }
   }
    return (
        <>
           <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(onSubmit)}>
            <div className="flex nowrap shadow-lg px-1  rounded-lg gap-2">
            <img
              className=" max-w-8 mx-4 hidden md:block "
              src="/search.svg"
            ></img>
            <Controller
                name="searchQuery"
                control={method.control}
                render={({field})=> (
                    <input {...field} placeholder={placeHolder} type="text" className=" w-full border-none shadow-none focus-visible:ring-0   p-2  " />
                )}
            />
            
          
          {method.formState.isDirty && (
            <button onClick={handleReset} type="button"  className="md:w-24  shadow w-full text-center rounded-xl p-2 my-1 font-bold text-lg  hover:bg-orange-600" >clear</button>
          )}
          <button className="md:w-24   shadow w-full text-center rounded-xl p-2 my-1 bg-orange-500 font-bold text-lg text-white hover:bg-orange-600">
              Search
            </button>
            </div>
            </form>
           </FormProvider>
        </>
    )
}