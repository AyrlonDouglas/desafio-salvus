import React, { useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
// MUI
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LogoutIcon from "@mui/icons-material/Logout";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Redux e sagas
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import LOCALSTORAGE from "../../helpers/constants/localStorage";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: theme.palette.background.paper,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  background: theme.palette.background.paper,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface IMiniDrawer {
  children?: JSX.Element;
}
function MiniDrawer({ children }: IMiniDrawer) {
  const token = localStorage.getItem(LOCALSTORAGE.token);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const userState = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleDrawer = () => {
    setOpen((state) => !state);
  };

  const itemsMenu = [
    { text: "Dashboard", icon: <DashboardIcon color="primary" />, path: "/" },
    {
      text: "Profissionais",
      icon: <MedicalInformationIcon color="primary" />,
      path: "/professional",
    },
    {
      text: "Configurações",
      icon: <SettingsApplicationsIcon color="primary" />,
      path: "/settings",
    },
  ];

  const secondaryItemsMenu = [
    { text: "Sair", icon: <LogoutIcon color="primary" />, path: "/login" },
  ];

  const handleLogout = () => {
    localStorage.removeItem(LOCALSTORAGE.token);
    localStorage.removeItem(LOCALSTORAGE.userId);
    handleOpenModal();
    navigate("/login");
  };
  const handleOpenModal = () => {
    setOpenModal((state) => !state);
  };
  return (
    <>
      {
        //   userState.data.professional_id &&
        token ? (
          <Box sx={{ display: "flex" }}>
            <Drawer variant="permanent" open={open}>
              <DrawerHeader sx={{ justifyContent: "center", gap: 1 }}>
                {open && (
                  <Typography fontWeight={"bold "}>
                    HEALTH F
                    <Box
                      component="span"
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        fontWeight: "900",
                      }}
                    >
                      1
                    </Box>
                    RST
                  </Typography>
                )}
                <IconButton onClick={handleDrawer}>
                  {open ? (
                    <ChevronLeftIcon color="primary" />
                  ) : (
                    <ChevronRightIcon color="primary" />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                {itemsMenu.map((item, index) => (
                  <ListItem
                    key={item.text}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      onClick={() => navigate(item.path)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List
                sx={{ display: "flex", alignItems: "flex-end", height: "100%" }}
              >
                {secondaryItemsMenu.map((item, index) => (
                  <ListItem
                    key={item.text}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      onClick={() => {
                        if (item.text === "Sair") {
                          handleOpenModal();
                        } else {
                          navigate(item.path);
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <Container
              sx={{
                width: !open
                  ? `calc(100% - ${theme.spacing(7)} - 1px)`
                  : `calc(100% - ${drawerWidth}px) !important`,
              }}
            >
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  pt: 3,
                }}
              >
                {children}
              </Box>
            </Container>
          </Box>
        ) : (
          children
        )
      }

      <Dialog open={openModal} onClose={handleOpenModal}>
        <DialogTitle
          variant="h5"
          color="primary.main"
          fontWeight={"bold"}
          align="left"
        >
          Já vai ?
        </DialogTitle>
        <DialogContent>
          <Typography align="center">
            Tem certeza de deseja sair do{" "}
            <Box component="span" fontWeight={"bold "}>
              HEALTH F
              <Box
                component="span"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  fontWeight: "900",
                }}
              >
                1
              </Box>
              RST
            </Box>
            ?
          </Typography>
          <Typography align="justify" mt={2}></Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} variant="outlined" fullWidth>
            Quero sair
          </Button>
          <Button
            onClick={handleOpenModal}
            variant="contained"
            fullWidth
            autoFocus
          >
            Voltar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(MiniDrawer);
