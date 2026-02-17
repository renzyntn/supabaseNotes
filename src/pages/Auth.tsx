import { Link, useNavigate } from "react-router";
import { useState } from "react";
import supabase from "../config/supabaseClient";
import type { AuthProp } from "../@types/propTypes";
import AuthToast from "../components/Toast/AuthToast";

function Auth({ isPage }: AuthProp) {
  const [email, setEmail] = useState(""); // declare email state as an empty string
  const [password, setPassword] = useState(""); // declare password state as an empty string

  const [isToast, setIsToast] = useState(false); // declare toast state as false
  const [toastMsg, setToastMsg] = useState(""); // declare toast message state as an empty string

  const navigate = useNavigate(); // declare useNavigate hook as constant

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      // creates a new user based on their email and password
      email,
      password,
    });

    const emailExist = data.user?.identities?.length === 0; // declare emailExist as a boolean to identify if the email used on signing up exist or already registered

    if (error) {
      setToastMsg("Error signing up");
      setPassword("");
      setIsToast(true); // set toast state value to true
      setTimeout(() => {
        setIsToast(false); // and then after 3 seconds, set it to false again (to remove toast UI)
      }, 3000);
      return; // stop the function
    }

    if (emailExist) {
      setToastMsg("Email is already registered. Please use a different one.");
      setPassword("");
      setIsToast(true); // set toast state value to true
      setTimeout(() => {
        setIsToast(false); // and then after 3 seconds, set it to false again (to remove toast UI)
      }, 3000);
      return; // stop the function
    }

    navigate("/"); // when both of the condition is false, navigate the user to the home page
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      // check user's credentials based on their email and password
      email,
      password,
    });

    if (error) {
      setToastMsg("Invalid credentials. Please try again.");
      setPassword("");
      setIsToast(true); // set toast state value to true
      setTimeout(() => {
        setIsToast(false); // and then after 3 seconds, set it to false again (to remove toast UI)
      }, 3000);
      return; // stop the function
    }

    navigate("/"); // when condition is false, navigate the user to the home page
  };

  const handleAuth = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPage === "signin") {
      handleSignIn(); // if user is on '/sign-in' page, use this handleSignIn() function
    }

    if (isPage === "signup") {
      handleSignUp(); // if user is on '/sign-up' page, use this handleSignUp() function
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white p-8">
      {isToast && <AuthToast message={toastMsg} />}
      <form
        className="w-sm flex flex-col justify-center items-center p-6 gap-3 bg-white border border-gray-300 rounded-xl font-geist"
        onSubmit={handleAuth}
      >
        <h2 className="text-black font-bold text-2xl">
          {isPage === "signin" ? "Sign In" : "Sign Up"}
        </h2>
        <h3 className="text-gray-500 font-light text-base">
          {isPage === "signin"
            ? "Pick up where you left off."
            : "Join and start organizing your thoughts."}
        </h3>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-black text-sm">Email</legend>
          <input
            className="input input-md w-full bg-white border border-gray-300 rounded-lg text-black"
            placeholder="johndoe@example.com"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-black text-sm">
            Password
          </legend>
          <input
            className="input input-md w-full bg-white border border-gray-300 rounded-lg text-black"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <div className="w-full flex flex-col gap-4">
          <button
            className="btn btn-md w-full rounded-lg border-none bg-red-500 text-white font-normal shadow-none"
            type="submit"
          >
            {isPage === "signin" ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-center text-black text-sm">
            {isPage === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span className="ml-1">
              <Link
                to={isPage === "signin" ? "/sign-up" : "/sign-in"}
                className="text-violet-500 underline"
              >
                {isPage === "signin" ? "Sign Up" : "Sign In"}
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Auth;
