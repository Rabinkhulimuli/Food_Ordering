import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Profile from "./pages/profile";
import Login from "./pages/login";
import SubPage from "./pages/subLandinPage";
import ProtectedRoute from "./form/protectedRoute";
import AppQuery from "./query/appQuery";
import UserContextProvider from "./userContext/userContextProvide";
import Register from "./pages/register";

import ManageRestaurantPage from "./pages/manageRestaurant";
import Layout from "./layoutPage/layout";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <AppQuery>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage>
                  <SubPage />
                </LandingPage>
              }
            />
            <Route element={<Layout />}>
              <Route element={<ProtectedRoute />}>
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="my-restaurant" element={<ManageRestaurantPage />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppQuery>
    </UserContextProvider>
  );
}

export default App;
