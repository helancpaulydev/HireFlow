
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ProtectedRoute from "./components/ProtectedRoute";
import Interviews from "./pages/Interviews";
import Insights from "./pages/Insights";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
function Placeholder({ title }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#101311",
        color: "#f4f6f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "28px",
      }}
    >
      {title} 🚧
    </div>
  );
}

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />
      <Route path="/login" element={<Login />} />

      <Route
        path="/signup"
        element={<Signup />}
      />
     <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
           <Dashboard />
          </ProtectedRoute>
        }
     />
      

      <Route
  path="/interviews"
  element={
    <ProtectedRoute>
      <Interviews />
    </ProtectedRoute>
  }
/>
      
      <Route
  path="/applications"
  element={
    <ProtectedRoute>
      <Applications />
    </ProtectedRoute>
  }
/>

     <Route
  path="/insights"
  element={
    <ProtectedRoute>
      <Insights />
    </ProtectedRoute>
  }
/>
<Route
  path="/progress"
  element={
    <ProtectedRoute>
      <Progress />
    </ProtectedRoute>
  }
/>

     <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

     <Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>


    </Routes>
  );
}

export default App;