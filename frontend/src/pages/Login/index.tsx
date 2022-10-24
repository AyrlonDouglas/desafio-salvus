import React, { useEffect, useState } from "react";
// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

// Redux e Sagas
import { useAppSelector, useAppDispatch } from "../../store/hooks";

//Components
import FormSignIn from "./components/FormSignIn";
import FormSignUp from "./components/FormSignUp";
// router
import { Navigate } from "react-router-dom";
import LOCALSTORAGE from "../../helpers/constants/localStorage";

export default function Login() {
  const dispatch = useAppDispatch();
  const loginState = useAppSelector((state) => state.login);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const token = localStorage.getItem(LOCALSTORAGE.token);
  return (
    <Container
      sx={{
        height: "calc(100% - 2rem)",
        width: "calc(100% - 2rem)",
        margin: "1rem",
        // background: (theme) => theme.palette.background.paper,
      }}
    >
      {token && <Navigate to={"/"} />}
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={6}
          sx={{ display: { sm: "initial", xs: "none" }, minHeight: "100vh" }}
        >
          <Box
            sx={{
              borderRadius: "0.25rem",
              margin: "1rem 0",
              width: "100%",
              height: "calc(100vh - 4rem)",
              backgroundImage:
                "url('https://source.unsplash.com/random/1000x1000?healthcare,professional')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ height: "100%" }}>
          <Grid
            container
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ minHeight: "100%", width: "300px", margin: "0 auto" }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                gap: 1,
                marginBottom: "1rem",
                marginTop: `${isLogin ? "initial" : "1.5rem"}`,
              }}
            >
              <MedicalInformationIcon
                sx={{ width: "1.8rem", height: "1.8rem" }}
              />
              <Typography variant="h5">
                HEALTH F
                <Box
                  component="span"
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: "bold",
                  }}
                >
                  1
                </Box>
                RST
              </Typography>
            </Grid>

            {isLogin ? (
              <FormSignIn isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <FormSignUp isLogin={isLogin} setIsLogin={setIsLogin} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
