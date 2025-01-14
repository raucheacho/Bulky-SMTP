import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Templates from "./components/Templates";
import BulkEmailManager from "./components/BulkEmailManager";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/templates" element={<Templates />} />
        <Route path="/" element={<BulkEmailManager />} />
      </Routes>
    </Router>
  );
}

export default App;
