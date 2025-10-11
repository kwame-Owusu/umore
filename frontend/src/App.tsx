import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MoodDetail from "./pages/MoodDetail";
import CreateMood from "./pages/CreateMood";
import EditMood from "./pages/EditMood";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mood/:id" element={<MoodDetail />} />
        <Route path="/create-mood" element={<CreateMood />} />
        <Route path="/edit-mood/:id" element={<EditMood />} />
      </Routes>
    </>
  );
}
export default App;
