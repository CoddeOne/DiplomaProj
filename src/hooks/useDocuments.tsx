import { useState, useEffect } from 'react';
import initialFormData from '../utils/initialFormData';
import { FormData } from '../types/types';

interface DocumentItem {
  id: string;
  name: string;
  data: FormData;
}

interface UseDocumentsProps {
  setSelectedSection: (section: string) => void;
}

const getFromStorage = (key: string, defaultValue: any) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

const setToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeFromStorage = (key: string) => localStorage.removeItem(key);

export const useDocuments = ({ setSelectedSection }: UseDocumentsProps) => {
  const [documents, setDocuments] = useState<DocumentItem[]>(getFromStorage('documents', []));
  const [currentDoc, setCurrentDoc] = useState<DocumentItem | null>(getFromStorage('currentDoc', null));
  const [formData, setFormData] = useState<FormData>(
    getFromStorage('currentFormData', currentDoc?.data ?? initialFormData)
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(
    !getFromStorage('currentDoc', null) && !getFromStorage('currentFormData', null)
  );
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  useEffect(() => setToStorage('documents', documents), [documents]);
  useEffect(() =>
    currentDoc ? setToStorage('currentDoc', currentDoc) : removeFromStorage('currentDoc'),
    [currentDoc]
  );
  useEffect(() => {
    const handleBeforeUnload = () => setToStorage('currentFormData', formData);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData]);
  
  const updateCurrentDoc = () => {
    if (!currentDoc) return;
    const updatedDoc: DocumentItem = { ...currentDoc, data: formData };
    setDocuments((docs) => docs.map((doc) => (doc.id === currentDoc.id ? updatedDoc : doc)));
    setCurrentDoc(updatedDoc);
  };

  const saveDocument = () => {
    const doc: DocumentItem = currentDoc
      ? { ...currentDoc, data: formData }
      : {
          id: Date.now().toString(),
          name: `Протокол № ${formData.protocolNumber || 'Без номера'}`,
          data: formData,
        };
    setDocuments((docs) =>
      currentDoc ? docs.map((d) => (d.id === doc.id ? doc : d)) : [...docs, doc]
    );
    setCurrentDoc(doc);
    setToStorage('currentFormData', formData);
    setAlertMessage('Дані збережено успішно');
    setShowSuccessAlert(true);
  };

  const handleCreateNewDoc = (protocolNumber: string) => {
    if (currentDoc) {
      updateCurrentDoc();
    }

    const newFormData: FormData = JSON.parse(JSON.stringify(initialFormData));
    newFormData.protocolNumber = protocolNumber;

    const newDoc: DocumentItem = {
      id: Date.now().toString(),
      name: `Протокол № ${protocolNumber || 'Без номера'}`,
      data: newFormData,
    };

    console.log('useDocuments: Creating new doc with formData:', newFormData);
    setFormData(newFormData);
    setCurrentDoc(newDoc);
    setDocuments((docs) => [...docs, newDoc]);
    setSelectedSection('Головна');
    setIsModalOpen(false);
    removeFromStorage('currentFormData');
  };

  const handleSelectDoc = (doc: DocumentItem) => {
    if (currentDoc) {
      updateCurrentDoc();
    }
    setCurrentDoc(doc);
    setFormData(doc.data);
    setSelectedSection('Головна');
    setIsModalOpen(false);
  };

  const handleDeleteDoc = (docId: string) => {
    setDocuments((docs) => docs.filter((doc) => doc.id !== docId));
    if (currentDoc?.id === docId) {
      setCurrentDoc(null);
      setFormData(initialFormData);
      setSelectedSection('Головна');
      removeFromStorage('currentFormData');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeSuccessAlert = () => setShowSuccessAlert(false);

  const validateFormData = (): Record<string, string[]> => {
    const errors: Record<string, string[]> = {};
    const requiredFields: Record<string, { key: string; label: string }[]> = {
      'Головна': [
        { key: 'protocolNumber', label: 'Номер протоколу' },
        { key: 'head.name', label: 'Ім’я голови' },
        { key: 'secretary.name', label: 'Ім’я секретаря' },
        { key: 'date', label: 'Дата' },
      ],
      'Реквізити виконавця': [
        { key: 'protocolLedBy.name', label: 'Ім’я ведучого' },
        { key: 'deputyHead.name', label: 'Ім’я заступника' },
      ],
    };

    Object.entries(requiredFields).forEach(([section, fields]) => {
      fields.forEach(({ key, label }) => {
        const keys = key.split('.');
        const value = keys.reduce((obj, k) => obj?.[k as keyof typeof obj], formData as any);
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors[section] = [...(errors[section] || []), label];
        }
      });
    });


    ['attendees', 'agenda', 'questions'].forEach((arrayKey, index) => {
      const sectionNames = ['Присутні', 'Порядок денний', 'Питання'];
      (formData[arrayKey as keyof FormData] as any[]).forEach((item, i) => {
        if (arrayKey === 'questions') {
          const isEmpty = !item.speaker?.trim() || !item.considered?.trim() || !item.decision?.trim();
          if (isEmpty) {
            errors[`${sectionNames[index]} ${i + 1}`] = [
              ...(errors[`${sectionNames[index]} ${i + 1}`] || []),
              !item.speaker?.trim() ? 'Доповідач' : '',
              !item.considered?.trim() ? 'Розглянуто' : '',
              !item.decision?.trim() ? 'Рішення' : '',
            ].filter(Boolean);
          }
        } else {
          const isEmpty = Object.values(item).some(
            (val) => !val || (typeof val === 'string' && val.trim() === '')
          );
          if (isEmpty) {
            const section = arrayKey === 'agenda' ? `${sectionNames[index]} ${i + 1}` : sectionNames[index];
            errors[section] = [...(errors[section] || []), 'Поле'];
          }
        }
      });
    });

    return errors;
  };

  return {
    documents,
    formData,
    setFormData,
    currentDoc,
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
  };
};