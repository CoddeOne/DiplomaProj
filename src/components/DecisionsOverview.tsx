import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface DecisionsOverviewProps {
  formData: any;
  setSelectedSection: (section: string) => void;
}

export const DecisionsOverview: React.FC<DecisionsOverviewProps> = ({ formData, setSelectedSection }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6">Усі рішення</Typography>
      {formData.decisions.map((decision: any, index: number) => (
        <Box
          key={index}
          sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 1, cursor: 'pointer' }}
          onClick={() => setSelectedSection(`Рішення ${index + 1}`)}
        >
          <Typography variant="subtitle1">Рішення {index + 1}</Typography>
          <Typography variant="body2">{decision.title.substring(0, 50)}...</Typography>
        </Box>
      ))}
    </Box>
  );
};