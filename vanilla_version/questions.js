/**
 * Banco de Preguntas Teóricas y Prácticas para SQL Wordle.
 * Cada pregunta reta al estudiante a deducir una palabra clave de SQL,
 * proporcionando contexto didáctico, código con hueco y explicación profunda.
 */
const SQL_QUESTIONS = [
    {
        id: 1,
        palabra: "SELECT",
        categoria: "Consultas DML",
        enfoque: "Práctico",
        dificultad: "Básico",
        pregunta: "¿Qué instrucción fundamental de SQL se utiliza para consultar y recuperar columnas de datos desde una base de datos?",
        codigoSql: "___ nombre, anio, tipo \nFROM movies_obra \nWHERE anio >= 2020;",
        pista: "Es el comando más usado en SQL. En español significa 'Seleccionar'.",
        explicacion: {
            concepto: "La sentencia SELECT es el corazón de las consultas de lectura en SQL. Permite especificar exactamente qué columnas deseas obtener, o usar un asterisco (*) para traer todas las columnas.",
            sintaxis: "SELECT columna1, columna2 FROM nombre_tabla WHERE condicion;",
            ejemploReal: "En nuestro proyecto Comic Tracker, cuando Django ejecuta Comic.objects.all(), envía internamente un: SELECT id, nombre, capitulo FROM comics_comic;",
            reglaOro: "Selecciona únicamente las columnas que realmente necesitas para mejorar el rendimiento y ahorrar ancho de banda de red."
        }
    },
    {
        id: 2,
        palabra: "FROM",
        categoria: "Consultas DML",
        enfoque: "Práctico",
        dificultad: "Básico",
        pregunta: "¿Qué cláusula obligatoria acompaña a SELECT para indicar de qué tabla específica se van a extraer los registros?",
        codigoSql: "SELECT titulo, anio \n___ movies_obra \nWHERE tipo = 'PELICULA';",
        pista: "Palabra inglesa de 4 letras que indica procedencia u origen ('desde' o 'de').",
        explicacion: {
            concepto: "La cláusula FROM le dice al motor de base de datos en qué archivador (tabla) debe buscar la información. Sin ella, MySQL no sabe dónde residen los campos solicitados.",
            sintaxis: "SELECT columnas FROM tabla_origen;",
            ejemploReal: "SELECT al.nombre, al.anio FROM music_album al;",
            reglaOro: "Puedes asignarle un alias corto a la tabla en el FROM (ej: FROM music_album AS al) para escribir consultas más limpias y legibles."
        }
    },
    {
        id: 3,
        palabra: "WHERE",
        categoria: "Filtrado de Datos",
        enfoque: "Práctico",
        dificultad: "Básico",
        pregunta: "¿Qué cláusula se utiliza para condicionar o filtrar qué filas específicas deben cumplir la consulta antes de devolverlas?",
        codigoSql: "SELECT * \nFROM comics_comic \n___ estado = 'EN_CURSO' AND capitulo > 50;",
        pista: "Significa 'Dónde' en inglés. Es indispensable para no traer datos de más.",
        explicacion: {
            concepto: "WHERE evalúa una expresión lógica fila por fila. Si la condición resulta verdadera (TRUE), la fila se incluye en el resultado; si es falsa o nula, se descarta.",
            sintaxis: "SELECT * FROM tabla WHERE columna = valor AND otra_columna > 10;",
            ejemploReal: "En Django: Comic.objects.filter(estado='EN_CURSO') genera: SELECT * FROM comics_comic WHERE estado = 'EN_CURSO';",
            reglaOro: "¡Cuidado vital! Siempre usa WHERE al ejecutar un UPDATE o DELETE. Si lo olvidas, modificarás o borrarás TODAS las filas de la tabla."
        }
    },
    {
        id: 4,
        palabra: "ORDER",
        categoria: "Ordenamiento",
        enfoque: "Práctico",
        dificultad: "Básico",
        pregunta: "¿Qué palabra clave se usa junto con 'BY' para ordenar las filas resultantes de forma ascendente o descendente?",
        codigoSql: "SELECT nombre, anio \nFROM movies_obra \n___ BY anio DESC, nombre ASC;",
        pista: "Significa 'Ordenar' en inglés. Va siempre seguido de 'BY'.",
        explicacion: {
            concepto: "ORDER BY reorganiza el conjunto de resultados. Por defecto ordena de menor a mayor (ASC), pero puedes usar DESC para ordenar de mayor a menor.",
            sintaxis: "SELECT * FROM tabla ORDER BY fecha_creacion DESC;",
            ejemploReal: "En Comic Tracker: ActorModel.objects.order_by('nombre') genera en SQL: SELECT * FROM movies_actor ORDER BY nombre ASC;",
            reglaOro: "Las bases de datos relacionales NO garantizan un orden predeterminado en las filas guardadas en disco. Si necesitas verlas en un orden específico, siempre debes usar ORDER BY."
        }
    },
    {
        id: 5,
        palabra: "LIMIT",
        categoria: "Paginación y Filtro",
        enfoque: "Práctico",
        dificultad: "Básico",
        pregunta: "¿Qué cláusula restringe la cantidad máxima de registros devueltos por la consulta (ideal para paginación o tops)?",
        codigoSql: "SELECT nombre, anio \nFROM movies_obra \nORDER BY anio DESC \n___ 5;",
        pista: "Término en inglés de 5 letras que define una frontera o tope cuantitativo.",
        explicacion: {
            concepto: "LIMIT indica al motor que detenga la lectura apenas haya reunido el número de filas indicado. Acompañado de OFFSET, permite paginar resultados (página 1, página 2, etc.).",
            sintaxis: "SELECT * FROM tabla LIMIT 10 OFFSET 20; -- Trae 10 filas saltándose las 20 primeras",
            ejemploReal: "Cuando buscas el cómic más reciente: Comic.objects.latest('created_at') agrega un 'LIMIT 1' a la consulta SQL.",
            reglaOro: "LIMIT es altamente eficiente porque evita que MySQL recorra millones de filas en memoria cuando solo quieres mostrar los primeros 10 resultados en la web."
        }
    },
    {
        id: 6,
        palabra: "JOIN",
        categoria: "Relaciones N:M y 1:N",
        enfoque: "Teórico y Práctico",
        dificultad: "Intermedio",
        pregunta: "¿Qué cláusula fundamental permite 'fusionar' o vincular filas de dos o más tablas basándose en una columna en común?",
        codigoSql: "SELECT al.nombre, ar.nombre AS artista \nFROM music_album al \nINNER ___ music_artista ar ON al.artista_id = ar.id;",
        pista: "Significa 'Unir' en inglés (4 letras). Es la esencia de las Bases de Datos Relacionales.",
        explicacion: {
            concepto: "Las bases de datos relacionales dividen los datos en tablas para evitar duplicados. El comando JOIN reconstruye la información uniéndola a través de Claves Foráneas (FK) y Claves Primarias (PK).",
            sintaxis: "SELECT * FROM TablaA JOIN TablaB ON TablaA.id = TablaB.tabla_a_id;",
            ejemploReal: "Para listar películas con sus actores usamos la tabla intermedia movies_reparto: FROM movies_obra o INNER JOIN movies_reparto r ON o.id = r.obra_id INNER JOIN movies_actor a ON r.actor_id = a.id;",
            reglaOro: "Siempre debes especificar la condición de enlace con 'ON'. Si haces un JOIN sin condición ON, generarás un 'Producto Cartesiano' que multiplicará todas las filas por todas."
        }
    },
    {
        id: 7,
        palabra: "COUNT",
        categoria: "Funciones de Agregación",
        enfoque: "Práctico",
        dificultad: "Básico",
        pregunta: "¿Qué función matemática de agregación calcula y retorna el número total de filas que cumplen una condición?",
        codigoSql: "SELECT ___(*) AS total_series \nFROM movies_obra \nWHERE tipo = 'SERIE';",
        pista: "En inglés significa 'Contar'. Recibe comúnmente (*) o el nombre de una columna entre paréntesis.",
        explicacion: {
            concepto: "COUNT() cuenta filas. COUNT(*) cuenta todas las filas devueltas (incluso con nulos), mientras que COUNT(columna) cuenta solo las filas donde esa columna NO sea NULL.",
            sintaxis: "SELECT COUNT(*) FROM usuarios WHERE activo = 1;",
            ejemploReal: "En el dashboard de métricas de nuestro proyecto, MovieModel.objects.count() se traduce directamente a: SELECT COUNT(*) FROM movies_obra;",
            reglaOro: "Combina COUNT con GROUP BY para saber cuántos elementos tiene cada categoría (ej: cuántas canciones tiene cada álbum)."
        }
    },
    {
        id: 8,
        palabra: "GROUP",
        categoria: "Agrupación de Datos",
        enfoque: "Práctico",
        dificultad: "Intermedio",
        pregunta: "¿Qué palabra clave se usa junto a 'BY' para agrupar filas con valores idénticos y aplicarles funciones como COUNT o AVG?",
        codigoSql: "SELECT ar.nombre, COUNT(al.id) AS total_albumes \nFROM music_artista ar \nLEFT JOIN music_album al ON ar.id = al.artista_id \n___ BY ar.id, ar.nombre;",
        pista: "Significa 'Grupo' o 'Agrupar' en inglés (5 letras).",
        explicacion: {
            concepto: "GROUP BY divide el conjunto de datos en subgrupos. En lugar de devolver 100 filas sueltas, resume la información en una sola fila por cada grupo único.",
            sintaxis: "SELECT categoria, COUNT(*) FROM productos GROUP BY categoria;",
            ejemploReal: "ActorModel.objects.annotate(total_obras=Count('obras')) aplica internamente un GROUP BY actor.id para calcular cuántas películas ha filmado cada actor.",
            reglaOro: "Cualquier columna que pongas en el SELECT que no esté envuelta en una función de agregación (COUNT, SUM, MAX) DEBE estar listada en el GROUP BY."
        }
    },
    {
        id: 9,
        palabra: "INSERT",
        categoria: "Comandos DML",
        enfoque: "Teórico y Práctico",
        dificultad: "Básico",
        pregunta: "¿Qué comando del lenguaje DML se utiliza para agregar nuevas filas de datos dentro de una tabla existente?",
        codigoSql: "___ INTO comics_comic (nombre, tipo, capitulo, estado) \nVALUES ('Solo Leveling', 'MANHWA', 1, 'EN_CURSO');",
        pista: "Significa 'Insertar' en inglés. Es la 'C' (Create) de las operaciones CRUD.",
        explicacion: {
            concepto: "INSERT INTO agrega una tupla (fila) a la tabla. Requiere especificar la tabla y la lista de valores a asignar en cada columna.",
            sintaxis: "INSERT INTO tabla (columna1, columna2) VALUES (valor1, valor2);",
            ejemploReal: "Cuando el usuario envía el formulario en la web y Django llama a form.save(), se ejecuta un INSERT INTO en MySQL.",
            reglaOro: "Si una columna tiene AUTO_INCREMENT (como el 'id'), no es necesario incluirla en el INSERT; el motor le asigna el valor secuencial automáticamente."
        }
    },
    {
        id: 10,
        palabra: "UPDATE",
        categoria: "Comandos DML",
        enfoque: "Práctico",
        dificultad: "Básico",
        pregunta: "¿Qué comando DML se encarga de modificar los valores de una o más columnas en filas que ya están guardadas?",
        codigoSql: "___ comics_comic \nSET capitulo = capitulo + 1, fecha_actualizacion = NOW() \nWHERE id = 3;",
        pista: "Significa 'Actualizar' en inglés. Va seguido del nombre de la tabla y la cláusula SET.",
        explicacion: {
            concepto: "UPDATE localiza las filas indicadas en el WHERE y sobreescribe los valores de las columnas especificadas en la cláusula SET.",
            sintaxis: "UPDATE tabla SET columna1 = nuevo_valor WHERE condicion;",
            ejemploReal: "Cuando el usuario presiona el botón '+1 Cap' en nuestro Tracker, Django ejecuta un UPDATE en MySQL para incrementar el número de capítulo.",
            reglaOro: "¡Regla número 1 de los administradores de BD! NUNCA ejecutes un UPDATE sin la cláusula WHERE a menos que tu intención real sea cambiar todos los datos de la empresa."
        }
    },
    {
        id: 11,
        palabra: "DELETE",
        categoria: "Comandos DML",
        enfoque: "Teórico y Práctico",
        dificultad: "Básico",
        pregunta: "¿Qué comando DML se utiliza para suprimir o remover filas de una tabla bajo una condición lógica?",
        codigoSql: "___ FROM movies_obra \nWHERE id = 12;",
        pista: "Significa 'Borrar' o 'Eliminar' en inglés (6 letras).",
        explicacion: {
            concepto: "DELETE FROM borra registros individuales o grupos de registros que coincidan con la condición especificada en el WHERE.",
            sintaxis: "DELETE FROM nombre_tabla WHERE condicion;",
            ejemploReal: "Cuando borras un cómic o una película de la biblioteca, Django llama a .delete() y envía un: DELETE FROM movies_obra WHERE id = %s;",
            reglaOro: "A diferencia de DROP TABLE (que destruye la estructura), DELETE solo vacía las filas; las columnas y la tabla siguen existiendo intactas."
        }
    },
    {
        id: 12,
        palabra: "INNER",
        categoria: "Tipos de JOIN",
        enfoque: "Teórico y Práctico",
        dificultad: "Intermedio",
        pregunta: "¿Qué tipo de unión devuelve exclusivamente las filas que tienen coincidencia exacta tanto en la tabla izquierda como en la derecha?",
        codigoSql: "SELECT o.nombre, a.nombre \nFROM movies_obra o \n___ JOIN movies_reparto r ON o.id = r.obra_id \n___ JOIN movies_actor a ON r.actor_id = a.id;",
        pista: "Significa 'Interno' en inglés (5 letras). Si una fila no tiene pareja, se descarta.",
        explicacion: {
            concepto: "INNER JOIN es la intersección matemática (A ∩ B). Si un álbum no tiene artista asignado, o un artista no tiene álbumes, no aparecerán en el resultado.",
            sintaxis: "SELECT * FROM TablaA INNER JOIN TablaB ON TablaA.id = TablaB.a_id;",
            ejemploReal: "En SQL puro: SELECT * FROM music_album INNER JOIN music_artista ON music_album.artista_id = music_artista.id;",
            reglaOro: "Es el JOIN más rápido de todos porque el optimizador de MySQL descarta de inmediato los registros que no cumplan la clave foránea."
        }
    },
    {
        id: 13,
        palabra: "LEFT",
        categoria: "Tipos de JOIN",
        enfoque: "Teórico y Práctico",
        dificultad: "Intermedio",
        pregunta: "¿Qué tipo de unión garantiza que TODAS las filas de la primera tabla aparezcan, rellenando con NULL si no hay coincidencia en la segunda?",
        codigoSql: "SELECT ar.nombre, COUNT(al.id) AS total_albumes \nFROM music_artista ar \n___ JOIN music_album al ON ar.id = al.artista_id \nGROUP BY ar.id;",
        pista: "Significa 'Izquierda' en inglés (4 letras). Conserva todo lo que esté a la izquierda del JOIN.",
        explicacion: {
            concepto: "LEFT JOIN (o LEFT OUTER JOIN) toma el 100% de los registros de la tabla declarada en el FROM (la de la izquierda), y si no encuentra relación en la derecha, llena esos campos con valores NULL.",
            sintaxis: "SELECT * FROM Artistas LEFT JOIN Albumes ON Artistas.id = Albumes.artista_id;",
            ejemploReal: "Si registraste a un nuevo actor pero todavía no ha filmado ninguna película, con INNER JOIN desaparecería; con LEFT JOIN sí aparece en pantalla con 0 películas.",
            reglaOro: "Es la herramienta perfecta para encontrar datos ausentes: 'WHERE tabla_derecha.id IS NULL'."
        }
    },
    {
        id: 14,
        palabra: "LIKE",
        categoria: "Operadores de Búsqueda",
        enfoque: "Práctico",
        dificultad: "Básico",
        pregunta: "¿Qué operador de comparación se utiliza en el WHERE para realizar búsquedas aproximadas de texto con comodines como '%' o '_'?",
        codigoSql: "SELECT * \nFROM movies_obra \nWHERE nombre ___ '%matrix%' OR sinopsis ___ '%futuro%';",
        pista: "Significa 'Como' o 'Similar a' en inglés (4 letras).",
        explicacion: {
            concepto: "LIKE compara cadenas mediante patrones. El comodín '%' representa cualquier número de caracteres (cero o más), mientras que '_' representa exactamente un solo carácter.",
            sintaxis: "SELECT * FROM usuarios WHERE email LIKE '%@gmail.com';",
            ejemploReal: "En Django, Comic.objects.filter(nombre__icontains='piece') se traduce a SQL como: WHERE nombre LIKE '%piece%';",
            reglaOro: "Colocar un comodín al inicio de la palabra ('%texto') impide que MySQL use índices tradicionales, lo que puede ser más lento en tablas con millones de filas."
        }
    },
    {
        id: 15,
        palabra: "VALUES",
        categoria: "Comandos DML",
        enfoque: "Práctico",
        dificultad: "Básico",
        pregunta: "¿Qué palabra clave precede a la lista de datos literales que se van a insertar en una instrucción INSERT INTO?",
        codigoSql: "INSERT INTO music_artista (nombre, notas) \n___ ('Queen', 'Banda británica legendaria');",
        pista: "Significa 'Valores' en inglés (6 letras). Va siempre seguido de paréntesis con los datos.",
        explicacion: {
            concepto: "VALUES especifica el contenido concreto que ocupará cada columna declarada en el INSERT. Deben coincidir en cantidad, orden y tipo de dato.",
            sintaxis: "INSERT INTO tabla (col1, col2) VALUES ('texto', 123);",
            ejemploReal: "MySQL permite inserciones múltiples en un solo comando: INSERT INTO tabla (col) VALUES ('A'), ('B'), ('C'); ahorrando conexiones de red.",
            reglaOro: "Envuelve siempre las cadenas de texto y fechas entre comillas simples ('2024-01-01'), mientras que los números enteros o decimales se escriben sin comillas (125)."
        }
    },
    {
        id: 16,
        palabra: "ALTER",
        categoria: "Comandos DDL",
        enfoque: "Teórico y Práctico",
        dificultad: "Intermedio",
        pregunta: "¿Qué instrucción DDL se utiliza para cambiar la estructura de una tabla existente (añadir, modificar o eliminar columnas)?",
        codigoSql: "___ TABLE movies_obra \nADD COLUMN temporada INT NULL, \nADD COLUMN capitulo INT NULL;",
        pista: "Significa 'Alterar' o 'Modificar' en inglés (5 letras).",
        explicacion: {
            concepto: "ALTER TABLE modifica el esquema de una tabla sin necesidad de borrarla ni perder los datos que ya contiene. Permite agregar columnas (ADD), eliminarlas (DROP COLUMN) o cambiar su tipo (MODIFY).",
            sintaxis: "ALTER TABLE nombre_tabla ADD COLUMN nueva_columna VARCHAR(100);",
            ejemploReal: "Cuando ejecutamos 'python manage.py migrate' para agregar los campos temporada y capítulo a las series, Django ejecutó un ALTER TABLE en MySQL.",
            reglaOro: "En bases de datos de producción con millones de registros, ejecutar un ALTER TABLE bloquea la tabla; debe hacerse en ventanas de mantenimiento planificadas."
        }
    },
    {
        id: 17,
        palabra: "DROP",
        categoria: "Comandos DDL",
        enfoque: "Teórico",
        dificultad: "Intermedio",
        pregunta: "¿Qué comando DDL destructivo borra de forma permanente y definitiva una tabla completa o una base de datos del disco?",
        codigoSql: "___ TABLE tabla_temporal_errores;",
        pista: "Significa 'Tirar' o 'Soltar' en inglés (4 letras). Elimina tanto los datos como la definición de la tabla.",
        explicacion: {
            concepto: "DROP elimina el objeto por completo del motor de base de datos. A diferencia de DELETE (que borra filas una a una y permite deshacer con ROLLBACK en transacciones), DROP elimina la estructura física de inmediato.",
            sintaxis: "DROP TABLE nombre_tabla; o DROP DATABASE nombre_base_datos;",
            ejemploReal: "DROP TABLE IF EXISTS test_cache;",
            reglaOro: "¡El comando más peligroso de SQL! Un DROP TABLE borra índices, restricciones y todos los datos sin confirmación. Debe restringirse en usuarios con permisos de producción."
        }
    },
    {
        id: 18,
        palabra: "CREATE",
        categoria: "Comandos DDL",
        enfoque: "Teórico y Práctico",
        dificultad: "Básico",
        pregunta: "¿Qué instrucción DDL se emplea para fabricar o fundar desde cero una nueva tabla, vista o base de datos?",
        codigoSql: "___ TABLE movies_actor ( \n    id BIGINT AUTO_INCREMENT PRIMARY KEY, \n    nombre VARCHAR(150) NOT NULL \n);",
        pista: "Significa 'Crear' en inglés (6 letras). Es el punto de partida de toda base de datos.",
        explicacion: {
            concepto: "CREATE establece la definición formal de los tipos de datos, nombres de columnas, claves primarias y restricciones de integridad de una nueva tabla.",
            sintaxis: "CREATE TABLE nombre (columna tipo restriccion);",
            ejemploReal: "En la primera migración de nuestro proyecto, Django generó un CREATE TABLE comics_comic con columnas id, nombre, tipo, capitulo y estado.",
            reglaOro: "Usa la cláusula 'IF NOT EXISTS' (ej: CREATE TABLE IF NOT EXISTS) en tus scripts de migración para evitar errores si la tabla ya había sido creada."
        }
    },
    {
        id: 19,
        palabra: "TABLE",
        categoria: "Conceptos Fundamentales",
        enfoque: "Teórico",
        dificultad: "Básico",
        pregunta: "¿Cómo se llama en SQL el objeto contenedor organizado en filas y columnas donde se almacena la información relacional?",
        codigoSql: "CREATE ___ music_cancion ( \n    id INT AUTO_INCREMENT PRIMARY KEY, \n    nombre VARCHAR(200) NOT NULL \n);",
        pista: "Significa 'Tabla' en inglés (5 letras).",
        explicacion: {
            concepto: "Una tabla representa una entidad del mundo real (ej: Cómics, Usuarios, Canciones). Las columnas definen sus atributos y las filas son las instancias concretas guardadas.",
            sintaxis: "CREATE TABLE nombre_tabla (...); o ALTER TABLE nombre_tabla ...;",
            ejemploReal: "En MySQL, cada modelo de Django (Comic, MovieModel, ActorModel) se almacena físicamente como una tabla independiente dentro de la base de datos comic_tracker_db.",
            reglaOro: "Nombrar las tablas en minúsculas y con nombres claros (ej: movies_obra) facilita la lectura y evita problemas de compatibilidad entre sistemas operativos (Linux vs Windows)."
        }
    },
    {
        id: 20,
        palabra: "COMMIT",
        categoria: "Transacciones ACID",
        enfoque: "Teórico y Práctico",
        dificultad: "Avanzado",
        pregunta: "¿Qué instrucción consolida y guarda de manera permanente e irrevocable en el disco todos los cambios de una transacción?",
        codigoSql: "START TRANSACTION; \nINSERT INTO music_artista (nombre) VALUES ('Led Zeppelin'); \nINSERT INTO music_album (nombre, anio) VALUES ('Led Zeppelin IV', 1971); \n___; -- Guarda todo en disco",
        pista: "Término en inglés de 6 letras que significa 'Comprometer' o 'Confirmar'. También se usa en Git.",
        explicacion: {
            concepto: "Una transacción permite ejecutar múltiples comandos SQL como una sola unidad indivisible (Atomicidad). COMMIT le ordena a MySQL que confirme y escriba definitivamente todos los cambios en el disco duro.",
            sintaxis: "START TRANSACTION; ...operaciones... COMMIT;",
            ejemploReal: "En Django, el bloque 'with transaction.atomic():' envía un COMMIT a MySQL automáticamente si no ocurrió ningún error durante la creación del álbum y sus canciones.",
            reglaOro: "Si ocurre un corte de energía o un error antes del COMMIT, el motor ejecuta un ROLLBACK automático y ningún dato a medio escribir corromperá tu base de datos."
        }
    },
    {
        id: 21,
        palabra: "HAVING",
        categoria: "Agrupación Avanzada",
        enfoque: "Teórico y Práctico",
        dificultad: "Avanzado",
        pregunta: "¿Qué cláusula se utiliza para filtrar los resultados de un GROUP BY después de haber aplicado las funciones de agregación?",
        codigoSql: "SELECT ar.nombre, COUNT(al.id) AS total_albumes \nFROM music_artista ar \nINNER JOIN music_album al ON ar.id = al.artista_id \nGROUP BY ar.id \n___ COUNT(al.id) >= 3;",
        pista: "Significa 'Teniendo' en inglés (6 letras). Es el 'WHERE' de los grupos calculados.",
        explicacion: {
            concepto: "WHERE filtra filas INDIVIDUALES antes de agrupar. HAVING filtra los GRUPOS después de que se aplicaron las funciones de agregación (COUNT, SUM, AVG).",
            sintaxis: "SELECT categoria, AVG(precio) FROM productos GROUP BY categoria HAVING AVG(precio) > 50;",
            ejemploReal: "Para encontrar artistas que tengan más de 5 álbumes: GROUP BY artista_id HAVING COUNT(id) > 5;",
            reglaOro: "Regla mnemotécnica: Usa WHERE para columnas existentes de la tabla. Usa HAVING para condiciones que usen funciones como COUNT(*), SUM() o AVG()."
        }
    },
    {
        id: 22,
        palabra: "UNION",
        categoria: "Operadores de Conjuntos",
        enfoque: "Teórico y Práctico",
        dificultad: "Intermedio",
        pregunta: "¿Qué operador combina las filas devueltas por dos o más consultas SELECT en un único conjunto eliminando duplicados?",
        codigoSql: "SELECT nombre FROM comics_comic WHERE tipo = 'MANGA' \n___ \nSELECT nombre FROM movies_obra WHERE tipo = 'PELICULA';",
        pista: "Palabra inglesa de 5 letras que significa 'Unión' de conjuntos matemáticos.",
        explicacion: {
            concepto: "UNION combina verticalmente las respuestas de dos o más sentencias SELECT en una sola lista continua, suprimiendo las filas repetidas.",
            sintaxis: "SELECT col1 FROM tabla1 UNION SELECT col1 FROM tabla2;",
            ejemploReal: "Si quieres mostrar en un solo buscador el catálogo completo de Cómics y de Películas.",
            reglaOro: "Para que un UNION sea válido, todas las consultas SELECT participantes deben tener exactamente la misma cantidad de columnas y tipos de datos compatibles."
        }
    }
];
