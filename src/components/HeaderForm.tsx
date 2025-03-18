import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

interface Person {
  position: string;
  name: string;
}

interface FormData {
  protocolNumber: string;
  head: Person;
  secretary: Person;
}

interface HeaderFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const HeaderForm: React.FC<HeaderFormProps> = ({ formData, setFormData }) => {
  const handleChange = (field: keyof Pick<FormData, 'protocolNumber'>) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

  const handleNestedChange = (field: 'head' | 'secretary', subField: keyof Person) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [subField]: event.target.value,
        },
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
        label="Посада голови"
        value={formData.head.position}
        onChange={handleNestedChange('head', 'position')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ім'я голови"
        value={formData.head.name}
        onChange={handleNestedChange('head', 'name')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Посада секретаря"
        value={formData.secretary.position}
        onChange={handleNestedChange('secretary', 'position')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ім'я секретаря"
        value={formData.secretary.name}
        onChange={handleNestedChange('secretary', 'name')}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};