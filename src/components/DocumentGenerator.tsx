// @ts-nocheck
import { Document, Packer, Paragraph, TextRun, TabStopType, TabStopPosition } from 'docx';
import { saveAs } from 'file-saver';
import { FormData } from '../types/types';

const getMonthName = (month: string) => {
  const months = [
    'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
    'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня',
  ];
  return months[parseInt(month) - 1] || '';
};

export const generateDocx = (formData: FormData) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Заголовок
          new Paragraph({
            children: [
              new TextRun({
                text: `Протокол № ${formData.protocolNumber}`,
                font: 'Times New Roman',
                size: 28, // 14pt
                bold: true,
              }),
            ],
            alignment: 'center',
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'засідання кафедри інформаційних технологій та систем електронних комунікацій',
                font: 'Times New Roman',
                size: 28,
              }),
            ],
            alignment: 'center',
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Навчально-наукового інституту цивільного захисту',
                font: 'Times New Roman',
                size: 28,
              }),
            ],
            alignment: 'center',
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Львівського державного університету безпеки життєдіяльності',
                font: 'Times New Roman',
                size: 28,
              }),
            ],
            alignment: 'center',
          }),
          new Paragraph({
            text: '',
          }),
          new Paragraph({
            children: [
              new TextRun({
                
                text: `«${formData.date.split('.')[0]}» ${getMonthName(formData.date.split('.')[1])} ${formData.date.split('.')[2]} року`,
                font: 'Times New Roman',
                size: 28,
              }),
            ],
            alignment: 'left',
          }),
          new Paragraph({
            text: '',
          }),

          // Голова і Секретар (верхня частина)
          new Paragraph({
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              },
            ],
            children: [
              new TextRun({
                text: 'Голова:',
                font: 'Times New Roman',
                size: 28,
              }),
              new TextRun({
                text: `\t${formData.head.name}`,
                font: 'Times New Roman',
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              },
            ],
            children: [
              new TextRun({
                text: 'Секретар:',
                font: 'Times New Roman',
                size: 28,
              }),
              new TextRun({
                text: `\t${formData.secretary.name}`,
                font: 'Times New Roman',
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            text: '',
          }),

          // Присутні
          new Paragraph({
            children: [
              new TextRun({
                text: 'Присутні:',
                font: 'Times New Roman',
                size: 28,
                bold: true,
              }),
            ],
          }),
          ...formData.attendees.map((attendee) => 
            new Paragraph({
              tabStops: [
                {
                  type: TabStopType.RIGHT,
                  position: TabStopPosition.MAX,
                },
              ],
              children: [
                new TextRun({
                  text: `\t${attendee.name}`,
                  font: 'Times New Roman',
                  size: 28,
                }),
              ],
            })
          ),
          new Paragraph({
            text: '',
          }),

          // Порядок денний
          new Paragraph({
            children: [
              new TextRun({
                text: 'Порядок денний:',
                font: 'Times New Roman',
                size: 28,
                bold: true,
              }),
            ],
          }),
          ...formData.agenda.map((item, index) => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}. ${item.text} (доповідач –  ${item.speaker})`,
                  font: 'Times New Roman',
                  size: 28,
                }),
              ],
              indent: {
                firstLine: 567,
              },
              spacing: {
                after: 200,
              },
            })
          ),
          new Paragraph({
            text: '',
          }),

          // СЛУХАЛИ
          new Paragraph({
            children: [
              new TextRun({
                text: '1. СЛУХАЛИ:',
                font: 'Times New Roman',
                size: 28,
                bold: true,
              }),
            ],
          }),
          ...formData.questions.map((question, index) => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `1.${index + 1}. ${extractSpeaker(question.speaker)}. У своїй доповіді він/вона проінформував(ла) ${question.considered}`,
                  font: 'Times New Roman',
                  size: 28,
                }),
              ],
              indent: {
                firstLine: 567,
              },
              spacing: {
                after: 200,
              },
            })
          ),
          new Paragraph({
            text: '',
          }),

          // ВИРІШИЛИ
          new Paragraph({
            children: [
              new TextRun({
                text: 'ВИРІШИЛИ:',
                font: 'Times New Roman',
                size: 28,
                bold: true,
              }),
            ],
          }),
          ...formData.questions.map((question, index) => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}. ${question.decision}`,
                  font: 'Times New Roman',
                  size: 28,
                }),
              ],
              indent: {
                firstLine: 567,
              },
              spacing: {
                after: 200,
              },
            })
          ),
          new Paragraph({
            text: '',
          }),

          // Підписи
          new Paragraph({
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              },
            ],
            children: [
              new TextRun({
                text: 'Голова',
                font: 'Times New Roman',
                size: 28,
              }),
              new TextRun({
                text: `\t${formData.deputyHead.name}`,
                font: 'Times New Roman',
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              },
            ],
            children: [
              new TextRun({
                text: 'Секретар',
                font: 'Times New Roman',
                size: 28,
              }),
              new TextRun({
                text: `\t${formData.protocolLedBy.name}`,
                font: 'Times New Roman',
                size: 28,
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Протокол № ${formData.protocolNumber}.docx`);
  });
};

const extractSpeaker = (speaker: string) => {
  const match = speaker.match(/([А-ЯІЇЄҐ][а-яіїєґ]+ [А-ЯІЇЄҐ][а-яіїєґ]+)/);
  return match ? match[0] : speaker;
};