// ThemeSwitcher.js
import React, { useContext } from "react";
import { Button } from "@mui/material";
import { CustomThemeContext } from "../../Contexts/CustomThemeProvider";

const ThemeSwitcher = () => {
  const { setPrimaryColor } = useContext(CustomThemeContext);

  const handleThemeChange = (color) => {
    setPrimaryColor(color); // Update primary color based on the button clicked
  };

  return (
    <div>
      <Button onClick={() => handleThemeChange("#2196f3")} variant="contained" color="primary">
        Blue Shades
      </Button>
      <Button onClick={() => handleThemeChange("#9c27b0")} variant="contained" color="primary">
        Purple Shades
      </Button>
      {/* Add more buttons for additional themes */}
    </div>
  );
};

export default ThemeSwitcher;
