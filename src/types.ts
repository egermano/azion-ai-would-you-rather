export interface Question {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
}

export interface Answer {
  questionId: number;
  selectedOption: 'A' | 'B';
}
