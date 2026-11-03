import { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { TOPICS, DEFAULT_TOPIC_ID } from '../data/topics';
import { evaluateGuess, computeKeyboardStatuses, validateHardMode } from '../utils/wordEvaluator';
import { getTodayDateString, getDailyQuestionIndex, computeDailyStreak } from '../utils/dailyChallenge';
import { haptics } from '../utils/haptics';
import { useLocalStorage } from './useLocalStorage';
import type {
  GameStatus,
  TileEvaluation,
  TopicStats,
  Question,
  TileStatus,
  GameMode,
  GameTab,
  UserProgress
} from '../types/game';

const INITIAL_STATS: TopicStats = {
  played: 0,
  solved: 0,
  streak: 0,
  maxStreak: 0,
  guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  solvedIds: []
};

const INITIAL_PROGRESS: UserProgress = {
  xp: 0,
  dailyStreak: 0,
  lastDailyDate: null
};

interface UseGameStateProps {
  onPlayKey: () => void;
  onPlayFlip: (idx: number) => void;
  onPlayWin: () => void;
  onPlayError: () => void;
  onPlayGameOver: () => void;
  onShowToast: (text: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export function useGameState({
  onPlayKey,
  onPlayFlip,
  onPlayWin,
  onPlayError,
  onPlayGameOver,
  onShowToast
}: UseGameStateProps) {
  // Pestaña activa: Modo Práctica o Desafío Diario
  const [currentTab, setCurrentTab] = useState<GameTab>('practica');

  // Modo de dificultad del juego
  const [gameMode, setGameMode] = useLocalStorage<GameMode>('dev_wordle_game_mode_v1', 'normal');

  // Vibración háptica móvil
  const [hapticsEnabled, setHapticsEnabled] = useLocalStorage<boolean>('dev_wordle_haptics_v1', true);

  // Progreso de XP y Racha diaria
  const [userProgress, setUserProgress] = useLocalStorage<UserProgress>(
    'dev_wordle_user_progress_v2',
    INITIAL_PROGRESS
  );

  // Fecha actual
  const todayDateStr = useMemo(() => getTodayDateString(), []);
  const dailyCompletedToday = userProgress.lastDailyDate === todayDateStr;

  // Máximo de intentos según el modo
  const maxAttempts = useMemo(() => {
    switch (gameMode) {
      case 'facil':
        return 6;
      case 'dificil':
        return 4;
      default:
        return 5;
    }
  }, [gameMode]);

  // Tema activo y pregunta seleccionada
  const [topicId, setTopicId] = useLocalStorage<string>('dev_wordle_active_topic_v1', DEFAULT_TOPIC_ID);
  const currentTopic = useMemo(() => {
    return TOPICS.find(t => t.id === topicId) || TOPICS[0];
  }, [topicId]);

  const [practiceQuestionIndex, setPracticeQuestionIndex] = useLocalStorage<number>(
    `dev_wordle_${topicId}_current_idx_v1`,
    0
  );

  // Índice efectivo de la pregunta según el modo (Práctica o Diario)
  const questionIndex = useMemo(() => {
    if (currentTab === 'diario') {
      return getDailyQuestionIndex(currentTopic.preguntas.length, todayDateStr);
    }
    return Math.min(Math.max(0, practiceQuestionIndex), currentTopic.preguntas.length - 1);
  }, [currentTab, currentTopic.preguntas.length, todayDateStr, practiceQuestionIndex]);

  const currentQuestion: Question = currentTopic.preguntas[questionIndex] || currentTopic.preguntas[0];
  const targetWord = currentQuestion.palabra.toUpperCase();
  const wordLength = targetWord.length;

  // Estado de la partida actual
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<TileEvaluation[][]>([]);
  const [isRowEvaluating, setIsRowEvaluating] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>('IN_PROGRESS');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isShakingRow, setIsShakingRow] = useState<boolean>(false);
  const [explanationModalOpen, setExplanationModalOpen] = useState<boolean>(false);
  const [earnedXp, setEarnedXp] = useState<number>(0);

  // Estadísticas persistentes por tema
  const [statsMap, setStatsMap] = useLocalStorage<Record<string, TopicStats>>(
    'dev_wordle_all_stats_v1',
    { [DEFAULT_TOPIC_ID]: INITIAL_STATS }
  );

  const currentStats = statsMap[topicId] || INITIAL_STATS;

  // Resetear el tablero cuando cambia la pregunta, el tab o el modo
  useEffect(() => {
    setCurrentGuess('');
    setGuesses([]);
    setEvaluations([]);
    setIsRowEvaluating(false);
    setGameStatus('IN_PROGRESS');
    setShowHint(false);
    setIsShakingRow(false);
    setEarnedXp(0);
  }, [questionIndex, currentTab, topicId, gameMode]);

  // Teclado virtual: calcular estado de cada letra
  const keyboardStatuses: Record<string, TileStatus> = useMemo(() => {
    return computeKeyboardStatuses(evaluations);
  }, [evaluations]);

  // Alternar vibración háptica
  const toggleHaptics = useCallback(() => {
    setHapticsEnabled(prev => !prev);
  }, [setHapticsEnabled]);

  // Manejo de entrada de una letra
  const addLetter = useCallback((letter: string) => {
    if (gameStatus !== 'IN_PROGRESS' || isRowEvaluating) return;
    const cleanChar = letter.toUpperCase();
    if (!/^[A-Z]$/.test(cleanChar)) return;

    if (currentGuess.length < wordLength) {
      setCurrentGuess(prev => prev + cleanChar);
      onPlayKey();
      haptics.key(hapticsEnabled);
    }
  }, [gameStatus, isRowEvaluating, currentGuess.length, wordLength, onPlayKey, hapticsEnabled]);

  // Manejo de borrado (Backspace)
  const removeLetter = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS' || isRowEvaluating) return;
    if (currentGuess.length > 0) {
      setCurrentGuess(prev => prev.slice(0, -1));
      onPlayKey();
      haptics.key(hapticsEnabled);
    }
  }, [gameStatus, isRowEvaluating, currentGuess.length, onPlayKey, hapticsEnabled]);

  // Enviar intento (Enter)
  const submitGuess = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS' || isRowEvaluating) return;

    // Validación de longitud
    if (currentGuess.length !== wordLength) {
      onPlayError();
      haptics.error(hapticsEnabled);
      setIsShakingRow(true);
      setTimeout(() => setIsShakingRow(false), 500);
      onShowToast(`La palabra requiere exactamente ${wordLength} letras`, 'warning');
      return;
    }

    // Validación estricta para Modo Difícil (Hard Mode)
    if (gameMode === 'dificil') {
      const validation = validateHardMode(currentGuess, evaluations);
      if (!validation.valid) {
        onPlayError();
        haptics.error(hapticsEnabled);
        setIsShakingRow(true);
        setTimeout(() => setIsShakingRow(false), 500);
        onShowToast(validation.reason || 'Regla de Modo Difícil violada', 'warning');
        return;
      }
    }

    setIsRowEvaluating(true);
    const guessEvaluation = evaluateGuess(currentGuess, targetWord);
    const isWin = currentGuess === targetWord;
    const isLastAttempt = guesses.length + 1 >= maxAttempts;
    const attemptNumber = guesses.length + 1;

    // Sonidos y chimes escalonados
    for (let i = 0; i < wordLength; i++) {
      setTimeout(() => {
        onPlayFlip(i);
      }, i * 220);
    }

    const totalAnimationTime = wordLength * 220 + 300;

    setTimeout(() => {
      setGuesses(prev => [...prev, currentGuess]);
      setEvaluations(prev => [...prev, guessEvaluation]);
      setCurrentGuess('');
      setIsRowEvaluating(false);

      if (isWin) {
        setGameStatus('WON');
        onPlayWin();
        haptics.success(hapticsEnabled);

        // Lanzar confeti triunfal
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 }
          });
        } catch {
          // Ignorar si canvas no está disponible
        }

        // Calcular XP según el número de intento
        const baseXP =
          attemptNumber === 1
            ? 100
            : attemptNumber === 2
            ? 80
            : attemptNumber === 3
            ? 60
            : attemptNumber === 4
            ? 40
            : 25;

        const bonusDailyXP = currentTab === 'diario' ? 40 : 0;
        const totalEarnedXP = baseXP + bonusDailyXP;
        setEarnedXp(totalEarnedXP);

        onShowToast(`¡Correcto! +${totalEarnedXP} XP ganados`, 'success');

        // Actualizar progreso general (XP y Racha Diaria)
        setUserProgress(prev => {
          let updatedStreak = prev.dailyStreak;
          let updatedLastDate = prev.lastDailyDate;

          if (currentTab === 'diario') {
            const streakCalc = computeDailyStreak(prev.lastDailyDate, prev.dailyStreak, todayDateStr);
            updatedStreak = streakCalc.newStreak;
            updatedLastDate = todayDateStr;
          }

          return {
            xp: prev.xp + totalEarnedXP,
            dailyStreak: updatedStreak,
            lastDailyDate: updatedLastDate
          };
        });

        // Actualizar estadísticas por tema
        setStatsMap(prevAll => {
          const prev = prevAll[topicId] || INITIAL_STATS;
          const alreadySolved = prev.solvedIds.includes(currentQuestion.id);

          const newDistribution = { ...prev.guessDistribution };
          newDistribution[attemptNumber] = (newDistribution[attemptNumber] || 0) + 1;

          const newStreak = prev.streak + 1;
          const newMaxStreak = Math.max(newStreak, prev.maxStreak);
          const newSolvedIds = alreadySolved ? prev.solvedIds : [...prev.solvedIds, currentQuestion.id];

          return {
            ...prevAll,
            [topicId]: {
              played: prev.played + 1,
              solved: prev.solved + 1,
              streak: newStreak,
              maxStreak: newMaxStreak,
              guessDistribution: newDistribution,
              solvedIds: newSolvedIds
            }
          };
        });

        // Abrir modal con Micro-Tips tras breve pausa
        setTimeout(() => {
          setExplanationModalOpen(true);
        }, 800);

      } else if (isLastAttempt) {
        setGameStatus('LOST');
        onPlayGameOver();
        haptics.error(hapticsEnabled);
        onShowToast(`Fin de intentos. La respuesta era: ${targetWord}`, 'error');

        // Actualizar estadísticas de derrota
        setStatsMap(prevAll => {
          const prev = prevAll[topicId] || INITIAL_STATS;
          return {
            ...prevAll,
            [topicId]: {
              ...prev,
              played: prev.played + 1,
              streak: 0
            }
          };
        });

        setTimeout(() => {
          setExplanationModalOpen(true);
        }, 1000);
      }
    }, totalAnimationTime);

  }, [
    gameStatus,
    isRowEvaluating,
    currentGuess,
    wordLength,
    gameMode,
    evaluations,
    targetWord,
    guesses.length,
    maxAttempts,
    hapticsEnabled,
    currentTab,
    todayDateStr,
    onPlayError,
    onPlayFlip,
    onShowToast,
    onPlayWin,
    setStatsMap,
    setUserProgress,
    topicId,
    currentQuestion.id,
    onPlayGameOver
  ]);

  // Escuchar teclado físico
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (explanationModalOpen) return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        submitGuess();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        removeLetter();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        addLetter(e.key);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [explanationModalOpen, submitGuess, removeLetter, addLetter]);

  // Navegación entre preguntas (en modo práctica)
  const nextQuestion = useCallback(() => {
    setExplanationModalOpen(false);
    if (currentTab === 'practica') {
      setPracticeQuestionIndex(prev => {
        const maxIndex = currentTopic.preguntas.length - 1;
        return prev < maxIndex ? prev + 1 : 0;
      });
    }
  }, [setPracticeQuestionIndex, currentTopic.preguntas.length, currentTab]);

  const prevQuestion = useCallback(() => {
    setExplanationModalOpen(false);
    if (currentTab === 'practica') {
      setPracticeQuestionIndex(prev => {
        return prev > 0 ? prev - 1 : currentTopic.preguntas.length - 1;
      });
    }
  }, [setPracticeQuestionIndex, currentTopic.preguntas.length, currentTab]);

  const jumpToQuestion = useCallback((idx: number) => {
    setExplanationModalOpen(false);
    setCurrentTab('practica');
    setPracticeQuestionIndex(idx);
  }, [setPracticeQuestionIndex]);

  // Pistas con Active Recall
  const toggleHint = useCallback(() => {
    // Si la pista está bloqueada por reglas
    if (gameMode === 'dificil' && guesses.length < maxAttempts - 1) {
      onShowToast('Modo Difícil: La pista está bloqueada hasta el último intento', 'warning');
      haptics.error(hapticsEnabled);
      return;
    }
    if (gameMode === 'normal' && guesses.length === 0) {
      onShowToast('Haz al menos 1 intento antes de pedir la pista', 'warning');
      haptics.error(hapticsEnabled);
      return;
    }

    setShowHint(prev => !prev);
    onPlayKey();
    haptics.key(hapticsEnabled);
  }, [gameMode, guesses.length, maxAttempts, hapticsEnabled, onShowToast, onPlayKey]);

  const changeTopic = useCallback((newTopicId: string) => {
    setTopicId(newTopicId);
    setExplanationModalOpen(false);
  }, [setTopicId]);

  const resetCurrentStats = useCallback(() => {
    setStatsMap(prev => ({
      ...prev,
      [topicId]: { ...INITIAL_STATS, guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }, solvedIds: [] }
    }));
    onShowToast('Progreso de este tema reiniciado', 'info');
  }, [setStatsMap, topicId, onShowToast]);

  return {
    currentTab,
    setCurrentTab,
    todayDateStr,
    dailyCompletedToday,
    userProgress,
    gameMode,
    setGameMode,
    hapticsEnabled,
    toggleHaptics,
    maxAttempts,
    currentTopic,
    questionIndex,
    currentQuestion,
    targetWord,
    wordLength,
    currentGuess,
    guesses,
    evaluations,
    isRowEvaluating,
    gameStatus,
    showHint,
    isShakingRow,
    explanationModalOpen,
    setExplanationModalOpen,
    earnedXp,
    keyboardStatuses,
    currentStats,
    addLetter,
    removeLetter,
    submitGuess,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    toggleHint,
    changeTopic,
    resetCurrentStats
  };
}
