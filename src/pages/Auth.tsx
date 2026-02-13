import { Link, useNavigate } from "react-router";
import { useState } from "react";
import supabase from "../config/supabaseClient";
import type { AuthProp } from "../@types/propTypes";

function Auth({ isPage }: AuthProp) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleAuth = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error: signUp } = await supabase.auth.signUp({ email, password }); // I should separate this signUp function and SignIn outside this authHandler.

    if (signUp) {
      console.log("Error signing up");
      console.log(signUp);
      return;
    } else {
      console.log(
        "Sign up successful. Please check your email for your account confirmation", // This should be a Toast pop-up
      );
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.log(signInError); // this one too should be a toast pop-up
      return;
    } else {
      navigate("/");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white p-8">
      <form
        className="w-sm flex flex-col justify-center items-center p-6 gap-4 bg-white border border-gray-300 rounded-xl font-geist"
        onSubmit={handleAuth}
      >
        <h2 className="text-black font-bold text-2xl">
          {isPage === "signin" ? "Sign In" : "Sign Up"}
        </h2>
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
