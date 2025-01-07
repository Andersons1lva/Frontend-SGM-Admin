import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext,useMode } from "../styles/theme";
import Sidebar from "../components/global/Sidebar";
import Topbar from "../components/global/TopBar";

import Home from "../pages/Home";
import Formulario from "../pages/Formulario"
import Membro from "../pages/Membro";
import Dashboard from "../pages/Dashboard";
import DetalhesMembro from "../components/DetalhesMembro";
import Calendario from "../pages/Calendario";


export function AppRoutes() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="appRoutes">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulario" element={<Formulario/>}/>
          <Route path="/membro" element={<Membro/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/detalhesMembro/:id" element={<DetalhesMembro/>}/>
          <Route path="/calendario" element={<Calendario/>}/>
        </Routes>
        </main>
      </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
