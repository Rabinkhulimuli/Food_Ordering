import { UserContext } from "../userContext/userContextProvide";
import { useContext } from "react";
import { Link } from "react-router-dom";
interface changeType {
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}
export default function MobNavbar({
  change,
  setChange,
  handleLogout,
}: changeType) {
const {login}= useContext(UserContext)

  return (
    <>
      <div
        className={`${
          change ? "w-screen  h-screen fixed z-1 top-0  backdrop-blur-sm" : ""
        } `}
      >
        <div className="fixed z-10 top-0 right-0 transform trnasition-transform duration-300  md:hidden flex-col w-1/2 right-0 ml-auto ">
          {change && (
            <div className="  w-full    bg-gray-500 flex flex-col items-center md:hidden border-l-4 border-solid border-orange-700  h-screen ">
              <Link to='/' className=" py-16 bg-orange-600 text-white w-full flex items-center justify-center text-xl  text-center tracking-tight font-bold capitalize">
                Wellcome to EatMuch.com{" "}
              </Link>

              <button
                className=" w-full text-center hover:bg-orange-500  font-bold text-gray-100 py-2 text-lg capitalize border-b-4 border-orange-800 pointer"
                onClick={() => setChange(() => false)}
              >
                close
              </button>

              {login && (
                <div className="w-full">
                  <Link
                    to="/my-restaurant"
                    onClick={() => setChange(() => false)}
                    className=" block w-full text-center font-bold text-gray-100 py-2 text-lg capitalize hover:bg-orange-500  border-b-4 border-orange-800 "
                  >
                    My restaurant
                  </Link>
                  <Link
                    className="  block w-full text-center hover:bg-orange-500  font-bold text-gray-100 py-2 text-lg capitalize border-b-4 border-orange-800"
                    to="/profile"
                    onClick={() => setChange(() => false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="  w-full text-center font-bold text-gray-100 py-2 text-lg capitalize hover:bg-orange-500  border-b-4 border-orange-800"
                  >
                    Log Out
                  </button>
                </div>
              )}
              {!login && (
                <Link
                  to="/login"
                  onClick={() => setChange(() => false)}
                  className="  w-full text-center hover:bg-orange-500  font-bold text-gray-100 py-2 text-lg capitalize border-b-4 border-orange-800"
                >
                  Log In
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
