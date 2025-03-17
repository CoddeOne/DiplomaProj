import React from 'react';
import { Box, Button } from '@mui/material';
import CustomThemeSwitch from '../CustomComponents/ThemeSwitch';

interface HeaderProps {
  mode: 'light' | 'dark';
  setMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenModal: () => void; 
}

const Header = ({ mode, setMode, onOpenModal }: HeaderProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomThemeSwitch checked={mode === 'dark'} onChange={setMode} />
        <Box component="span" sx={{ ml: 1 }}>
          {mode === 'dark' ? 'Dark Theme' : 'Light Theme'}
        </Box>
      </Box>
      <Button variant="outlined" onClick={onOpenModal}>
        Змінити документ
      </Button>
    </Box>
  );
};

export default Header;