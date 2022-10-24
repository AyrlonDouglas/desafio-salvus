import React, { useState } from "react";
// router
import { Link, useNavigate, useLocation } from "react-router-dom";

//Mui
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//Components
import TitlePage from "../../components/TitlePage";
// redux saga
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changePass, deleteUser } from "../../store/ducks/user/slice";
// helper
import LOCALSTORAGE from "../../helpers/constants/localStorage";

//Validation
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  password: yup
    .string()
    .required("Preencha a sua senha")
    .min(6, "Senha deve conter no mínimo 6 dígitos"),
  passwordConfirm: yup
    .string()
    .required("Confirme sua senha")
    .oneOf(
      [yup.ref("password"), null],
      "Senha e confirmar senha são diferentes"
    ),
});

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword((state) => !state);
  };
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    resetField,
    setValue,
    trigger,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const changePassword = (data: any) => {
    dispatch(changePass({ password: data.password }));
  };
  const handleLogout = () => {
    dispatch(deleteUser());

    handleOpenModal();
    navigate("/login");
  };
  const handleOpenModal = () => {
    setOpenModal((state) => !state);
  };
  return (
    <>
      <TitlePage primary="Configurações" />
      <Grid
        container
        spacing={2}
        justifyContent={"space-between"}
        flexDirection={"column"}
        sx={{ maxWidth: "20rem", height: "100%", minHeight: "25rem" }}
      >
        <Grid item>
          <form onSubmit={handleSubmit(changePassword)}>
            <Grid container flexDirection={"column"} spacing={1}>
              <Grid item>
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      id="password"
                      label="Nova senha"
                      name="password"
                      variant="filled"
                      size="small"
                      error={!!fieldState.error?.message}
                      helperText={fieldState.error?.message}
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleShowPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name="passwordConfirm"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      id="passwordConfirm"
                      label="Confirmar nova senha"
                      name="passwordConfirm"
                      variant="filled"
                      size="small"
                      error={!!fieldState.error?.message}
                      helperText={fieldState.error?.message}
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleShowPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item sx={{ marginTop: "1rem" }}>
                <Button variant="outlined" type="submit" fullWidth>
                  Mudar senha
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
