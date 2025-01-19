
import { Order } from '../type'
type Props={
    order:Order
}
function OrderStatusDetail({order}:Props) {
 
  return (
    <div
    className="space-y-10"
    >
      <div
      className='flex flex-col'
      >
        <span
        className='font-bold'
        >Delivering to:</span>
        <span>{order.deliveryDetails.name} </span>
        <span>{order.deliveryDetails.addressLine1},{order.deliveryDetails.city} </span>
      </div>
      <div>
        <span
        className='font-bold'
        >Your Order</span>
        <ul>
            {order.cartItems.map((eh)=> <li>
                {eh.name} x {eh.quantity}
            </li>)}
        </ul>
      </div>
      <div
      className='flex border my-2'
      ></div>
      <div>
        <span
        className='font-bold'
        >Total</span>
        <span>${(order.totalAmount / 100).toFixed(2)} </span>
      </div>
    </div>
  )
}

export default OrderStatusDetail
