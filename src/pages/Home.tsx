import { useSearchParams, useNavigate } from "react-router";
import { useState } from "react";
import supabase from "../config/supabaseClient";
import Header from "../components/Header";
import Notes from "../components/Notes";
import FormModal from "../components/FormModal";
import Footer from "../components/Footer";

function Home() {
  const [searchParams] = useSearchParams();
  const showCreate = searchParams.get("form") === "create";
  const showUpdate = searchParams.get("form") === "update";
  const showDelete = searchParams.get("form") === "delete";
  const id = searchParams.get("id");

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(0);

  const handleCreate = async (title: string, description: string) => {
    const { data, error } = await supabase
      .from("notes")
      .insert([{ title, description }])
      .select();

    if (error) {
      console.log(error);
      console.log("Error: failed to add data.");
    }

    if (data) {
      setIsRefresh((prev) => prev + 1);
      setIsLoading(true);
      navigate("/");
    }
  };

  const handleUpdate = async (title: string, description: string) => {
    const { data, error } = await supabase
      .from("notes")
      .update({ title, description })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
      console.log("Error: failed to update data.");
    }

    if (data) {
      setIsRefresh((prev) => prev + 1);
      setIsLoading(true);
      navigate("/");
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) {
      console.log(error);
      console.log("Error: failed to delete data.");
    } else {
      setIsRefresh((prev) => prev + 1);
      setIsLoading(true);
      navigate("/");
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
          />
        )}
        {showUpdate && (
          <FormModal
            formTitle={"Update Note"}
            buttonLabel={"Update"}
            navigate={navigate}
            id={id}
            functionLogic={handleUpdate}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Home;
