import type { HeaderProp } from "../@types/propTypes";

function Header({ navigate }: HeaderProp) {
  return (
    <header className="relative flex justify-center items-center px-8 py-5 top-0 bg-red-500">
      <p className="font-geist font-medium text-white text-2xl">Ang Nota Mo</p>
      <button
        className="absolute left-8 size-8 hover:cursor-pointer"
        aria-label="Create note button"
        title="Create note"
        onClick={() => navigate("/?form=create")}
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
