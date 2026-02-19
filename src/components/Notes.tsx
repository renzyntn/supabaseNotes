import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import type { NoteData, NotesProp } from "../@types/propTypes";
import NoteCard from "./NoteCard";
import DeleteNote from "./DeleteNote";
import Loading from "./Loading/Loading";
import Search from "./Search";
import Order from "./Order";

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
  const [searchQuery, setSearchQuery] = useState(""); // declare searchQuery state initial value as an empty string
  const [orderBy, setOrderBy] = useState("created_at");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select()
        .order(orderBy, { ascending: false }); // Get all of the data in Supabase "notes" table. Position data as ascending false to highlight newly created data at first

      if (error) {
        console.log(error);
        console.log("Failed to fetch table.");
      } else {
        setNotesData(data); // set notesData state as 'data' (object '{}')
        setIsLoading(false); // set loading state to false to undo/remove loading UI in the app
      }
    };

    fetchData(); // Call async 'fetchData' for it to execute
  }, [isRefresh, orderBy]); // set refresh state as useEffect dependency. So this useEffect could run again when there's newly created (handleCreate) or updated note (handleUpdate)

  // declare a filterSearchResult function and filter notesData object
  const filterSearchResult = notesData.filter((note) => {
    const query = searchQuery.toLowerCase().trim(); // declare const query to convert the value inputted as lower cases and remove white space
    const splitWords = query.split(" "); // split search query into individual words "helloworld => [hello, world]"
    const combinedWords = `${note.title} ${note.description}`.toLowerCase(); // declare combinedWords to merge note.title and note.description into one string and convert to lower case

    return splitWords.every((word) => combinedWords.includes(word)); // check if combinedWords includes one of the spliWords values
  });

  const displayNote = filterSearchResult.map((notedata) => {
    // map filterSearchResult array object and display each of its values including filtered ones based on search query
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
    <section className="flex flex-col gap-6">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Order setOrderBy={setOrderBy} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 md:gap-6">
            {displayNote}
          </div>
        </>
      )}
      {showDelete && (
        <DeleteNote navigate={navigate} handleDelete={handleDelete} />
      )}
    </section>
  );
}
export default Notes;
