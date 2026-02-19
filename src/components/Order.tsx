import type { OrderProp } from "../@types/propTypes";

function Order({ setOrderBy }: OrderProp) {
  return (
    <div className="flex justify-center items-center gap-2 font-geist">
      <p className="text-black text-base">Order by:</p>
      <button
        className="btn btn-sm rounded-lg bg-white border-red-500 outline-none shadow-none text-red-500 font-normal hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
        onClick={() => setOrderBy("created_at")}
      >
        Date
      </button>
      <button
        className="btn btn-sm rounded-lg bg-white border-red-500 outline-none shadow-none text-red-500 font-normal hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
        onClick={() => setOrderBy("title")}
      >
        Title
      </button>
      <button
        className="btn btn-sm rounded-lg bg-white border-red-500 outline-none shadow-none text-red-500 font-normal hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
        onClick={() => setOrderBy("description")}
      >
        Description
      </button>
    </div>
  );
}
export default Order;
