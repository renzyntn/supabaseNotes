import type { HeaderProp } from "../@types/propTypes";

function Header({ navigate }: HeaderProp) {
  return (
    <header className="relative flex justify-center items-center px-8 py-5 top-0 bg-red-500">
      <div className="flex flex-wrap gap-2 justify-center items-center">
        <div className="size-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M8.241 16.472q.143-.144.143-.357V4.5q0-.213-.143-.356Q8.097 4 7.884 4t-.356.144t-.143.356v11.616q0 .212.144.356t.356.143t.356-.143M6.231 21q-.93 0-1.58-.65Q4 19.698 4 18.77V5.23q0-.929.65-1.58Q5.302 3 6.23 3H15q.666 0 1.14.475q.476.474.476 1.14V16q0 .666-.475 1.14q-.475.476-1.141.476H6.23q-.501 0-.865.341Q5 18.3 5 18.804t.365.85t.866.346h12.154q.269 0 .442-.173t.173-.442V5.5q0-.213.144-.356T19.501 5t.356.144T20 5.5v13.885q0 .666-.475 1.14t-1.14.475z"
            ></path>
          </svg>
        </div>
        <h1 className="font-geist font-medium text-white text-2xl">
          Ang Nota Mo
        </h1>
      </div>
      <button
        className="absolute left-8 size-8 hover:cursor-pointer"
        aria-label="Create note button"
        title="Create note"
        onClick={() => navigate("/?form=create")} // navigate to 'Create New Note' FormModal
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1"
          ></path>
        </svg>
      </button>
    </header>
  );
}
export default Header;
