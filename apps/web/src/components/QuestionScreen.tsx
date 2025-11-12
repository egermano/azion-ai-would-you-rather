import { useEffect, useState } from 'react';
import { difficultyOptions } from '../services/api';
import type { Question } from '../types';
import OptionButton from './OptionButton';
import Progress from './Progress';

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: number, selectedOption: 'A' | 'B') => void;
  onFinish?: () => void;
  isTransitioning: boolean;
}

export default function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onFinish,
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
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex-[0_0_32%] flex flex-col items-center justify-center px-6 py-8">
        <Progress current={questionNumber} total={totalQuestions} />
        <div className="mb-4 text-center">
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-2">
            {question.theme}
          </span>
          <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm rounded-full mb-2 ml-2">
            {difficultyOptions[question.difficulty as keyof typeof difficultyOptions] || question.difficulty}
          </span>
        </div>
      </div>

      <div className="flex-1 flex gap-3 p-3">
        <OptionButton
          text={question.optionA}
          variant="primary"
          isSelected={selected === "A"}
          onClick={() => handleSelect("A")}
          disabled={isTransitioning || selected !== null}
        />
        <OptionButton
          text={question.optionB}
          variant="secondary"
          isSelected={selected === "B"}
          onClick={() => handleSelect("B")}
          disabled={isTransitioning || selected !== null}
        />
      </div>

      {onFinish && (
        <div className="p-4 text-center">
          <button
            onClick={onFinish}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            disabled={isTransitioning}
          >
            Finalizar Jogo
          </button>
        </div>
      )}
    </div>
  );
}
