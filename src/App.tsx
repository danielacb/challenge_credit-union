import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import { theme } from "./theme";
import LoanRequest from "./pages/LoanRequest";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<LoanRequest />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
