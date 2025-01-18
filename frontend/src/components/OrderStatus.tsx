import { Link, useSearchParams } from "react-router-dom";

export default function OrderStatus() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  if (success === "true") {
    return <h1>Thank you for your order! <br /><br /> Go to <Link to="/">HomePage </Link> </h1>;
  }

  return <h1>Something went wrong with your order. <br /><br />
     Go to Go to <Link to="/">HomePage </Link> </h1>;
}
