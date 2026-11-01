import { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { TOPICS, DEFAULT_TOPIC_ID } from '../data/topics';
import { evaluateGuess, computeKeyboardStatuses, validateHardMode } from '../utils/wordEvaluator';
import { useLocalStorage } from './useLocalStorage';
import type { GameStatus, TileEvaluation, TopicStats, Question, TileStatus, GameMode } from '../types/game';

const INITIAL_STATS: TopicStats = {
  played: 0,
  solved: 0,
  streak: 0,
  maxStreak: 0,
  guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  solvedIds: []
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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
  // Modo de dificultad del juego
  const [gameMode, setGameMode] = useLocalStorage<GameMode>('dev_wordle_game_mode_v1', 'normal');

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

  const [questionIndex, setQuestionIndex] = useLocalStorage<number>(
    `dev_wordle_${topicId}_current_idx_v1`,
    0
  );

  // Asegurar que el índice esté dentro del rango del tema actual
  const safeQuestionIndex = Math.min(Math.max(0, questionIndex), currentTopic.preguntas.length - 1);
  const currentQuestion: Question = currentTopic.preguntas[safeQuestionIndex] || currentTopic.preguntas[0];
  const targetWord = currentQuestion.palabra.toUpperCase();
  const wordLength = targetWord.length;

  // Estado del juego en la ronda actual
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<TileEvaluation[][]>([]);
  const [isRowEvaluating, setIsRowEvaluating] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>('IN_PROGRESS');
  const [showHint, setShowHint] = useState<boolean>(gameMode === 'facil');
  const [isShakingRow, setIsShakingRow] = useState<boolean>(false);
  const [explanationModalOpen, setExplanationModalOpen] = useState<boolean>(false);
  const [discardedLetters, setDiscardedLetters] = useState<string[]>([]);

  // Estadísticas persistentes por tema
  const [statsMap, setStatsMap] = useLocalStorage<Record<string, TopicStats>>(
    'dev_wordle_all_stats_v1',
    { [DEFAULT_TOPIC_ID]: INITIAL_STATS }
  );

  const currentStats = statsMap[topicId] || INITIAL_STATS;

  // Resetear el tablero cuando cambia la pregunta, tema o modo
  useEffect(() => {
    setCurrentGuess('');
    setGuesses([]);
    setEvaluations([]);
    setIsRowEvaluating(false);
    setGameStatus('IN_PROGRESS');
    setShowHint(gameMode === 'facil');
    setIsShakingRow(false);
    setDiscardedLetters([]);
  }, [safeQuestionIndex, topicId, gameMode]);

  // Teclado virtual: combinar evaluaciones con letras descartadas en modo fácil
  const keyboardStatuses: Record<string, TileStatus> = useMemo(() => {
    const statuses = computeKeyboardStatuses(evaluations);
    for (const letter of discardedLetters) {
      if (!statuses[letter]) {
        statuses[letter] = 'absent';
      }
    }
    return statuses;
  }, [evaluations, discardedLetters]);

  // Asistencia para Modo Fácil: Descartar 3 letras que no están en la palabra
  const discardLetters = useCallback(() => {
    if (gameMode !== 'facil' || gameStatus !== 'IN_PROGRESS') return;

    const targetSet = new Set(targetWord.split(''));
    const currentEvaluated = new Set(Object.keys(computeKeyboardStatuses(evaluations)));
    const alreadyDiscarded = new Set(discardedLetters);

    const candidates = ALPHABET.filter(
      letter => !targetSet.has(letter) && !currentEvaluated.has(letter) && !alreadyDiscarded.has(letter)
    );

    if (candidates.length === 0) {
      onShowToast('Ya no quedan letras incorrectas por descartar', 'info');
      return;
    }

    // Tomar hasta 3 letras al azar
    const toDiscard = candidates.sort(() => Math.random() - 0.5).slice(0, 3);
    setDiscardedLetters(prev => [...prev, ...toDiscard]);
    onPlayKey();
    onShowToast(`Se descartaron del teclado: ${toDiscard.join(', ')}`, 'info');
  }, [gameMode, gameStatus, targetWord, evaluations, discardedLetters, onShowToast, onPlayKey]);

  // Manejo de entrada de una letra
  const addLetter = useCallback((letter: string) => {
    if (gameStatus !== 'IN_PROGRESS' || isRowEvaluating) return;
    const cleanChar = letter.toUpperCase();
    if (!/^[A-Z]$/.test(cleanChar)) return;

    if (currentGuess.length < wordLength) {
      setCurrentGuess(prev => prev + cleanChar);
      onPlayKey();
    }
  }, [gameStatus, isRowEvaluating, currentGuess.length, wordLength, onPlayKey]);

  // Manejo de borrado (Backspace)
  const removeLetter = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS' || isRowEvaluating) return;
    if (currentGuess.length > 0) {
      setCurrentGuess(prev => prev.slice(0, -1));
      onPlayKey();
    }
  }, [gameStatus, isRowEvaluating, currentGuess.length, onPlayKey]);

  // Enviar intento (Enter)
  const submitGuess = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS' || isRowEvaluating) return;

    // Validación de longitud
    if (currentGuess.length !== wordLength) {
      onPlayError();
      setIsShakingRow(true);
      setTimeout(() => setIsShakingRow(false), 500);
      onShowToast(`La palabra clave requiere exactamente ${wordLength} letras`, 'warning');
      return;
    }

    // Validación estricta para Modo Difícil (Hard Mode)
    if (gameMode === 'dificil') {
      const validation = validateHardMode(currentGuess, evaluations);
      if (!validation.valid) {
        onPlayError();
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

    // Sonidos escalonados para la animación de volteo
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

        // Lanzar confeti
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 }
          });
        } catch {
          // Ignorar si canvas no está disponible
        }

        onShowToast(`¡Excelente! Has dominado: ${targetWord}`, 'success');

        // Actualizar estadísticas de victoria
        setStatsMap(prevAll => {
          const prev = prevAll[topicId] || INITIAL_STATS;
          const attemptNumber = guesses.length + 1;
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

        // Abrir modal pedagógico tras breve pausa
        setTimeout(() => {
          setExplanationModalOpen(true);
        }, 800);

      } else if (isLastAttempt) {
        setGameStatus('LOST');
        onPlayGameOver();
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
    onPlayError,
    onPlayFlip,
    onShowToast,
    onPlayWin,
    setStatsMap,
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

  // Navegación entre preguntas
  const nextQuestion = useCallback(() => {
    setExplanationModalOpen(false);
    setQuestionIndex(prev => {
      const maxIndex = currentTopic.preguntas.length - 1;
      return prev < maxIndex ? prev + 1 : 0;
    });
  }, [setQuestionIndex, currentTopic.preguntas.length]);

  const prevQuestion = useCallback(() => {
    setExplanationModalOpen(false);
    setQuestionIndex(prev => {
      return prev > 0 ? prev - 1 : currentTopic.preguntas.length - 1;
    });
  }, [setQuestionIndex, currentTopic.preguntas.length]);

  const jumpToQuestion = useCallback((idx: number) => {
    setExplanationModalOpen(false);
    setQuestionIndex(idx);
  }, [setQuestionIndex]);

  const toggleHint = useCallback(() => {
    if (gameMode === 'dificil' && guesses.length < maxAttempts - 1) {
      onShowToast('Modo Difícil: Las pistas están bloqueadas hasta el último intento', 'warning');
      return;
    }
    setShowHint(prev => !prev);
    onPlayKey();
  }, [gameMode, guesses.length, maxAttempts, onShowToast, onPlayKey]);

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
    gameMode,
    setGameMode,
    maxAttempts,
    currentTopic,
    questionIndex: safeQuestionIndex,
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
    resetCurrentStats,
    discardLetters
  };
}
