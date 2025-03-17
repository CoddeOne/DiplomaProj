import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { Sidebar } from './components/Sidebar';
import { generateDocx } from './components/DocumentGenerator';
import Header from './components/Header';
import DocumentsModal from './Modals/DocumentsModal';
import SuccessAlert from './Modals/SuccessAlert';
import { useTheme } from './hooks/useTheme';
import { useDocuments } from './hooks/useDocuments';
import { renderSection } from './utils/renderSection';

const App = () => {
  const { mode, theme, handleThemeToggle } = useTheme();
  const {
    documents,
    formData,
    setFormData,
    isModalOpen,
    setIsModalOpen,
    saveDocument,
    handleCreateNewDoc,
    handleSelectDoc,
    handleDeleteDoc,
    openModal,
    showSuccessAlert,
    setShowSuccessAlert,
    closeSuccessAlert,
    alertMessage,
    setAlertMessage,
    validateFormData,
  } = useDocuments();
  const [selectedSection, setSelectedSection] = useState('Шапка');
  const [highlightErrors, setHighlightErrors] = useState(false);

  const addQuestion = () => {
    const updatedFormData = { ...formData };
    updatedFormData.questions.push({ speaker: '', considered: '' });
    updatedFormData.decisions.push({ title: '', text: '' });
    updatedFormData.agenda.push({ text: '', speaker: '' });
    setFormData(updatedFormData);
    setSelectedSection(`Питання ${updatedFormData.questions.length}`);
  };

  const handleGenerateDocx = () => {
    const errors = validateFormData();
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.entries(errors)
        .map(([section, fields]) => `${section}: ${fields.join(', ')}`)
        .join('\n');
      setAlertMessage(`Помилки в полях:\n${errorMessages}`);
      setShowSuccessAlert(true);
      setHighlightErrors(true);
      setTimeout(() => setHighlightErrors(false), 3000);
    } else {
      generateDocx(formData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          formData={formData}
          setFormData={setFormData}
          addQuestion={addQuestion}
          validateFormData={validateFormData}
          highlightErrors={highlightErrors}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Header mode={mode} setMode={handleThemeToggle} onOpenModal={openModal} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
            <Button variant="contained" onClick={saveDocument}>
              Зберегти документ
            </Button>
            <Button variant="contained" onClick={handleGenerateDocx}>
              Згенерувати DOCX
            </Button>
          </Box>
          {renderSection(selectedSection, formData, setFormData, setSelectedSection)}
        </Box>
      </Box>
      {isModalOpen && (
        <DocumentsModal
          documents={documents}
          onSelectDoc={handleSelectDoc}
          onCreateNew={handleCreateNewDoc}
          onDeleteDoc={handleDeleteDoc}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {showSuccessAlert && (
        <SuccessAlert message={alertMessage} onClose={closeSuccessAlert} />
      )}
    </ThemeProvider>
  );
};

export default App;