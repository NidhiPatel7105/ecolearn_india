import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizModal = ({ 
  isOpen, 
  onClose, 
  quiz, 
  onComplete, 
  language 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const content = {
    en: {
      quiz: 'Quiz',
      question: 'Question',
      of: 'of',
      selectAnswer: 'Select an answer',
      checkAnswer: 'Check Answer',
      nextQuestion: 'Next Question',
      completeQuiz: 'Complete Quiz',
      correct: 'Correct!',
      incorrect: 'Incorrect',
      explanation: 'Explanation',
      quizComplete: 'Quiz Complete!',
      yourScore: 'Your Score',
      retakeQuiz: 'Retake Quiz',
      continueLesson: 'Continue Lesson',
      wellDone: 'Well Done!',
      keepPracticing: 'Keep practicing to improve your understanding.',
      excellent: 'Excellent work!'
    },
    hi: {
      quiz: 'प्रश्नोत्तरी',
      question: 'प्रश्न',
      of: 'का',
      selectAnswer: 'उत्तर चुनें',
      checkAnswer: 'उत्तर जांचें',
      nextQuestion: 'अगला प्रश्न',
      completeQuiz: 'प्रश्नोत्तरी पूरी करें',
      correct: 'सही!',
      incorrect: 'गलत',
      explanation: 'व्याख्या',
      quizComplete: 'प्रश्नोत्तरी पूरी!',
      yourScore: 'आपका स्कोर',
      retakeQuiz: 'फिर से करें',
      continueLesson: 'पाठ जारी रखें',
      wellDone: 'बहुत बढ़िया!',
      keepPracticing: 'अपनी समझ बेहतर बनाने के लिए अभ्यास करते रहें।',
      excellent: 'उत्कृष्ट काम!'
    }
  };

  const t = content?.[language] || content?.en;

  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setShowFeedback(false);
      setQuizCompleted(false);
      setScore(0);
    }
  }, [isOpen]);

  if (!isOpen || !quiz) return null;

  const currentQuestion = quiz?.questions?.[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz?.questions?.length - 1;
  const hasSelectedAnswer = selectedAnswers?.[currentQuestionIndex] !== undefined;

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerIndex
    });
  };

  const handleCheckAnswer = () => {
    setShowFeedback(true);
    const isCorrect = selectedAnswers?.[currentQuestionIndex] === currentQuestion?.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
    }
  };

  const handleCompleteQuiz = () => {
    const finalScore = score;
    const percentage = Math.round((finalScore / quiz?.questions?.length) * 100);
    onComplete({
      score: finalScore,
      total: quiz?.questions?.length,
      percentage,
      passed: percentage >= 60
    });
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setQuizCompleted(false);
    setScore(0);
  };

  const getScoreMessage = () => {
    const percentage = Math.round((score / quiz?.questions?.length) * 100);
    if (percentage >= 80) return t?.excellent;
    if (percentage >= 60) return t?.wellDone;
    return t?.keepPracticing;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {!quizCompleted ? (
          <>
            {/* Quiz Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
                  <Icon name="HelpCircle" size={24} className="text-primary" />
                  {t?.quiz}
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{t?.question} {currentQuestionIndex + 1} {t?.of} {quiz?.questions?.length}</span>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>2:30</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mt-3">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / quiz?.questions?.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Content */}
            <div className="p-6">
              <h3 className="text-lg font-medium text-foreground mb-6">
                {currentQuestion?.question}
              </h3>

              <div className="space-y-3 mb-6">
                {currentQuestion?.options?.map((option, index) => {
                  const isSelected = selectedAnswers?.[currentQuestionIndex] === index;
                  const isCorrect = index === currentQuestion?.correctAnswer;
                  const showCorrectAnswer = showFeedback && isCorrect;
                  const showIncorrectAnswer = showFeedback && isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showFeedback}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-smooth ${
                        showCorrectAnswer
                          ? 'border-success bg-success/10 text-success'
                          : showIncorrectAnswer
                          ? 'border-error bg-error/10 text-error'
                          : isSelected
                          ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          showCorrectAnswer
                            ? 'border-success bg-success text-white'
                            : showIncorrectAnswer
                            ? 'border-error bg-error text-white'
                            : isSelected
                            ? 'border-primary bg-primary text-white' :'border-muted-foreground'
                        }`}>
                          {showCorrectAnswer && <Icon name="Check" size={14} />}
                          {showIncorrectAnswer && <Icon name="X" size={14} />}
                          {!showFeedback && isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="flex-1">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`p-4 rounded-lg mb-6 ${
                  selectedAnswers?.[currentQuestionIndex] === currentQuestion?.correctAnswer
                    ? 'bg-success/10 border border-success/20' :'bg-error/10 border border-error/20'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon 
                      name={selectedAnswers?.[currentQuestionIndex] === currentQuestion?.correctAnswer ? "CheckCircle2" : "XCircle"} 
                      size={20} 
                      className={selectedAnswers?.[currentQuestionIndex] === currentQuestion?.correctAnswer ? "text-success" : "text-error"}
                    />
                    <span className={`font-medium ${
                      selectedAnswers?.[currentQuestionIndex] === currentQuestion?.correctAnswer ? "text-success" : "text-error"
                    }`}>
                      {selectedAnswers?.[currentQuestionIndex] === currentQuestion?.correctAnswer ? t?.correct : t?.incorrect}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">
                    <strong>{t?.explanation}:</strong> {currentQuestion?.explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                {!showFeedback ? (
                  <Button
                    variant="default"
                    onClick={handleCheckAnswer}
                    disabled={!hasSelectedAnswer}
                  >
                    {t?.checkAnswer}
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={handleNextQuestion}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    {isLastQuestion ? t?.completeQuiz : t?.nextQuestion}
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Quiz Results */
          (<div className="p-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Trophy" size={32} color="white" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                {t?.quizComplete}
              </h2>
              <p className="text-muted-foreground">{getScoreMessage()}</p>
            </div>
            <div className="bg-muted rounded-lg p-6 mb-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {score}/{quiz?.questions?.length}
              </div>
              <div className="text-sm text-muted-foreground mb-4">{t?.yourScore}</div>
              <div className="w-full bg-background rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(score / quiz?.questions?.length) * 100}%` }}
                />
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {Math.round((score / quiz?.questions?.length) * 100)}%
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={handleRetakeQuiz}
                iconName="RotateCcw"
                iconPosition="left"
              >
                {t?.retakeQuiz}
              </Button>
              <Button
                variant="default"
                onClick={handleCompleteQuiz}
                iconName="ArrowRight"
                iconPosition="right"
              >
                {t?.continueLesson}
              </Button>
            </div>
          </div>)
        )}
      </div>
    </div>
  );
};

export default QuizModal;