import { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { TOPICS, DEFAULT_TOPIC_ID } from '../data/topics';
import { evaluateGuess, computeKeyboardStatuses } from '../utils/wordEvaluator';
import { useLocalStorage } from './useLocalStorage';
import type { GameStatus, TileEvaluation, TopicStats, Question, TileStatus } from '../types/game';

export const MAX_ATTEMPTS = 5;

const INITIAL_STATS: TopicStats = {
  played: 0,
  solved: 0,
  streak: 0,
  maxStreak: 0,
  guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  solvedIds: []
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
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isShakingRow, setIsShakingRow] = useState<boolean>(false);
  const [explanationModalOpen, setExplanationModalOpen] = useState<boolean>(false);

  // Estadísticas persistentes por tema
  const [statsMap, setStatsMap] = useLocalStorage<Record<string, TopicStats>>(
    'dev_wordle_all_stats_v1',
    { [DEFAULT_TOPIC_ID]: INITIAL_STATS }
  );

  const currentStats = statsMap[topicId] || INITIAL_STATS;

  // Resetear el tablero cuando cambia la pregunta o el tema
  useEffect(() => {
    setCurrentGuess('');
    setGuesses([]);
    setEvaluations([]);
    setIsRowEvaluating(false);
    setGameStatus('IN_PROGRESS');
    setShowHint(false);
    setIsShakingRow(false);
  }, [safeQuestionIndex, topicId]);

  // Teclado virtual: estado de cada letra
  const keyboardStatuses: Record<string, TileStatus> = useMemo(() => {
    return computeKeyboardStatuses(evaluations);
  }, [evaluations]);

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

    setIsRowEvaluating(true);
    const guessEvaluation = evaluateGuess(currentGuess, targetWord);
    const isWin = currentGuess === targetWord;
    const isLastAttempt = guesses.length + 1 >= MAX_ATTEMPTS;

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
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // Ignorar si canvas no está disponible
        }

        onShowToast('¡Excelente! Has dominado este concepto', 'success');

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
    targetWord,
    guesses.length,
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
    setShowHint(prev => !prev);
    onPlayKey();
  }, [onPlayKey]);

  const changeTopic = useCallback((newTopicId: string) => {
    setTopicId(newTopicId);
    setExplanationModalOpen(false);
  }, [setTopicId]);

  const resetCurrentStats = useCallback(() => {
    setStatsMap(prev => ({
      ...prev,
      [topicId]: { ...INITIAL_STATS, guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, solvedIds: [] }
    }));
    onShowToast('Progreso de este tema reiniciado', 'info');
  }, [setStatsMap, topicId, onShowToast]);

  return {
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
    resetCurrentStats
  };
}
