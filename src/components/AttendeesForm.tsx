import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface Attendee {
  position: string;
  name: string;
}

interface FormData {
  attendees: Attendee[];
}

interface AttendeesFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const AttendeesForm: React.FC<AttendeesFormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Attendee
  ) => {
    const updatedFormData = { ...formData };
    updatedFormData.attendees[index][field] = e.target.value;
    setFormData(updatedFormData);
  };

  const addAttendee = () => {
    const updatedFormData = { 
      ...formData, 
      attendees: [...formData.attendees, { position: '', name: '' }] 
    };
    setFormData(updatedFormData);
  };

  const removeAttendee = (index: number) => {
    const updatedFormData = { 
      ...formData, 
      attendees: formData.attendees.filter((_, i) => i !== index) 
    };
    setFormData(updatedFormData);
  };

  return (
    <Box sx={{ p: 3 }}>
      {formData.attendees.map((attendee, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Посада"
            value={attendee.position}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index, 'position')}
            sx={{ width: '60%' }}
          />
          <TextField
            label="ПІБ"
            value={attendee.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index, 'name')}
            sx={{ width: '60%' }}
          />
          <Button variant="outlined" color="error" onClick={() => removeAttendee(index)}>
            Видалити
          </Button>
        </Box>
      ))}
      <Button variant="contained" onClick={addAttendee} sx={{ mt: 5 }}>
        Додати присутнього
      </Button>
    </Box>
  );
};