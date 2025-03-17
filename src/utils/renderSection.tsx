import { HeaderForm } from '../components/HeaderForm';
import { AttendeesForm } from '../components/AttendeesForm';
import { AgendaForm } from '../components/AgendaForm';
import { QuestionsOverview } from '../components/QuestionsOverview';
import { QuestionForm } from '../components/QuestionForm';
import { DecisionsOverview } from '../components/DecisionsOverview';
import { DecisionForm } from '../components/DecisionForm';
import { FooterForm } from '../components/FooterForm';

export const renderSection = (selectedSection, formData, setFormData, setSelectedSection) => {
  switch (selectedSection) {
    case 'Шапка':
      return <HeaderForm formData={formData} setFormData={setFormData} />;
    case 'Присутні':
      return <AttendeesForm formData={formData} setFormData={setFormData} />;
    case 'Порядок денний':
      return <AgendaForm formData={formData} setFormData={setFormData} />;
    case 'Питання':
      return <QuestionsOverview formData={formData} setSelectedSection={setSelectedSection} />;
    case 'Рішення':
      return <DecisionsOverview formData={formData} setSelectedSection={setSelectedSection} />;
    case 'Футер':
      return <FooterForm formData={formData} setFormData={setFormData} />;
    default:
      if (selectedSection.startsWith('Питання')) {
        const index = parseInt(selectedSection.split(' ')[1]) - 1;
        return <QuestionForm index={index} formData={formData} setFormData={setFormData} />;
      }
      if (selectedSection.startsWith('Рішення')) {
        const index = parseInt(selectedSection.split(' ')[1]) - 1;
        return <DecisionForm index={index} formData={formData} setFormData={setFormData} />;
      }
      return null;
  }
};