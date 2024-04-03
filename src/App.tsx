import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import InvestorsTable from "./components/InvestorsTable";
import Investor from "./components/Investor";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Investors App
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<InvestorsTable />} />
          <Route path="/investors/:id" element={<Investor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
