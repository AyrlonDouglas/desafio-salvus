import React, { useState, useEffect } from "react";
//MUI
import {
  Container,
  Typography,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Box,
  Button,
  TextField,
} from "@mui/material";

// Redux e saga
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { loadUser } from "../../../../store/ducks/user/slice";
import { createProfessional } from "../../../../store/ducks/professional/slice";
// componentes

// validation
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  profession: yup.string().required("Preencha com ssua profissão"),
  registrationNumber: yup.string().required("Preencha seu nº de registro"),
  specialties: yup.string().required("Preencha sua especialidade"),
  location: yup.string().required("Preencha sua localidade"),
  maximumDisplacement: yup
    .number()
    .typeError("Preencha apenas com números")
    .required("Preencha seu máximo deslocamento"),
});

export default function ProfessionalRegistration() {
  const [activeStep, setActiveStep] = useState(0);
  const loginState = useAppSelector((state) => state.login);
  const professionalState = useAppSelector((state) => state.professional);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    dispatch(loadUser(loginState.data.user.id));
  }, [loginState, professionalState]);

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
      profession: "",
      registrationNumber: "",
      specialties: "",
      location: "",
      maximumDisplacement: "",
    },
  });

  const saveProfessional = (data: any) => {
    dispatch(createProfessional(data));
  };

  return (
    <Container sx={{ height: "100%" }}>
      <Grid
        container
        sx={{ height: "100%", marginTop: "1rem" }}
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
        spacing={1}
      >
        <Grid item>
          <Typography variant="h5">Complete seu cadastro</Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit(saveProfessional)}>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel>Dados profissionais</StepLabel>
                <StepContent>
                  <Grid container flexDirection={"column"} spacing={1}>
                    <Grid item>
                      <Controller
                        name="profession"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            id="profession"
                            label="Profissão"
                            name="profession"
                            variant="filled"
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
                        name="registrationNumber"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            id="registrationNumber"
                            label="Nº de registro"
                            name="registrationNumber"
                            variant="filled"
                            size="small"
                            error={!!fieldState.error?.message}
                            helperText={fieldState.error?.message}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={
                          !watch("profession") || !watch("registrationNumber")
                        }
                      >
                        Continuar
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Área de atuação</StepLabel>
                <StepContent>
                  <Grid container flexDirection={"column"} spacing={1}>
                    <Grid item>
                      <Controller
                        name="specialties"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            id="specialties"
                            label="Especialidade"
                            name="specialties"
                            variant="filled"
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
                        name="location"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            id="location"
                            label="Região em que atuação"
                            name="location"
                            variant="filled"
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
                        name="maximumDisplacement"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            id="maximumDisplacement"
                            label="Máximo deslocalemento (km)"
                            name="maximumDisplacement"
                            variant="filled"
                            size="small"
                            error={!!fieldState.error?.message}
                            helperText={fieldState.error?.message}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container sx={{ mt: 1 }} spacing={1}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        // onClick={handleNext}
                        type="submit"
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Finalizar
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                        variant="outlined"
                      >
                        Voltar
                      </Button>
                    </Grid>
                  </Grid>
                </StepContent>
              </Step>
            </Stepper>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
