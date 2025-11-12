import { useState } from 'react';
import QuestionScreen from './components/QuestionScreen';
import SummaryScreen from './components/SummaryScreen';
import { questions } from './data/questions';
import type { Question, Answer } from './types';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors duration-300">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-4 right-4 z-10 px-4 py-2 rounded-lg bg-neutral text-text-dark text-sm font-medium hover:opacity-80 transition-opacity"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

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
