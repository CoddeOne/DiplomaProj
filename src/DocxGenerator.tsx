import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

const DocxGenerator = () => {
  // Стан для зберігання даних
  const [formData, setFormData] = useState({
       head: { position: 'заступник начальника кафедри', name: 'БУРАК Назарій' },
    secretary: { position: 'ст. викладач кафедри', name: 'НАЗАР Юлія' },
    attendees: [
      { position: 'професор кафедри', name: 'МАРТИН Євген' },
      { position: 'професор кафедри', name: 'МАЛЕЦЬ Ігор' },
      { position: 'доцент кафедри', name: 'БОРЗОВ Юрій' },
      { position: 'доцент кафедри', name: 'СМОТР Ольга' },
      { position: 'доцент кафедри', name: 'ХЛЕВНОЙ Олександр' },
      { position: 'доцент кафедри', name: 'ГОЛОВАТИЙ Роман' },
      { position: 'доцент кафедри', name: 'РОВЕЦЬКИЙ Іван' },
      { position: 'викладач кафедри', name: 'РАЙТА Діана' },
      { position: 'викладач кафедри', name: 'ЖЕЗЛО-ХЛЕВНА Наталія' },
      { position: 'викладач кафедри', name: 'ДОВБНЯК Віра' },
      { position: 'викладач кафедри', name: 'ГАЩУК Любомир' },
    ],
    agenda: [
      {
        text: 'Про відрядження професора кафедри інформаційних технологій та систем електронних комунікацій, полковника служби цивільного захисту МАЛЬЦЯ Ігоря в ГУ ДСНС України у Миколаївській області.',
        speaker: 'Назарій БУРАК',
      },
      {
        text: 'Про стажування на посаді викладача кафедри інформаційних технологій та систем електронних комунікацій Львівського державного університету безпеки життєдіяльності капітана служби цивільного захисту Пилипенка Володимира Миколайовича.',
        speaker: 'Назарій БУРАК',
      },
      {
        text: 'Про стан виконання заходів визначених у плані робіт і прийнятих рішень, ведення обліково-звітної документації.',
        speaker: 'Назарій БУРАК',
      },
    ],
    questions: [
      {
        speaker: 'Заступник начальника кафедри Назарій БУРАК про відрядження професора кафедри інформаційних технологій та систем електронних комунікацій, полковника служби цивільного захисту МАЛЬЦЯ Ігоря в ГУ ДСНС України у Миколаївській області. Суть питання: набуття практичного досвіду науково-педагогічними працівниками Львівського державного університету безпеки життєдіяльності щодо ліквідації наслідків збройної агресії та впровадження цього досвіду в освітній процес.',
        considered: 'План стажування полковника служби цивільного захисту МАЛЬЦЯ Ігоря в ГУ ДСНС України у Миколаївській області.',
      },
      {
        speaker: 'Заступник начальника кафедри Назарій БУРАК про стажування на посаді викладача кафедри інформаційних технологій та систем електронних комунікацій Львівського державного університету безпеки життєдіяльності капітана служби цивільного захисту Пилипенка Володимира Миколайовича.',
        considered: 'План стажування на посаді викладача кафедри інформаційних технологій та систем електронних комунікацій Львівського державного університету безпеки життєдіяльності капітана служби цивільного захисту Пилипенка Володимира Миколайовича в період з 07 жовтня 2024 по 07 грудня 2024 року.',
      },
      {
        speaker: 'Заступник начальника кафедри Назарій БУРАК про стан виконання заходів визначених у плані робіт і прийнятих рішень, ведення обліково-звітної документації.',
        considered: 'Звіт про виконання заходів, визначених у плані робіт і прийнятих рішень, ведення обліково-звітної документації.',
      },
    ],
    decisions: [
      {
        title: 'Рішення засідання кафедри по першому питанню',
        text: 'Відрядити згідно Додатку 1 до Листа ЛДУ БЖД №90 01-3145/90 151 від 12.09.2024 року «Про надання інформації» професора кафедри інформаційних технологій та систем електронних комунікацій, полковника служби цивільного захисту МАЛЬЦЯ Ігоря з 14 жовтня по 26 жовтня 2024 року до відділу телекомунікацій, інформаційних технологій та Системи 112 ГУ ДСНС України у Миколаївській області для проходження стажування.',
      },
      {
        title: 'Рішення засідання кафедри по другому питанню',
        text: 'Затвердити план стажування на посаді викладача кафедри інформаційних технологій та систем електронних комунікацій Львівського державного університету безпеки життєдіяльності капітана служби цивільного захисту Пилипенка Володимира Миколайовича в період з 07 жовтня 2024 по 07 грудня 2024 року. Призначити керівником стажування доцента кафедри інформаційних технологій та систем електронних комунікацій Борзова Юрія Олексійовича.',
      },
      {
        title: 'Рішення засідання кафедри по третьому питанню',
        text: 'Інформацію заступника начальника кафедри Назарія Бурака взяти до відома. Вважати стан виконання заходів визначених у плані робіт і прийнятих рішень, ведення обліково-звітної документації задовільним. Вик.: науково-педагогічні працівники. Термін: протягом навчального року.',
      },
    ],
    protocolLedBy: { position: 'капітан служби цивільного захисту', name: 'Юлія НАЗАР' },
    deputyHead: { position: 'підполковник служби цивільного захисту', name: 'Назарій БУРАК' },
    date: '04.10.2024',
  });

  // Функція для оновлення даних у формі
  const handleInputChange = (e, section, index, field) => {
    const updatedFormData = { ...formData };
    if (section === 'head' || section === 'secretary' || section === 'protocolLedBy' || section === 'deputyHead') {
      updatedFormData[section][field] = e.target.value;
    } else if (section === 'date') {
      updatedFormData.date = e.target.value;
    } else if (index !== undefined) {
      updatedFormData[section][index][field] = e.target.value;
    }
    setFormData(updatedFormData);
  };

  // Функція для додавання нового присутнього
  const addAttendee = () => {
    const updatedFormData = { ...formData };
    updatedFormData.attendees.push({ position: '', name: '' });
    setFormData(updatedFormData);
  };

  // Функція для видалення присутнього
  const removeAttendee = (index) => {
    const updatedFormData = { ...formData };
    updatedFormData.attendees.splice(index, 1);
    setFormData(updatedFormData);
  };

  // Функція для генерації документа
  const generateDocx = () => {
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
              children: [new TextRun({ text: 'ПРОТОКОЛ №4' ,bold:true})],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'кафедри інформаційних технологій та систем електронних комунікацій',
                  bold:true
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Навчально-наукового інституту цивільного захисту' ,bold:true}),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Львівського державного університету безпеки життєдіяльності', bold:true
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [new TextRun({ text: `${formData.date} року` })],
              alignment: AlignmentType.LEFT,
            }),

            new Paragraph({
              children: [new TextRun({ text: 'Голова: ', bold: true })],
              spacing: { line: 200, after: 0 },
            }),
            
            new Paragraph({
              children: [
                new TextRun({ text: 'заступник начальника кафедри', bold: true }),
                new TextRun({ text: `\t\t\t\t\tБУРАК Назарій` }),
              ],
              spacing: { line: 200, after: 0 },
            }),
            
            // Для Секретаря
            new Paragraph({
              children: [new TextRun({ text: 'Секретар: ', bold: true })],
              spacing: { line: 240, after: 0 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'ст. викладач кафедри', bold: true }),
                new TextRun({ text: `\t\t\t\t\t\tНАЗАР Юлія` }),
              ],
              spacing: { line: 240, after: 0 },
            }),

            // Присутні
            new Paragraph({
              children: [new TextRun({ text: 'Присутні:', bold: true })],
              spacing: { line: 240, after: 0 },
            }),
            ...formData.attendees.map((attendee) => {
              const [surname, firstName] = attendee.name.split(' ');
              const formattedName = `${surname.toUpperCase()} ${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()}`;
              return new Paragraph({
                style: 'attendees',
                children: [
                  new TextRun({ text: attendee.position }),
                  new TextRun({ text: `\t\t\t\t\t\t\t${formattedName}` }),
                ],
                spacing: { after: 0, line: 220 }
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
            ...formData.agenda.map((item, index) => [
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
            ...formData.questions.map((question, index) => [
              new Paragraph({}),
              new Paragraph({
                style: 'heading2',
                children: [new TextRun({ text: `ПИТАННЯ ${index + 1}`,  bold:true})],
                alignment: AlignmentType.CENTER
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
            ...formData.decisions.map((decision) => [
    
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
            
            new Paragraph({}),
            new Paragraph({}),
            new Paragraph({
              text: 'Протокол вела:',
              spacing: { after: 0, line: 240 },
            }),
            new Paragraph({ text: 'ст. викладач кафедри, PhD' , spacing: { after: 0, line: 240 },}),
            new Paragraph({
              children: [
                new TextRun({ text: formData.protocolLedBy.position }),
                new TextRun({ text: `\t\t\t\t\t${formData.protocolLedBy.name}`, bold: true }),
              ],
              spacing: { after: 0, line: 240 },
            }),
            new Paragraph({}),
            new Paragraph({ text: 'Заступник начальник кафедри' , spacing: { after: 0, line: 240 },}),
            new Paragraph({ text: 'к.т.н., доцент' , spacing: { after: 0, line: 240 },}),
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
      saveAs(blob, 'Protocol_4.docx');
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Створення протоколу</h2>

      {/* Форма для введення даних */}
      <div>
        <h3>Дата</h3>
        <input
          type="text"
          value={formData.date}
          onChange={(e) => handleInputChange(e, 'date')}
          placeholder="04.10.2024"
        />
      </div>

      <div>
        <h3>Голова</h3>
        <input
          type="text"
          value={formData.head.position}
          onChange={(e) => handleInputChange(e, 'head', undefined, 'position')}
          placeholder="Посада"
        />
        <input
          type="text"
          value={formData.head.name}
          onChange={(e) => handleInputChange(e, 'head', undefined, 'name')}
          placeholder="Прізвище та ім'я"
        />
      </div>

      <div>
        <h3>Секретар</h3>
        <input
          type="text"
          value={formData.secretary.position}
          onChange={(e) => handleInputChange(e, 'secretary', undefined, 'position')}
          placeholder="Посада"
        />
        <input
          type="text"
          value={formData.secretary.name}
          onChange={(e) => handleInputChange(e, 'secretary', undefined, 'name')}
          placeholder="Прізвище та ім'я"
        />
      </div>

      <div>
        <h3>Присутні</h3>
        {formData.attendees.map((attendee, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={attendee.position}
              onChange={(e) => handleInputChange(e, 'attendees', index, 'position')}
              placeholder="Посада"
              style={{ marginRight: '10px' }}
            />
            <input
              type="text"
              value={attendee.name}
              onChange={(e) => handleInputChange(e, 'attendees', index, 'name')}
              placeholder="Прізвище та ім'я"
              style={{ marginRight: '10px' }}
            />
            <button onClick={() => removeAttendee(index)}>Видалити</button>
          </div>
        ))}
        <button onClick={addAttendee}>Додати присутнього</button>
      </div>

      <div>
        <h3>Порядок денний</h3>
        {formData.agenda.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <textarea
              value={item.text}
              onChange={(e) => handleInputChange(e, 'agenda', index, 'text')}
              placeholder="Текст пункту порядку денного"
              style={{ width: '300px', height: '100px', marginRight: '10px' }}
            />
            <input
              type="text"
              value={item.speaker}
              onChange={(e) => handleInputChange(e, 'agenda', index, 'speaker')}
              placeholder="Доповідач"
            />
          </div>
        ))}
      </div>

      <div>
        <h3>Питання</h3>
        {formData.questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <textarea
              value={question.speaker}
              onChange={(e) => handleInputChange(e, 'questions', index, 'speaker')}
              placeholder="З доповіддю виступив"
              style={{ width: '300px', height: '100px', marginRight: '10px' }}
            />
            <textarea
              value={question.considered}
              onChange={(e) => handleInputChange(e, 'questions', index, 'considered')}
              placeholder="Розглянуто"
              style={{ width: '300px', height: '100px' }}
            />
          </div>
        ))}
      </div>

      <div>
        <h3>Рішення</h3>
        {formData.decisions.map((decision, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={decision.title}
              onChange={(e) => handleInputChange(e, 'decisions', index, 'title')}
              placeholder="Заголовок рішення"
              style={{ marginRight: '10px' }}
            />
            <textarea
              value={decision.text}
              onChange={(e) => handleInputChange(e, 'decisions', index, 'text')}
              placeholder="Текст рішення"
              style={{ width: '300px', height: '100px' }}
            />
          </div>
        ))}
      </div>

      <div>
        <h3>Протокол вела</h3>
        <input
          type="text"
          value={formData.protocolLedBy.position}
          onChange={(e) => handleInputChange(e, 'protocolLedBy', undefined, 'position')}
          placeholder="Посада"
        />
        <input
          type="text"
          value={formData.protocolLedBy.name}
          onChange={(e) => handleInputChange(e, 'protocolLedBy', undefined, 'name')}
          placeholder="Прізвище та ім'я"
        />
      </div>

      <div>
        <h3>Заступник начальника кафедри</h3>
        <input
          type="text"
          value={formData.deputyHead.position}
          onChange={(e) => handleInputChange(e, 'deputyHead', undefined, 'position')}
          placeholder="Посада"
        />
        <input
          type="text"
          value={formData.deputyHead.name}
          onChange={(e) => handleInputChange(e, 'deputyHead', undefined, 'name')}
          placeholder="Прізвище та ім'я"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={generateDocx}>Generate DOCX</button>
      </div>
    </div>
  );
};

export default DocxGenerator;