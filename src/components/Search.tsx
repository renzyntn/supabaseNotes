import type { SearchProp } from "../@types/propTypes";

function Search({ searchQuery, setSearchQuery }: SearchProp) {
  return (
    <div className="flex justify-start items-center gap-3 font-geist">
      <label className="input input-md bg-white outline-none border border-gray-300 rounded-xl">
        <svg
          className="size-4 opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="black"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="text-black"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </label>
      <button className="btn btn-md rounded-full border-none bg-red-500 shadow-none text-white font-normal">
        Search
      </button>
    </div>
  );
}
export default Search;
