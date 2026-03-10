import type {
  InterventionContentItem,
  InterventionOption,
  NotificationOpenedAnswer,
  TemporalOrientation,
} from "../domain/types";

const interventionOrder: InterventionOption[] = [
  "feel-present",
  "breathe",
  "externalize-thought",
  "body-grounding",
  "name-the-experience",
];

export const es = {
  app: {
    name: "LOOP-OUT",
    logoAlt: "Loop-Out logo",
    tagline: "Vuelve al presente",
    temporalityImageAlt: "Temporalidad",
    attentionImageAlt: "Atención",
    pauseImageAlt: "Pausa",
    interventionPauseImageAlt: "Pausa de intervención",
    primaryEmotionImageAlt: "Emoción principal",
    recognitionImageAlt: "Reconocimiento",
  },
  common: {
    yes: "Sí",
    no: "No",
    continue: "Continuar",
    finish: "Finalizar",
    start: "Comenzar",
    back: "Volver atrás",
    history: "Ver historial",
    restart: "Volver a empezar",
    backToStart: "Volver al inicio",
  },
  components: {
    intensitySlider: {
      ariaLabel: "Intensidad del bucle",
    },
    screenShell: {
      historyLink: "Ver historial",
    },
  },
  domain: {
    intensityLabelByLevel: {
      1: "Muy baja",
      2: "Baja",
      3: "Media",
      4: "Alta",
      5: "Muy alta",
    },
    emotionOptions: [
      "Ansiedad",
      "Miedo",
      "Tristeza",
      "Ira",
      "Culpa",
      "Vergüenza",
      "Frustración",
      "Agobio",
    ],
    relatedFeelingsOptions: [
      "Inquietud",
      "Tensión",
      "Cansancio",
      "Nudo en el estómago",
      "Irritabilidad",
      "Bloqueo",
      "Desánimo",
      "Impaciencia",
      "Presión",
      "Sensación de pérdida de control",
    ],
    orientationLabelByValue: {
      past: "pasado",
      future: "futuro",
    } as Record<TemporalOrientation, string>,
    interventionLabelByValue: {
      "feel-present": "Sentir el presente",
      breathe: "Respirar para bajar el volumen",
      "externalize-thought": "Sacar el pensamiento fuera",
    } as Record<InterventionOption, string>,
    interventionContent: {
      "feel-present": {
        title: "Sentir el presente",
        durationSeconds: 45,
        body: [
          "Mira a tu alrededor y encuentra tres cosas que puedas ver, dos que puedas tocar y una que puedas oír.",
          "Detén tu atención unos segundos en cada una.",
        ],
        extraInfo: [
          "La técnica 3-2-1 es una forma sencilla de orientación sensorial que ayuda a anclar la atención en el entorno inmediato.",
          "Al dirigir la atención a estímulos presentes se puede interrumpir temporalmente el ciclo de rumiación o preocupación.",
        ],
      },
      breathe: {
        title: "Respirar para bajar el volumen",
        durationSeconds: 30,
        body: [
          "Haz una inhalación profunda por la nariz.",
          "Suelta el aire lentamente por la boca.",
          "Repite el ciclo tres veces, procurando que la exhalación sea más lenta que la inhalación.",
        ],
        extraInfo: [
          "Las exhalaciones lentas favorecen la activación del sistema nervioso parasimpático.",
          "Un ritmo respiratorio pausado puede reducir la activación fisiológica asociada al estrés.",
        ],
      },
      "externalize-thought": {
        title: "Sacar el pensamiento fuera",
        durationSeconds: 60,
        body: [
          'Escribe esta frase: "Estoy teniendo el pensamiento de que..."',
          "Complétala con lo que está pasando por tu cabeza ahora.",
        ],
        extraInfo: [
          "Nombrar el pensamiento ayuda a crear distancia psicológica entre la persona y el contenido mental.",
          "Este tipo de formulación se utiliza en terapias basadas en aceptación para reducir la fusión cognitiva.",
        ],
      },
      "body-grounding": {
        title: "Anclar el cuerpo",
        durationSeconds: 40,
        body: [
          "Coloca ambos pies firmemente en el suelo.",
          "Apoya las manos sobre tus muslos o sobre la mesa.",
          "Percibe el contacto del cuerpo con el entorno durante unos segundos.",
        ],
        extraInfo: [
          "La atención a las sensaciones corporales puede ayudar a estabilizar la activación emocional.",
          "Las técnicas de grounding se utilizan para recuperar sensación de orientación y control en momentos de sobrecarga mental.",
        ],
      },
      "name-the-experience": {
        title: "Nombrar lo que está pasando",
        durationSeconds: 30,
        body: [
          'Di mentalmente: "Estoy notando un bucle de pensamientos".',
          'Añade: "Esto es una emoción difícil, pero puedo observarla".',
        ],
        extraInfo: [
          "Poner nombre a la experiencia emocional puede reducir su intensidad subjetiva.",
          "Este proceso, conocido como etiquetado emocional, está asociado a una mayor regulación de la respuesta emocional.",
        ],
      },
    } as Record<InterventionOption, InterventionContentItem>,
    interventionOrder,
  },
  pages: {
    detection: {
      title: "¿Necesitas un respiro?",
      subtitle: "Vamos paso a paso.",
      continueWhereLeft: "Continuar donde lo dejaste",
      restartFlow: "Empezar de nuevo",
    },
    estimation: {
      title: "¿Cómo valoras la intensidad del ruido mental?",
    },
    temporalOrientation: {
      title: "¿Este pensamiento gira en torno al pasado o al futuro?",
      past: "Pasado",
      future: "Futuro",
    },
    primaryEmotion: {
      title: "¿Qué emoción te provoca principalmente?",
      radioAriaLabel: "Emoción principal",
    },
    relatedFeelings: {
      title:
        "¿Qué sentimientos se acercan más a lo que estás experimentando ahora?",
      subtitle: "Selecciona los que más se aproximen.",
      groupAriaLabel: "Sentimientos relacionados",
    },
    recognition: {
      title: "Reconocimiento consciente",
      confirmationQuestion: "¿Es correcto?",
      summary: (params: {
        orientation: string;
        intensity: string;
        primaryEmotionUpper: string;
        relatedFeelingsLower: string;
      }) =>
        `Estás siendo presa de un bucle mental del ${params.orientation} de intensidad <strong>${params.intensity}</strong> que despierta en ti ${params.primaryEmotionUpper} y sentimientos de ${params.relatedFeelingsLower}.`,
    },
    attentionCheck: {
      title:
        "Desde que abriste esta aplicación, ¿te ha llegado alguna notificación al móvil? ¿La has abierto?",
    },
    microIntervention: {
      title: "Pausa breve de recuperación",
      instructionByNotificationAnswer: {
        yes: "Antes de continuar, vamos a recuperar tu atención. Activa el modo No molestar durante unos minutos o deja el móvil boca abajo.",
        no: "Perfecto. Al hacer clic en el botón empezará la pausa.",
      } as Record<NotificationOpenedAnswer, string>,
      pauseSetup: "Mantén el móvil a un lado unos segundos, hasta que suene la campana",
      timer: (seconds: number) => `Respira con calma... ${seconds}s`,
      startPause: "Iniciar pausa",
      waitForEndBell: "Espera la campana de cierre",
    },
    intervention: {
      title: "¿Qué ejercicio te ves en grado de realizar ahora?",
      summary: (params: {
        orientation: string;
        intensity: string;
        primaryEmotionUpper: string;
        relatedFeelingsLower: string;
      }) =>
        `Sabes que estás en un bucle mental del ${params.orientation} de intensidad <strong>${params.intensity}</strong> que te genera ${params.primaryEmotionUpper} y sentimientos de ${params.relatedFeelingsLower}.`,
    },
    interventionTimer: {
      title: "Ejecución del ejercicio",
      intro: (params: { title: string; seconds: number }) =>
        `Vas a realizar <strong>${params.title}</strong>. Dispones de ${params.seconds} segundos.`,
      setup: "Pon el móvil de lado y vuelve a tomarlo cuando suene la campana.",
      extraInfoTitle: "¿Sabías que…?",
      extraInfoButtonAriaLabel: "Ver información extra",
      extraInfoCloseAriaLabel: "Cerrar información extra",
      timer: (seconds: number) => `Tiempo restante: ${seconds}s`,
      start: "Iniciar ejercicio",
      goToEvaluation: "Ir a evaluación final",
      waitForEndBell: "Esperando campana de cierre",
    },
    evaluation: {
      title: "¿Cómo está ahora la intensidad del bucle?",
      feedbackImageAlt: "Resultado de la reevaluación",
      tryAnotherTask: "Probar otra tarea",
      evaluate: "Evaluar",
      feedbackLow: "Bien hecho. Has conseguido bajar el volumen del bucle.",
      feedbackMedium:
        "Vas en la buena dirección. A veces hacen falta varios intentos. ¿Quieres probar otro ejercicio?",
      feedbackHigh:
        "Los bucles pueden ser persistentes. Probar otro ejercicio puede ayudarte a debilitarlo.",
      notNow: "Ahora no",
      noProblem:
        "Está bien parar aquí. Detectar el bucle y observarlo ya es un paso importante.",
      continueToFarewell: "Continuar",
      farewell:
        "Gracias por dedicarte este momento. Incluso los cambios pequeños ayudan a recuperar claridad.",
    },
    history: {
      title: "Historial reciente",
      subtitle: "Tus últimos intentos se guardan solo en este dispositivo.",
      empty: "Todavía no hay intentos guardados.",
      orientationLabel: "Bucle del",
      intensityLabel: "Intensidad:",
      primaryEmotionLabel: "Emoción principal:",
      relatedFeelingsLabel: "Sentimientos:",
      interventionsLabel: "Intervenciones:",
    },
    notFound: {
      title: "Esta ruta no existe",
    },
  },
};
