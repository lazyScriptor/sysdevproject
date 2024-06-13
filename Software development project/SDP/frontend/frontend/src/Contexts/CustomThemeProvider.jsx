// CustomThemeProvider.js
import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const CustomThemeContext = createContext();

const CustomThemeProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState("#9c27b0"); // default color

  const theme = useMemo(() => createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
    },
  }), [primaryColor]);

  return (
    <CustomThemeContext.Provider value={{ setPrimaryColor }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
