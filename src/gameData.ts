export type CategoryId = 
  | 'qa' 
  | '10sec' 
  | 'pass' 
  | 'who' 
  | 'verse' 
  | 'mime' 
  | 'diagnosis' 
  | 'evangelio' 
  | 'idol' 
  | 'counselor' 
  | 'pressure_verse' 
  | 'extreme_heat' 
  | 'deep_question' 
  | 'process_arm';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
  description: string;
  level?: 'Básico' | 'Intermedio' | 'Avanzado' | 'Ministerial';
}

export const CATEGORIES: Category[] = [
  { id: 'diagnosis', name: 'Diagnóstico del Corazón', icon: 'Stethoscope', color: 'brand-purple', description: 'Detecta calor, espinas e ídolos.', level: 'Intermedio' },
  { id: 'evangelio', name: '¿Evangelio o Moralismo?', icon: 'Scale', color: 'brand-teal', description: 'Discernimiento de la verdad.', level: 'Básico' },
  { id: 'idol', name: 'Identifica el Ídolo', icon: 'Ghost', color: 'brand-coral', description: 'Descubre qué gobierna el corazón.', level: 'Básico' },
  { id: 'counselor', name: 'Consejero por 1 Minuto', icon: 'UserCheck', color: 'brand-amber', description: 'Respuestas bíblicas rápidas.', level: 'Ministerial' },
  { id: 'extreme_heat', name: 'Calor Extremo (Modelo)', icon: 'Flame', color: 'brand-blue', description: 'Modelo completo: Calor -> Fruto.', level: 'Avanzado' },
  { id: 'deep_question', name: 'Preguntas Incómodas', icon: 'MessageCircleQuestion', color: 'brand-green', description: 'Reflexión profunda con gracia.', level: 'Avanzado' },
  { id: 'qa', name: 'Preguntas y Respuestas', icon: 'HelpCircle', color: 'brand-purple', description: 'Capacitación teórica.', level: 'Básico' },
  { id: '10sec', name: '¡10 Segundos, 3 Cosas!', icon: 'Zap', color: 'brand-amber', description: 'Rapidez mental.', level: 'Básico' },
  { id: 'pass', name: 'Password', icon: 'Key', color: 'brand-teal', description: 'Adivina la palabra.', level: 'Básico' },
  { id: 'who', name: '¿Quién / Qué soy?', icon: 'UserCircle', color: 'brand-coral', description: 'Claves y biografías.', level: 'Intermedio' },
  { id: 'verse', name: 'Citas Bíblicas', icon: 'BookOpen', color: 'brand-blue', description: 'Manejo de la Palabra.', level: 'Intermedio' },
  { id: 'mime', name: 'Mímica', icon: 'Theater', color: 'brand-green', description: 'Actuación corporal.', level: 'Básico' },
];

