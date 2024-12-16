'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ListIcon, Clock } from 'lucide-react';

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/questions/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch questions');
        }
        return res.json();
      })
      .then((data) => {
        // Randomly shuffle the questions
        const shuffledQuestions = data.sort(() => 0.5 - Math.random());
        // Select the first 5 questions
        const selectedQuestions = shuffledQuestions.slice(0, 5);
        setQuestions(selectedQuestions);
        setAnsweredQuestions(new Array(selectedQuestions.length).fill(false));
        setVisitedQuestions(new Array(selectedQuestions.length).fill(false));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          router.push(`/result?score=${score}&total=${questions.length}`);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, router, questions.length]);

  const handleAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    setAnsweredQuestions((prev) => {
      const newAnswered = [...prev];
      newAnswered[currentQuestion] = true;
      return newAnswered;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      router.push(
        `/result?score=${score + (selectedAnswer === questions[currentQuestion].correct_answer ? 1 : 0)}&total=${questions.length}`
      );
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setSelectedAnswer('');
    setVisitedQuestions((prev) => {
      const newVisited = [...prev];
      newVisited[index] = true;
      return newVisited;
    });
  };

  const getButtonColor = (index: number) => {
    if (answeredQuestions[index]) return 'bg-green-100 text-green-700 border-green-300';
    if (visitedQuestions[index]) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return '';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = questions.length ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" className="text-lg font-semibold">
            <Clock className="mr-2 h-5 w-5" />
            {formatTime(timeLeft)}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="text-lg font-semibold">
                <ListIcon className="mr-2 h-5 w-5" />
                Questions
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
                <div className="grid grid-cols-3 gap-2">
                  {questions.map((_, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full ${getButtonColor(index)}`}
                      onClick={() => jumpToQuestion(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Question {currentQuestion + 1} of {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="mb-6 h-2" />
            <p className="text-lg mb-6 text-center text-gray-700">{questions[currentQuestion].question_text}</p>
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-3">
              {['option_a', 'option_b', 'option_c', 'option_d'].map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <RadioGroupItem value={questions[currentQuestion][option]} id={option} />
                  <Label htmlFor={option} className="flex-grow cursor-pointer">
                    {questions[currentQuestion][option]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleAnswer}
              disabled={!selectedAnswer}
              className="w-full py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
