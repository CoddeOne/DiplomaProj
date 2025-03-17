import { createTheme } from '@mui/material';

const createCustomTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'dark' ? '#FFFFFF' : '#000000', // Білий для темної, чорний для світлої
      },
      secondary: {
        main: mode === 'dark' ? '#000000' : '#FFFFFF', // Чорний для темної, білий для світлої
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#FFFFFF', // Темний фон для темної, білий для світлої
        paper: mode === 'dark' ? '#1D1D1D' : '#F5F5F5', // Темний для карток у темній, світло-сірий для світлої
      },
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : '#000000', // Білий текст для темної, чорний для світлої
        secondary: mode === 'dark' ? '#BDBDBD' : '#757575', // Сірий текст для обох
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
    },
    components: {
      // Стилі для TextField (інпутів)
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              color: mode === 'dark' ? '#FFFFFF' : '#000000', // Білий текст у темному, чорний у світлому
              backgroundColor: mode === 'dark' ? '#000000' : '#FFFFFF', // Чорний фон у темному, білий у світлому
              borderRadius: 1, // Як у QuestionForm
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: mode === 'dark' ? '1px solid #FFFFFF' : '1px solid #CCC', // Білий у темному, сірий у світлому
              },
              '&:hover fieldset': {
                border: mode === 'dark' ? '1px solid #E0E0E0' : '1px solid #999', // Світло-сірий при наведенні
              },
              '&.Mui-focused fieldset': {
                border: mode === 'dark' ? '1px solid #FFFFFF' : '1px solid #000', // Білий при фокусі
              },
            },
          },
        },
      },
      // Стилі для лейблів
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#FFFFFF' : '#757575', // Білий у темному, сірий у світлому
            '&.Mui-focused': {
              color: mode === 'dark' ? '#FFFFFF' : '#000000', // Білий при фокусі в темному
            },
            '&.MuiFormLabel-filled': {
              color: mode === 'dark' ? '#FFFFFF' : '#757575', // Білий у темному, коли заповнено
            },
          },
        },
      },
      // Стилі для тексту (Typography)
      MuiTypography: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#FFFFFF' : '#000000', // Білий у темному, чорний у світлому
          },
        },
      },
      // Стилі для Box (контейнерів)
      MuiBox: {
        styleOverrides: {
          root: {
            '&[style*="border"]': {
              borderColor: mode === 'dark' ? '#FFFFFF' : '#CCCCCC', // Білий бордер у темному, сірий у світлому
            },
          },
        },
      },
      // Стилі для кнопок
      MuiButton: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#FFFFFF' : '#000000', // Білий текст у темному, чорний у світлому
            backgroundColor: mode === 'dark' ? '#424242' : '#E0E0E0', // Темно-сірий фон у темному
            '&:hover': {
              backgroundColor: mode === 'dark' ? '#525252' : '#B0B0B0', // Світліший при наведенні
            },
            borderColor: mode === 'dark' ? '#FFFFFF' : '#CCCCCC', // Білий бордер у темному
          },
        },
      },
    },
  });

export default createCustomTheme;