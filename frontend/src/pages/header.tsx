import { Link, useNavigate } from "react-router-dom";

import { useState, useContext } from "react";
import { logOut } from "../api/apiList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UserContext,
  UserContextType,
} from "../userContext/userContextProvide";
import MobNavbar from "./mobNavbar";

export default function Header() {
  const [toggle, setToggle] = useState(false);

  const { user, change, setChange } =
    useContext<UserContextType>(UserContext);
  const navigate = useNavigate();
  const token= localStorage.getItem("token")
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: logOut,
    mutationKey: ["logOut"],
    onSuccess: () => {
      queryClient.clear();
      setToggle(false);
    },
  });

  const handleLogout = () => {
    try {
      mutate();
    } catch (err) {
      console.log("error loggin out");
    }
  };

  return (
    <>
      <div className=" ">
        <div className="  border-b-4 border-orange-700  bg-white flex items-center justify-between space-between">
          <div
            onClick={() => navigate("/")}
            className="p-8 text-2xl  text-orange-700 font-black tracking-tight cursor-pointer"
          >
            EatMuch.com
          </div>
          {!token && (
            <div className="hidden md:block ">
              <Link
                to="/login"
                className="px-4 py-2 text-lg font-bold text-orange-700 rounded-xl hover:bg-orange-500 hover:text-white mx-12"
              >
                Log In
              </Link>
            </div>
          )}
          {token && (
            <div className="hidden md:block ">
              <div className="flex flex-col items-center justify-center">
                <div
                  className=" cursor-pointer my-2 mx-12 "
                  onClick={() => setToggle(!toggle)}
                >
                  <span className="mx-4 text-lg hover:text-orange-500 font-bold">
                    Order Status
                  </span>
                  <img src="/user1.png" className=" w-6 inline mx-1"></img>
                  <span className="hover:text-orange-500 font-bold">
                    {user.email}{" "}
                  </span>
                </div>
                {toggle && (
                  <div className="z-1 absolute top-20 flex flex-col items-center justify-center border-4 border-orange-700  rounded-md bg-white p-1">
                     <Link
                    to="/my-restaurant"
                    onClick={() => setToggle(!toggle)}
                     className=" px-4 py-2 text-lg font-bold text-orange-700 rounded-xl text-nowrap hover:bg-orange-500 hover:text-white"
                  >
                    My restaurant
                  </Link>
                    <Link
                      to="/profile"
                      onClick={() => setToggle(!toggle)}
                      className=" px-4 py-2 text-lg font-bold text-orange-700 rounded-xl text-nowrap hover:bg-orange-500 hover:text-white"
                    >
                      User Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className=" px-4 py-2 text-lg font-bold text-orange-700 rounded-xl hover:bg-orange-500 hover:text-white w-full"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className=" md:hidden">
            <img
              className="w-6 block ml-auto mr-4  "
              style={change ? { display: "none" } : { display: "block" }}
              onClick={() => setChange(() => true)}
              src="/drop_down.svg"
            ></img>
          </div>
        </div>
        <MobNavbar
          change={change}
          setChange={setChange}
          handleLogout={handleLogout}
        />
      </div>
    </>
  );
}
