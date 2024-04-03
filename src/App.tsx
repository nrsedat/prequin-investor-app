import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import InvestorsTable from "./components/InvestorsTable";
import Investor from "./components/Investor"; // The new component we will create

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<InvestorsTable />} />
          <Route path="/investors/:id" element={<Investor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
