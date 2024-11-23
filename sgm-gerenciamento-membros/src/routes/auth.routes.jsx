import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { ColorModeContext, useMode } from "../styles/theme";

export function AuthRoutes() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
