import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useEffect } from "react";
const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});
type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};
export type SearchForm = z.infer<typeof formSchema>;

export default function SearchBox({
  onSubmit,
  onReset,
  placeHolder,
  searchQuery,
}: Props) {
  const method = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });
  useEffect(() => {
    method.reset({ searchQuery });
  }, [searchQuery, method]);
  const handleReset = () => {
    method.reset({
      searchQuery: "",
    });
    if (onReset) {
      onReset();
    }
  };
  return (
    <>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row nowrap shadow mx-1 px-1 my-4 border rounded-lg gap-2 ">
            <img
              className=" max-w-6 mx-4 hidden md:block "
              src="/search.svg"
            ></img>
            <Controller
              name="searchQuery"
              control={method.control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder={placeHolder}
                  type="text"
                  className=" w-full border-none shadow-none focus-visible:ring-0 my-2 px-2  "
                />
              )}
            />

            <button
              onClick={handleReset}
              type="button"
              className="md:w-24  w-full text-center rounded-xl px-2 md:my-2 font-bold text-lg  hover:bg-orange-600"
            >
              Reset
            </button>
            <button className="md:w-24 w-full text-center rounded-xl px-2 md:my-2 bg-orange-500 font-bold text-lg text-white hover:bg-orange-600">
              Search
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
