import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormData } from '../types/types';

interface FooterFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const FooterForm: React.FC<FooterFormProps> = ({ formData, setFormData }) => {
  const handlePersonChange = (personField: 'protocolLedBy' | 'deputyHead', subField: 'name') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [personField]: { ...formData[personField], [subField]: e.target.value },
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="Ім’я секретаря"
        value={formData.protocolLedBy.name}
        onChange={handlePersonChange('protocolLedBy', 'name')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ім’я голови"
        value={formData.deputyHead.name}
        onChange={handlePersonChange('deputyHead', 'name')}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};