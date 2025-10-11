import { Route, Routes, Navigate } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MoodDetail from "./pages/MoodDetail";
import CreateMood from "./pages/CreateMood";
import EditMood from "./pages/EditMood";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/mood/:id" element={<ProtectedRoute><MoodDetail /></ProtectedRoute>} />
        <Route path="/create-mood" element={<ProtectedRoute><CreateMood /></ProtectedRoute>} />
        <Route path="/edit-mood/:id" element={<ProtectedRoute><EditMood /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}
export default App;
