import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Profile from "./pages/profile";
import Login from "./pages/login";
import SubPage from "./pages/subLandinPage";

import UserContextProvider from "./userContext/userContextProvide";
import Register from "./pages/register";
import axios from "axios";
axios.defaults.baseURL="http://localhost:5000/user"
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
            <Route path="/profile" element={<Profile />} />
            <Route path='/register' element={<Register/>} />
            <Route path="/login" element={<Login />} />
          </Routes>
          </BrowserRouter>
        </UserContextProvider>
    
    
  );
}

export default App;
