import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Profile from "./pages/profile";
import Login from "./pages/login";
import SubPage from "./pages/subLandinPage";
import AppQuery from "./query/appQuery";
import UserContextProvider from "./userContext/userContextProvide";
function App() {
  return (
    
      <AppQuery>
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
            <Route path="/login" element={<Login />} />
          </Routes>
          </BrowserRouter>
        </UserContextProvider>
      </AppQuery>
    
  );
}

export default App;
