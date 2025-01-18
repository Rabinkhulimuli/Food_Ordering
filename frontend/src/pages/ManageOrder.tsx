
import { useGetMyRestaurantOrder } from '../api/myRestroApi'
import OrderItemCard from '../components/OrderItemCard'

function ManageOrder() {
    const {Orders,isLoading}= useGetMyRestaurantOrder()
    if(isLoading){
        return <div>Loading ...</div>
    }
    if(!Orders || Orders.length==0){
        return <div>No active order yet</div>
    }
  return (
    <div
    className="space-y-5 bg-gray-50 p-10 rounded-lg"
    >
        <h2
         className="text-2xl font-bold"
        >{Orders.length} active orders </h2>
      {Orders.map((order)=> (
        <OrderItemCard order={order} key={order._id}  />
      ))}
    </div>
  )
}

export default ManageOrder
