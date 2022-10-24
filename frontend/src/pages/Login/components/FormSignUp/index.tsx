import React, { useState, useEffect } from "react";

// MUI
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//style
import { Text } from "../../style";

// Redux e saga
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { signUpRequest } from "../../../../store/ducks/login/slice";
// validation
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { validateCPF, validatePhone, telMask } from "../../../../utils/strings";
const schema = yup.object({
  name: yup.string().required("Preencha com seu nome"),
  username: yup.string().required("Preencha com seu nome de usuário"),
  email: yup
    .string()
    .email("Preencha com um e-mail válido")
    .required("Preencha com seu e-mail"),
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
  telephone: yup
    .string()
    .required("Preencha com seu telefone")
    .test(
      "validadeTelephone",
      "Preencha com um número válido",
      (value: string | undefined) => {
        value = value?.replace(/\D/gim, "");
        return validatePhone(value);
      }
    ),
  gender: yup.string().required("Preencha com seu gênero"),
  cpf: yup
    .string()
    .required("Preencha com seu CPF")
    .typeError("Campo deve contar apenas números")
    .test("validateCPF", "adicione um CPF válido", (val: string | any) => {
      return validateCPF(val);
    }),
});

interface IFormSignUp {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
}

export default function FormSignUp(props: IFormSignUp) {
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
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      telephone: "",
      gender: "",
      cpf: "",
    },
  });

  const singUp = (data: any) => {
    data = {
      ...data,
      telephone: data.telephone.replace(/\D/gim, ""),
    };
    dispatch(signUpRequest(data));
  };
  const handleShowPassword = () => {
    setShowPassword((state) => !state);
  };

  useEffect(() => {
    if (loginState.userCreated && loginState.success) {
      props.setIsLogin(true);
    }
  }, [loginState]);
  return (
    <>
      <Grid item sx={{ marginBottom: "1.5rem" }}>
        <Text
          active={+!props.isLogin}
          islink={+true}
          onClick={() => props.isLogin && props.setIsLogin(false)}
          variant="h5"
        >
          Cadastro
        </Text>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit(singUp)}>
          <Grid
            container
            flexDirection={"column"}
            spacing={2}
            sx={{
              background: (theme) => theme.palette.action.hover,
              padding: "0 1rem 1rem 0",
              marginBottom: "1.5rem",
              borderRadius: "0.5rem",
              marginLeft: "0",
            }}
          >
            <Grid item>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="name"
                    label="Seu nome"
                    name="name"
                    variant="standard"
                    size="small"
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="username"
                    label="Usuário"
                    name="username"
                    variant="standard"
                    size="small"
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="cpf"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="cpf"
                    label="CPF"
                    name="cpf"
                    variant="standard"
                    size="small"
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    variant="standard"
                    size="small"
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="gender"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="gender"
                    label="Gênero"
                    name="gender"
                    variant="standard"
                    size="small"
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="telephone"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    value={
                      getValues().telephone !== ""
                        ? telMask(String(getValues().telephone))
                        : ""
                    }
                    fullWidth
                    id="telephone"
                    label="Telefone"
                    name="telephone"
                    variant="standard"
                    size="small"
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
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
                    fullWidth
                    id="password"
                    label="Senha"
                    name="password"
                    variant="standard"
                    size="small"
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                    type={showPassword ? "text" : "password"}
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
            <Grid item>
              <Controller
                name="passwordConfirm"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="passwordConfirm"
                    label="Confirmar senha"
                    name="passwordConfirm"
                    variant="standard"
                    size="small"
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                    type={showPassword ? "text" : "password"}
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
              <Button variant="outlined" type="submit" fullWidth>
                Cadastrar
              </Button>
            </Grid>
            <Grid item>
              <Text
                islink={+true}
                onClick={() => props.setIsLogin(true)}
                align="center"
                sx={{ width: "100%", display: "inline-block" }}
              >
                Já tenho uma conta
              </Text>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
}
