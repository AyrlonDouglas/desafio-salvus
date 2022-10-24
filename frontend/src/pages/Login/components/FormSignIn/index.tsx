import React, { useState } from "react";

//mui
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";

import { Text } from "../../style";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// redux e sagas
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { loginRequest, resetSignUp } from "../../../../store/ducks/login/slice";

// validation
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("Preencha com seu nome de usuário"),
  password: yup.string().required("Preencha a sua senha"),
});

interface IFormSignIn {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
}

interface ISignIn {
  password: string;
  username: string;
}
export default function FormSignIn(props: IFormSignIn) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const loginState = useAppSelector((state) => state.login);

  // FORM VALIDATIONS
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
      username: "",
      password: "",
    },
  });

  const singIn = (data: any) => {
    const { username, password } = data as ISignIn;
    dispatch(loginRequest({ username, password }));
  };
  const handleShowPassword = () => {
    setShowPassword((state) => !state);
  };
  return (
    <>
      <Grid item sx={{ marginBottom: "1.5rem", textAlign: "center" }}>
        <Text
          active={+props.isLogin}
          islink={+true}
          onClick={() => !props.isLogin && props.setIsLogin(true)}
          variant="h5"
        >
          Login
        </Text>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit(singIn)}>
          <Grid
            container
            flexDirection={"column"}
            spacing={2}
            sx={{
              background: (theme) => theme.palette.action.hover,
              padding: "0 1rem 1rem 0",
              marginLeft: "0",
              borderRadius: "0.5rem",
            }}
          >
            <Grid item>
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    id="username"
                    label="Usuário"
                    name="username"
                    variant="standard"
                    size="small"
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    id="password"
                    label="Senha"
                    name="password"
                    variant="standard"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item sx={{ marginTop: "1rem" }}>
              <Button
                variant="outlined"
                type="submit"
                fullWidth
                disabled={loginState.loading}
              >
                {loginState.loading ? (
                  <CircularProgress size={"1.6rem"} />
                ) : (
                  "Entrar"
                )}
              </Button>
            </Grid>
            <Grid item>
              <Text
                islink={+true}
                onClick={() => {
                  dispatch(resetSignUp());
                  props.setIsLogin(false);
                }}
                align="center"
                sx={{ width: "100%", display: "inline-block" }}
              >
                Criar conta
              </Text>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
}
