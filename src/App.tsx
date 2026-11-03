import { useState, useCallback } from 'react';
import { useAudio } from './hooks/useAudio';
import { useGameState } from './hooks/useGameState';
import { Header } from './components/Header';
import { QuestionCard } from './components/QuestionCard';
import { WordleBoard } from './components/WordleBoard';
import { Keyboard } from './components/Keyboard';
import { Toast } from './components/Toast';
import { ExplanationModal } from './components/Modals/ExplanationModal';
import { CatalogModal } from './components/Modals/CatalogModal';
import { StatsModal } from './components/Modals/StatsModal';
import { HelpModal } from './components/Modals/HelpModal';
import { GameModeModal } from './components/Modals/GameModeModal';
import { SettingsModal } from './components/Modals/SettingsModal';
import type { ToastMessage } from './types/game';
import './App.css';

export function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [gameModeModalOpen, setGameModeModalOpen] = useState(false);
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const {
    soundEnabled,
    toggleSound,
    playKey,
    playFlip,
    playWin,
    playError,
    playGameOver
  } = useAudio();

  const showToast = useCallback((text: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { id, text, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  }, []);

  const {
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
    resetCurrentStats
  } = useGameState({
    onPlayKey: playKey,
    onPlayFlip: playFlip,
    onPlayWin: playWin,
    onPlayError: playError,
    onPlayGameOver: playGameOver,
    onShowToast: showToast
  });

  return (
    <div className="app-layout">
      {/* Sistema de Toasts */}
      <Toast toasts={toasts} />

      {/* Cabecera Limpia Mobile-First (Rango, Pestañas Práctica/Diario, Racha y Menú) */}
      <Header
        currentTab={currentTab}
        userProgress={userProgress}
        dailyCompletedToday={dailyCompletedToday}
        onSelectTab={setCurrentTab}
        onOpenSettings={() => setSettingsModalOpen(true)}
      />

      {/* Contenedor Central */}
      <main className="main-content">
        <QuestionCard
          question={currentQuestion}
          currentIndex={questionIndex}
          totalQuestions={currentTopic.preguntas.length}
          wordLength={wordLength}
          showHint={showHint}
          gameMode={gameMode}
          currentTab={currentTab}
          todayDateStr={todayDateStr}
          guessesCount={guesses.length}
          maxAttempts={maxAttempts}
          onToggleHint={toggleHint}
          onPrevQuestion={prevQuestion}
          onNextQuestion={nextQuestion}
        />

        <WordleBoard
          wordLength={wordLength}
          guesses={guesses}
          evaluations={evaluations}
          currentGuess={currentGuess}
          isShakingRow={isShakingRow}
          isRowEvaluating={isRowEvaluating}
          maxAttempts={maxAttempts}
        />

        <Keyboard
          keyboardStatuses={keyboardStatuses}
          onAddLetter={addLetter}
          onRemoveLetter={removeLetter}
          onSubmit={submitGuess}
        />
      </main>

      {/* Modal 1: Micro-Tips de Aprendizaje Post-Ronda */}
      <ExplanationModal
        isOpen={explanationModalOpen}
        onClose={() => setExplanationModalOpen(false)}
        question={currentQuestion}
        gameStatus={gameStatus}
        earnedXp={earnedXp}
        onNextQuestion={nextQuestion}
      />

      {/* Modal 2: Menú y Ajustes Unificado (Sonido, Háptica, Modos, etc.) */}
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        gameMode={gameMode}
        userProgress={userProgress}
        soundEnabled={soundEnabled}
        hapticsEnabled={hapticsEnabled}
        onToggleSound={toggleSound}
        onToggleHaptics={toggleHaptics}
        onOpenGameMode={() => setGameModeModalOpen(true)}
        onOpenCatalog={() => setCatalogModalOpen(true)}
        onOpenStats={() => setStatsModalOpen(true)}
        onOpenHelp={() => setHelpModalOpen(true)}
      />

      {/* Modal 3: Selector de Modos y Reglas de Dificultad */}
      <GameModeModal
        isOpen={gameModeModalOpen}
        onClose={() => setGameModeModalOpen(false)}
        currentMode={gameMode}
        onSelectMode={mode => {
          setGameMode(mode);
          showToast(`Modo cambiado a: ${mode.toUpperCase()}`, 'info');
        }}
      />

      {/* Modal 4: Catálogo de Desafíos por Nivel y Tipo */}
      <CatalogModal
        isOpen={catalogModalOpen}
        onClose={() => setCatalogModalOpen(false)}
        topicName={currentTopic.nombre}
        questions={currentTopic.preguntas}
        currentQuestionIndex={questionIndex}
        solvedIds={currentStats.solvedIds}
        onSelectQuestion={idx => {
          jumpToQuestion(idx);
          setCatalogModalOpen(false);
        }}
      />

      {/* Modal 5: Estadísticas del Estudiante */}
      <StatsModal
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        topicName={currentTopic.nombre}
        totalQuestions={currentTopic.preguntas.length}
        stats={currentStats}
        onResetStats={resetCurrentStats}
      />

      {/* Modal 6: ¿Cómo se Juega? */}
      <HelpModal isOpen={helpModalOpen} onClose={() => setHelpModalOpen(false)} />
    </div>
  );
}

export default App;
