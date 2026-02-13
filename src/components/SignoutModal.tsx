import { useEffect } from "react";
import type { SignOutProp } from "../@types/propTypes";

function SignoutModal({ navigate, handleSignOut }: SignOutProp) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <dialog className="w-screen h-screen flex justify-center items-center p-8 fixed inset-0 z-99 bg-transparent backdrop-blur-sm">
      <div className="relative w-sm flex flex-col justify-center items-center p-4 gap-4 bg-white border border-gray-300 rounded-2xl font-geist text-black">
        <button
          className="absolute top-4 right-4 size-6 text-black hover:cursor-pointer"
          type="button"
          aria-label="Close button"
          onClick={() => navigate("/")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill={"currentColor"}
              d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
            ></path>
          </svg>
        </button>
        <h2 className="font-semibold text-2xl">Sign Out?</h2>
        <p className="text-center text-base">
          Are you sure you want to sign out?
        </p>
        <div className="w-full flex flex-row justify-center items-center gap-3">
          <button
            className="btn btn-md w-20 rounded-xl border-none bg-red-500 text-white font-normal shadow-none"
            type="button"
            onClick={handleSignOut}
          >
            Yes
          </button>
          <button
            className="btn btn-md w-20 rounded-xl border-none bg-black text-white font-normal shadow-none"
            type="button"
            onClick={() => navigate("/")}
          >
            No
          </button>
        </div>
      </div>
    </dialog>
  );
}
export default SignoutModal;
