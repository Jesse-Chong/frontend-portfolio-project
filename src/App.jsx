// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

// PAGES
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import Show from "./Pages/Show";
import FourOFour from "./Pages/FourOFour";
import New from "./Pages/New";
import Edit from "./Pages/Edit";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Index />} />
          <Route path="/todos/:id" element={<Show />} />
          <Route path="/todos/:id/edit" element={<Edit />} />
          <Route path="/todos/new" element={<New />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;