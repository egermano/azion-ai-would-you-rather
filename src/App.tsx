import { useState } from 'react';
import QuestionScreen from './components/QuestionScreen';
import SummaryScreen from './components/SummaryScreen';
import { questions } from './data/questions';
import type { Answer } from './types';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (questionId: number, selectedOption: 'A' | 'B') => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setAnswers([...answers, { questionId, selectedOption }]);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
      setIsTransitioning(false);
    }, 280);
  };

  const handleReplay = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsTransitioning(false);
  };

  const isComplete = answers.length === questions.length;

  return (
    <div className="dark">
      <div className="min-h-screen bg-[#1c1c1c]">
        {!isComplete ? (
          <QuestionScreen
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            isTransitioning={isTransitioning}
          />
        ) : (
          <SummaryScreen
            questions={questions}
            answers={answers}
            onReplay={handleReplay}
          />
        )}
      </div>
    </div>
  );
}

export default App;
