import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Outlet, useNavigate, useLocation } from "react-router";
import Navbar from "../components/Navbar";

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
        console.log(res);

        if (res.profileCompleted === false && isFirstRender.current) {
          isFirstRender.current = false;

          alert("Please complete your profile");

          localStorage.clear();
          localStorage.setItem("token", token);

          navigate("/completeprofile");
          return;
        }

        setUser(res);
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

  return (
    <div className="px-4 sm:px-10 md:px-20 bg-white pb-4 relative">
      <Navbar />
      <div className="h-18"></div>
      <Outlet />
      {showButton ? (
        <button className="fixed bg-emerald-500 bottom-10 right-10 md:right-20 z-10 px-6 py-2 rounded-xl hover:scale-110 transition-all duration-200 text-lg shadow-lg text-white">
          Post+
        </button>
      ) : null}
    </div>
  );
};

export default Home;
