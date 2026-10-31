import type { Question } from '../types/game';

export const JS_QUESTIONS: Question[] = [
  {
    id: 1,
    palabra: "CONST",
    categoria: "Variables y Alcance",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué palabra clave declara una variable de ámbito de bloque cuyo valor referencial no puede ser reasignado?",
    codigoSql: "___ PI = 3.14159;\nPI = 4; // TypeError: Assignment to constant variable",
    pista: "Abreviatura de 'Constante' en inglés (5 letras).",
    explicacion: {
      concepto: "const declara identificadores inmutables en asignación. Posee ámbito de bloque (block scope) y previene la contaminación del scope global.",
      sintaxis: "const nombre = 'valor';",
      ejemploReal: "En React y Node.js, casi todas las importaciones y funciones flecha se declaran con const.",
      reglaOro: "Por defecto usa siempre 'const'. Si necesitas reasignar la variable a lo largo del flujo, cámbiala a 'let'."
    }
  },
  {
    id: 2,
    palabra: "AWAIT",
    categoria: "Asincronía & Promesas",
    enfoque: "Práctico",
    dificultad: "Intermedio",
    pregunta: "¿Qué operador pausa la ejecución de una función asíncrona hasta que una Promesa se resuelva o rechace?",
    codigoSql: "async function obtenerDatos() {\n  const res = ___ fetch('/api/comics');\n  return ___ res.json();\n}",
    pista: "Significa 'Esperar' en inglés (5 letras). Solo se puede usar dentro de funciones marcadas con 'async'.",
    explicacion: {
      concepto: "await desempaqueta el valor resuelto de una promesa, permitiendo escribir código asíncrono que se lee como si fuera síncrono.",
      sintaxis: "const resultado = await promesa;",
      ejemploReal: "Al consultar una base de datos o API REST con fetch: const data = await response.json();",
      reglaOro: "Envuelve siempre tus llamadas con await dentro de un bloque 'try...catch' para atrapar errores de red o excepciones."
    }
  },
  {
    id: 3,
    palabra: "ASYNC",
    categoria: "Asincronía & Promesas",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué modificador antepuesto a la declaración de una función hace que esta retorne automáticamente una Promesa?",
    codigoSql: "___ function cargarPerfil(id) {\n  const user = await db.find(id);\n  return user;\n}",
    pista: "Abreviatura de 'Asynchronous' en inglés (5 letras).",
    explicacion: {
      concepto: "async transforma cualquier función para que su retorno quede envuelto en Promise.resolve(). Habilita el uso de await en su cuerpo.",
      sintaxis: "async function miFuncion() { ... }",
      ejemploReal: "En componentes o servicios de React: const fetchData = async () => { ... };",
      reglaOro: "Una función async SIEMPRE devuelve una Promesa, incluso si retornas un número o un string plano."
    }
  },
  {
    id: 4,
    palabra: "FETCH",
    categoria: "Peticiones Web & HTTP",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué API nativa del navegador y Node.js moderno se utiliza para realizar peticiones HTTP asíncronas a servidores?",
    codigoSql: "const response = await ___('https://api.github.com/users/octocat');\nconst data = await response.json();",
    pista: "Significa 'Ir a buscar' o 'Traer' en inglés (5 letras). Reemplazó al antiguo XMLHttpRequest.",
    explicacion: {
      concepto: "fetch() es la interfaz estándar para peticiones de red. Retorna una Promesa que resuelve a un objeto Response.",
      sintaxis: "fetch(url, { method: 'POST', body: JSON.stringify(data) });",
      ejemploReal: "Es la base para consumir cualquier API REST o GraphQL en React y frontend moderno.",
      reglaOro: "fetch NO rechaza la promesa ante códigos de error HTTP como 404 o 500; debes verificar siempre 'response.ok'."
    }
  },
  {
    id: 5,
    palabra: "FILTER",
    categoria: "Métodos de Arrays",
    enfoque: "Práctico",
    dificultad: "Intermedio",
    pregunta: "¿Qué método inmutable de Arrays crea un nuevo arreglo con todos los elementos que cumplan una condición booleana?",
    codigoSql: "const numeros = [10, 25, 4, 30];\nconst mayores = numeros.___(n => n >= 18); // [25, 30]",
    pista: "Significa 'Filtrar' en inglés (6 letras). Es el equivalente en JavaScript a la cláusula WHERE de SQL.",
    explicacion: {
      concepto: "filter() recorre los elementos y retiene en un nuevo array aquellos para los cuales la función callback retorna true.",
      sintaxis: "const resultado = array.filter(item => item.activo);",
      ejemploReal: "En React para borrar o filtrar elementos en el estado: setTodos(prev => prev.filter(t => t.id !== idAEliminar));",
      reglaOro: "filter() es puro e inmutable: nunca modifica el array original sobre el cual se ejecuta."
    }
  }
];
