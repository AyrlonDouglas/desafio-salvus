import React, { useEffect, useState } from "react";
// MUI
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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadUser } from "../../store/ducks/user/slice";
import { loadAllProfessionals } from "../../store/ducks/professional/slice";
// componentes
import TitlePage from "../../components/TitlePage";
import ProfessionalRegistration from "./components/ProfessionalRegistration";
import PieRChart from "../../components/Chart/Pie";
import LineRChart from "../../components/Chart/Line";
import BarChar from "../../components/Chart/Bar";
//helper
import { formatDate } from "../../helpers/date";
export default function Home() {
  const loginState = useAppSelector((state) => state.login);
  const userState = useAppSelector((state) => state.user);
  const professionalState = useAppSelector((state) => state.professional);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser(loginState.data.user.id));
  }, [loginState, professionalState]);

  useEffect(() => {
    dispatch(loadAllProfessionals());
  }, []);

  function relationProfessionals(data: any, type: string, typeData?: string) {
    interface Group {
      type: string;
      data: any[];
    }
    const groups: Group[] = [];
    data.forEach((element: any) => {
      if (typeData === "Date") {
        if (groups.length === 0) {
          groups.push({
            type: formatDate(element[type], "DD/MM/YY"),
            data: [element],
          });
        } else {
          let hasType = false;
          groups.forEach((group) => {
            if (
              group.type.toString() ===
              formatDate(element[type].toString(), "DD/MM/YY")
            ) {
              group.data = [...group.data, element];
              hasType = true;
            }
          });
          if (!hasType) {
            groups.push({
              type: formatDate(element[type], "DD/MM/YY"),
              data: [element],
            });
          }
        }
      } else {
        if (groups.length === 0) {
          groups.push({ type: element[type], data: [element] });
        } else {
          let hasType = false;
          groups.forEach((group) => {
            if (group.type.toString() === element[type].toString()) {
              group.data = [...group.data, element];
              hasType = true;
            }
          });
          if (!hasType) {
            groups.push({ type: element[type], data: [element] });
          }
        }
      }
    });

    return groups;
  }

  const dataProfession = [
    ...relationProfessionals(professionalState.list, "profession").map(
      (elemet) => {
        return {
          name: elemet.type,
          value: elemet.data.length,
        };
      }
    ),
  ];
  const dataSpecialties = [
    ...relationProfessionals(professionalState.list, "specialties").map(
      (elemet) => {
        return {
          name: elemet.type,
          value: elemet.data.length,
        };
      }
    ),
  ];
  const dataCreated = [
    ...relationProfessionals(professionalState.list, "created_at", "Date").map(
      (elemet) => {
        return {
          name: elemet.type,
          value: elemet.data.length,
        };
      }
    ),
  ];
  const dataLocation = [
    ...relationProfessionals(professionalState.list, "location").map(
      (elemet) => {
        return {
          name: elemet.type,
          value: elemet.data.length,
        };
      }
    ),
  ];

  return (
    <>
      {userState.data.professional_id ? (
        <>
          <TitlePage primary="Dashboard" />
          <Grid
            container
            justifyContent="center"
            spacing={1}
            sx={{
              margin: "0 auto",

              height: "100%",
              padding: "0 0.5rem 0.5rem 0",
            }}
          >
            <Grid
              item
              sx={{
                minHeight: "22rem",
              }}
              xs={12}
              sm={12}
              md={6}
            >
              <Box
                sx={{
                  border: "1px solid white",
                  height: "100%",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                }}
              >
                <Typography variant="h5" align="center" mt={2}>
                  Total de profissionais cadastrados
                </Typography>
                <Box
                  sx={{
                    height: "20rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PieRChart
                    data={[
                      {
                        name: professionalState.list.length.toString(),
                        value: professionalState.list.length,
                      },
                    ]}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                minHeight: "22rem",
              }}
              xs={12}
              sm={12}
              md={6}
            >
              <Box
                sx={{
                  border: "1px solid white",
                  height: "100%",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                }}
              >
                <Typography variant="h5" align="center" mt={2}>
                  Profissionais por profissão
                </Typography>

                <Box sx={{ height: "20rem" }}>
                  <PieRChart data={dataProfession} />
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                minHeight: "22rem",
              }}
              xs={12}
              sm={12}
              md={6}
            >
              <Box
                sx={{
                  border: "1px solid white",
                  height: "100%",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                }}
              >
                <Typography variant="h5" align="center" mt={2}>
                  Profissionais por Especialides
                </Typography>

                <Box sx={{ height: "20rem" }}>
                  <PieRChart data={dataSpecialties} />
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              sx={{
                minHeight: "22rem",
              }}
              xs={12}
              sm={12}
              md={6}
            >
              <Box
                sx={{
                  border: "1px solid white",
                  height: "100%",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                }}
              >
                <Typography variant="h5" align="center" mt={2}>
                  Profissionais por Região
                </Typography>

                <Box sx={{ height: "20rem" }}>
                  <BarChar data={dataLocation} />
                  {/* <PieRChart data={dataLocation} /> */}
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                minHeight: "22rem",
              }}
              xs={12}
              md={12}
            >
              <Box
                sx={{
                  border: "1px solid white",
                  height: "100%",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                }}
              >
                <Typography variant="h5" align="center" mt={1} mb={1}>
                  Entrada de profissionais por data
                </Typography>

                <Box sx={{ height: "20rem" }}>
                  <LineRChart data={dataCreated} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        <ProfessionalRegistration />
      )}
    </>
  );
}
