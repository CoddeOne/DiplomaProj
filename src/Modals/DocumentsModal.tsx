import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormData } from 'types';

interface DocumentItem {
  id: string;
  name: string;
  data: FormData;
}

interface DocumentsModalProps {
  documents: DocumentItem[];
  onSelectDoc: (doc: DocumentItem) => void;
  onCreateNew: (protocolNumber: string) => void;
  onDeleteDoc: (docId: string) => void;
  onClose: () => void;
}

const DocumentsModal: React.FC<DocumentsModalProps> = ({
  documents,
  onSelectDoc,
  onCreateNew,
  onDeleteDoc,
  onClose,
}) => {
  const [newProtocolNumber, setNewProtocolNumber] = React.useState('');

  const handleCreate = () => {
    if (newProtocolNumber.trim()) {
      onCreateNew(newProtocolNumber); // Передаємо номер у handleCreateNewDoc
      setNewProtocolNumber('');
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      disableEscapeKeyDown={!documents.length}
      BackdropProps={{
        onClick: (e) => {
          if (!documents.length) {
            e.stopPropagation();
          } else {
            onClose();
          }
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Виберіть документ або створіть новий
        </Typography>
        <List>
          {documents.map((doc) => (
            <ListItem
              key={doc.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => onDeleteDoc(doc.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={doc.name} // Тут відображається "Протокол № 31"
                onClick={() => onSelectDoc(doc)}
                sx={{ cursor: 'pointer' }}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            label="Номер протоколу"
            value={newProtocolNumber}
            onChange={(e) => setNewProtocolNumber(e.target.value)}
            size="small"
            fullWidth
          />
          <Button variant="contained" onClick={handleCreate} disabled={!newProtocolNumber.trim()}>
            Створити
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DocumentsModal;