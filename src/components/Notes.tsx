import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import type { NoteData, NotesProp } from "../@types/propTypes";
import NoteCard from "./NoteCard";
import DeleteNote from "./DeleteNote";
import Loading from "./Loading/Loading";

function Notes({
  navigate,
  isLoading,
  setIsLoading,
  isRefresh,
  setIsRefresh,
  showDelete,
  handleDelete,
}: NotesProp) {
  const [notesData, setNotesData] = useState<NoteData[]>([]); // set notesData state inital value as an empty array

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .order("created_at", { ascending: false }); // Get all of the data in Supabase "notes" table. Position data as descending to highlight newly created data at the top

      if (error) {
        console.log(error);
        console.log("Failed to fetch table.");
      } else {
        setNotesData(data); // set notesData state as 'data' (object '{}')
        setIsLoading(false); // set loading state to false to undo/remove loading UI in the app
      }
    };

    fetchData(); // Call async 'fetchData' for it to execute
  }, [isRefresh]); // set refresh state as useEffect dependency. So this useEffect could run again when there's newly created (handleCreate) or updated note (handleUpdate)

  const displayNote = notesData?.map((notedata) => {
    // map notesData array state (assuming it has the data object from supabase)
    return (
      <NoteCard
        key={notedata.id}
        notedata={notedata}
        navigate={navigate}
        setIsLoading={setIsLoading}
        setIsRefresh={setIsRefresh}
      />
    );
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 md:gap-6">
          {displayNote}
        </div>
      )}
      {showDelete && (
        <DeleteNote navigate={navigate} handleDelete={handleDelete} />
      )}
    </>
  );
}
export default Notes;
