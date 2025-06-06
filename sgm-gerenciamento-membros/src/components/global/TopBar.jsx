import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../styles/theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ExitToApp, MenuOutlined } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/auth";

const Topbar = ({ isCollapsed, toggleSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  // Verifica se a tela é mobile (largura <= 768px)
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        width: `calc(100% - ${isCollapsed ? "80px" : "250px"})`,        
        zIndex: 2000,
      }}
    >
      {/* SEARCH BAR AND MENU BUTTON */}
      <Box display="flex" alignItems="center">
        {/* Botão de menu hambúrguer (visível apenas em mobile ou quando a sidebar está colapsada) */}
        {(isMobile) && (
          <IconButton onClick={toggleSidebar} sx={{ mr: 2 }}>
            <MenuOutlined />
          </IconButton>
        )}

        {/* Barra de pesquisa */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <ExitToApp />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

