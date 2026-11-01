import type { Question } from '../types/game';

export const SQL_QUESTIONS: Question[] = [
  // =========================================================================
  // NIVEL 1: JUNIOR (Fundamentos, Sintaxis Básica y Operaciones CRUD)
  // =========================================================================
  {
    id: 1,
    palabra: "SELECT",
    tipo: "codigo-slot",
    nivel: "Junior",
    categoria: "Consultas DML / DQL",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué instrucción fundamental de SQL se utiliza para consultar y proyectar columnas de datos desde una tabla?",
    codigoSql: "___ nombre, anio, tipo \nFROM movies_obra \nWHERE anio >= 2020;",
    pista: "Es el comando más usado en SQL. En español significa 'Seleccionar'.",
    explicacion: {
      concepto: "La sentencia SELECT es el corazón de las consultas de lectura en SQL. Permite especificar exactamente qué columnas deseas obtener, o usar un asterisco (*) para traer todas las columnas.",
      sintaxis: "SELECT columna1, columna2 FROM nombre_tabla WHERE condicion;",
      ejemploReal: "En proyectos con Django ORM, Comic.objects.all() envía internamente un: SELECT id, nombre, capitulo FROM comics_comic;",
      reglaOro: "Selecciona únicamente las columnas que realmente necesitas para mejorar el rendimiento y ahorrar memoria en el servidor."
    }
  },
  {
    id: 2,
    palabra: "FROM",
    tipo: "codigo-slot",
    nivel: "Junior",
    categoria: "Consultas DML / DQL",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué cláusula obligatoria acompaña a SELECT para indicar de qué tabla específica se van a extraer los registros?",
    codigoSql: "SELECT titulo, anio \n___ movies_obra \nWHERE tipo = 'PELICULA';",
    pista: "Palabra inglesa de 4 letras que indica procedencia u origen ('desde' o 'de').",
    explicacion: {
      concepto: "La cláusula FROM le dice al motor de base de datos en qué tabla residen los campos solicitados. Sin ella, el motor no sabe dónde buscar.",
      sintaxis: "SELECT columnas FROM tabla_origen;",
      ejemploReal: "SELECT al.nombre, al.anio FROM music_album al;",
      reglaOro: "Puedes asignarle un alias corto a la tabla en el FROM (ej: FROM music_album AS al) para escribir consultas más limpias y legibles."
    }
  },
  {
    id: 3,
    palabra: "WHERE",
    tipo: "codigo-slot",
    nivel: "Junior",
    categoria: "Filtrado de Datos",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué cláusula se utiliza para condicionar y filtrar qué filas específicas deben cumplir la consulta antes de devolverlas?",
    codigoSql: "SELECT * \nFROM comics_comic \n___ estado = 'EN_CURSO' AND capitulo > 50;",
    pista: "Significa 'Dónde' en inglés (5 letras). Es indispensable para no traer datos de más.",
    explicacion: {
      concepto: "WHERE evalúa una expresión lógica fila por fila. Si la condición resulta verdadera (TRUE), la fila se incluye en el resultado; si es falsa o nula, se descarta.",
      sintaxis: "SELECT * FROM tabla WHERE columna = valor AND otra_columna > 10;",
      ejemploReal: "En Django: Comic.objects.filter(estado='EN_CURSO') genera: SELECT * FROM comics_comic WHERE estado = 'EN_CURSO';",
      reglaOro: "¡Cuidado vital! Siempre usa WHERE al ejecutar un UPDATE o DELETE. Si lo olvidas, modificarás o borrarás TODAS las filas de la tabla."
    }
  },
  {
    id: 4,
    palabra: "TABLE",
    tipo: "concepto",
    nivel: "Junior",
    categoria: "Arquitectura Relacional",
    enfoque: "Teórico",
    dificultad: "Básico",
    pregunta: "¿Cómo se llama en SQL el objeto contenedor fundamental estructurado en filas y columnas donde se almacena la información de una entidad?",
    analogia: "Piensa en un archivero con carpetas organizadas en una cuadrícula de filas (registros) y columnas (campos).",
    pista: "Significa 'Tabla' en inglés (5 letras). Se declara al crear o modificar entidades con CREATE o ALTER.",
    explicacion: {
      concepto: "Una tabla representa una entidad del mundo real (ej: Usuarios, Facturas, Productos). Las columnas definen sus atributos tipados y las filas son las instancias concretas guardadas.",
      sintaxis: "CREATE TABLE nombre_tabla (id INT PRIMARY KEY, nombre VARCHAR(100));",
      ejemploReal: "Cada modelo de backend (Django, Prisma, TypeORM) se almacena físicamente como una tabla independiente dentro de la base de datos.",
      reglaOro: "Nombrar las tablas en minúsculas y en plural o singular consistente evita problemas de compatibilidad entre sistemas operativos Linux y Windows."
    }
  },
  {
    id: 5,
    palabra: "INSERT",
    tipo: "codigo-slot",
    nivel: "Junior",
    categoria: "Comandos DML",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué comando del lenguaje DML se utiliza para agregar nuevas filas de datos dentro de una tabla existente?",
    codigoSql: "___ INTO comics_comic (nombre, tipo, capitulo, estado) \nVALUES ('Solo Leveling', 'MANHWA', 1, 'EN_CURSO');",
    pista: "Significa 'Insertar' en inglés (6 letras). Es la 'C' (Create) de las operaciones CRUD.",
    explicacion: {
      concepto: "INSERT INTO agrega una tupla (fila) a la tabla. Requiere especificar la tabla de destino y la lista de valores ordenados a asignar en cada columna.",
      sintaxis: "INSERT INTO tabla (columna1, columna2) VALUES (valor1, valor2);",
      ejemploReal: "Cuando el usuario envía un formulario de registro y el backend guarda el nuevo perfil, se ejecuta un INSERT INTO en el motor.",
      reglaOro: "Si una columna tiene AUTO_INCREMENT (como el 'id'), no es necesario incluirla en el INSERT; el motor le asigna el valor secuencial automáticamente."
    }
  },
  {
    id: 6,
    palabra: "VALUES",
    tipo: "codigo-slot",
    nivel: "Junior",
    categoria: "Comandos DML",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué palabra clave precede a la lista de datos literales que se van a insertar en una instrucción INSERT INTO?",
    codigoSql: "INSERT INTO music_artista (nombre, notas) \n___ ('Queen', 'Banda británica legendaria');",
    pista: "Significa 'Valores' en inglés (6 letras). Va siempre seguido de paréntesis con los datos concretos.",
    explicacion: {
      concepto: "VALUES especifica el contenido concreto que ocupará cada columna declarada en el INSERT. Deben coincidir en cantidad, orden y tipo de dato.",
      sintaxis: "INSERT INTO tabla (col1, col2) VALUES ('texto', 123);",
      ejemploReal: "Muchos motores permiten inserciones por lote en un solo comando: INSERT INTO tabla (col) VALUES ('A'), ('B'), ('C'); ahorrando conexiones de red.",
      reglaOro: "Envuelve siempre las cadenas de texto y fechas entre comillas simples ('2026-01-01'), mientras que los números se escriben sin comillas."
    }
  },
  {
    id: 7,
    palabra: "UPDATE",
    tipo: "debugging",
    nivel: "Junior",
    categoria: "Seguridad y DML",
    enfoque: "Teórico y Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué comando DML se está ejecutando en este código que, por olvidar una cláusula condicional, cambiaría el saldo de TODOS los usuarios de la base de datos?",
    codigoErroneo: "-- ¡ALERTA DE PRODUCCIÓN! Falta la cláusula WHERE:\n___ usuarios \nSET saldo = 0;\n-- Todos los clientes acaban de perder su dinero",
    pista: "Significa 'Actualizar' o 'Modificar' en inglés (6 letras). Modifica columnas en filas existentes.",
    explicacion: {
      concepto: "UPDATE localiza las filas indicadas en el WHERE y sobreescribe los valores de las columnas especificadas en la cláusula SET.",
      sintaxis: "UPDATE tabla SET columna1 = nuevo_valor WHERE condicion;",
      ejemploReal: "Cuando el usuario presiona el botón '+1 Capítulo' en una app, el backend ejecuta un UPDATE para incrementar el contador.",
      reglaOro: "¡Regla número 1 de los administradores de BD! NUNCA ejecutes un UPDATE sin la cláusula WHERE a menos que tu intención real sea alterar toda la tabla."
    }
  },
  {
    id: 8,
    palabra: "DELETE",
    tipo: "entrevista",
    nivel: "Junior",
    categoria: "Preguntas de Entrevista",
    enfoque: "Teórico",
    dificultad: "Básico",
    pregunta: "En una entrevista técnica: ¿Qué comando DML borra registros individuales bajo una condición lógica, preservando intacta la estructura de la tabla y permitiendo deshacer cambios con ROLLBACK?",
    escenario: "El entrevistador pregunta: 'Si quieres vaciar registros pero necesitas que la operación sea registrada en el log de transacciones y respete transacciones, ¿cuál comando DML usas?'",
    pista: "Significa 'Borrar' o 'Eliminar' en inglés (6 letras). Va acompañado de FROM y WHERE.",
    explicacion: {
      concepto: "DELETE FROM borra registros individuales o grupos de registros que coincidan con el WHERE. A diferencia de DROP (que destruye la tabla), DELETE solo remueve tuplas de datos.",
      sintaxis: "DELETE FROM nombre_tabla WHERE condicion;",
      ejemploReal: "Cuando borras un producto en un panel de administración, el backend ejecuta: DELETE FROM productos WHERE id = %s;",
      reglaOro: "DELETE borra fila por fila y escribe en el log de transacciones; para vaciar tablas gigantes en segundos de forma no recuperable se usa TRUNCATE."
    }
  },
  {
    id: 9,
    palabra: "COUNT",
    tipo: "codigo-slot",
    nivel: "Junior",
    categoria: "Funciones de Agregación",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué función matemática de agregación calcula y retorna el número total de filas que cumplen una condición?",
    codigoSql: "SELECT ___(*) AS total_series \nFROM movies_obra \nWHERE tipo = 'SERIE';",
    pista: "En inglés significa 'Contar' (5 letras). Recibe comúnmente (*) o el nombre de una columna entre paréntesis.",
    explicacion: {
      concepto: "COUNT() cuenta filas. COUNT(*) cuenta todas las filas devueltas (incluso con nulos), mientras que COUNT(columna) cuenta solo las filas donde esa columna NO sea NULL.",
      sintaxis: "SELECT COUNT(*) FROM usuarios WHERE activo = 1;",
      ejemploReal: "En el dashboard de métricas, MovieModel.objects.count() se traduce directamente a: SELECT COUNT(*) FROM movies_obra;",
      reglaOro: "Combina COUNT con GROUP BY para saber cuántos elementos tiene cada categoría (ej: cuántos libros tiene cada autor)."
    }
  },
  {
    id: 10,
    palabra: "ORDER",
    tipo: "codigo-slot",
    nivel: "Junior",
    categoria: "Ordenamiento",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué palabra clave se usa junto con 'BY' para ordenar las filas resultantes de forma ascendente o descendente?",
    codigoSql: "SELECT nombre, anio \nFROM movies_obra \n___ BY anio DESC, nombre ASC;",
    pista: "Significa 'Ordenar' en inglés (5 letras). Va siempre seguido de 'BY'.",
    explicacion: {
      concepto: "ORDER BY reorganiza el conjunto de resultados. Por defecto ordena de menor a mayor (ASC), pero puedes usar DESC para ordenar de mayor a menor.",
      sintaxis: "SELECT * FROM tabla ORDER BY fecha_creacion DESC;",
      ejemploReal: "En Django ORM: ActorModel.objects.order_by('nombre') genera en SQL: SELECT * FROM movies_actor ORDER BY nombre ASC;",
      reglaOro: "Las bases de datos relacionales NO garantizan ningún orden predeterminado en el disco físico. Si necesitas ver los datos ordenados, SIEMPRE debes usar ORDER BY."
    }
  },
  {
    id: 11,
    palabra: "LIMIT",
    tipo: "codigo-slot",
    nivel: "Junior",
    categoria: "Paginación y Filtro",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué cláusula restringe la cantidad máxima de registros devueltos por la consulta (ideal para paginación o tops)?",
    codigoSql: "SELECT nombre, anio \nFROM movies_obra \nORDER BY anio DESC \n___ 5;",
    pista: "Término en inglés de 5 letras que define una frontera o tope numérico.",
    explicacion: {
      concepto: "LIMIT indica al motor que detenga la lectura apenas haya reunido el número de filas indicado. Acompañado de OFFSET, permite paginar resultados.",
      sintaxis: "SELECT * FROM tabla LIMIT 10 OFFSET 20; -- Página 3 de 10 elementos",
      ejemploReal: "Al consultar los 10 productos más vendidos en una tienda online: ORDER BY ventas DESC LIMIT 10;",
      reglaOro: "LIMIT es altamente eficiente porque evita que el motor recorra millones de filas en memoria cuando solo quieres mostrar los primeros resultados."
    }
  },
  {
    id: 12,
    palabra: "LIKE",
    tipo: "codigo-slot",
    nivel: "Junior",
    categoria: "Operadores de Búsqueda",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué operador de comparación se utiliza en el WHERE para realizar búsquedas aproximadas de texto con comodines como '%' o '_'?",
    codigoSql: "SELECT * \nFROM movies_obra \nWHERE nombre ___ '%matrix%' OR sinopsis ___ '%futuro%';",
    pista: "Significa 'Como' o 'Similar a' en inglés (4 letras).",
    explicacion: {
      concepto: "LIKE compara cadenas mediante patrones. El comodín '%' representa cualquier número de caracteres (cero o más), mientras que '_' representa exactamente un solo carácter.",
      sintaxis: "SELECT * FROM usuarios WHERE email LIKE '%@gmail.com';",
      ejemploReal: "En Django ORM, Comic.objects.filter(nombre__icontains='piece') se traduce a SQL como: WHERE nombre LIKE '%piece%';",
      reglaOro: "Colocar un comodín al inicio de la palabra ('%texto') impide que el motor use índices de texto tradicionales (B-Tree)."
    }
  },
  {
    id: 13,
    palabra: "NULL",
    tipo: "concepto",
    nivel: "Junior",
    categoria: "Tipos de Datos y Lógica Tri-Valuada",
    enfoque: "Teórico",
    dificultad: "Básico",
    pregunta: "¿Qué palabra de 4 letras representa en SQL la ausencia de valor, un dato desconocido o no asignado (y que nunca debe compararse con '=')?",
    analogia: "Un espacio en blanco en un formulario donde la persona decidió no indicar su número de teléfono.",
    pista: "Palabra universal en programación de 4 letras. Para comprobarlo en SQL se usa 'IS ___' o 'IS NOT ___'.",
    explicacion: {
      concepto: "NULL representa un estado de 'dato desconocido'. No es cero ni es una cadena vacía. Por eso, NULL = NULL devuelve UNKNOWN en lugar de TRUE.",
      sintaxis: "SELECT * FROM usuarios WHERE telefono IS NULL;",
      ejemploReal: "Una columna 'fecha_entrega' en una tabla de pedidos permanece en NULL hasta que el transportista entrega el paquete.",
      reglaOro: "¡Error de novato número 1! Jamás escribas 'WHERE columna = NULL'. En SQL la sintaxis correcta siempre es 'WHERE columna IS NULL'."
    }
  },
  {
    id: 14,
    palabra: "DEFAULT",
    tipo: "codigo-slot",
    nivel: "Junior",
    categoria: "Estructura y Restricciones",
    enfoque: "Práctico",
    dificultad: "Básico",
    pregunta: "¿Qué palabra clave se utiliza en la definición de una columna para asignarle un valor predeterminado si no se especifica uno?",
    codigoSql: "CREATE TABLE usuarios ( \n    id INT PRIMARY KEY, \n    activo BOOLEAN ___ TRUE, \n    rol VARCHAR(20) ___ 'CLIENTE' \n);",
    pista: "Significa 'Por defecto' o 'Predeterminado' en inglés (7 letras).",
    explicacion: {
      concepto: "DEFAULT asigna un valor estático o una función (como CURRENT_TIMESTAMP) a la columna cuando un INSERT omite ese campo.",
      sintaxis: "columna tipo DEFAULT valor_predeterminado;",
      ejemploReal: "creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP;",
      reglaOro: "Usar valores DEFAULT previene que tus columnas queden pobladas de valores NULL innecesarios y simplifica las sentencias INSERT."
    }
  },

  // =========================================================================
  // NIVEL 2: SEMI-SENIOR (Relaciones, Agrupaciones, Integridad y Normalización)
  // =========================================================================
  {
    id: 15,
    palabra: "JOIN",
    tipo: "concepto",
    nivel: "Semi-Senior",
    categoria: "Relaciones N:M y 1:N",
    enfoque: "Teórico y Práctico",
    dificultad: "Intermedio",
    pregunta: "¿Qué cláusula fundamental permite 'fusionar' o cruzar filas de dos o más tablas basándose en una columna en común?",
    analogia: "Como unir dos mitades de un rompecabezas usando el número de factura como punto de encaje.",
    pista: "Significa 'Unir' en inglés (4 letras). Es la esencia misma de las Bases de Datos Relacionales.",
    explicacion: {
      concepto: "Las bases de datos relacionales normalizan los datos para evitar duplicados. El comando JOIN reconstruye la información uniéndola a través de Claves Foráneas (FK) y Claves Primarias (PK).",
      sintaxis: "SELECT * FROM TablaA JOIN TablaB ON TablaA.id = TablaB.tabla_a_id;",
      ejemploReal: "Para listar pedidos con el nombre del cliente: FROM pedidos p INNER JOIN clientes c ON p.cliente_id = c.id;",
      reglaOro: "Siempre debes especificar la condición de enlace con 'ON'. Si haces un JOIN sin condición ON, generarás un 'Producto Cartesiano' que multiplicará todas las filas por todas."
    }
  },
  {
    id: 16,
    palabra: "INNER",
    tipo: "codigo-slot",
    nivel: "Semi-Senior",
    categoria: "Tipos de JOIN",
    enfoque: "Práctico",
    dificultad: "Intermedio",
    pregunta: "¿Qué tipo de unión devuelve exclusivamente las filas que tienen coincidencia exacta tanto en la tabla izquierda como en la derecha?",
    codigoSql: "SELECT o.nombre, a.nombre \nFROM movies_obra o \n___ JOIN movies_reparto r ON o.id = r.obra_id \n___ JOIN movies_actor a ON r.actor_id = a.id;",
    pista: "Significa 'Interno' en inglés (5 letras). Representa la intersección matemática (A ∩ B).",
    explicacion: {
      concepto: "INNER JOIN es la intersección matemática pura. Si un álbum no tiene artista asignado, o un artista no tiene álbumes, quedarán descartados del resultado.",
      sintaxis: "SELECT * FROM TablaA INNER JOIN TablaB ON TablaA.id = TablaB.a_id;",
      ejemploReal: "SELECT * FROM music_album INNER JOIN music_artista ON music_album.artista_id = music_artista.id;",
      reglaOro: "Es el JOIN más rápido de todos porque el optimizador de la BD descarta de inmediato los registros que no cumplan la clave foránea."
    }
  },
  {
    id: 17,
    palabra: "LEFT",
    tipo: "debugging",
    nivel: "Semi-Senior",
    categoria: "Tipos de JOIN & Debugging",
    enfoque: "Práctico",
    dificultad: "Intermedio",
    pregunta: "Este reporte oculta a los clientes recién registrados que aún no han hecho compras. ¿Qué tipo de JOIN debes usar en lugar de INNER para conservar a TODOS los clientes?",
    codigoErroneo: "-- ERROR: Los clientes sin compras desaparecen del reporte:\nSELECT c.nombre, COUNT(p.id) AS total_compras\nFROM clientes c\n___ JOIN pedidos p ON c.id = p.cliente_id\nGROUP BY c.id, c.nombre;",
    pista: "Significa 'Izquierda' en inglés (4 letras). Conserva el 100% de la tabla declarada en el FROM rellenando con NULL.",
    explicacion: {
      concepto: "LEFT JOIN (o LEFT OUTER JOIN) toma el 100% de los registros de la primera tabla (la izquierda), y si no encuentra coincidencia en la derecha, rellena sus campos con NULL.",
      sintaxis: "SELECT * FROM Clientes c LEFT JOIN Pedidos p ON c.id = p.cliente_id;",
      ejemploReal: "Si un cliente no ha comprado nada, con INNER JOIN se elimina; con LEFT JOIN sí aparece en pantalla con 0 compras.",
      reglaOro: "Es la herramienta perfecta para encontrar datos ausentes o huérfanos: 'WHERE pedidos.id IS NULL'."
    }
  },
  {
    id: 18,
    palabra: "GROUP",
    tipo: "debugging",
    nivel: "Semi-Senior",
    categoria: "Agrupación de Datos",
    enfoque: "Práctico",
    dificultad: "Intermedio",
    pregunta: "Esta consulta lanza un error de sintaxis porque intenta proyectar columnas individuales junto a un COUNT(*) sin indicar el agrupamiento. ¿Qué palabra falta junto a 'BY'?",
    codigoErroneo: "-- ERROR en SQL: 'column c.nombre must appear in the GROUP BY clause'\nSELECT c.nombre, COUNT(p.id)\nFROM clientes c\nINNER JOIN pedidos p ON c.id = p.cliente_id\n___ BY c.nombre;",
    pista: "Significa 'Grupo' o 'Agrupar' en inglés (5 letras). Va siempre seguido de 'BY'.",
    explicacion: {
      concepto: "GROUP BY divide el conjunto de datos en subgrupos basados en valores idénticos de las columnas indicadas, resumiendo cada grupo en una sola fila.",
      sintaxis: "SELECT categoria, COUNT(*) FROM productos GROUP BY categoria;",
      ejemploReal: "ActorModel.objects.annotate(total_obras=Count('obras')) aplica internamente un GROUP BY actor.id para calcular cuántas películas ha filmado cada actor.",
      reglaOro: "Cualquier columna presente en el SELECT que no esté envuelta en una función de agregación (COUNT, SUM, MAX, AVG) DEBE listarse en el GROUP BY."
    }
  },
  {
    id: 19,
    palabra: "HAVING",
    tipo: "debugging",
    nivel: "Semi-Senior",
    categoria: "Agrupación Avanzada & Debugging",
    enfoque: "Práctico",
    dificultad: "Intermedio",
    pregunta: "El siguiente código falla con error de sintaxis porque WHERE no puede filtrar cálculos agregados. ¿Qué cláusula post-agrupación debes usar en su lugar?",
    codigoErroneo: "-- ERROR: Aggregate function not allowed in WHERE:\nSELECT categoria, COUNT(*)\nFROM productos\nGROUP BY categoria\n___ COUNT(*) > 10; -- ¿Qué cláusula filtra grupos calculados?",
    pista: "Significa 'Teniendo' en inglés (6 letras). Es el equivalente a WHERE pero para condiciones sobre funciones de agregación.",
    explicacion: {
      concepto: "WHERE filtra filas individuales ANTES de agrupar. HAVING filtra los grupos DESPUÉS de que se aplicaron las funciones de agregación (COUNT, SUM, AVG).",
      sintaxis: "SELECT categoria, AVG(precio) FROM productos GROUP BY categoria HAVING AVG(precio) > 50;",
      ejemploReal: "Para encontrar artistas que tengan más de 5 álbumes: GROUP BY artista_id HAVING COUNT(id) > 5;",
      reglaOro: "Regla mnemotécnica: Usa WHERE para columnas existentes de la tabla. Usa HAVING para condiciones que usen funciones como COUNT(*), SUM() o AVG()."
    }
  },
  {
    id: 20,
    palabra: "DISTINCT",
    tipo: "entrevista",
    nivel: "Semi-Senior",
    categoria: "Preguntas de Entrevista",
    enfoque: "Práctico",
    dificultad: "Intermedio",
    pregunta: "En una entrevista técnica: '¿Qué modificador se antepone a las columnas en el SELECT cuando una consulta genera filas idénticas y deseas suprimir duplicados en la salida?'",
    escenario: "Una consulta sobre pedidos devuelve el país del cliente repetido 500 veces. Necesitas obtener la lista única de países sin duplicados.",
    pista: "Significa 'Distinto' en inglés (8 letras). Descarta duplicados de la proyección.",
    explicacion: {
      concepto: "DISTINCT examina las filas resultantes y descarta cualquier fila cuyos valores sean idénticos a otra previamente procesada en la proyección.",
      sintaxis: "SELECT DISTINCT categoria FROM productos;",
      ejemploReal: "Para poblar un desplegable con las ciudades donde tenemos sucursales sin repetirlas: SELECT DISTINCT ciudad FROM sucursales;",
      reglaOro: "DISTINCT requiere que el motor ordene o use tablas hash en memoria para detectar duplicados; úsalo solo cuando sea necesario y no para parchar malos JOINs."
    }
  },
  {
    id: 21,
    palabra: "PRIMARY",
    tipo: "concepto",
    nivel: "Semi-Senior",
    categoria: "Estructura y Restricciones",
    enfoque: "Teórico",
    dificultad: "Intermedio",
    pregunta: "¿Qué palabra precede a 'KEY' para definir la clave principal que identifica de manera única e irrepetible a cada fila de una tabla (sin admitir NULLs)?",
    analogia: "El documento de identidad (DNI/Cédula) o pasaporte de una persona: irrepetible y obligatorio para existir en el sistema.",
    pista: "Significa 'Primario' o 'Principal' en inglés (7 letras). Abreviada comúnmente como PK.",
    explicacion: {
      concepto: "PRIMARY KEY garantiza que no existan dos registros idénticos en la tabla y crea automáticamente un índice b-tree clustered para búsquedas ultra veloces por ID.",
      sintaxis: "id INT PRIMARY KEY; o CONSTRAINT pk_clientes PRIMARY KEY (id);",
      ejemploReal: "En cualquier modelo relacional, el ID generado automáticamente actúa como la PRIMARY KEY de la tabla.",
      reglaOro: "Una tabla relacional solo puede tener UNA Clave Primaria (aunque esta puede estar compuesta por varias columnas)."
    }
  },
  {
    id: 22,
    palabra: "FOREIGN",
    tipo: "concepto",
    nivel: "Semi-Senior",
    categoria: "Relaciones e Integridad",
    enfoque: "Teórico",
    dificultad: "Intermedio",
    pregunta: "¿Qué palabra se antepone a 'KEY' para declarar una columna que referencia la clave primaria de otra tabla, garantizando integridad referencial?",
    analogia: "Una pulsera de identificación de un hotel que acredita a qué habitación específica pertenece el huésped.",
    pista: "Significa 'Foráneo' o 'Extranjero' en inglés (7 letras). Abreviada como FK.",
    explicacion: {
      concepto: "Una FOREIGN KEY conecta una tabla secundaria con una principal. Impide que se inserten IDs inexistentes y define el comportamiento al borrar (CASCADE / RESTRICT).",
      sintaxis: "FOREIGN KEY (fk_col) REFERENCES tabla_padre(pk_col);",
      ejemploReal: "En un e-commerce, cada pedido tiene una FOREIGN KEY 'cliente_id' que apunta al cliente que realizó la compra.",
      reglaOro: "La clave foránea siempre debe ser del mismo tipo exacto de dato que la clave primaria a la que apunta (ej: ambos INT o ambos BIGINT)."
    }
  },
  {
    id: 23,
    palabra: "CHECK",
    tipo: "codigo-slot",
    nivel: "Semi-Senior",
    categoria: "Estructura y Restricciones",
    enfoque: "Práctico",
    dificultad: "Intermedio",
    pregunta: "¿Qué restricción DDL evalúa una condición booleana para asegurar que los datos insertados cumplan una regla de negocio antes de guardarlos?",
    codigoSql: "CREATE TABLE productos ( \n    id INT PRIMARY KEY, \n    precio DECIMAL(10,2), \n    CONSTRAINT chk_precio ___ (precio >= 0) \n);",
    pista: "Significa 'Verificar' o 'Comprobar' en inglés (5 letras).",
    explicacion: {
      concepto: "La restricción CHECK valida las filas antes de escribirlas en disco. Si la condición resulta FALSE, el motor rechaza la operación y lanza un error.",
      sintaxis: "CONSTRAINT chk_edad CHECK (edad >= 18);",
      ejemploReal: "Asegurar que el precio de un producto nunca sea negativo: CHECK (precio >= 0);",
      reglaOro: "Usar restricciones CHECK en la base de datos provee una capa de seguridad sólida que previene datos corruptos, incluso si el backend tiene un bug."
    }
  },
  {
    id: 24,
    palabra: "BETWEEN",
    tipo: "codigo-slot",
    nivel: "Semi-Senior",
    categoria: "Filtrado de Datos",
    enfoque: "Práctico",
    dificultad: "Intermedio",
    pregunta: "¿Qué operador de rango verifica si un valor se encuentra dentro de un intervalo cerrado (incluyendo ambos extremos)?",
    codigoSql: "SELECT nombre, precio \nFROM productos \nWHERE precio ___ 20.00 AND 100.00;",
    pista: "Significa 'Entre' en inglés (7 letras). Se combina con el operador AND.",
    explicacion: {
      concepto: "BETWEEN evalúa si un dato es mayor o igual al límite inferior y menor o igual al límite superior. Equivale a: (col >= A AND col <= B).",
      sintaxis: "SELECT * FROM ventas WHERE fecha BETWEEN '2026-01-01' AND '2026-12-31';",
      ejemploReal: "En reportes de ventas: WHERE total_compra BETWEEN 50 AND 200;",
      reglaOro: "Recuerda que BETWEEN es INCLUSIVO: los dos valores límite forman parte del resultado."
    }
  },
  {
    id: 25,
    palabra: "UNION",
    tipo: "entrevista",
    nivel: "Semi-Senior",
    categoria: "Operadores de Conjuntos",
    enfoque: "Teórico y Práctico",
    dificultad: "Intermedio",
    pregunta: "¿Qué operador combina verticalmente las filas de dos o más consultas SELECT en una sola lista unificada eliminando duplicados?",
    escenario: "El entrevistador pregunta: '¿Cuál es la diferencia entre UNION y UNION ALL en términos de rendimiento y duplicados?'",
    pista: "Palabra inglesa de 5 letras que significa 'Unión' de conjuntos matemáticos.",
    explicacion: {
      concepto: "UNION combina verticalmente las respuestas de dos sentencias SELECT suprimiendo duplicados. UNION ALL hace lo mismo pero sin descartar duplicados, siendo mucho más rápido.",
      sintaxis: "SELECT col1 FROM tabla1 UNION SELECT col1 FROM tabla2;",
      ejemploReal: "Si quieres mostrar en un solo buscador el catálogo completo de Cómics y de Películas combinados.",
      reglaOro: "Para que un UNION sea válido, todas las consultas participantes deben tener exactamente la misma cantidad de columnas y tipos de datos compatibles."
    }
  },
  {
    id: 26,
    palabra: "ALTER",
    tipo: "codigo-slot",
    nivel: "Semi-Senior",
    categoria: "Comandos DDL",
    enfoque: "Práctico",
    dificultad: "Intermedio",
    pregunta: "¿Qué instrucción DDL se utiliza para cambiar la estructura de una tabla existente (añadir, modificar o eliminar columnas) sin perder sus datos?",
    codigoSql: "___ TABLE movies_obra \nADD COLUMN temporada INT NULL, \nADD COLUMN capitulo INT NULL;",
    pista: "Significa 'Alterar' o 'Modificar' en inglés (5 letras).",
    explicacion: {
      concepto: "ALTER TABLE modifica el esquema de una tabla sin necesidad de borrarla ni perder los datos que ya contiene.",
      sintaxis: "ALTER TABLE nombre_tabla ADD COLUMN nueva_columna VARCHAR(100);",
      ejemploReal: "Cuando ejecutas migraciones en un framework para agregar campos a una entidad, se ejecuta un ALTER TABLE internamente.",
      reglaOro: "En bases de datos de producción con millones de registros, ejecutar un ALTER TABLE puede bloquear la tabla; debe hacerse en ventanas de mantenimiento."
    }
  },
  {
    id: 27,
    palabra: "CASCADE",
    tipo: "concepto",
    nivel: "Semi-Senior",
    categoria: "Integridad Referencial",
    enfoque: "Teórico",
    dificultad: "Intermedio",
    pregunta: "¿Qué regla de acción en Claves Foráneas (ON DELETE ___) provoca que, al eliminarse un registro padre, todos sus registros hijos dependientes se borren automáticamente?",
    analogia: "Un efecto dominó: si se derriba la ficha principal, todas las fichas vinculadas caen en cadena.",
    pista: "Significa 'Cascada' en inglés (7 letras). Se declara junto a ON DELETE o ON UPDATE.",
    explicacion: {
      concepto: "ON DELETE CASCADE propaga la eliminación de la tabla principal a las tablas dependientes, evitando que queden registros huérfanos.",
      sintaxis: "FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE;",
      ejemploReal: "Si un cliente cancela su cuenta de usuario y borras su registro, CASCADE borra automáticamente su carrito temporal y sesiones asociadas.",
      reglaOro: "¡Cuidado con CASCADE en entidades críticas! Si borras una empresa por error, podrías borrar en cascada a todos sus empleados, facturas y contratos."
    }
  },

  // =========================================================================
  // NIVEL 3: SENIOR (Arquitectura, Transacciones ACID, Rendimiento y Optimización)
  // =========================================================================
  {
    id: 28,
    palabra: "COMMIT",
    tipo: "concepto",
    nivel: "Senior",
    categoria: "Transacciones ACID / TCL",
    enfoque: "Teórico y Práctico",
    dificultad: "Avanzado",
    pregunta: "¿Qué instrucción del sublenguaje TCL consolida y guarda de manera permanente e irrevocable en el disco físico todos los cambios de una transacción?",
    analogia: "Presionar 'Guardar archivo' en un documento: los cambios dejan de ser un borrador temporal en memoria RAM y se graban en el disco.",
    pista: "Término en inglés de 6 letras que significa 'Comprometer' o 'Confirmar'. Muy común también en Git.",
    explicacion: {
      concepto: "Una transacción permite ejecutar múltiples comandos SQL como una sola unidad indivisible (Atomicidad). COMMIT le ordena al motor que confirme y escriba definitivamente todos los cambios en el disco duro.",
      sintaxis: "START TRANSACTION; ...operaciones... COMMIT;",
      ejemploReal: "En frameworks modernos, los bloques atómicos de transacción envían un COMMIT automáticamente si no ocurrió ningún error durante la creación de registros dependientes.",
      reglaOro: "Si ocurre un corte de energía o un error antes del COMMIT, el motor ejecuta un ROLLBACK automático y ningún dato a medio escribir corromperá tu base de datos."
    }
  },
  {
    id: 29,
    palabra: "ROLLBACK",
    tipo: "debugging",
    nivel: "Senior",
    categoria: "Transacciones ACID / TCL",
    enfoque: "Teórico y Práctico",
    dificultad: "Avanzado",
    pregunta: "Durante una transferencia bancaria, se descuenta dinero de la cuenta origen pero el servidor colapsa antes de abonar a la cuenta destino. ¿Qué comando de emergencia debe ejecutarse para deshacer el descuento y volver al estado previo?",
    codigoErroneo: "START TRANSACTION;\nUPDATE cuentas SET saldo = saldo - 1000 WHERE id = 1; -- Descuento exitoso\n-- ¡ERROR DE CONEXIÓN! Falla el abono a la cuenta 2:\n___; -- Cancela y revierte la transacción para no perder el dinero",
    pista: "Término en inglés de 8 letras que significa 'Volver atrás' o 'Rebobinar'.",
    explicacion: {
      concepto: "ROLLBACK es la red de seguridad de las transacciones. Deshace cualquier modificación temporal hecha en memoria antes de que sea confirmada con COMMIT.",
      sintaxis: "START TRANSACTION; ...errores... ROLLBACK;",
      ejemploReal: "En transferencias bancarias: si se descuenta saldo de la cuenta A pero falla el abono a la cuenta B, se llama a ROLLBACK para que ningún dinero se pierda.",
      reglaOro: "El principio de Atomicidad de ACID exige que o se guardan TODOS los pasos exitosamente o se ejecuta un ROLLBACK total."
    }
  },
  {
    id: 30,
    palabra: "INDEX",
    tipo: "entrevista",
    nivel: "Senior",
    categoria: "Optimización y Rendimiento",
    enfoque: "Teórico y Práctico",
    dificultad: "Avanzado",
    pregunta: "Pregunta de arquitectura para Senior: Una consulta WHERE tarda 8 segundos escaneando 10 millones de filas. ¿Qué estructura en disco (comúnmente un B-Tree) debes crear para reducir la búsqueda a 2 milisegundos?",
    escenario: "El evaluador pregunta: '¿Cómo diagnosticas y resuelves una consulta lenta en producción sin alterar el hardware del servidor?'",
    pista: "Significa 'Índice' en inglés (5 letras). Funciona como el índice analítico al final de un libro.",
    explicacion: {
      concepto: "Un INDEX crea una estructura ordenada (generalmente un B-Tree) que permite al motor encontrar filas en tiempo logarítmico O(log n) en lugar de escanear toda la tabla O(n).",
      sintaxis: "CREATE INDEX idx_usuarios_email ON usuarios (email);",
      ejemploReal: "En cualquier backend, crear un índice en el campo 'email' o 'slug' reduce el tiempo de consulta de segundos a milisegundos.",
      reglaOro: "No crees índices en todas las columnas: aceleran las lecturas (SELECT), pero ralentizan las escrituras (INSERT, UPDATE) porque cada índice debe recalcularse en cada cambio."
    }
  },
  {
    id: 31,
    palabra: "ATOMIC",
    tipo: "concepto",
    nivel: "Senior",
    categoria: "Principios ACID",
    enfoque: "Teórico",
    dificultad: "Avanzado",
    pregunta: "¿Qué propiedad de las transacciones ACID (representada por la letra 'A') garantiza que todas las operaciones dentro de una transacción se ejecuten como una unidad indivisible: o se guardan todas o ninguna?",
    analogia: "Un átomo indivisible en la física clásica: no puede existir media transacción completada.",
    pista: "Palabra inglesa de 6 letras que significa 'Atómico' o 'Indivisible'.",
    explicacion: {
      concepto: "Atomicidad (Atomicity) asegura que si una sola instrucción falla dentro del bloque de transacción, toda la operación se revierte por completo sin dejar datos inconsistentes.",
      sintaxis: "START TRANSACTION; ... COMMIT / ROLLBACK;",
      ejemploReal: "Al procesar una compra: crear la orden, descontar inventario y registrar el pago deben ocurrir atómicamente.",
      reglaOro: "Sin atomicidad, caídas de energía o excepciones en el servidor dejarían pedidos creados sin pago o stock descontado sin orden."
    }
  },
  {
    id: 32,
    palabra: "SCHEMA",
    tipo: "concepto",
    nivel: "Senior",
    categoria: "Arquitectura y Metadatos",
    enfoque: "Teórico",
    dificultad: "Avanzado",
    pregunta: "¿Qué término describe el diseño arquitectónico formal, estructura lógica, planos de tablas, vistas y restricciones que definen una base de datos?",
    analogia: "El plano arquitectónico y estructural de un edificio antes de que la gente comience a habitarlo.",
    pista: "Significa 'Esquema' en inglés (6 letras). En motores como PostgreSQL organiza espacios de nombres de tablas.",
    explicacion: {
      concepto: "Un esquema (Schema) es el esqueleto estructural que define qué campos, tablas, relaciones, tipos y restricciones contiene una base de datos.",
      sintaxis: "CREATE SCHEMA nombre_esquema; o SHOW SCHEMAS;",
      ejemploReal: "En PostgreSQL y MySQL, separar esquemas permite tener multi-tenancy o separar módulos (ej: 'auth', 'ventas', 'auditoria') en la misma BD.",
      reglaOro: "Mantener el esquema versionado mediante herramientas de migración (Alembic, Django Migrations, Flyway) es indispensable para el trabajo en equipo."
    }
  },
  {
    id: 33,
    palabra: "EXPLAIN",
    tipo: "entrevista",
    nivel: "Senior",
    categoria: "Preguntas de Entrevista",
    enfoque: "Práctico",
    dificultad: "Avanzado",
    pregunta: "En una prueba técnica para Senior: ¿Qué comando se antepone a cualquier sentencia SELECT para pedirle al optimizador del motor que revele su plan de ejecución, costo y uso de índices?",
    escenario: "El evaluador te muestra una consulta lenta y te pregunta: '¿Con qué instrucción de diagnóstico ves si el motor está usando un Index Scan o un Seq Scan?'",
    pista: "Significa 'Explicar' en inglés (7 letras). Acompañado de ANALYZE ejecuta la consulta midiendo tiempos reales.",
    explicacion: {
      concepto: "EXPLAIN muestra el árbol de ejecución que el optimizador de costos planea utilizar: si hará escaneo secuencial (Seq Scan), uso de índices (Index Scan), Nested Loops o Hash Joins.",
      sintaxis: "EXPLAIN ANALYZE SELECT * FROM pedidos WHERE cliente_id = 42;",
      ejemploReal: "Es la herramienta obligatoria de cualquier DBA o Senior Backend para saber exactamente por qué una consulta tarda demasiado.",
      reglaOro: "Usa 'EXPLAIN ANALYZE' para ver tiempos de reloj reales y no solo las estimaciones teóricas del planificador."
    }
  },
  {
    id: 34,
    palabra: "TRUNCATE",
    tipo: "entrevista",
    nivel: "Senior",
    categoria: "Comandos DDL vs DML",
    enfoque: "Teórico y Práctico",
    dificultad: "Avanzado",
    pregunta: "¿Qué comando DDL vacía por completo todos los registros de una tabla en milisegundos, desasignando páginas de almacenamiento y reseteando los contadores autoincrementales a 1?",
    escenario: "Diferencia clásica de entrevista: '¿Por qué TRUNCATE es órdenes de magnitud más rápido que DELETE en tablas de 10 millones de filas?'",
    pista: "Significa 'Truncar' en inglés (8 letras). Opera a nivel de asignación de almacenamiento físico.",
    explicacion: {
      concepto: "TRUNCATE TABLE es una operación DDL rápida porque no recorre fila por fila ni escribe cada borrado en el registro de transacciones; simplemente desasigna los bloques de almacenamiento.",
      sintaxis: "TRUNCATE TABLE nombre_tabla;",
      ejemploReal: "Para limpiar tablas temporales de logs o cachés periódicas sin necesidad de recrear la estructura.",
      reglaOro: "TRUNCATE resetea el AUTO_INCREMENT / SERIAL a 1, mientras que DELETE mantiene el último contador generado."
    }
  },
  {
    id: 35,
    palabra: "DROP",
    tipo: "concepto",
    nivel: "Senior",
    categoria: "Comandos DDL Destructivos",
    enfoque: "Teórico",
    dificultad: "Avanzado",
    pregunta: "¿Qué comando DDL destructivo e irreversible borra de forma definitiva una tabla completa o base de datos del disco, destruyendo tanto la estructura como los datos e índices?",
    analogia: "La demolición con dinamita de un edificio completo, en contraste con simplemente vaciar los muebles de su interior.",
    pista: "Significa 'Tirar' o 'Soltar' en inglés (4 letras). Elimina tanto los datos como la definición del objeto.",
    explicacion: {
      concepto: "DROP destruye el objeto por completo del catálogo de la base de datos. A diferencia de DELETE o TRUNCATE, tras un DROP la tabla deja de existir.",
      sintaxis: "DROP TABLE IF EXISTS tabla_temporal;",
      ejemploReal: "En scripts de limpieza o migraciones inversas: DROP TABLE IF EXISTS audit_logs_backup;",
      reglaOro: "¡El comando más peligroso de SQL! Debe estar restringido en producción para que ningún usuario de aplicación tenga permisos de ejecución."
    }
  }
];
