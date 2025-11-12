import { useState, useEffect } from 'react';
import type { Question } from '../types';
import OptionButton from './OptionButton';
import Progress from './Progress';
import QuestionText from './QuestionText';

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: number, selectedOption: 'A' | 'B') => void;
  isTransitioning: boolean;
}

export default function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  isTransitioning,
}: QuestionScreenProps) {
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);

  useEffect(() => {
    setSelected(null);
  }, [question.id]);

  const handleSelect = (option: 'A' | 'B') => {
    if (isTransitioning || selected) return;
    setSelected(option);
    onAnswer(question.id, option);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-opacity duration-200 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex-[0_0_32%] flex flex-col items-center justify-center px-6 py-8">
        <Progress current={questionNumber} total={totalQuestions} />
        <QuestionText text={question.question} />
      </div>

      <div className="flex-1 flex gap-3 p-3">
        <OptionButton
          text={question.optionA}
          variant="primary"
          isSelected={selected === 'A'}
          onClick={() => handleSelect('A')}
          disabled={isTransitioning || selected !== null}
        />
        <OptionButton
          text={question.optionB}
          variant="secondary"
          isSelected={selected === 'B'}
          onClick={() => handleSelect('B')}
          disabled={isTransitioning || selected !== null}
        />
      </div>
    </div>
  );
}
