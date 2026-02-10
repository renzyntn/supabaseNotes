import { ClipLoader } from "react-spinners";

function Loading() {
  return (
    <div className="flex justify-center items-center text-red-500">
      <ClipLoader color={"currentColor"} size={80} speedMultiplier={0.5} />
    </div>
  );
}
export default Loading;
