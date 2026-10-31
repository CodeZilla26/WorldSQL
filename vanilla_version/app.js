/**
 * SQL WORDLE: MOTOR DEL JUEGO Y LÓGICA DE APRENDIZAJE
 * Maneja el estado, cuadrícula dinámica por longitud de palabra,
 * animaciones de flip, sintetizador de audio y retroalimentación pedagógica.
 */

(function () {
    'use strict';

    // Constantes del Juego
    const MAX_ATTEMPTS = 5;
    const STORAGE_KEY_STATS = 'sql_wordle_stats_v1';
    const STORAGE_KEY_SOLVED = 'sql_wordle_solved_v1';
    const STORAGE_KEY_CURRENT = 'sql_wordle_current_idx_v1';
    const STORAGE_KEY_SOUND = 'sql_wordle_sound_v1';

    // Estado del Juego
    let currentQuestionIndex = 0;
    let targetWord = "";
    let wordLength = 0;
    let currentRow = 0;
    let currentCol = 0;
    let currentGuess = "";
    let isGameOver = false;
    let isRowEvaluating = false;
    let soundEnabled = true;

    // Persistencia Local
    let stats = {
        played: 0,
        solved: 0,
        streak: 0,
        maxStreak: 0
    };
    let solvedQuestions = new Set();

    // Elementos del DOM
    const board = document.getElementById('wordle-board');
    const virtualKeyboard = document.getElementById('virtual-keyboard');
    const qCategory = document.getElementById('q-category');
    const qFocus = document.getElementById('q-focus');
    const qCounter = document.getElementById('q-counter');
    const qPrompt = document.getElementById('q-prompt');
    const qCodeContainer = document.getElementById('q-code-container');
    const qCodeContent = document.getElementById('q-code-content');
    const wordLenLabel = document.getElementById('word-len-label');
    const btnShowHint = document.getElementById('btn-show-hint');
    const hintBanner = document.getElementById('hint-banner');
    const hintText = document.getElementById('hint-text');
    const toastContainer = document.getElementById('toast-container');
    const btnSound = document.getElementById('btn-sound');
    const soundIcon = document.getElementById('sound-icon');
    const btnStats = document.getElementById('btn-stats');
    const btnMap = document.getElementById('btn-map');
    const btnHelp = document.getElementById('btn-help');
    const btnNextQuestion = document.getElementById('btn-next-question');
    const btnResetStats = document.getElementById('btn-reset-stats');

    // --------------------------------------------------------------------------
    // SINTETIZADOR DE AUDIO (WEB AUDIO API - SIN ARCHIVOS EXTERNOS)
    // --------------------------------------------------------------------------
    let audioCtx = null;

    function initAudio() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playSound(type) {
        if (!soundEnabled) return;
        try {
            initAudio();
            if (!audioCtx) return;

            const now = audioCtx.currentTime;

            if (type === 'key') {
                // Click suave tipo teclado mecánico
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.04);
            } else if (type === 'flip') {
                // Chime al voltear cada letra
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(660, now + 0.08);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'win') {
                // Acorde de victoria ascendente (C - E - G - C5)
                const notes = [261.63, 329.63, 392.00, 523.25];
                notes.forEach((freq, idx) => {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    const noteStart = now + (idx * 0.1);
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, noteStart);
                    gain.gain.setValueAtTime(0.12, noteStart);
                    gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.25);
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start(noteStart);
                    osc.stop(noteStart + 0.25);
                });
            } else if (type === 'lose') {
                // Tono descendente cuando no se acierta
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.35);
            } else if (type === 'error') {
                // Sonido de error al intentar enviar palabra incompleta
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(160, now);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.12);
            }
        } catch (e) {
            // Silenciar errores de audio si el navegador bloquea AudioContext
        }
    }

    // --------------------------------------------------------------------------
    // GESTIÓN DE NOTIFICACIONES TOAST
    // --------------------------------------------------------------------------
    function showToast(msg, duration = 1800) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        toastContainer.appendChild(toast);

        // Forzar reflow para animación
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 250);
        }, duration);
    }

    // --------------------------------------------------------------------------
    // CARGAR Y GUARDAR ESTADO EN LOCALSTORAGE
    // --------------------------------------------------------------------------
    function loadStorage() {
        try {
            const rawStats = localStorage.getItem(STORAGE_KEY_STATS);
            if (rawStats) stats = Object.assign(stats, JSON.parse(rawStats));

            const rawSolved = localStorage.getItem(STORAGE_KEY_SOLVED);
            if (rawSolved) solvedQuestions = new Set(JSON.parse(rawSolved));

            const rawCurrent = localStorage.getItem(STORAGE_KEY_CURRENT);
            if (rawCurrent !== null) {
                const idx = parseInt(rawCurrent, 10);
                if (!isNaN(idx) && idx >= 0 && idx < SQL_QUESTIONS.length) {
                    currentQuestionIndex = idx;
                }
            }

            const rawSound = localStorage.getItem(STORAGE_KEY_SOUND);
            if (rawSound !== null) soundEnabled = rawSound === 'true';
            updateSoundIcon();
        } catch (e) {
            console.warn("No se pudo acceder a localStorage", e);
        }
    }

    function saveStorage() {
        try {
            localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
            localStorage.setItem(STORAGE_KEY_SOLVED, JSON.stringify(Array.from(solvedQuestions)));
            localStorage.setItem(STORAGE_KEY_CURRENT, currentQuestionIndex.toString());
            localStorage.setItem(STORAGE_KEY_SOUND, soundEnabled.toString());
        } catch (e) {
            console.warn("Error al guardar en localStorage", e);
        }
    }

    function updateSoundIcon() {
        if (soundEnabled) {
            soundIcon.className = "ph-bold ph-speaker-high";
            btnSound.style.color = "var(--accent-cyan)";
        } else {
            soundIcon.className = "ph-bold ph-speaker-slash";
            btnSound.style.color = "var(--text-muted)";
        }
    }

    // --------------------------------------------------------------------------
    // CONSTRUCCIÓN DEL TABLERO WORDLE DINÁMICO
    // --------------------------------------------------------------------------
    function loadQuestion(index) {
        if (index < 0 || index >= SQL_QUESTIONS.length) {
            index = 0;
        }

        currentQuestionIndex = index;
        const q = SQL_QUESTIONS[currentQuestionIndex];
        targetWord = q.palabra.toUpperCase().trim();
        wordLength = targetWord.length;

        currentRow = 0;
        currentCol = 0;
        currentGuess = "";
        isGameOver = false;
        isRowEvaluating = false;

        saveStorage();

        // 1. Actualizar Tarjeta de Desafío
        qCategory.textContent = q.categoria;
        qFocus.textContent = q.enfoque;
        qCounter.textContent = `Desafío ${currentQuestionIndex + 1} de ${SQL_QUESTIONS.length}`;
        qPrompt.textContent = q.pregunta;

        // Renderizar Código SQL con el slot interactivo
        if (q.codigoSql) {
            qCodeContainer.style.display = 'block';
            const formatted = q.codigoSql.replace(/___/g, '<span class="sql-slot">[ ??? ]</span>');
            qCodeContent.innerHTML = formatted;
        } else {
            qCodeContainer.style.display = 'none';
        }

        wordLenLabel.textContent = `Palabra clave de ${wordLength} letras`;
        hintText.textContent = q.pista;
        hintBanner.style.display = 'none';

        // 2. Construir Cuadrícula Dinámica (MAX_ATTEMPTS filas x wordLength columnas)
        board.innerHTML = '';
        board.style.gridTemplateRows = `repeat(${MAX_ATTEMPTS}, 1fr)`;

        for (let r = 0; r < MAX_ATTEMPTS; r++) {
            const row = document.createElement('div');
            row.className = 'wordle-row';
            row.id = `row-${r}`;
            row.style.gridTemplateColumns = `repeat(${wordLength}, minmax(40px, 52px))`;

            for (let c = 0; c < wordLength; c++) {
                const tile = document.createElement('div');
                tile.className = 'wordle-tile';
                tile.id = `tile-${r}-${c}`;
                tile.setAttribute('data-state', 'empty');
                row.appendChild(tile);
            }
            board.appendChild(row);
        }

        // 3. Resetear colores del teclado virtual
        resetKeyboardStyles();
    }

    function resetKeyboardStyles() {
        const keys = virtualKeyboard.querySelectorAll('.key-btn');
        keys.forEach(k => {
            k.classList.remove('correct', 'present', 'absent');
        });
    }

    // --------------------------------------------------------------------------
    // MECÁNICA DE TIPIEO Y EVALUACIÓN
    // --------------------------------------------------------------------------
    function handleKeyInput(letter) {
        if (isGameOver || isRowEvaluating) return;

        letter = letter.toUpperCase();

        if (letter === 'ENTER') {
            submitGuess();
        } else if (letter === 'BACKSPACE' || letter === 'DEL' || letter === 'DELETE') {
            deleteLetter();
        } else if (/^[A-ZÑ]$/.test(letter)) {
            addLetter(letter);
        }
    }

    function addLetter(letter) {
        if (currentCol < wordLength) {
            const tile = document.getElementById(`tile-${currentRow}-${currentCol}`);
            if (tile) {
                tile.textContent = letter;
                tile.setAttribute('data-state', 'active');
                currentGuess += letter;
                currentCol++;
                playSound('key');
            }
        }
    }

    function deleteLetter() {
        if (currentCol > 0) {
            currentCol--;
            currentGuess = currentGuess.slice(0, -1);
            const tile = document.getElementById(`tile-${currentRow}-${currentCol}`);
            if (tile) {
                tile.textContent = '';
                tile.setAttribute('data-state', 'empty');
                playSound('key');
            }
        }
    }

    function submitGuess() {
        if (currentGuess.length !== wordLength) {
            playSound('error');
            const rowEl = document.getElementById(`row-${currentRow}`);
            if (rowEl) {
                rowEl.classList.remove('shake');
                void rowEl.offsetWidth; // Forzar reinicio de animación
                rowEl.classList.add('shake');
            }
            showToast(`La palabra clave debe tener ${wordLength} letras`);
            return;
        }

        // Algoritmo Oficial de Wordle (Manejo estricto de letras duplicadas en 2 pasadas)
        isRowEvaluating = true;
        const guessLetters = currentGuess.split('');
        const targetLetters = targetWord.split('');
        const rowStates = new Array(wordLength).fill('absent');
        const letterFrequency = {};

        // 1ra pasada: Contar letras objetivo y marcar coincidencias exactas (Verde)
        for (let i = 0; i < wordLength; i++) {
            const letter = targetLetters[i];
            letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
        }

        for (let i = 0; i < wordLength; i++) {
            if (guessLetters[i] === targetLetters[i]) {
                rowStates[i] = 'correct';
                letterFrequency[guessLetters[i]]--;
            }
        }

        // 2da pasada: Marcar letras presentes en otra posición (Amarillo)
        for (let i = 0; i < wordLength; i++) {
            if (rowStates[i] !== 'correct') {
                const letter = guessLetters[i];
                if (letterFrequency[letter] && letterFrequency[letter] > 0) {
                    rowStates[i] = 'present';
                    letterFrequency[letter]--;
                }
            }
        }

        // Animar casillas con flip secuencial 3D
        const rowEl = document.getElementById(`row-${currentRow}`);
        for (let i = 0; i < wordLength; i++) {
            const tile = document.getElementById(`tile-${currentRow}-${i}`);
            const state = rowStates[i];
            const letter = guessLetters[i];

            setTimeout(() => {
                tile.classList.add('flip');
                tile.setAttribute('data-state', state);
                playSound('flip');

                // Actualizar tecla en teclado virtual
                updateVirtualKey(letter, state);

                // Al completar el volteo de la última letra de la fila
                if (i === wordLength - 1) {
                    setTimeout(() => {
                        checkRoundResult(currentGuess === targetWord);
                        isRowEvaluating = false;
                    }, 350);
                }
            }, i * 160);
        }
    }

    function updateVirtualKey(letter, state) {
        const keyBtn = virtualKeyboard.querySelector(`.key-btn[data-key="${letter}"]`);
        if (!keyBtn) return;

        // Prioridad de color: correct (verde) > present (amarillo) > absent (gris)
        if (state === 'correct') {
            keyBtn.classList.remove('present', 'absent');
            keyBtn.classList.add('correct');
        } else if (state === 'present' && !keyBtn.classList.contains('correct')) {
            keyBtn.classList.remove('absent');
            keyBtn.classList.add('present');
        } else if (state === 'absent' && !keyBtn.classList.contains('correct') && !keyBtn.classList.contains('present')) {
            keyBtn.classList.add('absent');
        }
    }

    function checkRoundResult(isSuccess) {
        if (isSuccess) {
            isGameOver = true;
            playSound('win');
            
            // Animación de rebote victorioso en la fila
            const rowEl = document.getElementById(`row-${currentRow}`);
            if (rowEl) rowEl.classList.add('bounce');

            // Registrar estadísticas
            stats.played++;
            stats.solved++;
            stats.streak++;
            if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
            solvedQuestions.add(currentQuestionIndex);
            saveStorage();

            showToast("¡Excelente deducción SQL! 🎉", 2200);

            // Reemplazar el slot de código con la respuesta en verde
            if (qCodeContent) {
                const solutionHtml = `<strong style="color: #34d399; font-weight: 900; background: rgba(16, 185, 129, 0.2); padding: 2px 8px; border-radius: 6px;">${targetWord}</strong>`;
                const fullCode = SQL_QUESTIONS[currentQuestionIndex].codigoSql.replace(/___/g, solutionHtml);
                qCodeContent.innerHTML = fullCode;
            }

            setTimeout(() => {
                openExplanationModal(true);
            }, 1200);

        } else {
            currentRow++;
            currentCol = 0;
            currentGuess = "";

            if (currentRow >= MAX_ATTEMPTS) {
                // Se agotaron los intentos
                isGameOver = true;
                playSound('lose');

                stats.played++;
                stats.streak = 0;
                saveStorage();

                showToast(`La palabra correcta era ${targetWord}`, 2800);

                setTimeout(() => {
                    openExplanationModal(false);
                }, 1400);
            }
        }
    }

    // --------------------------------------------------------------------------
    // MODAL DE EXPLICACIÓN PEDAGÓGICA (TEÓRICA & PRÁCTICA)
    // --------------------------------------------------------------------------
    function openExplanationModal(isSuccess) {
        const q = SQL_QUESTIONS[currentQuestionIndex];
        const modal = document.getElementById('explanation-modal');
        const banner = document.getElementById('modal-banner');
        const bannerIcon = document.getElementById('modal-banner-icon');
        const bannerTitle = document.getElementById('modal-banner-title');
        const solutionWord = document.getElementById('modal-solution-word');
        const conceptText = document.getElementById('modal-concept-text');
        const syntaxCode = document.getElementById('modal-syntax-code');
        const realExample = document.getElementById('modal-real-example');
        const goldenRule = document.getElementById('modal-golden-rule');

        solutionWord.textContent = targetWord;

        if (isSuccess) {
            banner.className = 'explanation-banner success';
            bannerIcon.innerHTML = '<i class="ph-bold ph-check-circle" style="font-size: 28px;"></i>';
            bannerTitle.textContent = `¡Respuesta Correcta en el Intento ${currentRow + 1}! 🎉`;
        } else {
            banner.className = 'explanation-banner failed';
            bannerIcon.innerHTML = '<i class="ph-bold ph-x-circle" style="font-size: 28px;"></i>';
            bannerTitle.textContent = "¡Fin de los intentos! Repasemos el concepto:";
        }

        conceptText.textContent = q.explicacion.concepto;
        syntaxCode.textContent = q.explicacion.sintaxis;
        realExample.textContent = q.explicacion.ejemploReal;
        goldenRule.textContent = q.explicacion.reglaOro;

        // Actualizar texto del botón "Siguiente"
        if (currentQuestionIndex + 1 < SQL_QUESTIONS.length) {
            btnNextQuestion.innerHTML = `<span>Siguiente: Desafío ${currentQuestionIndex + 2}</span> <i class="ph-bold ph-arrow-right" style="margin-left: 4px;"></i>`;
        } else {
            btnNextQuestion.innerHTML = `<span>Volver al Desafío 1</span> <i class="ph-bold ph-arrow-counter-clockwise" style="margin-left: 4px;"></i>`;
        }

        openModal('explanation-modal');
    }

    // --------------------------------------------------------------------------
    // MODAL DEL MAPA DE PREGUNTAS (CATÁLOGO)
    // --------------------------------------------------------------------------
    function renderQuestionsGrid() {
        const grid = document.getElementById('questions-grid');
        grid.innerHTML = '';

        SQL_QUESTIONS.forEach((q, idx) => {
            const card = document.createElement('div');
            const isSolved = solvedQuestions.has(idx);
            const isCurrent = idx === currentQuestionIndex;

            card.className = `question-item-card ${isCurrent ? 'current' : ''}`;
            card.innerHTML = `
                <div class="q-id">#${idx + 1} • ${q.dificultad}</div>
                <div class="q-cat" title="${q.categoria}">${q.categoria}</div>
                <div class="q-status">
                    ${isSolved ? '<span style="color: #34d399; font-weight: 800;">✓ Resuelto</span>' : '<span style="color: #64748b;">⏳ Pendiente</span>'}
                </div>
            `;

            card.addEventListener('click', () => {
                closeModal('map-modal');
                if (idx !== currentQuestionIndex) {
                    loadQuestion(idx);
                }
            });

            grid.appendChild(card);
        });
    }

    // --------------------------------------------------------------------------
    // MODAL DE ESTADÍSTICAS
    // --------------------------------------------------------------------------
    function updateStatsModal() {
        document.getElementById('stat-played').textContent = stats.played;
        document.getElementById('stat-solved').textContent = stats.solved;
        document.getElementById('stat-streak').textContent = stats.streak;
        document.getElementById('stat-max-streak').textContent = stats.maxStreak;

        const totalQ = SQL_QUESTIONS.length;
        const solvedCount = solvedQuestions.size;
        const pct = Math.round((solvedCount / totalQ) * 100);

        document.getElementById('stat-progress-bar').style.width = `${pct}%`;
        document.getElementById('stat-progress-text').textContent = `${solvedCount} de ${totalQ} desafíos completados (${pct}%)`;
    }

    // --------------------------------------------------------------------------
    // MANEJO GENERAL DE MODALES
    // --------------------------------------------------------------------------
    function openModal(modalId) {
        const m = document.getElementById(modalId);
        if (m) m.classList.add('open');
    }

    function closeModal(modalId) {
        const m = document.getElementById(modalId);
        if (m) m.classList.remove('open');
    }

    // --------------------------------------------------------------------------
    // EVENT LISTENERS Y CONFIGURACIÓN INICIAL
    // --------------------------------------------------------------------------
    function initEvents() {
        // 1. Teclado Físico
        window.addEventListener('keydown', (e) => {
            // Ignorar si hay un modal abierto o si usa teclas de control
            if (document.querySelector('.modal-overlay.open')) {
                if (e.key === 'Escape') {
                    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
                }
                return;
            }

            if (e.ctrlKey || e.altKey || e.metaKey) return;

            let key = e.key.toUpperCase();
            if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-ZÑ]$/.test(key)) {
                e.preventDefault();
                handleKeyInput(key);
            }
        });

        // 2. Teclado Virtual en Pantalla
        virtualKeyboard.addEventListener('click', (e) => {
            const btn = e.target.closest('.key-btn');
            if (!btn) return;
            const key = btn.getAttribute('data-key');
            if (key) {
                handleKeyInput(key);
            }
        });

        // 3. Botón Mostrar Pista
        btnShowHint.addEventListener('click', () => {
            if (hintBanner.style.display === 'block') {
                hintBanner.style.display = 'none';
            } else {
                hintBanner.style.display = 'block';
                playSound('key');
            }
        });

        // 4. Botón Silenciar / Sonido
        btnSound.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            updateSoundIcon();
            saveStorage();
            if (soundEnabled) playSound('key');
        });

        // 5. Botones de Modales en el Header
        btnStats.addEventListener('click', () => {
            updateStatsModal();
            openModal('stats-modal');
        });

        btnMap.addEventListener('click', () => {
            renderQuestionsGrid();
            openModal('map-modal');
        });

        btnHelp.addEventListener('click', () => {
            openModal('help-modal');
        });

        // 6. Botones para Cerrar Modales
        document.querySelectorAll('.close-modal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.getAttribute('data-modal');
                closeModal(modalId);
            });
        });

        // Cerrar modal al hacer clic en el backdrop exterior
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('open');
                }
            });
        });

        // 7. Siguiente Pregunta
        btnNextQuestion.addEventListener('click', () => {
            closeModal('explanation-modal');
            const nextIdx = (currentQuestionIndex + 1) % SQL_QUESTIONS.length;
            loadQuestion(nextIdx);
        });

        // 8. Reiniciar Estadísticas
        btnResetStats.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas reiniciar tus estadísticas y preguntas resueltas?')) {
                stats = { played: 0, solved: 0, streak: 0, maxStreak: 0 };
                solvedQuestions.clear();
                saveStorage();
                updateStatsModal();
                showToast("Estadísticas reiniciadas");
            }
        });
    }

    // Arranque de la Aplicación
    document.addEventListener('DOMContentLoaded', () => {
        loadStorage();
        loadQuestion(currentQuestionIndex);
        initEvents();
    });

})();
