import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Auth from "./components/auth/Auth";
import Profile from "./components/Profile";
import CompleteProfile from "./components/auth/CompleteProfile";
import Feed from "./components/Feed";


const AppLayout = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Feed />}/>
          <Route path="/signin" element={<Auth />} />
          <Route path="/completeprofile" element={<CompleteProfile />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
