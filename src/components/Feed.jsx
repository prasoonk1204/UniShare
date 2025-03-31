import { useState, useEffect, useRef } from "react";
import axios from "axios";

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

const Feed = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token");
      window.location.href = "/signin";
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

          window.location.href = "/completeprofile";
          return;
        }

        setUser(res);
      } else {
        console.log("User not found");
        localStorage.removeItem("token");
        window.location.href = "/signin";
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (!user) return null;

  return (
    <div className="feed">
      <h1>Welcome to the Feed, {user.name}!</h1>
    </div>
  );
};

export default Feed;