export const GAME_DATA: Record<CategoryId, any[]> = {
  diagnosis: [
    {
      scenario: "Tu amigo no responde tus mensajes y empiezas a imaginar rechazo.",
      calor: "Silencio / retraso en la respuesta",
      espinas: "Ansiedad, catastrofismo, aislamiento",
      idolo: "Aprobación / Aceptación",
      mentira: "Necesito aceptación para tener valor o paz",
      evangelio: "Mi identidad y valor están seguros en Cristo",
      fruto: "Paciencia y comunicación sabia sin demandar"
    },
    {
      scenario: "Te critican públicamente por un error menor en el servicio.",
      calor: "Crítica pública / Humillación",
      espinas: "Defensividad, amargura, deseo de venganza",
      idolo: "Reputación / Éxito",
      mentira: "Mi imagen ante los demás es mi tesoro",
      evangelio: "Cristo fue humillado para que yo fuera exaltado en justicia",
      fruto: "Humildad, arrepentimiento genuino si cabe, y perdón"
    },
    {
      scenario: "Tus hijos desobedecen después de un día agotador.",
      calor: "Cansancio + Desobediencia",
      espinas: "Gritos, ira explosiva, resentimiento",
      idolo: "Control / Comodidad",
      mentira: "Merezco una vida sin problemas y bajo mi mando",
      evangelio: "Dios es soberano y usa este momento para mi santificación",
      fruto: "Disciplina firme pero llena de gracia y amor"
    },
    {
      scenario: "Ves que otros progresan económicamente mientras tú sigues estancado.",
      calor: "Comparación social / Escasez",
      espinas: "Envidia, queja, desconfianza de la providencia",
      idolo: "Seguridad / Comodidad",
      mentira: "Mis posesiones determinan mi seguridad y felicidad",
      evangelio: "Cristo es mi herencia y tesoro eterno",
      fruto: "Gratitud, generosidad y confianza en el Padre"
    },
    {
      scenario: "Tu cónyuge hace un comentario sarcástico sobre tu aspecto.",
      calor: "Ofensa relacional",
      espinas: "Sarcasmo de vuelta, frialdad emocional",
      idolo: "Aprobación / Respeto",
      mentira: "Tengo que ser respetado para sentirme digno",
      evangelio: "Fui amado cuando era irreformable; puedo amar en medio de la ofensa",
      fruto: "Amor sufrido, comunicación honesta con gracia"
    }
  ],
  evangelio: [
    { text: "Échale ganas, tú puedes solo.", type: "Moralismo" },
    { text: "Cristo ya hizo posible obedecer.", type: "Evangelio" },
    { text: "Si oras suficiente nunca caerás.", type: "Legalismo" },
    { text: "No puedo cambiar sin depender del Espíritu.", type: "Dependencia" },
    { text: "Dios bendice solo a los que se portan bien.", type: "Legalismo" },
    { text: "Mi pecado es grande, pero su gracia es mayor.", type: "Evangelio" },
    { text: "Conviértete en la mejor versión de ti mismo.", type: "Auto-ayuda" },
    { text: "La ley es un espejo para ver mi necesidad de Cristo.", type: "Evangelio" },
    { text: "Dios me acepta porque hoy fui productivo.", type: "Legalismo" },
    { text: "No me siento perdonado, así que no lo estoy.", type: "Emocionalismo" },
    { text: "Mi obediencia es una respuesta de amor, no una moneda de cambio.", type: "Evangelio" },
    { text: "Si no sientes fuego al orar, Dios no te escucha.", type: "Misticismo" },
    { text: "El evangelio es para los impíos y también para los cristianos.", type: "Evangelio" }
  ],
  idol: [
    {
      scenario: "Se desespera cuando no le responden rápido.",
      idol: "Aprobación",
      lie: "Si no me buscan, no valgo.",
      gospel: "Cristo ya me aceptó completamente.",
      fruit: "Paciencia y seguridad en Dios."
    },
    {
      scenario: "Se enoja cuando cambian sus planes.",
      idol: "Control",
      lie: "Necesito controlar todo para estar bien.",
      gospel: "Dios sigue siendo soberano aunque yo no controle nada.",
      fruit: "Confianza y flexibilidad."
    },
    {
      scenario: "No puede descansar sin sentirse culpable.",
      idol: "Desempeño",
      lie: "Mi valor depende de producir.",
      gospel: "Cristo ya cumplió perfectamente por mí.",
      fruit: "Descanso y gratitud."
    },
    {
      scenario: "Evita conversaciones difíciles.",
      idol: "Comodidad",
      lie: "El conflicto destruirá mi paz.",
      gospel: "La verdad en amor produce vida.",
      fruit: "Valentía y honestidad."
    },
    {
      scenario: "Necesita tener siempre la razón.",
      idol: "Poder / orgullo",
      lie: "Perder una discusión me hace inferior.",
      gospel: "Mi identidad no depende de ganar.",
      fruit: "Humildad."
    },
    {
      scenario: "Se derrumba cuando fracasa.",
      idol: "Éxito",
      lie: "Fracasar significa que no tengo valor.",
      gospel: "Cristo me ama incluso en mi debilidad.",
      fruit: "Perseverancia."
    },
    {
      scenario: "Se obsesiona con ahorrar por miedo.",
      idol: "Seguridad",
      lie: "El dinero puede protegerme realmente.",
      gospel: "Mi Padre sabe lo que necesito.",
      fruit: "Generosidad y confianza."
    },
    {
      scenario: "No puede dejar una relación tóxica.",
      idol: "Relaciones / aprobación",
      lie: "No puedo vivir sin esa persona.",
      gospel: "Cristo es suficiente y cercano.",
      fruit: "Identidad sana y límites."
    },
    {
      scenario: "Sirve muchísimo pero nunca busca a Dios.",
      idol: "Ministerio / reputación espiritual",
      lie: "Hacer cosas para Dios reemplaza estar con Dios.",
      gospel: "Dios quiere comunión antes que apariencia.",
      fruit: "Dependencia y adoración genuina."
    }
  ],
  counselor: [
    { 
      case: "Una madre está sumida en depresión tras su divorcio; siente que Dios la abandonó.",
      themes: ["Depresión", "Culpa", "Abandono"],
      focus: "Apuntar al amor inmutable de Dios y la identidad en Cristo, no en el estado civil."
    },
    {
      case: "Un joven confiesa que la pornografía es su única vía de escape al estrés universitario.",
      themes: ["Pornografía", "Idolatría del escape", "Estrés"],
      focus: "Detectar el ídolo del escape/comodidad y presentar a Cristo como el verdadero descanso."
    }
  ],
  extreme_heat: [
    {
      level: "Medio",
      heat: "Muerte inesperada de un familiar cercano.",
      steps: ["Calor", "Espinas", "Ídolo", "Mentira", "Cruz", "Fruto"]
    }
  ],
  deep_question: [
    { q: "¿Qué perderías y sentirías que tu vida ya no vale?", target: "Detección de ídolo" },
    { q: "¿Qué pecado justificas más rápidamente?", target: "Confrontación de gracia" },
    { q: "¿Qué 'Egipto' sigues extrañando a pesar de ser libre?", target: "Afectos del corazón" }
  ],
  qa: [
    {q:'¿Cómo define la clase la consejería bíblica?', a:'Es un proceso cristocéntrico y bibliosaturado que, en dependencia del Espíritu Santo, aplica la Palabra a las circunstancias del aconsejado.', diff:'Clase 1'},
    {q:'¿Cuál es el propósito primordial de la consejería?', a:'La transformación del corazón: sus motivaciones, deseos y creencias que impulsan la conducta.', diff:'Clase 1'}
  ],
  '10sec': [
    {q:'...son ejemplos de "calor" en la vida cotidiana.', a:'Un jefe injusto, un hijo desobediente, un mensaje sin respuesta.'},
    {q:'...son respuestas del corazón enredado.', a:'Evadir, catastrofizar, justificarse.'}
  ],
  pass: [
    {word:'CORAZÓN', def:'Fuente de toda motivación, deseo y creencia que impulsa la conducta.', verse:'Proverbios 4:23'},
    {word:'GRACIA', def:'Favor inmerecido de Dios que nos capacita para el cambio.', verse:'Efesios 2:8'},
    {word:'CRUZ', def:'Lugar donde se pagó nuestra culpa y donde morimos al yo.', verse:'Gálatas 2:20'},
    {word:'FE', def:'Certeza de lo que se espera y convicción de lo que no se ve.', verse:'Hebreos 11:1'},
    {word:'AMOR', def:'El vínculo perfecto y cumplimiento de toda la ley.', verse:'1 Corintios 13'},
    {word:'GOZO', def:'Bienestar profundo basado en la relación con Dios, no en circunstancias.', verse:'Filipenses 4:4'},
    {word:'PAZ', def:'Resultado de estar justificados y confiar en la soberanía de Dios.', verse:'Romanos 5:1'},
    {word:'ORACIÓN', def:'Comunicación vital y dependencia constante del Padre.', verse:'1 Tesalonicenses 5:17'},
    {word:'BIBLIA', def:'La Palabra suficiente que discierne los pensamientos del corazón.', verse:'Hebreos 4:12'},
    {word:'PERDÓN', def:'Decisión de cancelar la deuda del otro como Cristo lo hizo con nosotros.', verse:'Colosenses 3:13'},
    {word:'VERDAD', def:'La realidad de Dios que nos hace verdaderamente libres.', verse:'Juan 8:32'},
    {word:'CRISTO', def:'El centro de nuestra consejería y esperanza de gloria.', verse:'Colosenses 1:27'},
    {word:'VIDA', def:'No el simple existir, sino conocer al único Dios verdadero.', verse:'Juan 17:3'},
    {word:'LUZ', def:'Verdad que expone las tinieblas del pecado en el corazón.', verse:'Efesios 5:13'},
    {word:'REINO', def:'El gobierno de Dios sobre nuestras vidas y prioridades.', verse:'Mateo 6:33'},
    {word:'SANTO', def:'Apartado para Dios y transformado a su imagen.', verse:'1 Pedro 1:16'},
    {word:'FRUTO', def:'El resultado natural de permanecer unidos a la Vid verdadera.', verse:'Juan 15:5'},
    {word:'CAMBIO', def:'Metanoia: Renovación del entendimiento para una nueva dirección.', verse:'Romanos 12:2'},
    {word:'ESPERANZA', def:'Expectativa segura basada en el carácter y promesas de Dios.', verse:'Hebreos 6:19'},
    {word:'HUMILDAD', def:'Reconocer nuestra total dependencia y baja estatura ante Dios.', verse:'Santiago 4:6'},
    {word:'OBEDIENCIA', def:'Respuesta de amor a la gracia que Dios nos ha dado.', verse:'Juan 14:15'},
    {word:'SALVACIÓN', def:'Rescate total del pecado, su poder, pena y presencia.', verse:'Efesios 2:8-9'},
    {word:'EVANGELIO', def:'Las buenas noticias de lo que Cristo ya hizo por nosotros.', verse:'1 Corintios 15:3-4'},
    {word:'PECADO', def:'Errar el blanco o rebelarse contra el diseño de Dios.', verse:'Romanos 3:23'},
    {word:'BONDAD', def:'Reflejo del carácter generoso de Dios hacia otros.', verse:'Gálatas 5:22'},
    {word:'PACIENCIA', def:'Soportar el calor y la presión sin responder con espinas.', verse:'Santiago 1:4'},
    {word:'MANSEDUMBRE', def:'Poder bajo control; suavidad en el trato con los demás.', verse:'Mateo 11:29'},
    {word:'FIDELIDAD', def:'Lealtad persistente basada en la fidelidad de Dios.', verse:'Lamentaciones 3:23'},
    {word:'COMUNIDAD', def:'El diseño de Dios para crezcamos unos con otros.', verse:'Hebreos 10:24-25'},
    {word:'DISCIPLINA', def:'El entrenamiento amoroso de Dios para producir justicia.', verse:'Hebreos 12:11'},
    // Intermedio
    {word:'REDENCIÓN', def:'Comprados por precio para ser propiedad de Dios.', verse:'1 Corintios 6:20'},
    {word:'JUSTIFICACIÓN', def:'Declaración legal de justicia por medio de la fe en Cristo.', verse:'Romanos 5:1'},
    {word:'SANTIFICACIÓN', def:'Proceso progresivo de ser hechos más como Jesús.', verse:'1 Tesalonicenses 4:3'},
    {word:'RECONCILIACIÓN', def:'Restauración de una relación rota entre Dios y el hombre.', verse:'2 Corintios 5:18'},
    {word:'DEPENDENCIA', def:'Actitud de "vástago" que sabe que separado de la Vid nada puede hacer.', verse:'Juan 15:5'},
    {word:'IDOLATRÍA', def:'Cualquier cosa que amamos o deseamos más que a Dios.', verse:'1 Juan 5:21'},
    {word:'ARREPENTIMIENTO', def:'Abandono del pecado y vuelta hacia Dios con intención de obedecer.', verse:'Hechos 3:19'},
    {word:'PERSEVERANCIA', def:'Mantener la fe a pesar de las pruebas prolongadas.', verse:'Santiago 1:12'},
    {word:'MISERICORDIA', def:'Dios no nos da el castigo que merecemos.', verse:'Tito 3:5'},
    {word:'SOBERANÍA', def:'El control absoluto de Dios sobre todo detalle de la vida.', verse:'Salmo 115:3'},
    {word:'RESTAURACIÓN', def:'Devolver algo a su estado original de gloria y utilidad.', verse:'Gálatas 6:1'},
    {word:'ADORACIÓN', def:'Atribución de valor supremo a Dios en todo lo que hacemos.', verse:'Romanos 12:1'},
    {word:'TENTACIÓN', def:'Incitación al mal que pone a prueba la raíz del corazón.', verse:'1 Corintios 10:13'},
    {word:'COMPASIÓN', def:'Sufrir con el otro y movilizarse para su bien.', verse:'Colosenses 3:12'},
    {word:'INTEGRIDAD', def:'Ser el mismo en lo privado y en lo público por temor a Dios.', verse:'Salmo 15:2'},
    {word:'TRANSFORMACIÓN', def:'Metamorfosis espiritual de adentro hacia afuera.', verse:'2 Corintios 3:18'},
    {word:'CONSUELO', def:'El ánimo de Dios que nos ayuda en toda tribulación.', verse:'2 Corintios 1:3-4'},
    {word:'SABIDURÍA', def:'Aplicar la verdad divina a las situaciones de la vida.', verse:'Santiago 1:5'},
    {word:'FORTALEZA', def:'Poder divino en nuestra debilidad para resistir y actuar.', verse:'2 Corintios 12:9'},
    {word:'CONVICCIÓN', def:'Seguridad producida por el Espíritu sobre el pecado y la verdad.', verse:'Juan 16:8'},
    {word:'PUREZA', def:'Limpieza de corazón y de motivos ante los ojos de Dios.', verse:'Mateo 5:8'},
    {word:'INTERCESIÓN', def:'Orar a favor de otros siguiendo el ejemplo de Cristo.', verse:'Hebreos 7:25'},
    {word:'REVELACIÓN', def:'Dios dando a conocer lo que de otra forma sería oculto.', verse:'Efesios 1:17'},
    {word:'COMUNIÓN', def:'Participación mutua en la vida de Cristo con el cuerpo.', verse:'1 Juan 1:3'},
    {word:'DISCIPULADO', def:'Seguir a Jesús y enseñar a otros a hacer lo mismo.', verse:'Mateo 28:19'},
    {word:'SUMISIÓN', def:'Rendición voluntaria por amor y honor a Dios.', verse:'Efesios 5:21'},
    {word:'GRATITUD', def:'Reconocimiento gozoso de los beneficios recibidos de Dios.', verse:'1 Tesalonicenses 5:18'},
    {word:'ETERNIDAD', def:'La perspectiva de lo que nunca perece; vivir ante la eternidad.', verse:'2 Corintios 4:18'},
    // Avanzado y Trampa
    {word:'AUTOSUFICIENCIA', def:'La mentira de que podemos vivir sin depender de Dios.', verse:'Juan 15:5'},
    {word:'MORALISMO', def:'Intentar cambiar la conducta sin cambiar el corazón.', verse:'Mateo 23:25-26'},
    {word:'LEGALISMO', def:'Confiar en el cumplimiento de leyes para ganar favor divino.', verse:'Gálatas 2:16'},
    {word:'PROPICIACIÓN', def:'Aplacar la justa ira de Dios mediante un sacrificio.', verse:'1 Juan 2:2'},
    {word:'REGENERACIÓN', def:'El nuevo nacimiento obrado por el Espíritu Santo.', verse:'Tito 3:5'},
    {word:'GLORIFICACIÓN', def:'El estado final del creyente libre de toda presencia de pecado.', verse:'Romanos 8:30'},
    {word:'DEPRAVACIÓN', def:'La corrupción total del hombre en todas sus facultades.', verse:'Romanos 3:10-12'},
    {word:'HIPOCRESÍA', def:'Actuar una piedad externa que no existe en el corazón.', verse:'Mateo 15:7-8'},
    {word:'INCREDULIDAD', def:'Raíz de pecado que no confía en el carácter o Palabra de Dios.', verse:'Hebreos 3:12'},
    {word:'EXPIACIÓN', def:'Cubrir o borrar la falta mediante un sustituto.', verse:'Hebreos 9:22'},
    {word:'EGIPTO', def:'Símbolo de la esclavitud pasada y el viejo hombre.', verse:'Éxodo 20:2'},
    {word:'DESIERTO', def:'Lugar de prueba donde Dios revela lo que hay en el corazón.', verse:'Deuteronomio 8:2'},
    {word:'ESPINAS', def:'Respuestas pecaminosas (conducta) ante las presiones de la vida.', verse:'Jeremías 17:5'},
    {word:'CALOR', def:'Presiones o bendiciones que exacerban lo que hay en el corazón.', verse:'Santiago 1:2'},
    {word:'ÍDOLO', def:'Un deseo bueno que se volvió una exigencia absoluta.', verse:'Ezequiel 14:3'},
    {word:'GÓLGOTA', def:'El lugar de la calavera: donde el pecado fue derrotado.', verse:'Juan 19:17'},
    {word:'TESORO', def:'Aquello donde hemos puesto nuestro corazón y valor supremo.', verse:'Mateo 6:21'},
    {word:'ANSIEDAD', def:'Preocupación que olvida la soberanía y cuidado del Padre.', verse:'Filipenses 4:6'},
    {word:'SUSTITUCIÓN', def:'Cristo en nuestro lugar, recibiendo lo que nosotros merecíamos.', verse:'2 Corintios 5:21'},
    // Experto
    {word:'CONCUPISCENCIA', def:'Deseos desordenados o intensos que nos inclinan al mal.', verse:'Santiago 1:14-15'},
    {word:'IRREPROCHABLE', def:'Vivir de tal modo que no haya acusación legítima contra uno.', verse:'1 Timoteo 3:2'},
    {word:'INMUTABILIDAD', def:'El atributo de Dios por el cual Él nunca cambia.', verse:'Malaquías 3:6'},
    {word:'PREEMINENCIA', def:'El lugar de supremacía absoluta que Cristo debe tener.', verse:'Colosenses 1:18'},
    {word:'OMNISCIENCIA', def:'El conocimiento total y perfecto de Dios sobre todo corazón.', verse:'1 Juan 3:20'},
  ],
  who: [
    {name:'JONÁS', easy:'Obedeció pero se fue furioso cuando todo salió bien.', hard:'Su conducta cambió bajo presión pero su corazón nunca se rindió. Jon. 4.', type:'Personaje bíblico'}
  ],
  verse: [
    {topic:'que Dios es quien terminará la obra que comenzó', answer:'Filipenses 1:6 — "El que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo."', ref:'Fil. 1:6'}
  ],
  mime: [
    {concept:'El calor revela', desc:'Apretar una fruta imaginaria y mostrar lo que sale. Señalar el corazón.', diff:'Fácil', lesson:'Calor y Espinas'}
  ]
};
