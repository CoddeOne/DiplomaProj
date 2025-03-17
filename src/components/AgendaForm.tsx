import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface AgendaFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const AgendaForm: React.FC<AgendaFormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: string) => {
    const updatedFormData = { ...formData };
    updatedFormData.agenda[index][field] = e.target.value;
    setFormData(updatedFormData);
  };

  return (
    <Box sx={{ p: 3 }}>
      {formData.agenda.map((item: any, index: number) => (
        <Box key={index} sx={{ mb: 2 }}>
          <TextField
            label={`Пункт ${index + 1}`}
            value={item.text}
            onChange={(e) => handleInputChange(e, index, 'text')}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
          <TextField
            label="Доповідач"
            value={item.speaker}
            onChange={(e) => handleInputChange(e, index, 'speaker')}
            fullWidth
            margin="normal"
          />
        </Box>
      ))}
    </Box>
  );
};