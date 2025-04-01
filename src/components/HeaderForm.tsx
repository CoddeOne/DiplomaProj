import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormData } from '../types/types';

interface HeaderFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const HeaderForm: React.FC<HeaderFormProps> = ({ formData, setFormData }) => {
  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handlePersonChange = (personField: 'head' | 'secretary', subField: 'name') => (
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
        label="Номер протоколу"
        value={formData.protocolNumber}
        onChange={handleChange('protocolNumber')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ім’я голови"
        value={formData.head.name}
        onChange={handlePersonChange('head', 'name')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ім’я секретаря"
        value={formData.secretary.name}
        onChange={handlePersonChange('secretary', 'name')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Дата"
        value={formData.date}
        onChange={handleChange('date')}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};