import { useGetMyOrder } from '../api/orderApi'

function OrderStatusPage() {
    const {orders,isLoading}= useGetMyOrder();
    if (isLoading){
        return <div>Loading ...</div>
    }
    if(!orders || orders.length==0){
        return "No Order Found"
    }
  return (
    <div>
      
    </div>
  )
}

export default OrderStatusPage
