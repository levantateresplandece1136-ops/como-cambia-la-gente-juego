/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  Zap, 
  Key, 
  UserCircle, 
  BookOpen, 
  Theater, 
  ArrowLeft, 
  Check, 
  X, 
  RefreshCw, 
  Eye, 
  ChevronRight,
  Trophy,
  History
} from 'lucide-react';
import { CATEGORIES, GAME_DATA, Category, CategoryId } from './gameData';

type Screen = 'home' | 'game' | 'results';

interface Result {
  idx: number;
  status: 'correct' | 'wrong' | 'skip';
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper icons mapping
  const iconMap: Record<string, any> = {
    HelpCircle, Zap, Key, UserCircle, BookOpen, Theater
  };

  const startCategory = (cat: Category) => {
    const raw = [...GAME_DATA[cat.id]].sort(() => Math.random() - 0.5);
    setQuestions(raw);
    setSelectedCat(cat);
    setCurrentIndex(0);
    setResults([]);
    setShowAnswer(false);
    setIsTimerRunning(false);
    setScreen('game');
    prepareTimer(cat.id === '5sec' ? 10 : 30);
  };

  const prepareTimer = (seconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(seconds);
    setIsTimerRunning(false);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    const totalSeconds = timeLeft;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setShowAnswer(true);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const markResult = (status: 'correct' | 'wrong' | 'skip') => {
    setResults([...results, { idx: currentIndex, status }]);
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setIsTimerRunning(false);
      prepareTimer(selectedCat?.id === '5sec' ? 10 : 30);
    } else {
      setScreen('results');
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const currentQuestion = questions[currentIndex];
  const correctCount = results.filter(r => r.status === 'correct').length;
  const wrongCount = results.filter(r => r.status === 'wrong').length;
  const skipCount = results.filter(r => r.status === 'skip').length;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen font-sans flex flex-col items-center">
      <main className="w-full max-w-xl mx-auto px-4 py-8 flex-1 flex flex-col">
        
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1"
            >
              <div className="mb-8 text-center sm:text-left">
                <h1 className="font-display text-3xl font-bold tracking-tight text-[#1A1A18] mb-2">
                  ¿Cómo cambia la gente?
                </h1>
                <p className="text-[#5F5E5A]">
                  El juego de capacitación interactiva para consejeros bíblicos.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CATEGORIES.map((cat, idx) => {
                  const Icon = iconMap[cat.icon];
                  return (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => startCategory(cat)}
                      className={`group p-5 rounded-2xl border-2 border-transparent bg-white shadow-sm hover:shadow-md hover:border-${cat.color} transition-all text-left flex items-start gap-4 cursor-pointer active:scale-[0.98]`}
                    >
                      <div className={`p-3 rounded-xl bg-${cat.color}/10 text-${cat.color} group-hover:bg-${cat.color} group-hover:text-white transition-colors`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-[#1A1A18] group-hover:text-[#1A1A18]">{cat.name}</h3>
                        <p className="text-xs text-[#5F5E5A] mt-1 line-clamp-1">{cat.description}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {screen === 'game' && currentQuestion && (
            <motion.div 
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Header Stats */}
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setScreen('home')}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors transition-all active:scale-90"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="flex gap-2 text-[10px] font-bold tracking-wider uppercase">
                  <span className="px-2 py-1 bg-brand-teal whitespace-nowrap text-white rounded-full">{correctCount} Correctas</span>
                  <span className="px-2 py-1 bg-brand-coral whitespace-nowrap text-white rounded-full">{wrongCount} Incorrectas</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex gap-1 mb-6">
                {questions.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      i === currentIndex ? 'bg-brand-purple scale-y-125' : 
                      results[i]?.status === 'correct' ? 'bg-brand-teal' :
                      results[i]?.status === 'wrong' ? 'bg-brand-coral' :
                      results[i]?.status === 'skip' ? 'bg-brand-amber' :
                      'bg-black/10'
                    }`}
                  />
                ))}
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 left-6 flex items-center gap-2">
                  <span className="text-[10px] h-fit font-bold px-2 py-1 bg-black/5 rounded uppercase text-[#5F5E5A]">
                    {selectedCat?.name}
                  </span>
                  {currentQuestion.diff && (
                    <span className="text-[10px] h-fit font-bold px-2 py-1 bg-black/5 rounded uppercase text-[#5F5E5A]">
                      {currentQuestion.diff}
                    </span>
                  )}
                </div>

                {/* Timer Circle */}
                <div className="absolute top-6 right-6">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle 
                      cx="24" cy="24" r="20" 
                      className="fill-none stroke-black/5 stroke-[4]"
                    />
                    <motion.circle 
                      cx="24" cy="24" r="20" 
                      className={`fill-none stroke-[4] ${timeLeft < 5 ? 'stroke-brand-coral' : 'stroke-brand-teal'}`}
                      strokeDasharray="126"
                      animate={{ strokeDashoffset: 126 * (1 - timeLeft / (selectedCat?.id === '5sec' ? 10 : 30)) }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#1A1A18]">
                    {timeLeft}
                  </span>
                </div>

                <div className="text-center py-8">
                  <motion.h2 
                    key={currentIndex + 'q'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-2xl font-semibold leading-tight text-[#1A1A18]"
                  >
                    {selectedCat?.id === 'qa' && currentQuestion.q}
                    {selectedCat?.id === '5sec' && (
                      <>
                        <span className="text-brand-amber block mb-2 text-sm uppercase font-bold tracking-widest">En 10 Segundos...</span>
                        {currentQuestion.q}
                      </>
                    )}
                    {selectedCat?.id === 'pass' && (
                      <>
                        <span className="text-[#5F5E5A] block mb-2 text-sm uppercase font-bold tracking-widest italic">Adivina la Palabra</span>
                        {currentQuestion.def}
                      </>
                    )}
                    {selectedCat?.id === 'who' && (
                      <div className="space-y-4">
                        <div className="p-3 bg-[#F5F4F0] rounded-xl text-sm border border-black/5">
                          <span className="block text-[10px] font-bold text-[#5F5E5A] uppercase mb-1">Pista Fácil</span>
                          {currentQuestion.easy}
                        </div>
                        <div className="p-3 bg-[#F5F4F0] rounded-xl text-sm border border-black/5 blur-sm hover:blur-none transition-all cursor-help">
                          <span className="block text-[10px] font-bold text-[#5F5E5A] uppercase mb-1">Pista Difícil (Hover para ver)</span>
                          {currentQuestion.hard}
                        </div>
                      </div>
                    )}
                    {selectedCat?.id === 'verse' && (
                      <>
                        <span className="block text-sm text-brand-blue uppercase mb-2 font-bold tracking-widest italic">¿Qué versículo dice...?</span>
                        {currentQuestion.topic}
                      </>
                    )}
                    {selectedCat?.id === 'mime' && (
                      <>
                        <span className="block text-sm text-brand-green uppercase mb-2 font-bold tracking-widest italic tracking-widest">Representa con mímica:</span>
                        <div className="text-3xl font-bold bg-brand-green/5 p-4 rounded-2xl">{currentQuestion.concept}</div>
                        <p className="text-sm mt-4 text-[#5F5E5A] font-normal leading-relaxed">{currentQuestion.desc}</p>
                      </>
                    )}
                  </motion.h2>
                </div>

                <AnimatePresence>
                  {!isTimerRunning && !showAnswer && (
                    <motion.button
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      onClick={startTimer}
                      className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-8 group transition-all"
                    >
                      <div className="bg-brand-purple text-white p-4 rounded-full shadow-xl group-hover:scale-110 transition-transform mb-4">
                        <Zap size={32} fill="currentColor" />
                      </div>
                      <span className="text-xl font-display font-bold text-brand-purple">¡Iniciar Tiempo!</span>
                      <p className="text-xs text-[#5F5E5A] mt-2 font-medium">Tienes {timeLeft} segundos para responder</p>
                    </motion.button>
                  )}

                  {showAnswer && (
                    <motion.div 
                      key={currentIndex + 'a'}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="w-full mt-6 p-5 rounded-2xl bg-brand-teal/5 border border-brand-teal/20 text-brand-teal"
                    >
                      <span className="block text-[10px] font-bold uppercase mb-1 opacity-60">Respuesta Correcta:</span>
                      <p className="font-semibold text-lg leading-snug">
                        {selectedCat?.id === 'qa' && currentQuestion.a}
                        {selectedCat?.id === '5sec' && currentQuestion.a}
                        {selectedCat?.id === 'pass' && `${currentQuestion.word} (${currentQuestion.verse})`}
                        {selectedCat?.id === 'who' && `${currentQuestion.name}`}
                        {selectedCat?.id === 'verse' && currentQuestion.answer}
                        {selectedCat?.id === 'mime' && `${currentQuestion.lesson} - ${currentQuestion.diff}`}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {!showAnswer ? (
                  <button 
                    onClick={() => setShowAnswer(true)}
                    className="col-span-2 py-4 rounded-2xl bg-[#1A1A18] text-white flex items-center justify-center gap-2 font-semibold shadow-lg hover:bg-black transition-all active:scale-95"
                  >
                    <Eye size={20} /> Ver Respuesta
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => markResult('wrong')}
                      className="py-4 rounded-2xl bg-white border-2 border-brand-coral/20 text-brand-coral flex items-center justify-center gap-2 font-semibold hover:bg-brand-coral/5 transition-all active:scale-95"
                    >
                      <X size={20} /> Fallé
                    </button>
                    <button 
                      onClick={() => markResult('correct')}
                    className="py-4 rounded-2xl bg-brand-teal text-white flex items-center justify-center gap-2 font-semibold shadow-lg hover:bg-brand-teal-dark transition-all active:scale-95 shadow-brand-teal/20"
                    >
                      <Check size={20} /> Acerté
                    </button>
                  </>
                )}
                <button 
                  onClick={() => markResult('skip')}
                  className="col-span-2 py-3 rounded-xl border border-dashed border-black/10 text-[#5F5E5A] flex items-center justify-center gap-2 text-sm font-medium hover:bg-black/5 transition-all"
                >
                  Saltar Pregunta <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {screen === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 text-center"
            >
              <div className="mb-12 relative inline-block">
                <div className="p-8 rounded-full bg-brand-purple text-white shadow-2xl shadow-brand-purple/40">
                  <Trophy size={64} />
                </div>
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-2 -right-2 p-3 bg-brand-amber text-white rounded-2xl shadow-lg"
                >
                  <History size={20} />
                </motion.div>
              </div>

              <h2 className="font-display text-4xl font-bold text-[#1A1A18] mb-2 uppercase italic tracking-tight">¡Sesión Terminada!</h2>
              <p className="text-[#5F5E5A] mb-12">Has completado el desafío de <strong>{selectedCat?.name}</strong></p>

              <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="bg-white p-6 rounded-3xl shadow-sm">
                  <span className="block text-3xl font-display font-bold text-brand-teal">{correctCount}</span>
                  <span className="text-[10px] uppercase font-bold text-[#5F5E5A] tracking-wider">Correctas</span>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm">
                  <span className="block text-3xl font-display font-bold text-brand-coral">{wrongCount}</span>
                  <span className="text-[10px] uppercase font-bold text-[#5F5E5A] tracking-wider">Fallos</span>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm">
                  <span className="block text-3xl font-display font-bold text-brand-amber">{skipCount}</span>
                  <span className="text-[10px] uppercase font-bold text-[#5F5E5A] tracking-wider">Saltadas</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => startCategory(selectedCat!)}
                  className="py-5 rounded-2xl bg-brand-purple text-white font-bold text-lg shadow-xl shadow-brand-purple/20 flex items-center justify-center gap-3 hover:bg-brand-purple/90 transition-all active:scale-95"
                >
                  <RefreshCw size={24} /> Volver a Intentar
                </button>
                <button 
                  onClick={() => setScreen('home')}
                  className="py-5 rounded-2xl bg-white border border-black/5 text-[#1A1A18] font-bold text-lg hover:bg-[#F5F4F0] transition-all active:scale-95"
                >
                  Cambiar Categoría
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full max-w-xl mx-auto px-4 py-8 text-center border-t border-black/5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#5F5E5A]">
          Basado en el curso de Consejería Bíblica
        </p>
      </footer>
    </div>
  );
}
