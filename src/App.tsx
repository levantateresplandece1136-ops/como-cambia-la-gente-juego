import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  Zap, 
  Key, 
  UserCircle, 
  BookOpen, 
  Theater, 
  ArrowLeft, 
  ArrowRight,
  Check, 
  X, 
  RefreshCw, 
  Eye, 
  ChevronRight,
  ChevronLeft,
  Trophy,
  History,
  Stethoscope,
  Scale,
  Ghost,
  UserCheck,
  Flame,
  MessageCircleQuestion,
  Info,
  Users,
  ShieldCheck,
  Heart,
  Skull,
  Cross
} from 'lucide-react';
import { CATEGORIES, GAME_DATA, Category, CategoryId } from './gameData';

type Screen = 'home' | 'game' | 'results' | 'special_card';
type PlayMode = 'competitive' | 'cooperative';

interface Result {
  idx: number;
  status: 'correct' | 'wrong' | 'skip';
}

interface SpecialCard {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

const SPECIAL_CARDS: SpecialCard[] = [
  { id: 'gracia', name: 'Gracia', description: 'Duplica los puntos de esta ronda o permite repetir un fallo.', icon: Heart, color: 'brand-teal' },
  { id: 'conviccion', name: 'Convicción', description: 'El Espíritu Santo confronta. Debes confesar un ídolo personal para avanzar.', icon: Info, color: 'brand-purple' },
  { id: 'tentacion', name: 'Tentación', description: 'Atención: Resta 5 segundos al cronómetro en la próxima ronda.', icon: Skull, color: 'brand-coral' },
  { id: 'comunidad', name: 'Comunidad', description: 'Pide ayuda a un compañero. Si ambos aciertan, ganan bono.', icon: Users, color: 'brand-blue' },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [mode, setMode] = useState<PlayMode>('competitive');
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentSpecialCard, setCurrentSpecialCard] = useState<SpecialCard | null>(null);
  const [coopScore, setCoopScore] = useState(50); // 0 (Carne) to 100 (Espíritu)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const iconMap: Record<string, any> = {
    HelpCircle, Zap, Key, UserCircle, BookOpen, Theater, 
    Stethoscope, Scale, Ghost, UserCheck, Flame, MessageCircleQuestion
  };

  const startCategory = (cat: Category) => {
    // Fisher-Yates Shuffle for true randomness
    const raw = [...GAME_DATA[cat.id]];
    for (let i = raw.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [raw[i], raw[j]] = [raw[j], raw[i]];
    }
    
    setQuestions(raw);
    setSelectedCat(cat);
    setCurrentIndex(0);
    setResults([]);
    setShowAnswer(false);
    setIsTimerRunning(false);
    setScreen('game');
    prepareTimer(cat.id === '10sec' ? 10 : 30);
  };

  const prepareTimer = (seconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(seconds);
    setIsTimerRunning(false);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
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
    
    // Update Co-op Score
    if (mode === 'cooperative') {
      if (status === 'correct') setCoopScore(prev => Math.min(100, prev + 10));
      if (status === 'wrong') setCoopScore(prev => Math.max(0, prev - 10));
    }

    // Trigger special card chance (15%)
    if (Math.random() < 0.15 && screen !== 'results') {
      const randomCard = SPECIAL_CARDS[Math.floor(Math.random() * SPECIAL_CARDS.length)];
      setCurrentSpecialCard(randomCard);
      setScreen('special_card');
    } else {
      handleNext();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setIsTimerRunning(false);
      prepareTimer(selectedCat?.id === '10sec' ? 10 : 30);
    } else {
      setScreen('results');
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
      setIsTimerRunning(false);
      prepareTimer(selectedCat?.id === '10sec' ? 10 : 30);
    }
  };

  const currentQuestion = questions[currentIndex];
  const correctCount = results.filter(r => r.status === 'correct').length;
  const wrongCount = results.filter(r => r.status === 'wrong').length;
  const skipCount = results.filter(r => r.status === 'skip').length;

  const getResultForIndex = (idx: number) => results.find(r => r.idx === idx);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="min-h-screen bg-brand-paper paper-texture font-sans flex flex-col items-center">
      <main className="w-full max-w-2xl mx-auto px-4 py-8 flex-1 flex flex-col">
        
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1"
            >
              <div className="mb-10 text-center">
                <h1 className="font-serif italic text-5xl font-bold text-brand-ink mb-3">
                  ¿Cómo cambia la gente?
                </h1>
                <p className="text-brand-ink/60 font-medium tracking-wide uppercase text-xs">
                  Entrenamiento práctico en Consejería Bíblica
                </p>
                
                <div className="mt-8 flex justify-center gap-4">
                  <button 
                    onClick={() => setMode('competitive')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer ${mode === 'competitive' ? 'bg-brand-ink text-white' : 'bg-transparent text-brand-ink/60 border-brand-ink/10'}`}
                  >
                    <Trophy size={16} /> Competitivo
                  </button>
                  <button 
                    onClick={() => setMode('cooperative')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer ${mode === 'cooperative' ? 'bg-brand-teal text-white border-brand-teal' : 'bg-transparent text-brand-ink/60 border-brand-ink/10'}`}
                  >
                    <Users size={16} /> Cooperativo
                  </button>
                </div>
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
                      className={`group p-5 rounded-3xl border-2 border-transparent bg-white shadow-sm hover:shadow-xl hover:border-${cat.color} transition-all text-left flex items-start gap-4 cursor-pointer active:scale-[0.98] border-b-4 border-b-black/5`}
                    >
                      <div className={`p-3 rounded-2xl bg-${cat.color}/10 text-${cat.color} group-hover:bg-${cat.color} group-hover:text-white transition-all shadow-inner`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-display font-bold text-brand-ink group-hover:text-brand-ink text-sm uppercase tracking-tight">{cat.name}</h3>
                          <span className="text-[9px] font-black uppercase opacity-40">{cat.level}</span>
                        </div>
                        <p className="text-xs text-brand-ink/50 font-medium leading-snug">{cat.description}</p>
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Header Stats */}
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setScreen('home')}
                  className="p-3 hover:bg-black/5 rounded-full transition-all active:scale-90"
                >
                  <ArrowLeft size={24} />
                </button>
                
                {mode === 'cooperative' ? (
                  <div className="flex-1 mx-8 text-center">
                    <div className="flex justify-between text-[8px] font-bold uppercase mb-1">
                      <span className="text-brand-coral flex items-center gap-1"><Skull size={8}/> Carne</span>
                      <span className="text-brand-teal flex items-center gap-1">Espíritu <Heart size={8}/></span>
                    </div>
                    <div className="h-2 bg-black/5 rounded-full overflow-hidden flex">
                      <motion.div 
                        animate={{ width: `${coopScore}%` }}
                        className="h-full bg-brand-teal"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 text-[10px] font-bold tracking-wider uppercase">
                    <span className="px-3 py-1.5 bg-brand-teal text-white rounded-full shadow-lg shadow-brand-teal/20">{correctCount} Correctas</span>
                    <span className="px-3 py-1.5 bg-brand-coral text-white rounded-full shadow-lg shadow-brand-coral/20">{wrongCount} Fallos</span>
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="flex gap-1 mb-8">
                {questions.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      i === currentIndex ? 'bg-brand-purple scale-y-150 shadow-md ring-4 ring-brand-purple/10' : 
                      results[i]?.status === 'correct' ? 'bg-brand-teal' :
                      results[i]?.status === 'wrong' ? 'bg-brand-coral' :
                      results[i]?.status === 'skip' ? 'bg-brand-amber' :
                      'bg-black/10'
                    }`}
                  />
                ))}
              </div>

              {/* Enhanced Question Card */}
              <div className="flex-1 flex flex-col relative group/card">
                {/* Side Navigation Buttons */}
                <div className="absolute inset-y-0 -left-6 flex items-center z-20">
                  <button 
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={`p-3 rounded-full bg-white shadow-lg border border-black/5 transition-all active:scale-95 ${currentIndex === 0 ? 'opacity-0 scale-0' : 'opacity-100 hover:bg-brand-paper cursor-pointer'}`}
                  >
                    <ChevronLeft size={24} className="text-brand-ink" />
                  </button>
                </div>
                <div className="absolute inset-y-0 -right-6 flex items-center z-20">
                  <button 
                    onClick={handleNext}
                    disabled={currentIndex === questions.length - 1}
                    className={`p-3 rounded-full bg-white shadow-lg border border-black/5 transition-all active:scale-95 ${currentIndex === questions.length - 1 ? 'opacity-0 scale-0' : 'opacity-100 hover:bg-brand-paper cursor-pointer'}`}
                  >
                    <ChevronRight size={24} className="text-brand-ink" />
                  </button>
                </div>

                <motion.div 
                  layout
                  animate={
                    isTimerRunning && timeLeft <= 5 && timeLeft > 0
                      ? { 
                          borderColor: ['#C14A26', '#1F1E1B', '#C14A26'],
                          backgroundColor: ['#ffffff', '#C14A26', '#ffffff'],
                          x: [0, -4, 4, -4, 4, 0],
                          scale: [1, 1.02, 1]
                        }
                      : { borderColor: 'rgba(0,0,0,0.05)', backgroundColor: '#ffffff', x: 0 }
                  }
                  transition={isTimerRunning && timeLeft <= 5 ? { duration: 0.2, repeat: Infinity } : {}}
                  className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 flex-1 flex flex-col items-center justify-center relative overflow-hidden"
                >
                {isTimerRunning && timeLeft <= 5 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 0.1, repeat: Infinity }}
                    className="absolute inset-0 bg-brand-coral pointer-events-none z-0"
                  />
                )}
                <div className="absolute top-6 left-10 flex items-center gap-3 z-10">
                  <div className={`p-2 rounded-xl bg-${selectedCat?.color}/10 text-${selectedCat?.color}`}>
                    {selectedCat && iconMap[selectedCat.icon] && (
                      (() => {
                        const Icon = iconMap[selectedCat.icon];
                        return <Icon size={16} />;
                      })()
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 block">{selectedCat?.name}</span>
                    <span className="text-xs font-bold text-brand-ink/60">{currentIndex + 1} de {questions.length}</span>
                  </div>
                </div>

                {/* Timer */}
                <div className="absolute top-6 right-10 z-10">
                  <motion.div
                    animate={isTimerRunning && timeLeft <= 5 ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="relative"
                  >
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle cx="40" cy="40" r="34" className="fill-none stroke-black/5 stroke-[4]" />
                      <motion.circle 
                        cx="40" cy="40" r="34" 
                        className={`fill-none stroke-[4] ${timeLeft < 5 ? 'stroke-brand-paper' : 'stroke-brand-teal'}`}
                        strokeDasharray="213"
                        animate={{ strokeDashoffset: 213 * (1 - timeLeft / (selectedCat?.id === '10sec' ? 10 : 30)) }}
                      />
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center text-2xl font-black ${timeLeft < 5 ? 'text-white' : 'text-brand-ink'}`}>
                      {timeLeft}
                    </span>
                  </motion.div>
                </div>

                <div className="text-center w-full mt-8 z-10">
                  <motion.div 
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                  >
                    {/* Specialized UI based on category */}
                    {selectedCat?.id === 'diagnosis' ? (
                      <div className="space-y-6">
                        <span className="text-brand-purple block text-xs font-black uppercase tracking-[0.3em]">Caso de Diagnóstico</span>
                        <h2 className="font-serif italic text-3xl font-bold leading-tight">"{currentQuestion.scenario}"</h2>
                        <div className="grid grid-cols-2 gap-3 mt-8">
                          <div className="p-4 bg-brand-paper rounded-2xl border border-black/5 text-left opacity-30">
                            <span className="block text-[8px] font-black uppercase mb-1">Calor</span>
                            <span className="text-xs">Identifica el calor...</span>
                          </div>
                          <div className="p-4 bg-brand-paper rounded-2xl border border-black/5 text-left opacity-30">
                            <span className="block text-[8px] font-black uppercase mb-1">Espinas</span>
                            <span className="text-xs">Identifica las espinas...</span>
                          </div>
                        </div>
                      </div>
                    ) : selectedCat?.id === 'idol' ? (
                      <div className="space-y-6">
                        <span className="text-brand-coral block text-xs font-black uppercase tracking-[0.3em]">Identifica el Ídolo</span>
                        <h2 className="font-serif italic text-3xl font-bold leading-tight">"{currentQuestion.scenario}"</h2>
                        <div className="p-4 bg-brand-paper rounded-2xl border border-black/5 text-left opacity-30 mt-6">
                          <span className="block text-[8px] font-black uppercase mb-1">Tesoro oculto</span>
                          <span className="text-xs">¿Qué está gobernando el corazón?</span>
                        </div>
                      </div>
                    ) : selectedCat?.id === 'evangelio' ? (
                      <div className="space-y-8">
                        <span className="text-brand-teal block text-xs font-black uppercase tracking-[0.3em]">Discernimiento Bíblico</span>
                        <div className="text-4xl font-serif font-black leading-tight bg-brand-paper p-8 rounded-3xl border border-black/5">
                          {currentQuestion.text}
                        </div>
                        <p className="text-brand-ink/40 text-sm font-medium">¿Refleja el evangelio o es puro moralismo?</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h2 className="font-serif italic text-3xl font-bold leading-tight">
                          {selectedCat?.id === 'qa' && currentQuestion.q}
                          {selectedCat?.id === '10sec' && currentQuestion.q}
                          {selectedCat?.id === 'pass' && currentQuestion.def}
                          {selectedCat?.id === 'who' && currentQuestion.easy}
                          {selectedCat?.id === 'counselor' && currentQuestion.case}
                          {selectedCat?.id === 'deep_question' && currentQuestion.q}
                          {selectedCat?.id === 'mime' && currentQuestion.concept}
                        </h2>
                      </div>
                    )}
                  </motion.div>
                </div>

                <AnimatePresence>
                  {!isTimerRunning && !showAnswer && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={startTimer}
                      className="absolute inset-0 z-10 bg-brand-paper/90 backdrop-blur-md flex flex-col items-center justify-center p-8 group cursor-pointer"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-brand-purple text-white p-8 rounded-full shadow-2xl shadow-brand-purple/30 mb-6 relative"
                      >
                        <Cross size={48} />
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-white rounded-full -z-10"
                        />
                      </motion.div>
                      <span className="text-3xl font-display font-black text-brand-purple tracking-tighter uppercase">Capacitación</span>
                      <p className="mt-4 text-[#5F5E5A] font-bold text-xs uppercase tracking-widest">Inicia el cronómetro</p>
                    </motion.button>
                  )}

                  {showAnswer && (
                    <motion.div 
                      key={currentIndex + 'a'}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full mt-10 p-8 rounded-[2rem] bg-brand-teal/5 border-2 border-brand-teal/10 shadow-inner overflow-y-auto max-h-[40vh]"
                    >
                      <div className="flex items-center gap-2 mb-4 opacity-40">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Respuesta Redentora</span>
                      </div>
                      <div className="text-brand-teal font-display font-black text-xl leading-snug">
                        {selectedCat?.id === 'diagnosis' && (
                          <div className="grid grid-cols-1 gap-4 text-left">
                            <div className="flex gap-4">
                              <span className="font-serif italic opacity-50 shrink-0 text-sm">Calor:</span>
                              <span className="text-sm">{currentQuestion.calor}</span>
                            </div>
                            <div className="flex gap-4">
                              <span className="font-serif italic opacity-50 shrink-0 text-sm">Ídolo:</span>
                              <span className="text-sm">{currentQuestion.idolo}</span>
                            </div>
                            <div className="flex gap-4">
                              <span className="font-serif italic opacity-50 shrink-0 text-sm">Cruz:</span>
                              <span className="font-serif underline decoration-brand-teal/30 text-sm">{currentQuestion.evangelio}</span>
                            </div>
                          </div>
                        )}
                        {selectedCat?.id === 'evangelio' && currentQuestion.type}
                        {selectedCat?.id === 'idol' && (
                          <div className="grid grid-cols-1 gap-4 text-left">
                            <div className="flex gap-4">
                              <span className="font-serif italic opacity-50 shrink-0 text-sm">Ídolo:</span>
                              <span className="text-sm font-black uppercase">{currentQuestion.idol}</span>
                            </div>
                            <div className="flex gap-4">
                              <span className="font-serif italic opacity-50 shrink-0 text-sm">Mentira:</span>
                              <span className="text-sm">"{currentQuestion.lie}"</span>
                            </div>
                            <div className="flex gap-4">
                              <span className="font-serif italic opacity-50 shrink-0 text-sm">Evangelio:</span>
                              <span className="font-serif underline decoration-brand-teal/30 text-sm">{currentQuestion.gospel}</span>
                            </div>
                            <div className="flex gap-4 border-t border-brand-teal/10 pt-2">
                              <span className="font-serif italic opacity-50 shrink-0 text-sm">Fruto:</span>
                              <span className="text-sm text-brand-green font-bold">{currentQuestion.fruit}</span>
                            </div>
                          </div>
                        )}
                        {selectedCat?.id === 'counselor' && (
                          <div className="text-sm space-y-2">
                            <p><strong>Enfoque:</strong> {currentQuestion.focus}</p>
                            <p className="opacity-60 italic text-xs">Temas: {currentQuestion.themes.join(", ")}</p>
                          </div>
                        )}
                        {selectedCat?.id === 'qa' && currentQuestion.a}
                        {selectedCat?.id === '10sec' && currentQuestion.a}
                        {selectedCat?.id === 'who' && `${currentQuestion.name}`}
                        {selectedCat?.id === 'mime' && `${currentQuestion.lesson}`}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              </div>

              {/* Controls */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {!showAnswer ? (
                  <button 
                    onClick={() => setShowAnswer(true)}
                    className="col-span-2 py-5 rounded-[1.5rem] bg-brand-ink text-white flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Eye size={20} /> Ver Diagnóstico
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => markResult('wrong')}
                      className="py-5 rounded-3xl bg-white border-2 border-brand-coral/20 text-brand-coral flex items-center justify-center gap-3 font-black uppercase tracking-widest hover:bg-brand-coral/5 transition-all shadow-lg active:scale-95 cursor-pointer"
                    >
                      <X size={24} /> Fallé
                    </button>
                    <button 
                      onClick={() => markResult('correct')}
                      className="py-5 rounded-3xl bg-brand-teal text-white flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-xl shadow-brand-teal/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                    >
                      <Check size={24} /> Acerté
                    </button>
                  </>
                )}
                <button 
                  onClick={() => markResult('skip')}
                  className="col-span-2 py-3 rounded-2xl border-2 border-dashed border-black/5 text-brand-ink/40 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em] hover:bg-black/5 transition-all cursor-pointer"
                >
                  Continuar sin puntuar <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {screen === 'special_card' && currentSpecialCard && (
            <motion.div 
              key="special"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-white rounded-[3rem] shadow-2xl border-4 border-dashed border-brand-purple/20"
            >
              <div className={`p-8 rounded-full bg-${currentSpecialCard.color}/10 text-${currentSpecialCard.color} mb-8 shadow-inner`}>
                <currentSpecialCard.icon size={80} />
              </div>
              <h2 className="font-serif italic text-4xl font-bold mb-4">Carta de {currentSpecialCard.name}</h2>
              <p className="text-xl text-brand-ink/70 leading-relaxed mb-10 max-w-sm">
                {currentSpecialCard.description}
              </p>
              <button 
                onClick={handleNext}
                className={`py-5 px-12 rounded-full bg-${currentSpecialCard.color} text-white font-black uppercase tracking-widest shadow-xl shadow-${currentSpecialCard.color}/30 active:scale-95 transition-all cursor-pointer`}
              >
                Recibir y Continuar
              </button>
            </motion.div>
          )}

          {screen === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 text-center"
            >
              <div className="mb-12 relative flex justify-center">
                <div className="p-16 rounded-full bg-brand-purple text-white shadow-[0_25px_60px_rgba(93,84,164,0.3)] border-8 border-white">
                  <Trophy size={80} />
                </div>
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-4 right-1/4 p-5 bg-brand-amber text-white rounded-3xl shadow-xl shadow-brand-amber/20"
                >
                  <History size={32} />
                </motion.div>
              </div>

              <h2 className="font-serif italic text-6xl font-bold text-brand-ink mb-2">Entrenamiento Completado</h2>
              <p className="text-brand-ink/40 font-black uppercase tracking-[0.4em] text-xs mb-12">Desafío: {selectedCat?.name}</p>

              <div className="grid grid-cols-3 gap-6 mb-16">
                <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-black/5">
                  <span className="block text-4xl font-display font-black text-brand-teal">{correctCount}</span>
                  <span className="text-[10px] uppercase font-black text-brand-ink/30 tracking-widest">Gracia</span>
                </div>
                <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-black/5">
                  <span className="block text-4xl font-display font-black text-brand-coral">{wrongCount}</span>
                  <span className="text-[10px] uppercase font-black text-brand-ink/30 tracking-widest">Espinas</span>
                </div>
                <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-black/5">
                  <span className="block text-4xl font-display font-black text-brand-amber">{skipCount}</span>
                  <span className="text-[10px] uppercase font-black text-brand-ink/30 tracking-widest">Saltadas</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 max-w-sm mx-auto">
                <button 
                  onClick={() => startCategory(selectedCat!)}
                  className="py-6 rounded-3xl bg-brand-purple text-white font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(93,84,164,0.3)] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <RefreshCw size={24} /> Reintentar Entrenamiento
                </button>
                <button 
                  onClick={() => setScreen('home')}
                  className="py-6 rounded-3xl bg-white border-2 border-black/5 text-brand-ink font-black uppercase tracking-[0.2em] hover:bg-brand-paper transition-all active:scale-95 cursor-pointer"
                >
                  Cambiar Categoría
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-ink/30">
          Unidad en la Diversidad • Soli Deo Gloria
        </p>
      </footer>
    </div>
  );
}
