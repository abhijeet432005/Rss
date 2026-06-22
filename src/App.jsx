import React from "react";
import Home from './pages/Home'
import ContactPage from "./pages/Contact";
import Volunteers from "./pages/Volunteers";
import MainRoutes from "./routes/MainRoutes";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <MainRoutes />
    </div>
  );
};

export default App;
