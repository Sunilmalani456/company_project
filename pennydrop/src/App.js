import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimatedRoute from "./AnimatedRoute";
import Homee from "./components/Homee";
import Imps from "./components/Imps";
import Neft from "./components/Neft";
import Upi from "./components/Upi";
import Cards from "./compound/Cards";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/DMT" element={<Homee />} />
          <Route path="/Cards" element={<Cards />} />
          <Route path="/upi" element={<Upi />} />
          <Route path="/neft" element={<Neft />} />
          <Route path="/imps" element={<Imps />} />
        </Routes>
        <AnimatedRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
