import { createTheme, ThemeProvider } from "@mui/material";
import React, { createContext } from "react";

export const ColorModeContext = createContext({ toggleCMode: () => {} });

const ColorModeProvider = (props) => {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleCMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#0052cc",
          },
          secondary: {
            main: "#edf2ff",
          },
          mode: localStorage.getItem("mode") || "light",
        },
      }),
    [mode]
  );

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default ColorModeProvider;
