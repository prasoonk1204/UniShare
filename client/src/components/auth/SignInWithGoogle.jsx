import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase";
import axios from "axios";
import { useNavigate } from "react-router";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5555";

const SignInWithGoogle = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (res) => {
      console.log(res.user);

      const userData = {
        userId: res.user.uid,
        name: res.user.displayName,
        email: res.user.email,
        image: res.user.photoURL,
      };

      console.log(userData);
      setUser(userData);

      handleSignin(userData);
    });
  };

  const handleSignin = async (userData) => {
    try {
      await axios.post(`${BACKEND_URL}/signin`, userData).then(function (res) {

        console.log(res);

        const {user, token} = res.data

        if(user.profileCompleted === false) {
          alert("Please complete your profile");

          localStorage.clear();
          localStorage.setItem("token", token);

          navigate("/completeprofile");

          return;
        }

        else{
          localStorage.clear();
          localStorage.setItem("token", token);

          alert("Signin successful");
          navigate("/");
        }

      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={googleLogin} className="cursor-pointer bg-neutral-200 flex items-center gap-4 px-8 py-4 rounded-xl hover:bg-neutral-300/80 transition-all duration-300 hover:-translate-y-1 text-neutral-600">
        <img
          src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
          alt=""
          className="w-6"
        />
        <h1 className="font-semibold text-xl">Sign in with Google</h1>
      </button>
    </div>
  );
};

export default SignInWithGoogle;
