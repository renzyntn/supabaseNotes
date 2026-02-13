import { Routes, Route, Navigate } from "react-router";
import { useState, useEffect } from "react";
import supabase from "./config/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Loading from "./components/Loading/Loading";

function App() {
  const [session, setSession] = useState<Session | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const currentSession = await supabase.auth.getSession();
      setSession(currentSession.data.session);
      setIsLoading(false);
    };
    fetchSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={session ? <Home /> : <Navigate to="/sign-in" />}
      />
      <Route path="/sign-in" element={<Auth isPage="signin" />} />
      <Route path="/sign-up" element={<Auth isPage="signup" />} />
    </Routes>
  );
}

export default App;
