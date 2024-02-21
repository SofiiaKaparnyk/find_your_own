import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from "react-i18next";

const pages = ["About", "Log in", "Sign up"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const languages = [{title: "English", lng: "en"}, {title: "Ukrainian", lng: "uk"}];


const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElLng, setAnchorElLng] = React.useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenLngMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLng(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseLngMenu = () => {
    setAnchorElLng(null);
  };

  const handleClickLngMenu = (lng: string | null) => {
    if(lng) {
        i18n.changeLanguage(lng);
    }
    setAnchorElLng(null);
  };



  return (
    <AppBar position="static" sx={{ backgroundColor: "#22346a" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <PersonSearchIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                    flexGrow: 1,
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                {/* FIND YOUR OWN */}
                {t("header.logo")}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: "block", md: "none" },
                    }}
                >
                {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <PersonSearchIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                }}
            >
                FYO
            </Typography>
            <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                    >
                        {page}
                    </Button>
                ))}
            </Box>
            <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                <img src={t("header.flag")} alt="" width={24} style={{ marginRight: 8 }} />
                <IconButton onClick={handleOpenLngMenu} sx={{ color: "white" }}>
                    <LanguageIcon  />
                </IconButton>
                <Menu
                    sx={{ mt: "45px" }}
                    id="language-menu-appbar"
                    anchorEl={anchorElLng}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElLng)}
                    onClose={handleCloseLngMenu}
                >
                    {languages.map((lng) => (
                        <MenuItem key={lng.lng} onClick={() => handleClickLngMenu(lng.lng)}>
                            <Typography textAlign="center">{lng.title}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open profile menu">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
