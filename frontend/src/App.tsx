import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Profile from "./pages/profile";
import Login from "./pages/login";
import SubPage from "./pages/subLandinPage";
import ProtectedRoute from "./form/protectedRoute";

import UserContextProvider from "./userContext/userContextProvide";
import Register from "./pages/register";
import axios from "axios";
const apiUrl= import.meta.env.VITE_API_BASE_URL
axios.defaults.baseURL=apiUrl
axios.defaults.withCredentials=true
function App() {
  return (
    
     
        <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage>
                  <SubPage/>
                </LandingPage>
              }
            />
            <Route element={<ProtectedRoute/>} >
              <Route path="/profile" element={<Profile />} />
            </Route>
            
            <Route path='/register' element={<Register/>} />
            <Route path="/login" element={<Login />} />
          </Routes>
          </BrowserRouter>
        </UserContextProvider>
    
    
  );
}

export default App;
