import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


interface Person {
  position: string;
  name: string;
}

interface FormData {
  protocolLedBy: Person;
  deputyHead: Person;
}


interface FooterFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const FooterForm: React.FC<FooterFormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: 'protocolLedBy' | 'deputyHead',
    field: keyof Person
  ) => {
    const updatedFormData = { 
      ...formData, 
      [section]: { ...formData[section], [field]: e.target.value }
    };
    setFormData(updatedFormData);
  };

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        label="Посада (Протокол вела)"
        value={formData.protocolLedBy.position}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'protocolLedBy', 'position')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="ПІБ (Протокол вела)"
        value={formData.protocolLedBy.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'protocolLedBy', 'name')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Посада (Заступник)"
        value={formData.deputyHead.position}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'deputyHead', 'position')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="ПІБ (Заступник)"
        value={formData.deputyHead.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'deputyHead', 'name')}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};