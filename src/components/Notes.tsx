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
  const [notesData, setNotesData] = useState<NoteData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        console.log("Failed to fetch table.");
      } else {
        setNotesData(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isRefresh]);

  const displayNote = notesData?.map((notedata) => {
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
