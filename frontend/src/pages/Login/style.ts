import { styled, Typography, TypographyProps } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

interface Ilink extends LinkProps {
  active?: number;
}
interface IText extends TypographyProps {
  active?: number;
  islink: number;
}

export const Text = styled(Typography)<IText>(
  ({ theme, active, islink = false }) => ({
    display: "inline",
    color: active ? "inherit" : theme.palette.text.disabled,
    cursor: islink && !active ? "pointer" : "inherit",
    textDecoration: islink && active ? "underline" : "none",
    textDecorationColor: theme.palette.primary.main,
    ":hover": {
      textDecoration: islink ? "underline" : "none",
      textDecorationColor: theme.palette.primary.main,
    },
  })
);

export const LinkStyled = styled(Link)<Ilink>(({ theme, active = false }) => ({
  color: active ? theme.palette.text.primary : theme.palette.text.disabled,
}));
