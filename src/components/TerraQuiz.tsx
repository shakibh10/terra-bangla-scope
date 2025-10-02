import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Brain, CheckCircle, XCircle } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    question: 'What does MODIS stand for?',
    options: [
      'Moderate Resolution Imaging Spectroradiometer',
      'Modern Digital Imaging System',
      'Multi-Orbital Detection Instrument Sensor',
      'Meteorological Observation Data Integration System'
    ],
    correct: 0,
    explanation: 'MODIS is the Moderate Resolution Imaging Spectroradiometer, one of the key instruments aboard Terra.'
  },
  {
    question: 'How many viewing angles does the MISR instrument have?',
    options: ['3', '5', '7', '9'],
    correct: 3,
    explanation: 'MISR has 9 cameras pointing at different angles to provide multi-angle imagery of Earth.'
  },
  {
    question: 'What does CERES primarily measure?',
    options: [
      'Ocean temperatures',
      'Earth\'s radiation budget',
      'Atmospheric pressure',
      'Wind speed'
    ],
    correct: 1,
    explanation: 'CERES measures Earth\'s radiation budget, tracking incoming solar energy and outgoing heat.'
  },
  {
    question: 'When was the Terra satellite launched?',
    options: ['1995', '1999', '2002', '2005'],
    correct: 1,
    explanation: 'Terra was launched on December 18, 1999, and has been providing Earth observations for over 25 years.'
  },
  {
    question: 'What does ASTER provide high-resolution data of?',
    options: [
      'Cloud patterns',
      'Ocean currents',
      'Surface temperature and elevation',
      'Atmospheric composition'
    ],
    correct: 2,
    explanation: 'ASTER provides detailed images of surface temperature, reflectance, and elevation.'
  },
  {
    question: 'What gas does MOPITT monitor in the atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Monoxide', 'Helium'],
    correct: 2,
    explanation: 'MOPITT monitors Carbon Monoxide (CO) in the troposphere to track air pollution.'
  },
  {
    question: 'How often does Terra orbit the Earth?',
    options: ['Every 12 hours', 'Every 24 hours', 'Every 99 minutes', 'Every 48 hours'],
    correct: 2,
    explanation: 'Terra completes one orbit around Earth approximately every 99 minutes in a sun-synchronous orbit.'
  },
  {
    question: 'What is MODIS primarily used to detect in Bangladesh?',
    options: [
      'Active fires and thermal anomalies',
      'Earthquake activity',
      'Radio waves',
      'Magnetic fields'
    ],
    correct: 0,
    explanation: 'MODIS detects active fires, thermal anomalies, and provides imagery for environmental monitoring.'
  },
  {
    question: 'What is the spatial resolution range of ASTER?',
    options: ['1-5 meters', '15-90 meters', '100-250 meters', '500-1000 meters'],
    correct: 1,
    explanation: 'ASTER provides high-resolution imagery ranging from 15 meters (visible) to 90 meters (thermal).'
  },
  {
    question: 'Which Terra instrument uses 9 cameras for atmospheric studies?',
    options: ['MODIS', 'ASTER', 'MISR', 'CERES'],
    correct: 2,
    explanation: 'MISR (Multi-angle Imaging SpectroRadiometer) uses 9 cameras to view Earth from different angles.'
  }
];

const TerraQuiz = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<typeof QUIZ_QUESTIONS>([]);

  useEffect(() => {
    // Randomize questions each time
    const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      setGameStarted(false);
    }
  };

  const restartQuiz = () => {
    startGame();
  };

  if (!gameStarted && currentQuestion === 0 && score === 0) {
    return (
      <section className="min-h-screen px-4 py-20 flex items-center justify-center">
        <Card className="glass p-12 max-w-2xl text-center space-y-6">
          <Brain className="w-20 h-20 text-primary mx-auto animate-pulse" />
          <h2 className="text-4xl font-bold text-gradient">Terra Satellite Quiz</h2>
          <p className="text-xl text-muted-foreground">
            Test your knowledge about NASA's Terra satellite and its instruments!
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• 5 random questions from our database</p>
            <p>• Learn about MODIS, ASTER, MOPITT, MISR, and CERES</p>
            <p>• Instant feedback with explanations</p>
          </div>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-12 py-6"
            onClick={startGame}
          >
            Start Quiz
          </Button>
        </Card>
      </section>
    );
  }

  if (!gameStarted && questions.length > 0) {
    const percentage = (score / questions.length) * 100;
    return (
      <section className="min-h-screen px-4 py-20 flex items-center justify-center">
        <Card className="glass p-12 max-w-2xl text-center space-y-6">
          <Trophy className={`w-20 h-20 mx-auto ${percentage >= 80 ? 'text-yellow-500' : 'text-primary'}`} />
          <h2 className="text-4xl font-bold text-gradient">Quiz Complete!</h2>
          <div className="text-6xl font-bold text-primary">
            {score}/{questions.length}
          </div>
          <p className="text-xl text-muted-foreground">
            You got {percentage.toFixed(0)}% correct!
          </p>
          <div className="space-y-2">
            {percentage >= 80 && <p className="text-accent font-bold">🎉 Excellent! You're a Terra expert!</p>}
            {percentage >= 60 && percentage < 80 && <p className="text-primary font-bold">👍 Great job! Keep learning!</p>}
            {percentage < 60 && <p className="text-muted-foreground">📚 Good effort! Try again to improve!</p>}
          </div>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            onClick={restartQuiz}
          >
            Try Again
          </Button>
        </Card>
      </section>
    );
  }

  const question = questions[currentQuestion];

  return (
    <section className="min-h-screen px-4 py-20">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}/{questions.length}</span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} />
        </div>

        {/* Question Card */}
        <Card className="glass p-8 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full py-6 text-left justify-start glass border-2 transition-all ${
                  selectedAnswer === null
                    ? 'border-primary/50 hover:border-primary'
                    : index === question.correct
                    ? 'border-green-500 bg-green-500/20'
                    : selectedAnswer === index
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-border opacity-50'
                }`}
                onClick={() => !showExplanation && handleAnswer(index)}
                disabled={showExplanation}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedAnswer === null
                      ? 'bg-primary/20 text-primary'
                      : index === question.correct
                      ? 'bg-green-500 text-white'
                      : selectedAnswer === index
                      ? 'bg-red-500 text-white'
                      : 'bg-background'
                  }`}>
                    {showExplanation && index === question.correct && <CheckCircle className="w-5 h-5" />}
                    {showExplanation && selectedAnswer === index && index !== question.correct && <XCircle className="w-5 h-5" />}
                    {!showExplanation && String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </Button>
            ))}
          </div>

          {showExplanation && (
            <div className="pt-4 border-t border-border space-y-4">
              <div className={`p-4 rounded-lg ${
                selectedAnswer === question.correct
                  ? 'bg-green-500/20 border border-green-500'
                  : 'bg-red-500/20 border border-red-500'
              }`}>
                <p className="font-bold mb-2">
                  {selectedAnswer === question.correct ? '✅ Correct!' : '❌ Incorrect'}
                </p>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                onClick={nextQuestion}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default TerraQuiz;
