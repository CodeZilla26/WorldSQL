# 🗄️ SQL Wordle: Entrenador Interactivo de Bases de Datos

Una aplicación web moderna y mobile-first desarrollada con **React 19 + TypeScript + Vite**, inspirada en la mecánica visual de Wordle y diseñada como una **herramienta de aprendizaje diario y preparación para entrevistas técnicas de SQL y bases de datos relacionales**.

> **Enfoque Pedagógico:** No se adivina a ciegas. El juego reta al estudiante mediante desafíos conceptuales, consultas prácticas, análisis de errores de producción (debugging) y escenarios de entrevistas laborales, reforzando cada acierto con **Micro-Tips de aprendizaje**.

---

## 📱 1. Experiencia Mobile-First y Cabecera Limpia

Diseñado pensando en su futura publicación en Android / Play Store:

* **Cabecera Minimalista:** Muestra el rango actual del estudiante (`🌱 Novato SQL • 120 XP`), el selector de pestaña (`Práctica` vs `🔥 Diario`), el contador de racha (`🔥 5`) y un único botón de **Menú / Ajustes (`⚙️`)**.
* **Menú Unificado (`SettingsModal`):** Centraliza el acceso al Catálogo de Preguntas, Estadísticas, Selector de Dificultad, Sonido y Vibración Háptica.
* **Vibración Háptica Táctil:** Respuestas táctiles sutiles al pulsar teclas, vibración de victoria armónica al resolver, y doble pulsación de advertencia en errores.

---

## 🎯 2. Modalidades Diversificadas de Pregunta (35 Desafíos)

En lugar de limitarse a llenar huecos de código, los desafíos se clasifican en **4 formatos didácticos**:

1. **💻 Consultas SQL Prácticas (`codigo-slot`):** Deducir la cláusula faltante en el hueco `[ ??? ]` de un script SQL real (`SELECT`, `WHERE`, `INNER`, `LIMIT`, etc.).
2. **📚 Conceptos Puros & Arquitectura (`concepto`):** Preguntas teóricas sobre arquitectura de bases de datos, propiedades ACID, esquemas y modelos relacionales acompañadas de analogías del mundo real (`ATOMIC`, `SCHEMA`, `TABLE`, `CASCADE`, `NULL`).
3. **🐛 Modo Debugging (`debugging`):** Fragmentos con errores de sintaxis, consultas que descartan datos por un JOIN incorrecto o comandos peligrosos sin condición, retando al usuario a escribir la palabra clave que lo soluciona (`HAVING`, `LEFT`, `UPDATE`, `ROLLBACK`).
4. **💼 Preguntas de Entrevista Técnica (`entrevista`):** Situaciones reales planteadas en entrevistas de empresas de software (diferencias entre `DELETE` y `TRUNCATE`, optimización con `INDEX`, diagnósticos con `EXPLAIN`, o consultas con `DISTINCT` y `UNION`).

---

## 💡 3. Micro-Tips de Aprendizaje Post-Ronda

En lugar de textos densos, al terminar cada ronda se despliega una tarjeta concisa con **3 píldoras pedagógicas de alto impacto**:

* 💡 **El Tip Clave:** Píldora directa y memorable para retener la lección en 10 segundos.
* ⚠️ **El Peligro en Producción:** El error grave o caída de servidor que este concepto previene.
* 💼 **En el Mundo Real & Entrevistas:** Por qué los reclutadores y líderes técnicos preguntan este concepto.
* 📋 **Sintaxis Rápida:** Bloque de código con botón para copiar al portapapeles.

---

## 🏆 4. Sistema de Niveles y Rangos de Experiencia (XP)

* **Puntos de Experiencia (XP):**
  - Acertar al 1er intento: `+100 XP`
  - Acertar al 2do intento: `+80 XP`
  - Acertar al 3er intento: `+60 XP`
  - Acertar al 4to intento: `+40 XP`
  - Acertar al 5to o 6to intento: `+25 XP`
  - Bonus en Desafío Diario: `+40 XP`

* **Rangos de Estudiante de SQL:**
  - 🌱 **Nivel 1:** *Novato SQL* (0 - 200 XP)
  - 🔍 **Nivel 2:** *Consultor Junior* (200 - 500 XP)
  - ⚡ **Nivel 3:** *Filtrador Hábil* (500 - 900 XP)
  - 🏛️ **Nivel 4:** *Modelador de Tablas* (900 - 1500 XP)
  - 💎 **Nivel 5:** *Dominador de SQL* (1500+ XP)

---

## 🔥 5. El Desafío Diario (Daily SQL Challenge)

* Una palabra clave fija por fecha (`YYYY-MM-DD`) compartida por todos los jugadores.
* Resolver el reto del día incrementa y mantiene viva tu **Racha Diaria (🔥)**.
* Si omites un día, la racha se reinicia.

---

## ⚙️ 6. Modos de Dificultad (Active Recall)

Configurables en cualquier momento desde el menú de ajustes:

* 🟢 **Modo Fácil:** 6 intentos disponibles y pistas siempre abiertas.
* 🔵 **Modo Normal:** 5 intentos clásicos. La pista requiere al menos 1 intento fallido para incentivar que el estudiante piense antes de pedir ayuda.
* 🔴 **Modo Difícil (Hard Mode):** 4 intentos y **regla estricta de Wordle** (toda letra verde o amarilla descubierta debe reutilizarse obligatoriamente en el siguiente intento). Pistas bloqueadas hasta el último intento.

---

## 🚀 Cómo Ejecutar el Proyecto

```bash
# 1. Acceder al directorio
cd C:\Users\Lenovo\Documents\PROYECTOS\sql_wordle

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor Vite con Hot Module Replacement (HMR)
npm run dev
```

Abre en tu navegador o dispositivo móvil en la misma red:
👉 **`http://localhost:5173`**
