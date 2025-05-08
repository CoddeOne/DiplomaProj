// @ts-nocheck
import { createTheme } from '@mui/material';

const createCustomTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'dark' ? '#FFFFFF' : '#000000', 
      },
      secondary: {
        main: mode === 'dark' ? '#000000' : '#FFFFFF', 
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#FFFFFF', 
        paper: mode === 'dark' ? '#1D1D1D' : '#F5F5F5', 
      },
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : '#000000', 
        secondary: mode === 'dark' ? '#BDBDBD' : '#757575', 
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
    },
    components: {
      
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              color: mode === 'dark' ? '#FFFFFF' : '#000000', 
              backgroundColor: mode === 'dark' ? '#000000' : '#FFFFFF', 
              borderRadius: 1, 
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: mode === 'dark' ? '1px solid #FFFFFF' : '1px solid #CCC', 
              },
              '&:hover fieldset': {
                border: mode === 'dark' ? '1px solid #E0E0E0' : '1px solid #999',
              },
              '&.Mui-focused fieldset': {
                border: mode === 'dark' ? '1px solid #FFFFFF' : '1px solid #000',
              },
            },
          },
        },
      },
     
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#FFFFFF' : '#757575', 
            '&.Mui-focused': {
              color: mode === 'dark' ? '#FFFFFF' : '#000000', 
            },
            '&.MuiFormLabel-filled': {
              color: mode === 'dark' ? '#FFFFFF' : '#757575', 
            },
          },
        },
      },

      MuiTypography: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#FFFFFF' : '#000000', 
          },
        },
      },
      
      MuiBox: {
        styleOverrides: {
          root: {
            '&[style*="border"]': {
              borderColor: mode === 'dark' ? '#FFFFFF' : '#CCCCCC', 
            },
          },
        },
      },
   
      MuiButton: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#FFFFFF' : '#000000', 
            backgroundColor: mode === 'dark' ? '#424242' : '#E0E0E0', 
            '&:hover': {
              backgroundColor: mode === 'dark' ? '#525252' : '#B0B0B0', 
            },
            borderColor: mode === 'dark' ? '#FFFFFF' : '#CCCCCC',
          },
        },
      },
    },
  });

export default createCustomTheme;