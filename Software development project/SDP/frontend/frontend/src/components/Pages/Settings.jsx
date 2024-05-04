import React, { useState, useContext } from 'react';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppCustomContext } from '../../App';
import BackgroundStyleNew from '../SubComponents/BackgroundStyleNew';

function Settings() {
    // const { theme, setUsernamee, setRolee } = useContext(AppCustomContext);

    // const [customTheme, setCustomTheme] = useState(theme);

    // const handleClick = () => {
    //     console.log("onclick world");
    //     const updatedTheme = createTheme({
    //         ...customTheme,
    //         palette: {
    //             ...customTheme.palette,
    //             primary: {
    //                 50: '#e0f7fa',
    //                 100: '#b2ebf2',
    //                 200: '#80deea',
    //                 300: '#4dd0e1',
    //                 400: '#26c6da',
    //                 500: '#00bcd4',
    //                 600: '#00acc1',
    //                 700: '#0097a7',
    //                 800: '#00838f',
    //                 900: '#006064',
    //             },
    //         },
    //     });
    //     setCustomTheme(updatedTheme);
    // };

    return (
       
            <BackgroundStyleNew title={"Settings"} subTitle={"This is the settings page"}>
               
            </BackgroundStyleNew>
      
    );
}

export default Settings;
