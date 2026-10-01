import { useState } from "react";
import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import About from "./pages/About";
import Navbar from "./components/Navbar";

export default function App() {
  const [page, setPage] = useState("home");
  const [latest, setLatest] = useState(null);
  return (
    <div className="app-shell">
      <Navbar page={page} onNavigate={setPage} />
      <main className="container">
        {page === "home" && <Home latest={latest} onStart={() => setPage("prediction")} />}
        {page === "prediction" && <Prediction onPrediction={setLatest} />}
        {page === "about" && <About />}
      </main>
    </div>
  );
}
