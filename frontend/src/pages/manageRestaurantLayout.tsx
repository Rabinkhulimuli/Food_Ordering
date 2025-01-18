import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function ManageRestaurantLayout() {
  const styles = {
    backgroundColor: "white",
    padding: " 1px 8px",
    border: "2px solid gray ",
    borderRadius: "12px",
  };
  return (
    <div className=" ">
      <div className="flex gap-4 my-4 w-fit py-1 px-4 font-bold bg-gray-100">
        <NavLink
          style={({ isActive }) => (isActive ? styles : undefined)}
          to="order"
        >
          Order
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? styles : undefined)}
          to="manageRestaurant"
        >
          Manage Restaurant
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default ManageRestaurantLayout;
