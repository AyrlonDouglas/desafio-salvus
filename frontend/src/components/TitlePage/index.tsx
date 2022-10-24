import { Typography, Box } from "@mui/material";
interface ITitlePage {
  primary: string;
}
export default function TitlePage(props: ITitlePage) {
  return (
    <Box sx={{ margin: "0 0 1.5rem" }}>
      <Typography variant="h4" fontWeight={"bold"}>
        {props.primary}
      </Typography>
    </Box>
  );
}
