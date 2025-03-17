import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

export const generateDocx = (formData: any) => {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Times New Roman',
            size: 24, // 12pt
          },
          paragraph: {
            spacing: {
              line: 240, // Міжрядковий інтервал 1.0 (12pt * 1.0 * 20)
              after: 120, // Відступ після абзацу 6pt
            },
          },
        },
        heading1: {
          run: {
            bold: true,
            size: 28, // 14pt для "ПРОТОКОЛ №4"
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
            spacing: { after: 240, line: 240 }, // Міжрядковий інтервал 1.0
          },
        },
        heading2: {
          run: {
            bold: true,
            size: 24, // 12pt для "ПОРЯДОК ДЕННИЙ", "ПИТАННЯ", "РІШЕННЯ"
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
            spacing: { after: 240, line: 240 }, // Міжрядковий інтервал 1.0
          },
        },
        attendees: {
          paragraph: {
            spacing: { after: 60, line: 240 }, // Міжрядковий інтервал 1.0 для списку присутніх
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // 2 см
              bottom: 1134, // 2 см
              left: 1501, // 3 см
              right: 1134, // 2 см
            },
          },
        },
        children: [
          // Заголовок
          new Paragraph({
            style: 'heading1',
            children: [new TextRun({ text:`ПРОТОКОЛ №${formData.protocolNumber}`, bold: true })],
            spacing: { line: 220, after: 0 },
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({}),
          new Paragraph({
            children: [
              new TextRun({
                text: 'кафедри інформаційних технологій та систем електронних комунікацій',
                bold: true,
              }),
            ],
            spacing: { line: 220, after: 0 },
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Навчально-наукового інституту цивільного захисту', bold: true }),
            ],
            spacing: { line: 220, after: 0 },
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Львівського державного університету безпеки життєдіяльності',
                bold: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [new TextRun({ text: `${formData.date} року` })],
            alignment: AlignmentType.LEFT,
          }),

          // Голова
          new Paragraph({
            children: [new TextRun({ text: 'Голова: ', bold: true })],
            spacing: { line: 200, after: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: formData.head.position, bold: true }),
              new TextRun({ text: `\t\t\t\t\t${formData.head.name}` }),
            ],
            spacing: { line: 200, after: 0 },
          }),

          // Секретар
          new Paragraph({
            children: [new TextRun({ text: 'Секретар: ', bold: true })],
            spacing: { line: 240, after: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: formData.secretary.position, bold: true }),
              new TextRun({ text: `\t\t\t\t\t\t${formData.secretary.name}` }),
            ],
            spacing: { line: 240, after: 0 },
          }),

          // Присутні
          new Paragraph({
            children: [new TextRun({ text: 'Присутні:', bold: true })],
            spacing: { line: 240, after: 0 },
          }),
          ...formData.attendees.map((attendee: any) => {
            const [surname, firstName] = attendee.name.split(' ');
            const formattedName = `${surname.toUpperCase()} ${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()}`;
            return new Paragraph({
              style: 'attendees',
              children: [
                new TextRun({ text: attendee.position }),
                new TextRun({ text: `\t\t\t\t\t\t\t${formattedName}` }),
              ],
              spacing: { after: 0, line: 220 },
            });
          }),

          // Порядок денний
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({
            style: 'heading2',
            children: [new TextRun({ text: 'ПОРЯДОК ДЕННИЙ:' })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({}),
          new Paragraph({}),
          ...formData.agenda.map((item: any, index: number) => [
            new Paragraph({
              text: `${index + 1}. \t ${item.text}`,
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Доповідач: ', bold: true }),
                new TextRun({ text: item.speaker, bold: true }),
              ],
              alignment: AlignmentType.RIGHT,
            }),
          ]).flat(),

          // Питання
          ...formData.questions.map((question: any, index: number) => [
            new Paragraph({}),
            new Paragraph({
              style: 'heading2',
              children: [new TextRun({ text: `ПИТАННЯ ${index + 1}`, bold: true })],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [new TextRun({ text: 'З доповіддю виступив:' })],
            }),
            new Paragraph({
              text: `\t${question.speaker}`,
            }),
            new Paragraph({
              children: [new TextRun({ text: 'Розглянуто:' })],
            }),
            new Paragraph({
              text: `\t${question.considered}`,
            }),
          ]).flat(),

          // Рішення
          new Paragraph({}),
          new Paragraph({
            style: 'heading2',
            children: [new TextRun({ text: 'РІШЕННЯ:' })],
            alignment: AlignmentType.CENTER,
          }),
          ...formData.decisions.map((decision: any) => [
            new Paragraph({
              children: [
                new TextRun({ text: `\t${decision.title}`, bold: true }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 120 },
            }),
            new Paragraph({}),
            new Paragraph({
              children: [new TextRun({ text: '\tРішення:', bold: true })],
            }),
            new Paragraph({
              text: `\t${decision.text}`,
            }),
          ]).flat(),

          // Футер
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({
            text: 'Протокол вела:',
            spacing: { after: 0, line: 240 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: formData.protocolLedBy.position }),
              new TextRun({ text: `\t\t\t\t\t${formData.protocolLedBy.name}`, bold: true }),
            ],
            spacing: { after: 0, line: 240 },
          }),
          new Paragraph({}),
          new Paragraph({
            text: 'Заступник начальник кафедри',
            spacing: { after: 0, line: 240 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: formData.deputyHead.position }),
              new TextRun({ text: `\t\t\t\t${formData.deputyHead.name}`, bold: true }),
            ],
            spacing: { after: 0, line: 240 },
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, formData.protocolNumber);
  });
};