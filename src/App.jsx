// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// PAGES
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import Show from "./Pages/Show";
import FourOFour from "./Pages/FourOFour";
import New from "./Pages/New";
import Edit from "./Pages/Edit";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Index />} />
          <Route path="/todos/:id?" element={<Show />} />
          <Route path="/todos/:id/edit" element ={<Edit />} />
          <Route path="/todos/new" element={<New />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;