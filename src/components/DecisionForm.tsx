import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface DecisionFormProps {
  index: number;
  formData: any;
  setFormData: (data: any) => void;
}

export const DecisionForm: React.FC<DecisionFormProps> = ({ index, formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedFormData = { ...formData };
    updatedFormData.questions[index].decision = e.target.value; 
    setFormData(updatedFormData);
  };

  return (
    <Box>
      <TextField
        label="Рішення"
        value={formData.questions[index]?.decision || ''}
        onChange={handleInputChange}
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />
    </Box>
  );
};