import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import type { FormModalProp } from "../@types/propTypes";

function FormModal({
  formTitle,
  buttonLabel,
  navigate,
  functionLogic,
  id,
}: FormModalProp) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchNoteData = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        console.log("Error: Failed to fetch ID's data.");
        navigate("/");
      } else {
        setTitle(data.title);
        setDescription(data.description);
      }
    };

    fetchNoteData();
  }, [id, navigate]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description) {
      console.log("Error: Please fill the necessary fields.");
      return;
    }

    await functionLogic(title, description);

    setTitle("");
    setDescription("");
  };

  return (
    <dialog className="w-screen h-screen flex justify-center items-center p-8 fixed inset-0 z-99 bg-transparent backdrop-blur-sm">
      <form
        className="relative w-md flex flex-col justify-center items-start p-6 gap-4 bg-white border border-gray-300 rounded-xl font-geist"
        onSubmit={handleSubmit}
      >
        <h2 className="text-black font-bold text-2xl">{formTitle}</h2>
        <button
          className="absolute top-6 right-6 size-6 text-black hover:cursor-pointer"
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
        <fieldset className="fieldset w-full text-base">
          <legend className="fieldset-legend text-black">
            Title<span className="text-red-500">*</span>
          </legend>
          <input
            className="input input-md w-full validator bg-white border border-gray-400 rounded-lg text-black"
            placeholder="Note title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset w-full text-base">
          <legend className="fieldset-legend text-black">
            Description<span className="text-red-500">*</span>
          </legend>
          <textarea
            className="textarea w-full validator bg-white border border-gray-400 rounded-lg text-black resize-none"
            placeholder="Write something..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </fieldset>
        <div className="w-full flex justify-end items-center gap-3">
          <button
            className="btn btn-md rounded-xl border-none bg-black text-white font-normal shadow-none"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            className="btn btn-md rounded-xl border-none bg-red-500 text-white font-normal shadow-none"
            type="submit"
          >
            {buttonLabel}
          </button>
        </div>
      </form>
    </dialog>
  );
}
export default FormModal;
