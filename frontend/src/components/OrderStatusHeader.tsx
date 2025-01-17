
import { Order } from '../type'
import { ORDER_STATUS } from '../config/order-status-config';
type Props={
    order:Order
}
function OrderStatusHeader({order}:Props) {
   
    
    const getExpectedDelivery=()=> {
        const created=new Date(order.createdAt);
        created.setMinutes(
            created.getMinutes() + order.restaurant.estimatedDeliveryTime
        )
        const hour=created.getHours()
        const Minutes= created.getMinutes()
        const paddedMinutes= Minutes <10 ?`0${Minutes}`:Minutes
        return `${hour}:${paddedMinutes}`
    }
    const getOrderStatusInfo=()=> {
        return (ORDER_STATUS.find((o)=> o.value.toLowerCase() ===order.status.toLowerCase()))||ORDER_STATUS[0]
    }
    const {progressValue}= getOrderStatusInfo()
  return (
    <>
    <h1
    className=' text-4xl font-bold tracking-tighter capitalize flex flex-col gap-5 md:flex-row md:justify-between items-center px-2'
    >
        <span>Order status:{getOrderStatusInfo().label} </span>
        <span>Expected By: {getExpectedDelivery()} </span>
    </h1>
    <div
    className='flex bg-gray-400 border border-gray-800 w-full rounded-full'
    >
        <div
        className={`flex bg-green-400 border border-gray-800 p-1 rounded-full `}
        style={{width:`${progressValue}%`}}
        >
          
        </div>
    </div>
    </>
  )
}



export default OrderStatusHeader

