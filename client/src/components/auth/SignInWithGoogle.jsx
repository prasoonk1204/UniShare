import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5555";

const SignInWithGoogle = () => {
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

          window.location.href = "/completeprofile";

          return;
        }

        else{
          localStorage.clear();
          localStorage.setItem("token", token);

          alert("Signin successful");
          window.location.href = "/";
        }

      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={googleLogin} className="cursor-pointer">
        <img src="signin-button.png" alt="" className="w-60" />
      </button>
    </div>
  );
};

export default SignInWithGoogle;
