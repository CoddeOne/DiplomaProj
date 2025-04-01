//@ts-nocheck
import { HeaderForm } from '../components/HeaderForm';
import { AttendeesForm } from '../components/AttendeesForm';
import { AgendaForm } from '../components/AgendaForm';
import { QuestionsOverview } from '../components/QuestionsOverview';
import { QuestionForm } from '../components/QuestionForm';
import { FooterForm } from '../components/FooterForm';
import { FormData } from '../types/types';

interface RenderSectionProps {
  selectedSection: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setSelectedSection: (section: string) => void;
}

export const renderSection = (selectedSection, formData, setFormData, setSelectedSection)  => {

  switch (selectedSection) {
    case 'Головна':
      return <HeaderForm formData={formData} setFormData={setFormData} />;
    case 'Присутні':
      return <AttendeesForm formData={formData} setFormData={setFormData} />;
    case 'Порядок денний':
      return <AgendaForm formData={formData} setFormData={setFormData} />;
    case 'Питання':
      return <QuestionsOverview formData={formData} setSelectedSection={setSelectedSection} />;
    case 'Реквізити виконавця':
      return <FooterForm formData={formData} setFormData={setFormData} />;
    default:
      if (selectedSection.startsWith('Питання')) {
        const index = parseInt(selectedSection.split(' ')[1]) - 1;
        return <QuestionForm index={index} formData={formData} setFormData={setFormData} />;
      }
      return null;
  }
};