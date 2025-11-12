import { Check } from "lucide-react";
import { difficultyOptions } from "../services/api";
import type { Answer } from "../types";

interface SummaryScreenProps {
  answers: Answer[];
  onReplay: () => void;
}

export default function SummaryScreen({
  answers,
  onReplay,
}: SummaryScreenProps) {
  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-dark dark:text-text-light mb-4">
            Suas Escolhas
          </h1>
          <p className="text-lg text-text-dark dark:text-neutral opacity-80 mb-6">
            Aqui está o que você escolheu
          </p>
          <button
            onClick={onReplay}
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
          >
            Jogar Novamente
          </button>
        </div>

        <div className="space-y-6">
          {answers.map((answer, index) => {
            const question = answer.question;
            const selectedOption = answer.selectedOption;
            const isPrimarySelected = selectedOption === "A";
            const isSecondarySelected = selectedOption === "B";

            return (
              <div
                key={question.id}
                className="bg-white dark:bg-surface-dark-card rounded-2xl p-6 shadow-sm border border-neutral/20 dark:border-neutral/10"
              >
                <div className="mb-4">
                  <div className="flex gap-2">
                    <span className="text-lg font-semibold text-text-dark dark:text-text-light">
                      {index + 1}.
                    </span>
                    <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs rounded-full">
                      {question.theme}
                    </span>
                    <span className="inline-block px-4 py-1.5 bg-green-600 text-white text-xs rounded-full">
                      {difficultyOptions[
                        question.difficulty as keyof typeof difficultyOptions
                      ] || question.difficulty}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      isPrimarySelected
                        ? "bg-primary border-primary text-white"
                        : "bg-surface-light dark:bg-surface-dark border-neutral/30 text-text-dark dark:text-text-light"
                    }`}
                  >
                    <p className="text-sm font-medium pr-6">
                      {question.optionA}
                    </p>
                    {isPrimarySelected && (
                      <Check
                        className="absolute top-4 right-4"
                        size={20}
                        strokeWidth={3}
                      />
                    )}
                  </div>

                  <div
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      isSecondarySelected
                        ? "bg-secondary border-secondary text-white"
                        : "bg-surface-light dark:bg-surface-dark border-neutral/30 text-text-dark dark:text-text-light"
                    }`}
                  >
                    <p className="text-sm font-medium pr-6">
                      {question.optionB}
                    </p>
                    {isSecondarySelected && (
                      <Check
                        className="absolute top-4 right-4"
                        size={20}
                        strokeWidth={3}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
