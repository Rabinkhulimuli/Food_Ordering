import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SubPage from "./pages/subLandinPage";
import ProtectedRoute from "./form/protectedRoute";
import AppQuery from "./query/appQuery";
import UserContextProvider from "./userContext/userContextProvide";
import Register from "./pages/register";
import SearchPage from "./pages/searchPage";
import ManageRestaurantPage from "./pages/manageRestaurant";
import ManageProfile from "./form/manageProfile";
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
            
            <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <SubPage />
                
              }
            />
              <Route element={<ProtectedRoute />}>
                <Route path="profile" element={<ManageProfile />} />
                <Route path="my-restaurant" element={<ManageRestaurantPage />} />
              </Route>
             
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="search/:city" element={<SearchPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppQuery>
    </UserContextProvider>
  );
}

export default App;
