import React, { useState } from 'react';
import QuizHeader from './components/QuizHeader';
import QuestionCard from './components/QuestionCard';
import AnswersList from './components/AnswersList';
import AnswerFeedback from './components/AnswerFeedback';
import QuizNavigation from './components/QuizNavigation';
import { QuizQuestion } from './components/types';
import { styles } from './components/styles';

export default function QaitQuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 10;

  const question: QuizQuestion = {
    text: "מהי בירת צרפת?",
    difficulty: "קל", // אפשרויות: "קל", "בינוני", "קשה"
    answers: [
      { id: 1, text: "לונדון", isCorrect: false },
      { id: 2, text: "פריז", isCorrect: true },
      { id: 3, text: "ברלין", isCorrect: false }
    ]
  };

  const handleAnswerClick = (answerId: number) => {
    if (!isAnswered) {
      setSelectedAnswer(answerId);
    }
  };

  const handleSubmit = () => {
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQuestion(prev => prev + 1);
  };

  const handlePrevious = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQuestion(prev => prev - 1);
  };

  return (
    <div style={styles.container} dir="rtl">
      <QuizHeader currentQuestion={currentQuestion} totalQuestions={totalQuestions} />

      <main style={styles.main}>
        <div style={styles.quizContainer}>
          <QuestionCard
            currentQuestion={currentQuestion}
            text={question.text}
            difficulty={question.difficulty}
          />

          <AnswersList
            answers={question.answers}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            onAnswerClick={handleAnswerClick}
          />

          {isAnswered && (
            <AnswerFeedback
              answers={question.answers}
              selectedAnswer={selectedAnswer}
            />
          )}

          <QuizNavigation
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            isAnswered={isAnswered}
            hasSelectedAnswer={selectedAnswer !== null}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            onNext={handleNext}
          />
        </div>
      </main>
    </div>
  );
}