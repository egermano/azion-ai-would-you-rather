import { useEffect, useState } from 'react';
import QuestionScreen from './components/QuestionScreen';
import SummaryScreen from './components/SummaryScreen';
import { ApiService, StorageService } from './services/api';
import type { Answer, Question } from './types';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  // Load saved answers on component mount
  useEffect(() => {
    const savedAnswers = StorageService.loadAnswers();
    setAnswers(savedAnswers);
  }, []);

  // Save answers whenever they change
  useEffect(() => {
    if (answers.length > 0) {
      StorageService.saveAnswers(answers);
    }
  }, [answers]);

  const fetchNewQuestion = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const question = await ApiService.fetchDilemma();
      setCurrentQuestion(question);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar pergunta');
    } finally {
      setIsLoading(false);
    }
  };

  // Load first question on mount
  useEffect(() => {
    if (!currentQuestion && !gameComplete) {
      fetchNewQuestion();
    }
  }, [currentQuestion, gameComplete]);

  const handleAnswer = (questionId: number, selectedOption: 'A' | 'B') => {
    if (isTransitioning || !currentQuestion) return;

    setIsTransitioning(true);
    const newAnswer: Answer = { 
      questionId, 
      selectedOption, 
      question: currentQuestion 
    };
    
    setAnswers(prev => [...prev, newAnswer]);

    setTimeout(() => {
      setCurrentQuestion(null);
      setIsTransitioning(false);
      
      // Load next question automatically
      fetchNewQuestion();
    }, 280);
  };

  const handleFinishGame = () => {
    setGameComplete(true);
  };

  const handleReplay = () => {
    setCurrentQuestion(null);
    setAnswers([]);
    setIsTransitioning(false);
    setGameComplete(false);
    setError(null);
    StorageService.clearAnswers();
    fetchNewQuestion();
  };

  if (error) {
    return (
      <div className="dark">
        <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Erro</h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={fetchNewQuestion}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !currentQuestion) {
    return (
      <div className="dark">
        <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Carregando pergunta...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark">
      <div className="min-h-screen bg-[#1c1c1c]">
        {!gameComplete ? (
          <QuestionScreen
            question={currentQuestion}
            questionNumber={answers.length + 1}
            totalQuestions={0} // Dynamic, so we don't show total
            onAnswer={handleAnswer}
            onFinish={handleFinishGame}
            isTransitioning={isTransitioning}
          />
        ) : (
          <SummaryScreen
            answers={answers}
            onReplay={handleReplay}
          />
        )}
      </div>
    </div>
  );
}

export default App;
