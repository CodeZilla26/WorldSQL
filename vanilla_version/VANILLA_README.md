# 🗄️ SQL Wordle: Aprende SQL Jugando (Teórico y Práctico)

Una aplicación web interactiva construida en **HTML5, CSS3 moderno y Vanilla JavaScript** inspirada en las mecánicas visuales de Wordle, pero adaptada con un **enfoque 100% pedagógico** para dominar los fundamentos y consultas de **Bases de Datos Relacionales y SQL**.

---

## 🎯 ¿Por qué es diferente al Wordle tradicional?

1. **Sin adivinanzas a ciegas:**
   En el Wordle tradicional ingresas palabras al azar. Aquí **cada ronda te presenta una pregunta teórica o un desafío práctico con código SQL real** donde debes deducir y escribir la palabra clave correcta (`SELECT`, `WHERE`, `JOIN`, `UPDATE`, etc.).

2. **Cuadrícula dinámica por longitud de palabra:**
   Las palabras clave de SQL no tienen todas 5 letras:
   - 4 letras: `FROM`, `JOIN`, `LEFT`, `DROP`, `LIKE`
   - 5 letras: `WHERE`, `ORDER`, `LIMIT`, `GROUP`, `TABLE`, `ALTER`, `UNION`
   - 6 letras: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `VALUES`, `HAVING`, `COMMIT`
   La cuadrícula se adapta automáticamente al tamaño exacto de la palabra de cada desafío.

3. **Retroalimentación Didáctica Post-Ronda:**
   Al acertar o agotar tus 5 intentos, se abre un **Panel de Explicación Profunda** con:
   - **Concepto Fundamental:** Qué significa y para qué se usa.
   - **Sintaxis Estándar:** La estructura SQL correcta.
   - **En el Mundo Real:** Casos reales y conexión con el proyecto Comic Tracker / Django ORM.
   - **Regla de Oro:** Buenas prácticas y advertencias para evitar errores de producción.

4. **Sintetizador de Audio Nativo:**
   Efectos de sonido (click mecánico, volteo de letra, acorde de victoria, tono de error) generados en tiempo real mediante la **Web Audio API** del navegador (sin descargar archivos MP3 ni depender de librerías pesadas).

5. **Catálogo de 22 Desafíos y Estadísticas:**
   - Selector visual de temas para saltar a cualquier pregunta o seguir la ruta de estudio.
   - Contador de rachas, porcentaje de aciertos y guardado persistente en `localStorage`.

---

## 🚀 ¿Cómo abrir y jugar?

No necesitas instalar dependencias, Node.js ni configurar servidores:

### Opción A (La más rápida - Directo en el Navegador)
Simplemente haz doble clic en el archivo [`index.html`](index.html) o ábrelo arrastrándolo a cualquier navegador web moderno (Chrome, Edge, Firefox, Brave, Safari).

### Opción B (Con servidor local de Python)
Si deseas servirlo localmente por HTTP:
```powershell
cd sql_wordle
python -m http.server 3000
```
Y abre en tu navegador: `http://localhost:3000`

---

## 📚 Temario Cubierto en los 22 Desafíos

| # | Categoría | Palabra Clave | Enfoque |
|---|---|---|---|
| 1 | Consultas DML | `SELECT` | Práctico (Extracción de columnas) |
| 2 | Consultas DML | `FROM` | Práctico (Tabla de origen) |
| 3 | Filtrado de Datos | `WHERE` | Práctico (Condiciones lógicas) |
| 4 | Ordenamiento | `ORDER` | Práctico (`ORDER BY` asc/desc) |
| 5 | Paginación y Filtro | `LIMIT` | Práctico (Restricción de filas) |
| 6 | Relaciones N:M y 1:N | `JOIN` | Teórico/Práctico (Fusión de tablas) |
| 7 | Funciones de Agregación | `COUNT` | Práctico (Conteo de registros) |
| 8 | Agrupación de Datos | `GROUP` | Práctico (`GROUP BY` y agregaciones) |
| 9 | Comandos DML | `INSERT` | Teórico/Práctico (Nuevos registros) |
| 10 | Comandos DML | `UPDATE` | Práctico (Modificación de columnas) |
| 11 | Comandos DML | `DELETE` | Teórico/Práctico (Remover filas) |
| 12 | Tipos de JOIN | `INNER` | Teórico/Práctico (Coincidencia exacta) |
| 13 | Tipos de JOIN | `LEFT` | Teórico/Práctico (Registros sin coincidencia) |
| 14 | Operadores de Búsqueda | `LIKE` | Práctico (Búsqueda con `%` y `_`) |
| 15 | Comandos DML | `VALUES` | Práctico (Datos literales a insertar) |
| 16 | Comandos DDL | `ALTER` | Teórico/Práctico (Modificar estructura) |
| 17 | Comandos DDL | `DROP` | Teórico (Eliminación destructiva) |
| 18 | Comandos DDL | `CREATE` | Teórico/Práctico (Creación de tablas) |
| 19 | Conceptos Fundamentales | `TABLE` | Teórico (Objeto relacional por excelencia) |
| 20 | Transacciones ACID | `COMMIT` | Teórico/Práctico (Guardado definitivo en disco) |
| 21 | Agrupación Avanzada | `HAVING` | Teórico/Práctico (Filtro post-agrupación) |
| 22 | Operadores de Conjuntos | `UNION` | Teórico/Práctico (Combinación de consultas) |

---

## 🎨 Paleta de Colores de Wordle

- 🟩 **Verde (`#10b981`):** Letra correcta en la posición exacta.
- 🟨 **Amarillo (`#f59e0b`):** Letra presente en la palabra clave pero en otra casilla.
- ⬛ **Gris (`#334155`):** Letra que no pertenece a la palabra clave.
