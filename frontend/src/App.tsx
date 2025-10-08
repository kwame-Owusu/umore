import { useEffect, useState } from "react";
import api from "./lib/api";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [, setPing] = useState<string>("");

  useEffect(() => {
    api
      .get("/ping")
      .then((res) => setPing(JSON.stringify(res.data)))
      .catch((err) => setPing("Error: " + err.message));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
export default App;
