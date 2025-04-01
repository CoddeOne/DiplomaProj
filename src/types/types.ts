export interface Person {
    name: string;
  }
  
  export interface FormData {
    protocolNumber: string;
    head: Person;
    secretary: Person;
    attendees: { name: string }[];
    agenda: { text: string; speaker: string }[];
    questions: { speaker: string; considered: string; decision: string }[];
    protocolLedBy: Person;
    deputyHead: Person;
    date: string;
  }