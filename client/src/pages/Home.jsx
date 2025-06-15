import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Outlet, useNavigate, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import NotApproved from "./NotApproved";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5555";

const verifyToken = async (token) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/verifytoken`, { token });

    console.log("TOKEN VERIFY", res);

    return res.data;
  } catch (err) {
    console.error("Error verifying token:", err);
    return null;
  }
};

const Home = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname;

  const showButton =
    path === "/" || path === "/requests" || path === "/myposts";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token");
      navigate("/signin");
      return;
    }

    verifyToken(token).then((res) => {
      if (res) {
        console.log("HOME TOKEN VERIFY", res);

        if (!res.profileCompleted && isFirstRender.current) {
          isFirstRender.current = false;
          alert("Please complete your profile");
          localStorage.clear();
          localStorage.setItem("token", token);
          navigate("/completeprofile");
          return;
        }

        if (!res.approved) {
          alert("Your profile is not approved by admin yet.");
          navigate("/notapproved");
        }

        setUser(res);
        localStorage.setItem("userName", res.name);
        localStorage.setItem("userId", res.userId);
      } else {
        console.log("User not found");
        localStorage.removeItem("token");
        navigate("/signin");
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (!user) return null;

  if (user && !user.approved && path !== "/profile") {
    return (
      <div className="px-4 sm:px-10 md:px-20 bg-white pb-4 h-screen">
        <Navbar />
        <NotApproved />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-10 md:px-20 bg-white pb-4 relative">
      <Navbar />
      <div className="h-20"></div>
      <Outlet />
      {showButton ? (
        <button
          className="fixed bg-emerald-500 bottom-10 right-10 md:left-20 z-10 px-6 py-3 rounded-xl hover:scale-105 transition-all duration-200 text-lg shadow-lg text-white w-[19vw] min-w-fit"
          onClick={() => {
            navigate("/post");
          }}
        >
          Post+
        </button>
      ) : null}
    </div>
  );
};

export default Home;
