import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// Типи для вкладених об’єктів у formData
interface Question {
  speaker: string;
  considered: string;
}

interface Decision {
  title: string;
  text: string;
}

interface AgendaItem {
  text: string;
  speaker: string;
}

interface FormData {
  questions: Question[];
  decisions: Decision[];
  agenda: AgendaItem[];
}

interface SidebarProps {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  addQuestion: () => void;
  validateFormData: () => Record<string, string[]>;
  highlightErrors: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedSection,
  setSelectedSection,
  formData,
  setFormData,
  addQuestion,
  validateFormData,
  highlightErrors,
}) => {
  const sections = [
    'Шапка',
    'Присутні',
    'Порядок денний',
    'Питання',
    ...formData.questions.map((_, index) => `Питання ${index + 1}`),
    'Рішення',
    ...formData.decisions.map((_, index) => `Рішення ${index + 1}`),
    'Футер',
  ];

  const errors = validateFormData();

  const hasError = (section: string): boolean => !!errors[section];

  const isSubItem = (section: string): boolean =>
    section.startsWith('Питання ') || section.startsWith('Рішення ');

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    const updatedDecisions = formData.decisions.filter((_, i) => i !== index);
    const updatedAgenda = formData.agenda.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      questions: updatedQuestions,
      decisions: updatedDecisions,
      agenda: updatedAgenda,
    });

    if (selectedSection === `Питання ${index + 1}`) {
      setSelectedSection('Питання');
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <List
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 0,
        }}
      >
        {sections.map((section) => (
          <ListItem
            button
            key={section}
            selected={selectedSection === section}
            onClick={() => setSelectedSection(section)}
            sx={{
              flex: 1,
              cursor:"pointer",
              ...(selectedSection === section && {
                backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#e0e0e0' : '#616161'),
              }),
              ...(highlightErrors && hasError(section) && {
                backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#ffe6e6' : '#ff4d4d'),
                transition: 'background-color 0.3s',
              }),
              ...(isSubItem(section) && {
                justifyContent: 'center',
              }),
            }}
          >
            <ListItemText
              primary={section}
              sx={{
                ...(isSubItem(section) && {
                  textAlign: 'center',
                }),
                '& .MuiTypography-root': {
                  fontSize: '1.25rem',
                },
              }}
            />
            {section === 'Питання' && (
              <IconButton onClick={addQuestion} size="small">
                <AddIcon />
              </IconButton>
            )}
            {section.startsWith('Питання ') && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  const index = parseInt(section.split(' ')[1]) - 1;
                  handleDeleteQuestion(index);
                }}
                size="small"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};