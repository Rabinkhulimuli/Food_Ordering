import React, { useEffect, useState } from "react";
import { Order, orderStatus } from "../type";
import { useUpdateMyrestaurantOrder } from "../api/myRestroApi";
type Props = {
  order: Order;
  key:string
};
function OrderItemCard({ order,key }: Props) {
  const [status, setStatus] = useState<orderStatus>(order.status);
  useEffect(()=>{
    setStatus(order.status)
  },[order.status])
  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);
    const hour = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hour}:${paddedMinutes}`;
  };
  const { updateRestaurantStatus, isPending: isLoading } =
    useUpdateMyrestaurantOrder();
  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus=event.target.value as orderStatus
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };
  return (
    <div key={key} >
      <div className="grid md:grid-cols-4 gap-4 justify-between mb-3">
        <div>
          <span>Customer Name</span>
          <span className="ml-2 font-normal">
            {order.deliveryDetails.name}{" "}
          </span>
        </div>
        <div>
          <span>Customer Address:</span>
          <span className="ml-2 font-normal">
            {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}{" "}
          </span>
        </div>
        <div>
          <span>Time:</span>
          <span className="ml-2 font-normal">{getTime()} </span>
        </div>
        <div>
          <span>Total Cost:</span>
          <span className="ml-2 font-normal">
            ${(order.totalAmount / 100).toFixed(2)}{" "}
          </span>
        </div>
      </div>
      <div className="flex bg-gray-500 border"></div>
      <div>
        <div className="flex flex-col gap-2">
          {order.cartItems.map((item) => (
            <li
            key={item.menuItemId}
            >
              {item.quantity} {item.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col">
          <label htmlFor="status">What is the status ?</label>
          <select
            name="status"
            id="status"
            value={status}
            disabled={isLoading}
            onChange={ handleStatusChange}
            className="px-2 focus:outline-none focus:ring-2 focus:ring-black  transition duration-300"
          >
            <option disabled value="">
              Status
            </option>
            <option value="Paid">Paid</option>
            <option value="placed">Placed</option>
            <option value="inProgress">In Progress</option>
            <option value="outForDelivery">Out of delivery</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default OrderItemCard;
