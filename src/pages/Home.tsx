import { useSearchParams, useNavigate } from "react-router";
import { useState } from "react";
import supabase from "../config/supabaseClient";
import Header from "../components/Header";
import Notes from "../components/Notes";
import FormModal from "../components/FormModal";
import Footer from "../components/Footer";

function Home() {
  const [searchParams] = useSearchParams(); // Declare useSearchParams hook
  const showCreate = searchParams.get("form") === "create"; // Declare a boolean that returns true or false if route parameter '/?form=create' is accessed.
  const showUpdate = searchParams.get("form") === "update"; // Declare a boolean that returns true or false if route parameter '/?form=update' is accessed.
  const showDelete = searchParams.get("form") === "delete"; // Declare a boolean that returns true or false if route parameter '/?form=delete' is accessed.
  const id = searchParams.get("id"); // Declare const 'id' that holds the data with its primary id.

  const navigate = useNavigate(); // Declare useNavigate hook to be able to navigate to other pages.

  const [isRefresh, setIsRefresh] = useState(0); // Declare refresh state (number) as a dependency in useEffect 'fetchData'
  const [isLoading, setIsLoading] = useState(true); // Set loading state initial value to true
  const [isToast, setIsToast] = useState(false); // Set toast state initial value to false

  const handleCreate = async (title: string, description: string) => {
    // Declare title and description parameters
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, description }])
      .select(); // Insert/Add incoming 'title' and 'description' arguments in Supabase table "notes" as an array of object '[{}]'

    if (error) {
      console.log(error);
      console.log("Error: failed to add data.");
    }

    if (data) {
      setIsRefresh((prev) => prev + 1); // increment refresh state for 'changes' and this will trigger useEffect 'fetchData' to re-run
      setIsLoading(true); // set loading state to true for it to re-run/show in the app after successful data/note instertion/add
      navigate("/"); // navigate back to 'home' route
    }
  };

  const handleUpdate = async (title: string, description: string) => {
    // Declare title and description parameters
    const { data, error } = await supabase
      .from("notes")
      .update({ title, description })
      .eq("id", id)
      .select(); // Update/Edit incoming 'title' and 'description' arguments in Supabase table "notes" as a single object '{}'

    if (error) {
      console.log(error);
      console.log("Error: failed to update data.");
    }

    if (data) {
      setIsRefresh((prev) => prev + 1); // increment refresh state for 'changes' and this will trigger useEffect 'fetchData' to re-run
      setIsLoading(true); // set loading state to true for it to re-run/show in the app after successful data/note instertion/add
      navigate("/"); // navigate back to 'home' route
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("notes").delete().eq("id", id); // Delete/Remove data based on its primary id in Supabase table "notes"
    // I didn't declare 'data' object from Supabase because it doesn't return anything. And this function's job is to only delete data
    if (error) {
      console.log(error);
      console.log("Error: failed to delete data.");
    } else {
      setIsRefresh((prev) => prev + 1); // increment refresh state for 'changes' and this will trigger useEffect 'fetchData' to re-run
      setIsLoading(true); // set loading state to true for it to re-run/show in the app after successful data/note instertion/add
      navigate("/"); // navigate back to 'home' route
    }
  };

  return (
    <>
      <Header navigate={navigate} />
      <main className="max-w-screen min-h-screen p-8 bg-white overflow-auto">
        <section>
          <Notes
            navigate={navigate}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isRefresh={isRefresh}
            setIsRefresh={setIsRefresh}
            showDelete={showDelete}
            handleDelete={handleDelete}
          />
        </section>
        {showCreate && (
          <FormModal
            formTitle={"Create New Note"}
            buttonLabel={"Create"}
            navigate={navigate}
            id={id}
            functionLogic={handleCreate}
            isToast={isToast}
            setIsToast={setIsToast}
          />
        )}
        {showUpdate && (
          <FormModal
            formTitle={"Update Note"}
            buttonLabel={"Update"}
            navigate={navigate}
            id={id}
            functionLogic={handleUpdate}
            isToast={isToast}
            setIsToast={setIsToast}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Home;
