import React, { useCallback } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../store/hooks";

export default function BackdropLoading() {
  const appState = useAppSelector((state) => state) as any;

  const checkLoading = useCallback(() => {
    let loading = false;

    const states: string[] = ["user", "login", "professional"];
    for (let i = 0; i < states.length; i++) {
      if (appState[`${states[i]}`]?.loading) {
        loading = true;
      }
    }

    return loading;
  }, [appState]);

  return (
    <Backdrop
      sx={{
        color: (theme) => theme.palette.primary.main,
        zIndex: (theme: any) => theme.zIndex.drawer + 1,
      }}
      open={checkLoading()}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
