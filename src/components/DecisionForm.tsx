import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface DecisionFormProps {
  index: number;
  formData: any;
  setFormData: (data: any) => void;
}

export const DecisionForm: React.FC<DecisionFormProps> = ({ index, formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const updatedFormData = { ...formData };
    updatedFormData.decisions[index][field] = e.target.value;
    setFormData(updatedFormData);
  };

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        label="Заголовок"
        value={formData.decisions[index]?.title || ''}
        onChange={(e) => handleInputChange(e, 'title')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Текст рішення"
        value={formData.decisions[index]?.text || ''}
        onChange={(e) => handleInputChange(e, 'text')}
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />
    </Box>
  );
};