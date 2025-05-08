import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DecisionForm } from './DecisionForm';

interface QuestionFormProps {
  index: number;
  formData: any;
  setFormData: (data: any) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ index, formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const updatedFormData = { ...formData };
    updatedFormData.questions[index][field] = e.target.value;
    
    if (field === 'agendaItem') {
      if (!updatedFormData.agenda[index]) {
        updatedFormData.agenda[index] = { text: '', speaker: '' };
      }
      updatedFormData.agenda[index].text = e.target.value;
    }
    if (field === 'speaker') {
      if (!updatedFormData.agenda[index]) {
        updatedFormData.agenda[index] = { text: '', speaker: '' };
      }
      updatedFormData.agenda[index].speaker = e.target.value;
    }
    setFormData(updatedFormData);
  };

  return (
    <Box sx={{ p: 3 }}>
       <TextField
        label="Порядок денний"
        value={formData.questions[index]?.agendaItem || ''}
        onChange={(e) => handleInputChange(e, 'agendaItem')}
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />
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
        label="Слухали"
        value={formData.questions[index]?.considered || ''}
        onChange={(e) => handleInputChange(e, 'considered')}
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />
      <DecisionForm index={index} formData={formData} setFormData={setFormData} />
    </Box>
  );
};