import React, { useState, useEffect } from "react";
// Redux e sagas
import { loadAllProfessionals } from "../../../store/ducks/professional/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
//MUI
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CardActionArea,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// COMPONENTS
import TitlePage from "../../../components/TitlePage";
//UTILS
import {
  getFirstAndLastName,
  capitalizeText,
  telMask,
} from "../../../utils/strings";
import { formatDate } from "../../../helpers/date";
export default function ProfessionalList() {
  const dispatch = useAppDispatch();
  const professionalState = useAppSelector((state) => state.professional);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [professional, setProfessional] = useState<Professional>({
    RegistrationNumber: null,
    created_at: null,
    id: null,
    location: null,
    maximumDisplacement: null,
    profession: null,
    specialties: null,
    updated_at: null,
    telephone: null,
    user: {
      created_at: null,
      email: null,
      gender: null,
      id: null,
      is_active: null,
      name: null,
      password: null,
      professional_id: null,
      telephone: null,
      updated_at: null,
      username: null,
    },
  });
  // const md = useMediaQuery()

  useEffect(() => {
    dispatch(loadAllProfessionals());
  }, []);

  const itemHead = [
    "Nome",
    "Profissão",
    "Nº de Registro",
    "Localidade",
    "Deslocamento máximo",
  ];
  interface Professional {
    RegistrationNumber: string | null;
    telephone: string | null;
    created_at: Date | null;
    id: number | null;
    location: string | null;
    maximumDisplacement: string | null;
    profession: string | null;
    specialties: string | null;
    updated_at: Date | null | string | undefined;
    user: {
      created_at: Date | null;
      email: string | null;
      gender: string | null;
      id: number | null;
      is_active: true | null;
      name: string | null;
      password: string | null;
      professional_id: number | null;
      telephone: string | null;
      updated_at: Date | null;
      username: string | null;
    };
  }

  const handleFilter = (professional: Professional) => {
    if (!filter) {
      return true;
    }

    return (
      professional?.user?.name?.toLowerCase().includes(filter.toLowerCase()) ||
      professional?.profession?.toLowerCase().includes(filter.toLowerCase()) ||
      professional?.RegistrationNumber?.toLowerCase().includes(
        filter.toLowerCase()
      ) ||
      professional?.specialties?.toLowerCase().includes(filter.toLowerCase()) ||
      professional?.location?.toLowerCase().includes(filter.toLowerCase()) ||
      professional?.maximumDisplacement
        ?.toLowerCase()
        .includes(filter.toLowerCase())
    );
  };
  console.log(professional);
  const handleOpenModal = () => {
    setOpen((state) => !state);
  };

  return (
    <>
      <TitlePage primary="Profissionais" />

      <Box sx={{ display: "flex" }}>
        <TextField
          label="Pesquise aqui"
          sx={{
            "& .MuiInputBase-root": { borderRadius: "2rem" },
            margin: "0rem 0 1rem",
          }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow
              sx={{
                height: "3.5rem",
                background: (theme) => theme.palette.primary.dark,
              }}
            >
              <TableCell>{itemHead[0]}</TableCell>
              <TableCell>{itemHead[1]}</TableCell>
              <TableCell>{itemHead[2]}</TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                {itemHead[3]}
              </TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                {itemHead[4]}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professionalState.list
              .filter(handleFilter)
              .map((professional: Professional) => (
                <TableRow
                  key={professional?.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      background: (theme) => theme.palette.action.hover,
                      cursor: "pointer",
                    },
                    height: "3.5rem",
                  }}
                  onClick={() => {
                    setOpen(true);
                    setProfessional(professional);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {capitalizeText(
                      getFirstAndLastName(professional?.user?.name)
                    )}
                  </TableCell>
                  <TableCell>{professional.profession}</TableCell>
                  <TableCell>{professional.RegistrationNumber}</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {professional.location}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {professional.maximumDisplacement}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleOpenModal}>
        <DialogTitle
          variant="h4"
          color="secondary.main"
          fontWeight={"900"}
          align="center"
        >
          {capitalizeText(getFirstAndLastName(professional?.user?.name))}
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5" align="center">
            Resumo profissional
          </Typography>
          <Typography align="justify" mt={2} fontFamily={"sans-serif"}>
            {`${capitalizeText(professional?.user?.name)} é ${
              professional?.profession
            }
            especialista em ${
              professional.specialties
            }. Atualmente trabalha na região ${capitalizeText(
              professional?.location
            )} com
            deslocamento máximo de ${professional.maximumDisplacement} km.`}
          </Typography>
          <br />
          <Box>
            <Typography align="left">{`E-mail: ${professional.user.email}`}</Typography>
            <Typography align="left">
              contato :{" "}
              {telMask(professional.user.telephone)
                ? telMask(professional.user.telephone)
                : " Não cadastrado"}
            </Typography>
            <Typography variant="caption">
              {`Última atualização: ${formatDate(
                professional?.updated_at,
                "DD/MM/YYYY [às] HH:mm"
              )}`}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOpenModal}
            variant="outlined"
            color="secondary"
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
