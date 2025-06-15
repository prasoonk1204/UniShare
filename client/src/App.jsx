import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Auth from "./components/auth/Auth";
import Profile from "./components/Profile";
import CompleteProfile from "./components/auth/CompleteProfile";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Requests from "./pages/Requests";
import MyPosts from "./pages/MyPosts";
import Post from "./pages/Post";
import NotApproved from "./pages/NotApproved";

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
          <Route path="/" element={<Home />}>
            <Route index element={<Feed />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post" element={<Post />} />
            <Route path="/notapproved" element={<NotApproved />} />
          </Route>
          <Route path="/signin" element={<Auth />} />
          <Route path="/completeprofile" element={<CompleteProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
