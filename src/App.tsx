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
import { TopicSelectModal } from './components/Modals/TopicSelectModal';
import { CheatSheetModal } from './components/Modals/CheatSheetModal';
import type { ToastMessage } from './types/game';
import './App.css';

export function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [cheatSheetModalOpen, setCheatSheetModalOpen] = useState(false);
  const [topicModalOpen, setTopicModalOpen] = useState(false);

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

      {/* Cabecera Principal */}
      <Header
        currentTopic={currentTopic}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenStats={() => setStatsModalOpen(true)}
        onOpenCatalog={() => setCatalogModalOpen(true)}
        onOpenHelp={() => setHelpModalOpen(true)}
        onOpenCheatSheet={() => setCheatSheetModalOpen(true)}
        onOpenTopicSelect={() => setTopicModalOpen(true)}
      />

      {/* Contenedor Central */}
      <main className="main-content">
        <QuestionCard
          question={currentQuestion}
          currentIndex={questionIndex}
          totalQuestions={currentTopic.preguntas.length}
          wordLength={wordLength}
          showHint={showHint}
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
        />

        <Keyboard
          keyboardStatuses={keyboardStatuses}
          onAddLetter={addLetter}
          onRemoveLetter={removeLetter}
          onSubmit={submitGuess}
        />
      </main>

      {/* Modal 1: Explicación Didáctica Post-Ronda */}
      <ExplanationModal
        isOpen={explanationModalOpen}
        onClose={() => setExplanationModalOpen(false)}
        question={currentQuestion}
        gameStatus={gameStatus}
        onNextQuestion={nextQuestion}
      />

      {/* Modal 2: Catálogo de Desafíos y Mapa de Aprendizaje */}
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

      {/* Modal 3: Estadísticas del Estudiante */}
      <StatsModal
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        topicName={currentTopic.nombre}
        totalQuestions={currentTopic.preguntas.length}
        stats={currentStats}
        onResetStats={resetCurrentStats}
      />

      {/* Modal 4: ¿Cómo se Juega? */}
      <HelpModal isOpen={helpModalOpen} onClose={() => setHelpModalOpen(false)} />

      {/* Modal 5: Selector de Rutas / Temas (SQL, JS, Git, etc.) */}
      <TopicSelectModal
        isOpen={topicModalOpen}
        onClose={() => setTopicModalOpen(false)}
        currentTopicId={currentTopic.id}
        onSelectTopic={changeTopic}
      />

      {/* Modal 6: Guía Rápida de SQL (Cheat Sheet) */}
      <CheatSheetModal
        isOpen={cheatSheetModalOpen}
        onClose={() => setCheatSheetModalOpen(false)}
      />
    </div>
  );
}

export default App;
