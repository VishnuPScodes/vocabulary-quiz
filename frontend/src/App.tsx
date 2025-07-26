import React, { useState, useEffect, useRef } from 'react';
import './App.css';

interface Word {
  word: string;
  definition: string;
  hint?: string;
}

const vocabularyWords: Word[] = [
  { word: "REACT", definition: "A JavaScript library for building user interfaces", hint: "Popular frontend framework" },
  { word: "QUIZ", definition: "A test of knowledge", hint: "What you're taking right now" },
  { word: "CODE", definition: "Instructions written for a computer", hint: "What programmers write" },
  { word: "LEARN", definition: "To acquire knowledge or skills", hint: "What students do" },
  { word: "STUDY", definition: "To devote time to learning", hint: "Academic activity" },
  { word: "BRAIN", definition: "The organ that controls thinking", hint: "Inside your head" },
  { word: "SMART", definition: "Having intelligence", hint: "Opposite of dumb" },
  { word: "THINK", definition: "To use your mind", hint: "Mental process" },
  { word: "WORD", definition: "A unit of language", hint: "What you're spelling" },
  { word: "SPELL", definition: "To write letters in correct order", hint: "What you do in this quiz" }
];

function App() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const currentWord = vocabularyWords[currentWordIndex];

  useEffect(() => {
    if (currentWord) {
      setUserInput(new Array(currentWord.word.length).fill(''));
      setShowHint(false);
      setFeedback('');
      setIsCorrect(null);
      // Focus first input
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);
    }
  }, [currentWordIndex, currentWord]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single characters
    
    const newInput = [...userInput];
    newInput[index] = value.toUpperCase();
    setUserInput(newInput);

    // Auto-focus next input
    if (value && index < currentWord.word.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !userInput[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    const userWord = userInput.join('');
    const correct = userWord === currentWord.word;
    
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      setFeedback('Correct! Well done! 🎉');
    } else {
      setFeedback(`Incorrect. The word was: ${currentWord.word}`);
    }

    // Move to next word after delay
    setTimeout(() => {
      if (currentWordIndex < vocabularyWords.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setGameComplete(false);
    setFeedback('');
    setIsCorrect(null);
  };

  const getScoreColor = () => {
    const percentage = (score / vocabularyWords.length) * 100;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  if (gameComplete) {
    return (
      <div className="App">
        <div className="quiz-container">
          <div className="completion-screen">
            <h1>🎊 Quiz Complete! 🎊</h1>
            <div className="final-score" style={{ color: getScoreColor() }}>
              Your Score: {score} / {vocabularyWords.length}
            </div>
            <div className="score-percentage">
              {Math.round((score / vocabularyWords.length) * 100)}%
            </div>
            <button className="restart-btn" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="quiz-container">
        <header className="quiz-header">
          <h1>📚 Vocabulary Quiz</h1>
          <div className="progress">
            Question {currentWordIndex + 1} of {vocabularyWords.length}
          </div>
          <div className="score">Score: {score}</div>
        </header>

        <div className="quiz-content">
          <div className="definition-card">
            <h2>Definition:</h2>
            <p>{currentWord.definition}</p>
            
            {showHint && currentWord.hint && (
              <div className="hint">
                <strong>Hint:</strong> {currentWord.hint}
              </div>
            )}
            
            {!showHint && currentWord.hint && (
              <button className="hint-btn" onClick={() => setShowHint(true)}>
                💡 Show Hint
              </button>
            )}
          </div>

          <div className="word-input-section">
            <h3>Spell the word:</h3>
            <div className="dash-inputs">
              {currentWord.word.split('').map((_, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  className={`letter-input ${
                    isCorrect === true ? 'correct' : 
                    isCorrect === false ? 'incorrect' : ''
                  }`}
                  value={userInput[index] || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  disabled={isCorrect !== null}
                />
              ))}
            </div>
            
            {feedback && (
              <div className={`feedback ${isCorrect ? 'success' : 'error'}`}>
                {feedback}
              </div>
            )}

            <div className="action-buttons">
              <button 
                className="check-btn" 
                onClick={checkAnswer}
                disabled={userInput.some(letter => !letter) || isCorrect !== null}
              >
                Check Answer
              </button>
              
              <button 
                className="skip-btn" 
                onClick={() => {
                  setIsCorrect(false);
                  setFeedback(`The word was: ${currentWord.word}`);
                  setTimeout(() => {
                    if (currentWordIndex < vocabularyWords.length - 1) {
                      setCurrentWordIndex(currentWordIndex + 1);
                    } else {
                      setGameComplete(true);
                    }
                  }, 2000);
                }}
                disabled={isCorrect !== null}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
