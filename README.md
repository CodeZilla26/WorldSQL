# 🗄️ DevWordle: Aprende SQL & Desarrollo de Software Jugando

Una aplicación interactiva moderna construida con **React 19 + TypeScript + Vite**, inspirada en la dinámica visual de Wordle pero transformada en un **entrenador didáctico de programación (teórico y práctico)**.

> **Enfoque Pedagógico:** No se adivina a ciegas. Cada ronda presenta un desafío conceptual y un fragmento de código real con una casilla a completar (`[ ??? ]`), permitiendo dominar la sintaxis y buenas prácticas de la industria.

---

## ✨ Características Principales

1. **Rutas Multi-Tema Escalables (Arquitectura Abierta):**
   - 🐬 **SQL & Bases de Datos Relacionales:** 30 desafíos detallados basados en el manual definitivo (`SQL.md`), cubriendo DML, DDL, DQL, TCL, JOINs (`INNER` y `LEFT`), Agrupaciones (`GROUP BY`, `HAVING`), Restricciones (`PRIMARY KEY`, `FOREIGN KEY`, `CHECK`, `DEFAULT`), Transacciones (`COMMIT`, `ROLLBACK`) e Índices (`INDEX`).
   - ⚡ **JavaScript Moderno:** Desafíos iniciales (`CONST`, `AWAIT`, `ASYNC`, `FETCH`, `FILTER`).
   - 🌿 **Git & Version Control:** Desafíos iniciales (`COMMIT`, `BRANCH`, `MERGE`, `CLONE`, `STASH`).

2. **Cuadrícula Dinámica por Longitud de Palabra:**
   - La cuadrícula y el teclado se adaptan de forma reactiva al tamaño de cada comando (de 4 a 8 casillas).

3. **Explicación Profunda Post-Ronda:**
   - **Concepto Fundamental:** Explicación teórica precisa.
   - **Sintaxis Estándar:** Bloque de código con botón para copiar al portapapeles.
   - **En el Mundo Real:** Integración con frameworks y ORMs modernos (Django, Node.js, Spring).
   - **Regla de Oro:** Advertencias cruciales para no cometer errores en entornos de producción.

4. **Sintetizador de Audio Nativo (Web Audio API):**
   - Click mecánico al teclear, chime armónico al voltear cada letra, acorde de victoria y sonido de alerta de error, sin archivos MP3 externos.

5. **Guía Rápida de SQL Integrada (Cheat Sheet):**
   - Pestañas interactivas con el orden de ejecución real del motor de base de datos, mapa de sublenguajes (DDL, DML, DQL, TCL), comparativa gráfica de JOINs y decálogo de buenas prácticas.

6. **100% Responsivo:**
   - Diseñado y optimizado para pantallas táctiles de móviles (320px - 480px), tablets y escritorios de alta resolución.

7. **Estadísticas y Persistencia:**
   - Guarda tu progreso, rachas, distribución de intentos y desafíos completados de forma persistente en `localStorage`.

---

## 🚀 Cómo Ejecutar el Proyecto

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (v18+).

```bash
# 1. Entrar al directorio
cd C:\Users\Lenovo\Documents\PROYECTOS\sql_wordle

# 2. Instalar dependencias (si no se han instalado)
npm install

# 3. Iniciar el servidor de desarrollo Vite con HMR
npm run dev
```

Abre en tu navegador la URL que muestra la terminal (usualmente `http://localhost:5173`).

### Generar Build de Producción
```bash
npm run build
npm run preview
```

---

## 📁 Estructura del Código

```text
src/
├── types/
│   └── game.ts               # Interfaces TypeScript (Question, Topic, Stats, etc.)
├── data/
│   ├── topics.ts             # Registro central de temas y tecnologías
│   ├── sqlQuestions.ts       # 30 desafíos detallados de SQL (basados en SQL.md)
│   ├── jsQuestions.ts        # Desafíos de JavaScript
│   └── gitQuestions.ts       # Desafíos de Git
├── hooks/
│   ├── useGameState.ts       # Máquina de estados Wordle, validaciones y confeti
│   ├── useAudio.ts           # Control de sonido y efectos reactivos
│   └── useLocalStorage.ts    # Persistencia local reactiva
├── components/
│   ├── Header.tsx            # Barra superior con selector de tema y accesos rápidos
│   ├── QuestionCard.tsx      # Tarjeta con código SQL y slot [ ??? ]
│   ├── WordleBoard.tsx       # Cuadrícula dinámica con animación 3D de volteo
│   ├── Keyboard.tsx          # Teclado en pantalla táctil con colores en tiempo real
│   ├── Toast.tsx             # Alertas flotantes
│   └── Modals/
│       ├── ExplanationModal.tsx  # Análisis pedagógico post-partida
│       ├── CatalogModal.tsx      # Mapa de aprendizaje con buscador y filtros
│       ├── StatsModal.tsx        # Métricas del estudiante y distribución
│       ├── CheatSheetModal.tsx   # Manual de SQL extraído de SQL.md
│       ├── TopicSelectModal.tsx  # Switcher de temas (SQL, JS, Git)
│       └── HelpModal.tsx         # Guía de juego y colores
├── utils/
│   ├── wordEvaluator.ts      # Algoritmo de evaluación Wordle con conteo de duplicados
│   └── soundSynth.ts         # Sintetizador nativo con osciladores Web Audio
├── App.tsx                   # Coordinador principal de la app
├── App.css                   # Estilos responsivos y animaciones
├── index.css                 # Variables de diseño y tema oscuro
└── main.tsx                  # Entrada de React 19
```

---

## ➕ Cómo Agregar Nuevos Temas o Preguntas

Para agregar un nuevo tema (por ejemplo, **Python** o **React**):

1. Crea un archivo en `src/data/<tema>Questions.ts` exportando tu arreglo de `Question[]`.
2. En `src/data/topics.ts`, importa el arreglo y agrégalo a la lista `TOPICS`.
3. ¡Listo! El selector de temas, el teclado, el mapa de desafíos y las estadísticas funcionarán automáticamente para esa nueva materia.
