import type { NoteCardProp } from "../@types/propTypes";

function NoteCard({ notedata, navigate }: NoteCardProp) {
  return (
    <div className="relative w-full flex flex-col justify-center items-start p-5 gap-3 rounded-xl border border-gray-300 font-geist text-black">
      <h2 className="font-bold text-2xl">{notedata.title}</h2>
      <p className="font-normal text-base">{notedata.description}</p>
      <div className="absolute top-5 right-5 flex justify-center items-center gap-1">
        <button
          className="size-6 lg:size-7 hover:cursor-pointer active:scale-90 transform duration-200 ease-in-out"
          title="Update Note"
          aria-label="Update button"
          onClick={() => navigate(`/?form=update&id=${notedata.id}`)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke={"currentColor"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m14.304 4.844l2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565l6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            ></path>
          </svg>
        </button>
        <button
          className="size-6 text-red-500 hover:cursor-pointer active:scale-90 transform duration-200 ease-in-out"
          title="Delete Note"
          aria-label="Delete button"
          onClick={() => navigate(`/?form=delete&id=${notedata.id}`)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke={"currentColor"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1M6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
export default NoteCard;
