import {QueryClient,QueryClientProvider} from 'react-query'
type Props={
    children:React.ReactNode
}
const queryClient= new QueryClient( )
export default function AppQuery({children}:Props){
    
    return (
        <QueryClientProvider client={queryClient} >

            {children}
        </QueryClientProvider>
    )
}