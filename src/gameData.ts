export type CategoryId = 'qa' | '5sec' | 'pass' | 'who' | 'verse' | 'mime';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { id: 'qa', name: 'Preguntas y Respuestas', icon: 'HelpCircle', color: 'brand-purple', description: 'Capacitación teórica' },
  { id: '5sec', name: '¡10 Segundos, 3 Cosas!', icon: 'Zap', color: 'brand-amber', description: 'Rapidez mental' },
  { id: 'pass', name: 'Password', icon: 'Key', color: 'brand-teal', description: 'Adivina la palabra' },
  { id: 'who', name: '¿Quién / Qué soy?', icon: 'UserCircle', color: 'brand-coral', description: 'Claves y biografías' },
  { id: 'verse', name: 'Dame un versículo', icon: 'BookOpen', color: 'brand-blue', description: 'Citas bíblicas' },
  { id: 'mime', name: 'Mímica', icon: 'Theater', color: 'brand-green', description: 'Actuación grupal' },
];

export const GAME_DATA: Record<CategoryId, any[]> = {
  qa: [
    {q:'¿Cómo define la clase la consejería bíblica?', a:'Es un proceso cristocéntrico y bibliosaturado que, en dependencia del Espíritu Santo, aplica la Palabra a las circunstancias del aconsejado.', diff:'Clase 1'},
    {q:'¿Cuál es el propósito primordial de la consejería?', a:'La transformación del corazón: sus motivaciones, deseos y creencias que impulsan la conducta.', diff:'Clase 1'},
    {q:'¿Cuáles son los tres agentes de cambio en la consejería bíblica?', a:'El Espíritu Santo (agente principal), Jesucristo (obra redentora) y el consejero (instrumento de la Palabra).', diff:'Clase 1'},
    {q:'¿Cuál es el principio clave sobre comportamiento y corazón?', a:'"El comportamiento es solo el síntoma; el corazón es la fuente."', diff:'Clase 1'},
    {q:'¿Qué versículo sustenta la suficiencia de la Palabra para la consejería?', a:'2 Timoteo 3:16-17: "Toda Escritura es inspirada por Dios y útil para enseñar, reprender, corregir, instruir en justicia."', diff:'Clase 1'},
    {q:'¿Cuál es la metáfora del "V8 sin encender" y qué ilustra?', a:'Un auto potente que nadie enciende: ilustra la vida cristiana que tiene poder disponible (el Espíritu) pero funciona a puro esfuerzo humano.', diff:'Clase 2'},
    {q:'¿Qué significa contristar al Espíritu?', a:'Entristecerlo con pecado persistente (Ef. 4:30). Revela que el Espíritu puede ser afectado por nuestra conducta.', diff:'Clase 2'},
    {q:'¿Cuál es la diferencia entre "hacer más para el Espíritu" y "ceder más al Espíritu"?', a:'"No se trata de hacer más para el Espíritu, sino de ceder más al Espíritu."', diff:'Clase 2'},
    {q:'¿Dónde empieza el verdadero cambio según la lección?', a:'No cuando las circunstancias mejoran, sino cuando el corazón se rinde a Dios y algo "muere" por dentro.', diff:'Clase 3'},
    {q:'¿Qué garantiza Filipenses 1:6 sobre el cambio?', a:'Que el éxito del cambio no depende de nuestra fuerza de voluntad, sino de que Jesús terminará la buena obra que Él mismo comenzó.', diff:'Clase 3'},
    {q:'¿Qué ilustra la historia del hebreo en el desierto?', a:'Que salir de Egipto es fácil, pero sacar a Egipto de nosotros es lo que más cuesta.', diff:'Clase 3'},
    {q:'¿Cuáles son los 4 elementos del modelo de cambio?', a:'1. El Calor, 2. Las Espinas, 3. La Cruz, 4. El Fruto.', diff:'Vida como Dios la Ve'},
    {q:'¿Qué representa "el calor" en el modelo?', a:'El mundo real y caído: dificultades, presiones, tentaciones y bendiciones.', diff:'Modelo'},
    {q:'¿Cómo se forma un ídolo del corazón?', a:'Un deseo bueno + la creencia de que sin eso no puedes ser feliz = exigencia = ídolo.', diff:'Calor'},
    {q:'¿Cuáles son las 6 respuestas del corazón enredado?', a:'1. Evadir, 2. Catastrofizar, 3. Defensivo, 4. Venganza, 5. Parálisis, 6. Justificación.', diff:'¿Qué y por qué te enredas?'},
    {q:'¿Qué significa "considerarse muerto" (logizomai) en Ro. 6:11?', a:'Es un término contable: haz cuentas, toma una decisión mental y dispón tu voluntad según la verdad de que ya moriste al pecado en Cristo.', diff:'Clase 9'},
    {q:'¿Cuáles son los 3 pasos para "salir de la tumba"?', a:'1. Reconoce: "ese ya no soy yo". 2. Renuncia: quítale permiso a los viejos hábitos. 3. Reemplaza: llena el vacío con la Palabra.', diff:'Clase 9'},
    {q:'¿Por qué Jonás es el caso de estudio de la lección 11?', a:'Su obediencia fue forzada por la presión (tormenta, pez), no por convicción. Predicó, la ciudad se convirtió, pero su corazón seguía resentido.', diff:'Clase 11'},
    {q:'¿Cuál es la distinción clave entre cambio falso y cambio verdadero?', a:'Falso: motivado por presión o miedo, desaparece cuando la presión baja. Verdadero: nace de gracia, persiste sin audiencia, los afectos se reorientan.', diff:'Clase 11'},
    {q:'¿Por qué la comunidad no es un invento humano?', a:'Porque es un reflejo de Dios mismo: el Padre, Hijo y Espíritu Santo viven en comunión perfecta. La Trinidad es comunidad.', diff:'Comunidad'},
    {q:'¿Qué dice la frase clave sobre el pecado y la relación con Cristo?', a:'"El pecado no es solo romper una regla, es traicionar una relación."', diff:'Casados con Cristo'},
    {q:'¿Qué significa la identidad de "nueva criatura" en la unión con Cristo?', a:'No es mejora del viejo yo; es su sustitución por Cristo viviendo en nosotros (Gálatas 2:20).', diff:'Casados con Cristo'},
  ],
  '5sec': [
    {q:'...son ejemplos de "calor" en la vida cotidiana.', a:'Un jefe injusto, un hijo desobediente, un mensaje sin respuesta.'},
    {q:'...son respuestas del corazón enredado.', a:'Evadir, catastrofizar, justificarse (también: defensivo, venganza, parálisis).'},
    {q:'...son falsas formas de buscar libertad del pecado.', a:'Legalismo, negación, moralismo.'},
    {q:'...son ídolos comunes del corazón.', a:'Aprobación, control, comodidad.'},
    {q:'...son ministerios del Espíritu Santo en la consejería.', a:'Convence de pecado, enseña, intercede.'},
    {q:'...son pasos para "salir de la tumba" según la clase 9.', a:'Reconocer, renunciar, reemplazar.'},
    {q:'...son señales de "cambio falso" según la lección 11.', a:'Motivado por miedo, desaparece sin presión, los ídolos del corazón permanecen.'},
    {q:'...son los 4 elementos del modelo de cambio.', a:'El calor, las espinas, la Cruz, el fruto.'},
    {q:'...son raíces del pecado según la lección.', a:'Idolatría, incredulidad, hábitos del corazón.'},
  ],
  pass: [
    {word:'CORAZÓN', def:'Fuente de toda motivación, deseo y creencia que impulsa la conducta.', verse:'Proverbios 4:23'},
    {word:'CALOR', def:'Las presiones, pruebas y bendiciones que revelan lo que hay en el corazón.', verse:'Santiago 1:2-4'},
    {word:'ÍDOLO', def:'Deseo bueno que se convirtió en exigencia absoluta para ser feliz.', verse:'Ezequiel 14:3'},
    {word:'ESPINAS', def:'Respuestas pecaminosas ante la presión que revelan la raíz del corazón.', verse:'Jeremías 17:5-8'},
    {word:'TRANSFORMACIÓN', def:'Cambio profundo del corazón, no solo de la conducta externa.', verse:'Romanos 12:2'},
    {word:'COMUNIDAD', def:'Contexto diseñado por Dios donde ocurre el cambio genuino.', verse:'Efesios 2:19'},
    {word:'LOGIZOMAI', def:'Término contable: "considerarse" muerto al pecado como decisión de voluntad.', verse:'Romanos 6:11'},
  ],
  who: [
    {name:'JONÁS', easy:'Obedeció pero se fue furioso cuando todo salió bien.', hard:'Su conducta cambió bajo presión pero su corazón nunca se rindió. Jon. 4.', type:'Personaje bíblico'},
    {name:'MARTA', easy:'Se enojó porque su hermana no la ayudaba con el trabajo.', hard:'Ilustra cómo el servicio puede convertirse en ídolo que ocupa el lugar de estar a los pies de Jesús.', type:'Personaje bíblico'},
    {name:'RAQUEL', easy:'Gritó "dame hijos o me muero" a su esposo.', hard:'Su historia ilustra cómo un deseo legítimo se convierte en ídolo cuando se vuelve exigencia.', type:'Personaje bíblico'},
    {name:'EL MOTOR V8', easy:'Un auto de 500 caballos que nadie enciende y todos empujan.', hard:'Ilustra la vida cristiana sin el Espíritu Santo: poder disponible pero sin usar.', type:'Ilustración'},
  ],
  verse: [
    {topic:'que Dios es quien terminará la obra que comenzó', answer:'Filipenses 1:6 — "El que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo."', ref:'Fil. 1:6'},
    {topic:'que el corazón es engañoso y necesita diagnóstico divino', answer:'Jeremías 17:9 — "Más engañoso que todo es el corazón, y sin remedio; ¿quién lo comprenderá?"', ref:'Jer. 17:9'},
    {topic:'guardar el corazón como prioridad', answer:'Proverbios 4:23 — "Con toda diligencia guarda tu corazón, porque de él brotan los manantiales de la vida."', ref:'Prov. 4:23'},
  ],
  mime: [
    {concept:'El calor revela', desc:'Apretar una fruta imaginaria y mostrar lo que sale. Señalar el corazón.', diff:'Fácil', lesson:'Calor y Espinas'},
    {concept:'Ídolo del corazón', desc:'Adorar un objeto imaginario con devoción exagerada, luego mostrarlo como vacío.', diff:'Medio', lesson:'¿Qué y por qué te enredas?'},
    {concept:'Obediencia de Jonás', desc:'Obedecer a regañadientes: caminar recto pero con brazos cruzados y cara furiosa.', diff:'Difícil', lesson:'Lección 11'},
  ]
};
