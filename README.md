# 🗄️ DevWordle SQL: Entrenador Interactivo de Bases de Datos

Una aplicación web moderna desarrollada con **React 19 + TypeScript + Vite**, inspirada en la mecánica visual de Wordle pero diseñada como una **herramienta de aprendizaje y preparación para entrevistas técnicas de SQL y bases de datos relacionales**.

> **Enfoque Pedagógico:** No se adivina a ciegas. El juego reta al estudiante mediante desafíos conceptuales, consultas prácticas, análisis de errores de producción (debugging) y escenarios de entrevistas laborales.

---

## 🎯 1. Modalidades Diversificadas de Pregunta

En lugar de limitarse a llenar huecos de código, los desafíos se clasifican en **4 formatos didácticos**:

1. **💻 Consultas SQL Prácticas (`codigo-slot`):** Deducir la cláusula faltante en el hueco `[ ??? ]` de un script SQL real (`SELECT`, `WHERE`, `INNER`, `LIMIT`, etc.).
2. **📚 Conceptos Puros & Arquitectura (`concepto`):** Preguntas teóricas sobre arquitectura de bases de datos, propiedades ACID, esquemas y modelos relacionales acompañadas de analogías del mundo real (`ATOMIC`, `SCHEMA`, `TABLE`, `CASCADE`).
3. **🐛 Modo Debugging (`debugging`):** Fragmentos con errores de sintaxis, consultas que descartan datos por un JOIN incorrecto o comandos peligrosos sin condición, retando al usuario a escribir la palabra clave que lo soluciona (`HAVING`, `LEFT`, `UPDATE`, `ROLLBACK`).
4. **💼 Preguntas de Entrevista Técnica (`entrevista`):** Situaciones reales planteadas en entrevistas de empresas de software (diferencias entre `DELETE` y `TRUNCATE`, optimización con `INDEX`, diagnósticos con `EXPLAIN`, o consultas con `DISTINCT` y `UNION`).

---

## 🏆 2. Sistema de Niveles de Carrera

Los desafíos están organizados en 3 rangos progresivos:

* 🌱 **Junior (Nivel 1):** Fundamentos de tablas, sintaxis esencial, operaciones CRUD (`SELECT`, `FROM`, `WHERE`, `INSERT`, `VALUES`, `UPDATE`, `DELETE`, `COUNT`, `ORDER`, `LIMIT`, `LIKE`, `NULL`, `DEFAULT`).
* ⚡ **Semi-Senior / Mid (Nivel 2):** Relaciones entre tablas, tipos de uniones (`INNER` vs `LEFT JOIN`), agrupaciones (`GROUP BY`, `HAVING`), restricciones de integridad (`PRIMARY KEY`, `FOREIGN KEY`, `CHECK`), operaciones de conjuntos (`UNION`) y acciones referenciales (`CASCADE`).
* 🔥 **Senior & DBA (Nivel 3):** Principios ACID (`ATOMIC`), transacciones irrevocables (`COMMIT`, `ROLLBACK`), rendimiento y optimización con árboles B-Tree (`INDEX`), diagnóstico de planes de ejecución (`EXPLAIN`), vaciado masivo eficiente (`TRUNCATE`) y comandos destructivos (`DROP`).

---

## ⚙️ 3. Reglas y Modos de Dificultad Configurables

El usuario puede personalizar la exigencia del juego desde el botón de ajustes en la cabecera:

* 🟢 **Modo Fácil (Principiante):**
  - **6 intentos** disponibles.
  - Pista didáctica del concepto visible automáticamente.
  - **Botón de Asistencia:** Permite descartar 3 letras incorrectas del teclado con un clic.
  - Ideal para estudiantes que dan sus primeros pasos en SQL.

* 🔵 **Modo Normal (Estándar):**
  - **5 intentos** con reglas tradicionales de Wordle.
  - Pistas bajo demanda cuando las necesites.
  - El balance ideal entre desafío mental y aprendizaje.

* 🔴 **Modo Difícil (Entrevista Técnica / Hard Mode):**
  - **4 intentos** exactos.
  - **Regla Estricta:** Toda letra verde (correcta) DEBE mantenerse en la misma posición en los siguientes intentos, y toda letra amarilla DEBE incluirse en los próximos intentos.
  - Pistas bloqueadas hasta el último intento de emergencia.
  - Simula la presión y precisión de una prueba técnica en vivo.

---

## 📚 4. Recursos Didácticos Integrados

* **Explicación Profunda Post-Ronda:** Concepto fundamental, sintaxis estándar copiable al portapapeles, casos reales con ORMs modernos (Django / Node.js) y la **Regla de Oro** para evitar caídas en producción.
* **Manual Rápido Interactivo (Cheat Sheet):** Pestañas con el orden de ejecución real del motor de BD (FROM ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT ➔ ORDER BY ➔ LIMIT), sublenguajes (DDL, DML, DQL, TCL), comparativa gráfica de JOINs y decálogo de buenas prácticas.
* **Mapa de Aprendizaje y Catálogo:** Filtros combinados por Nivel (Junior, Semi-Senior, Senior), por Formato (Consultas, Conceptos, Debugging, Entrevista) y buscador dinámico.
* **Sintetizador Web Audio:** Efectos de sonido mecánicos y armónicos generados en tiempo real sin requerir archivos MP3 externos.

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

Abre en tu navegador la URL indicada en la terminal:
👉 **`http://localhost:5173`**

### Compilar para Producción
```bash
npm run build
npm run preview
```
