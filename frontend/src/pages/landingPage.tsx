import Header from "./header";
import Footer from "./footer";
import { UserContext } from "../userContext/userContextProvide";
import { useContext } from "react";
type Props = {
  children: React.ReactNode;
};

export default function LandingPage({ children }: Props) {
  const{change}=useContext(UserContext)
  return (
    <>
      
      <Header />
      <div
        style={change ? { opacity: "0.4", backgroundColor: "grey" } : {}}
      >
        {children}
        <Footer />
      </div>
    </>
  );
}
