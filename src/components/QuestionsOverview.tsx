import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface QuestionsOverviewProps {
  formData: any;
  setSelectedSection: (section: string) => void;
}

export const QuestionsOverview: React.FC<QuestionsOverviewProps> = ({ formData, setSelectedSection }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Усі питання</Typography>
      {formData.questions.map((question: any, index: number) => (
        <Box
          key={index}
          sx={{ mb: 2, p: 2, border: '1px solid', borderRadius: 1, cursor: 'pointer' }} // Беремо borderColor із теми
          onClick={() => setSelectedSection(`Питання ${index + 1}`)}
        >
          <Typography variant="subtitle1">Питання {index + 1}</Typography>
          <Typography variant="body2">{question.speaker.substring(0, 50)}...</Typography>
        </Box>
      ))}
    </Box>
  );
};