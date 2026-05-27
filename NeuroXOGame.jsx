import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, X, Trophy, History } from 'lucide-react';
import confetti from 'canvas-confetti';

const NeuroXOGame = ({ isOpen, onClose }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [difficulty, setDifficulty] = useState('hardcore'); // easy, medium, hardcore
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [winner, setWinner] = useState(null); // 'X', 'O', 'Draw', or null
  const [winningLine, setWinningLine] = useState([]);
  
  // Game stats
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('neuroxo_stats');
    return saved ? JSON.parse(saved) : { wins: 0, losses: 0, draws: 0 };
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('neuroxo_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync statistics and history to localStorage
  useEffect(() => {
    localStorage.setItem('neuroxo_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('neuroxo_history', JSON.stringify(history));
  }, [history]);

  // Handle Speech Synthesis
  const speak = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) 
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0];
      
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    utterance.rate = 1.05;
    utterance.pitch = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Trigger speech when modal opens
  useEffect(() => {
    if (isOpen) {
      speak("Neuro X O system initialized.");
    } else {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    }
  }, [isOpen]);

  // Winning lines mapping
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Check for winner
  const checkWinner = (currentBoard) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: pattern };
      }
    }
    if (currentBoard.every(cell => cell !== null)) {
      return { winner: 'Draw', line: [] };
    }
    return null;
  };

  // Reset Game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine([]);
    setIsPlayerTurn(true);
    speak("Grid reset. Make your move.");
  };

  // Clear Score stats
  const clearStats = () => {
    setStats({ wins: 0, losses: 0, draws: 0 });
    setHistory([]);
    speak("Data banks cleared.");
  };

  // AI Move Engine
  useEffect(() => {
    if (isOpen && !isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, isOpen]);

  // Player Move
  const handleCellClick = (index) => {
    if (board[index] || !isPlayerTurn || winner) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      handleGameOver(winResult);
    } else {
      setIsPlayerTurn(false);
    }
  };

  // Game over state handler
  const handleGameOver = (result) => {
    setWinner(result.winner);
    setWinningLine(result.line);

    if (result.winner === 'X') {
      setStats(prev => ({ ...prev, wins: prev.wins + 1 }));
      setHistory(prev => [{ result: 'Win', difficulty, date: new Date().toLocaleTimeString() }, ...prev.slice(0, 4)]);
      // Pink, teal, and cream confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#0d9488', '#faf7f2']
      });
      speak("System error. You defeated my logic.");
    } else if (result.winner === 'O') {
      setStats(prev => ({ ...prev, losses: prev.losses + 1 }));
      setHistory(prev => [{ result: 'Loss', difficulty, date: new Date().toLocaleTimeString() }, ...prev.slice(0, 4)]);
      speak("Grid locked. Logic rules supreme.");
    } else {
      setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
      setHistory(prev => [{ result: 'Draw', difficulty, date: new Date().toLocaleTimeString() }, ...prev.slice(0, 4)]);
      speak("Stalemate. We are evenly matched.");
    }
  };

  // AI moves selection logic
  const makeAIMove = () => {
    let aiIndex;

    if (difficulty === 'easy') {
      if (Math.random() < 0.2) {
        aiIndex = getBestMove(board);
      } else {
        aiIndex = getRandomMove(board);
      }
    } else if (difficulty === 'medium') {
      if (Math.random() < 0.5) {
        aiIndex = getBestMove(board);
      } else {
        aiIndex = getRandomMove(board);
      }
    } else {
      aiIndex = getBestMove(board);
    }

    if (aiIndex !== undefined && aiIndex !== -1) {
      const newBoard = [...board];
      newBoard[aiIndex] = 'O';
      setBoard(newBoard);

      const winResult = checkWinner(newBoard);
      if (winResult) {
        handleGameOver(winResult);
      } else {
        setIsPlayerTurn(true);
        if (Math.random() < 0.3) {
          const comments = [
            "Your defenses are lacking.",
            "Analyzing parameters. Move registered.",
            "Fascinating countermove.",
            "My logic predicts victory."
          ];
          speak(comments[Math.floor(Math.random() * comments.length)]);
        }
      }
    }
  };

  const getRandomMove = (currentBoard) => {
    const emptyIndices = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter(val => val !== null);
    if (emptyIndices.length === 0) return -1;
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  const getBestMove = (currentBoard) => {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'O';
        let score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const minimax = (tempBoard, depth, isMaximizing) => {
    const result = checkWinner(tempBoard);
    if (result) {
      if (result.winner === 'O') return 10 - depth;
      if (result.winner === 'X') return depth - 10;
      if (result.winner === 'Draw') return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (tempBoard[i] === null) {
          tempBoard[i] = 'O';
          let score = minimax(tempBoard, depth + 1, false);
          tempBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (tempBoard[i] === null) {
          tempBoard[i] = 'X';
          let score = minimax(tempBoard, depth + 1, true);
          tempBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#1c1917]/50 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Game Window */}
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-stone-200/50 overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none bg-[#faf7f2]/95">
        
        {/* Left Side: Game Board */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200/40 bg-pink-500/5">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-space font-bold text-stone-800 tracking-wide">NeuroXO</h3>
              <p className="text-xs text-stone-500 mt-1">Futuristic Tactical Grid</p>
            </div>
            
            {/* Audio Toggle & Reset */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                  voiceEnabled 
                    ? 'border-pink-500/20 bg-pink-50 text-pink-600 shadow-sm shadow-pink-100/10' 
                    : 'border-stone-200 bg-white text-stone-400'
                }`}
                title={voiceEnabled ? "Voice Enabled" : "Voice Silenced"}
              >
                {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              
              <button
                onClick={resetGame}
                className="p-2 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:text-stone-800 shadow-sm transition-all cursor-pointer"
                title="Restart Grid"
              >
                <RotateCcw size={16} />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 md:hidden rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 shadow-sm transition-all"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Difficulty Selectors */}
          <div className="flex bg-stone-100/70 border border-stone-200/50 p-1 rounded-xl mb-6">
            {['easy', 'medium', 'hardcore'].map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setDifficulty(mode);
                  speak(`Difficulty changed to ${mode}.`);
                  resetGame();
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 cursor-pointer ${
                  difficulty === mode
                    ? 'bg-pink-500 text-white border-pink-500 shadow-sm shadow-pink-200/20'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-white/2 border border-transparent'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Actual 3x3 Tic-Tac-Toe Grid */}
          <div className="flex-grow flex items-center justify-center py-4">
            <div className="grid grid-cols-3 gap-3 w-72 h-72">
              {board.map((cell, idx) => {
                const isWinningCell = winningLine.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => handleCellClick(idx)}
                    disabled={cell !== null || !isPlayerTurn || winner !== null}
                    className={`relative w-full h-full glass-card rounded-2xl flex items-center justify-center font-space text-3xl font-bold transition-all duration-300 ${
                      cell === null && isPlayerTurn && !winner
                        ? 'hover:bg-pink-500/5 hover:border-pink-500/30 cursor-pointer'
                        : 'cursor-default'
                    } ${
                      isWinningCell 
                        ? cell === 'X'
                          ? 'bg-pink-50 border-pink-500 shadow-sm shadow-pink-100/10 text-pink-600'
                          : 'bg-teal-50 border-teal-500 shadow-sm shadow-teal-100/10 text-teal-600'
                        : cell === 'X'
                          ? 'text-pink-600'
                          : cell === 'O'
                            ? 'text-teal-600'
                            : 'text-transparent'
                    }`}
                  >
                    {cell}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Turn / Win Status */}
          <div className="text-center mt-4">
            {winner ? (
              winner === 'Draw' ? (
                <p className="text-sm font-medium text-stone-600">Game Over: It's a <span className="text-stone-800 font-bold">Draw</span></p>
              ) : (
                <p className="text-sm font-medium text-stone-600">
                  Winner: <span className="font-bold text-stone-800">
                    {winner === 'X' ? 'Bomathi S (Mathi)' : `AI (${difficulty.toUpperCase()})`}
                  </span>
                </p>
              )
            ) : (
              <p className="text-xs text-stone-500 tracking-wider uppercase font-bold">
                {isPlayerTurn ? "Your Turn (X)" : "AI Processing (O)..."}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Stats Panel */}
        <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-between bg-white overflow-y-auto">
          
          {/* Top Close Button (Desktop Only) */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 hidden md:flex p-1.5 rounded-full border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-500 hover:text-stone-800 transition-all cursor-pointer shadow-sm"
          >
            <X size={16} />
          </button>

          <div>
            <div className="flex items-center space-x-2 text-stone-800 mb-6">
              <Trophy size={18} className="text-pink-500" />
              <h4 className="font-space font-bold tracking-wide">Data Matrix Dashboard</h4>
            </div>

            {/* Scoreboard Cards */}
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              <div className="glass-card p-3 text-center rounded-xl border border-pink-100 bg-pink-50/20 shadow-sm">
                <span className="text-xs text-pink-800 font-bold block mb-1">Wins</span>
                <span className="text-lg font-space font-bold text-pink-600">{stats.wins}</span>
              </div>
              <div className="glass-card p-3 text-center rounded-xl border border-teal-100 bg-teal-50/20 shadow-sm">
                <span className="text-xs text-teal-800 font-bold block mb-1">Losses</span>
                <span className="text-lg font-space font-bold text-teal-600">{stats.losses}</span>
              </div>
              <div className="glass-card p-3 text-center rounded-xl border border-stone-200 bg-[#faf7f2] shadow-sm">
                <span className="text-xs text-stone-600 font-bold block mb-1">Draws</span>
                <span className="text-lg font-space font-bold text-stone-800">{stats.draws}</span>
              </div>
            </div>

            {/* History Logs */}
            <div className="mb-6">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                <History size={12} />
                <span>Match History</span>
              </div>
              <div className="space-y-2">
                {history.length === 0 ? (
                  <p className="text-xs text-stone-400 italic py-4 text-center">No logs in buffer</p>
                ) : (
                  history.map((log, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 glass-card rounded-lg border border-stone-200 text-xs shadow-sm">
                      <div className="flex items-center space-x-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          log.result === 'Win' ? 'bg-pink-500' : log.result === 'Loss' ? 'bg-teal-600' : 'bg-stone-400'
                        }`} />
                        <span className="font-bold text-stone-700">{log.result}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-stone-500 font-medium">
                        <span className="capitalize">{log.difficulty}</span>
                        <span>•</span>
                        <span className="text-[10px]">{log.date}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Purge Button */}
          <button
            onClick={clearStats}
            className="w-full py-2.5 rounded-xl border border-stone-200 hover:border-red-500/20 bg-white hover:bg-red-50 hover:text-red-500 text-stone-500 text-xs font-semibold shadow-sm transition-all duration-300 cursor-pointer"
          >
            Purge History Data
          </button>
        </div>

      </div>
    </div>
  );
};

export default NeuroXOGame;
