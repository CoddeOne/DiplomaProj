import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface QuestionFormProps {
  index: number;
  formData: any;
  setFormData: (data: any) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ index, formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const updatedFormData = { ...formData };
    updatedFormData.questions[index][field] = e.target.value;
    setFormData(updatedFormData);
  };

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        label="З доповіддю виступив"
        value={formData.questions[index]?.speaker || ''}
        onChange={(e) => handleInputChange(e, 'speaker')}
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />
      <TextField
        label="Розглянуто"
        value={formData.questions[index]?.considered || ''}
        onChange={(e) => handleInputChange(e, 'considered')}
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />
    </Box>
  );
};