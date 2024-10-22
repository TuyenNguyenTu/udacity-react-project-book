import "./App.css";
import SearchBook from "./pages/SearchBook";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/search" element={<SearchBook />}></Route>
      </Routes>

    </div>
  );
}
export default App;
