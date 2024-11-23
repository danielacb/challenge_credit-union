import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import { theme } from "./theme";
import LoanRequest from "./pages/LoanRequest";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<LoanRequest />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
