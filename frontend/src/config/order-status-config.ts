import { orderStatus } from "../type"

type orderStatusInfo={
    label:string
    value:orderStatus
    progressValue:number
}
export const ORDER_STATUS:orderStatusInfo[]=[
    {label:"Placed",value:"placed",progressValue:5},
    {label:"Awaiting Restaurant confirmation",value:"Paid",progressValue:25},
    {label:"In Progress",value:"inProgress",progressValue:50},
    {label:"Out for Delivery",value:"outForDelivery",progressValue:75},
    {label:"Delivered",value:"delivered",progressValue:100},

]