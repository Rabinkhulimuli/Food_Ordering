import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm ,FormProvider,Controller} from 'react-hook-form';
import { Form } from 'react-router-dom';
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
   
    return (
        <>
           <FormProvider {...method}>
            <Form onSubmit={method.handleSubmit(onSubmit)}>
            <div className=" ">
            <img
              className=" max-w-8 absolute z-10 m-4 hidden md:block "
              src="/search.svg"
            ></img>
            <Controller
                name="searchQuery"
                control={method.control}
                render={({field})=> (
                    <input {...field} placeholder={placeHolder} type="text" />
                )}
            />
            <button className="md:w-24  md:absolute md:right-14 md:m-2  shadow w-full text-center rounded-xl p-2 my-1 bg-orange-500 font-bold text-lg text-white hover:bg-orange-600">
              Search
            </button>
          </div>
          {Form.FormState.isDirty && (
            <button type="button">clear</button>
          )}
            </Form>
           </FormProvider>
        </>
    )
}