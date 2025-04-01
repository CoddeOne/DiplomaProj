import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Box, Typography } from '@mui/material';

interface SuccessAlertProps {
  message: string;
  onClose: () => void;
}

const SuccessAlert = ({ message, onClose }: SuccessAlertProps) => {
  const isError = message.includes('Помилки'); 

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return ReactDOM.createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        bgcolor: isError ? 'error.main' : 'success.main', 
        color: 'white',
        p: 2,
        borderRadius: 1,
        boxShadow: 3,
        zIndex: 1500,
        minWidth: 200,
        maxWidth: 400,
        whiteSpace: 'pre-line', 
      }}
    >
      <Typography variant="body1">{message}</Typography>
    </Box>,
    document.body
  );
};

export default SuccessAlert;