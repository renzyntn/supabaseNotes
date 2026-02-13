import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import type { FormModalProp } from "../@types/propTypes";
import Toast from "./Toast/Toast";

function FormModal({
  formTitle,
  buttonLabel,
  navigate,
  functionLogic,
  id,
  isToast,
  setIsToast,
}: FormModalProp) {
  const [title, setTitle] = useState(""); // Declare title state (string) as an empty string
  const [description, setDescription] = useState(""); // Declare title state (string) as an empty string

  useEffect(() => {
    document.body.classList.add("overflow-hidden"); // When in create/update params, hide the scrollbar

    return () => {
      document.body.classList.remove("overflow-hidden"); // When not, unhide the scrollbar
    };
  }, []);

  useEffect(() => {
    if (!id) {
      return; // When 'id' is false, don't proceed to 'fetchNoteData' and return immediately
    }
    const fetchNoteData = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .eq("id", id)
        .single(); // Select chosen id's data as a single object '{}' from Supabase table "notes"

      if (error) {
        console.log(error);
        console.log("Error: Failed to fetch ID's data.");
        navigate("/"); // If not successful, navigate back to 'home' page
      } else {
        setTitle(data.title); // Else, set title state as data.title (bali yung ni-return ng data after successful fetch. Also, yung .title ay column name ng "notes" table)
        setDescription(data.description); // Else, set description state as data.description (bali yung ni-return ng data after successful fetch. Also, yung .description ay column name ng "notes" table)
      }
    };

    fetchNoteData(); // Call async 'fetchNoteData' for it to execute
  }, [id, navigate]); // Pass id as dependency since it changes when different note/data were selected. Also navigate since routes changes too when FormModal is accessed (could be '/?form=create' or '/?form=update')

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent browser's bevahior

    if (!title.trim() || !description.trim()) {
      setIsToast(true); // set toast state to true
      setTimeout(() => setIsToast(false), 2500); // After 3 seconds, set toast state again to false for Toast UI to disappear
      return; // If user tries to submit without filling both of the fields, prevent to add the incomplete data
    }

    await functionLogic(title.trim(), description.trim()); // Get title and description result and put it in functionLogic props as arguments (these will be the data return in either async 'handleCreate' or async 'handleUpdate' function) Also add .trim() to prevent adding white spaces

    setTitle(""); // set title state as an empty string after successful update
    setDescription(""); // set title state as an empty string after successful update
  };

  return (
    <dialog className="w-screen h-screen flex justify-center items-center p-8 fixed inset-0 z-99 bg-transparent backdrop-blur-sm">
      {isToast && <Toast />}
      <form
        className="relative w-md flex flex-col justify-center items-start p-6 gap-4 bg-white border border-gray-300 rounded-xl font-geist"
        onSubmit={handleSubmit} // set async 'handleSubmit' as form's onSubmit attribute
      >
        <h2 className="text-black font-bold text-2xl">{formTitle}</h2>
        <button
          className="absolute top-6 right-6 size-6 text-black hover:cursor-pointer"
          type="button"
          aria-label="Close button"
          onClick={() => navigate("/")} // navigate back to home page when 'X' icon or close button gets click
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
            value={title} // set 'title' state as input's value attribute (so whatever data is typed in Input, it will be the 'title' state's new value)
            onChange={(e) => setTitle(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset w-full text-base">
          <legend className="fieldset-legend text-black">Description</legend>
          <textarea
            className="textarea w-full bg-white border border-gray-400 rounded-lg text-black resize-none"
            placeholder="Write something..."
            value={description} // set 'description' state as input's value attribute (so whatever data is typed in Input, it will be the 'description' state's new value)
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </fieldset>
        <div className="w-full flex justify-end items-center gap-3">
          <button
            className="btn btn-md rounded-xl border-none bg-black text-white font-normal shadow-none"
            type="button"
            onClick={() => navigate("/")} // navigate back to home page when cancel button gets click
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
