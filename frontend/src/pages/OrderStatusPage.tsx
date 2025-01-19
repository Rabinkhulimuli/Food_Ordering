import { useGetMyOrder } from '../api/orderApi'
import OrderStatusDetail from '../components/OrderStatusDetail';
import OrderStatusHeader from '../components/OrderStatusHeader';

function OrderStatusPage() {
    const {orders,isLoading}= useGetMyOrder();
    if (isLoading){
        return <div>Loading ...</div>
    }
   
    if(!orders || orders.length==0){
        return "No Order Found"
    }
  return (
    <div
    className='space-y-10'
    >
      {orders.map((order)=> {
        return (
          <div
          className='space-y-10 bg-gray-50 p-10 rounded-lg'
          >
            <OrderStatusHeader order={order}/>
            <div
            className='grid gap-10 md:grid-cols-2 '
            >
              <OrderStatusDetail order={order}/>
              <div
              className='aspect-[16/6]'
              >
                <img src={order.restaurant.imageUrl}
                className='w-full h-full object-cover rounded-md '
                />
              </div>
            </div>
          </div>

        )
      })}
    </div>
  )
}

export default OrderStatusPage
