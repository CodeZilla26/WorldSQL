import type { Question } from '../types/game';

export const GIT_QUESTIONS: Question[] = [
  {
    id: 1,
    palabra: "COMMIT",
    categoria: "Control de Versiones",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué comando inmortaliza y guarda una instantánea fija de los cambios preparados en el repositorio local?",
    codigoSql: "git add .\ngit ___ -m \"feat: agregar soporte para autenticación JWT\"",
    pista: "Palabra inglesa de 6 letras que significa 'Confirmar' o 'Comprometer'.",
    explicacion: {
      concepto: "Un commit es una captura del árbol de archivos en un instante de tiempo, identificada por un hash criptográfico SHA-1.",
      sintaxis: "git commit -m 'mensaje claro y descriptivo'",
      ejemploReal: "Es el paso fundamental antes de enviar código al servidor central (GitHub, GitLab).",
      reglaOro: "Haz commits atómicos y pequeños, enfocados en un único cambio lógico."
    }
  },
  {
    id: 2,
    palabra: "BRANCH",
    categoria: "Ramificación",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué comando permite crear, listar o eliminar líneas de desarrollo paralelas e independientes?",
    codigoSql: "git ___ feature/login-google\ngit checkout feature/login-google",
    pista: "Significa 'Rama' en inglés (6 letras).",
    explicacion: {
      concepto: "Una rama en Git es un puntero móvil sumamente ligero hacia un commit específico.",
      sintaxis: "git branch <nombre-rama>",
      ejemploReal: "En flujos como GitFlow o GitHub Flow, cada nueva función o bug fix se desarrolla en su propia rama.",
      reglaOro: "Nunca desarrolles directamente sobre 'main' o 'master' en proyectos de equipo."
    }
  },
  {
    id: 3,
    palabra: "MERGE",
    categoria: "Integración de Ramas",
    enfoque: "Práctico",
    dificultad: "Intermedio",
    pregunta: "¿Qué comando fusiona el historial de una rama de desarrollo dentro de la rama actualmente activa?",
    codigoSql: "git checkout main\ngit ___ feature/nuevo-dashboard",
    pista: "Significa 'Fusionar' o 'Unir' en inglés (5 letras).",
    explicacion: {
      concepto: "Merge une los historiales de dos ramas creando un 'commit de fusión' o mediante un avance rápido (Fast-Forward).",
      sintaxis: "git merge <rama-origen>",
      ejemploReal: "Cuando un Pull Request es aprobado en GitHub, se realiza un merge a la rama principal.",
      reglaOro: "Asegúrate de que tus pruebas pasen antes de hacer merge a ramas de producción."
    }
  },
  {
    id: 4,
    palabra: "CLONE",
    categoria: "Repositorios Remotos",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué comando descarga y duplica un repositorio remoto completo con todo su historial en tu máquina local?",
    codigoSql: "git ___ https://github.com/usuario/mi-proyecto.git",
    pista: "Significa 'Clonar' en inglés (5 letras).",
    explicacion: {
      concepto: "git clone copia todos los archivos, ramas y commits del servidor remoto a un directorio local nuevo.",
      sintaxis: "git clone <url-repositorio>",
      ejemploReal: "Es el primer paso que realiza cualquier desarrollador al unirse a un nuevo proyecto.",
      reglaOro: "El comando clone configura automáticamente un puntero remoto llamado 'origin' que apunta al servidor fuente."
    }
  },
  {
    id: 5,
    palabra: "STASH",
    categoria: "Gestión de Cambios Temporales",
    enfoque: "Práctico",
    dificultad: "Intermedio",
    pregunta: "¿Qué comando guarda temporalmente los cambios sin commitear en una pila para que puedas cambiar de rama limpiamente?",
    codigoSql: "git ___\ngit checkout hotfix/error-critico\n# resolver error...\ngit checkout feature-anterior\ngit ___ pop",
    pista: "Significa 'Alijo' o 'Esconder' en inglés (5 letras).",
    explicacion: {
      concepto: "git stash toma el estado sucio de tu directorio de trabajo y lo almacena en una pila de cambios no terminados.",
      sintaxis: "git stash && git stash pop",
      ejemploReal: "Muy útil cuando estás en medio de una función y te piden resolver urgentemente un bug en otra rama.",
      reglaOro: "Usa 'git stash save \"mensaje\"' para recordar qué cambios guardaste en el alijo."
    }
  }
];
