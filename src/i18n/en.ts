import type {
  InterventionContentItem,
  InterventionOption,
  NotificationOpenedAnswer,
  TemporalOrientation,
} from '../domain/types'
import type { I18nDictionary } from './types'

const interventionOrder: InterventionOption[] = [
  'feel-present',
  'breathe',
  'externalize-thought',
  'body-grounding',
  'name-the-experience',
]

export const en: I18nDictionary = {
  app: {
    name: 'LOOP-OUT',
    logoAlt: 'Loop-Out logo',
    tagline: 'Return to the present',
    temporalityImageAlt: 'Temporality',
    attentionImageAlt: 'Attention',
    pauseImageAlt: 'Pause',
    interventionPauseImageAlt: 'Intervention pause',
    primaryEmotionImageAlt: 'Primary emotion',
    recognitionImageAlt: 'Recognition',
  },
  common: {
    yes: 'Yes',
    no: 'No',
    continue: 'Continue',
    finish: 'Finish',
    start: 'Start',
    back: 'Go back',
    history: 'View history',
    restart: 'Start over',
    backToStart: 'Back to start',
  },
  components: {
    intensitySlider: {
      ariaLabel: 'Loop intensity',
    },
    screenShell: {
      historyLink: 'History',
      aboutLink: 'About LOOP-OUT',
      footerNavAriaLabel: 'Secondary navigation',
      versionLabel: (version: string) => `Version ${version}`,
    },
    installNotice: {
      title: 'Install LOOP-OUT to use it as an app',
      installPrompt: 'Get back faster and resume the flow with a single tap from your home screen.',
      iosInstructions: 'On iPhone, open Share and tap <strong>Add to Home Screen</strong>.',
      installAction: 'Install',
      dismissAction: 'Not now',
      dontShowAgainAction: "Don't show again",
    },
    updateNotice: {
      title: 'A new version is available',
      text: 'If you are connected to the internet, you can update the app to apply the latest changes.',
      updateAction: 'Update',
      updating: 'Updating...',
      dismissAction: 'Not now',
    },
  },
  domain: {
    intensityLabelByLevel: {
      1: 'Very low',
      2: 'Low',
      3: 'Medium',
      4: 'High',
      5: 'Very high',
    },
    emotionOptions: ['Sadness', 'Fear', 'Anger', 'Disgust', 'Shame', 'Guilt'],
    relatedFeelingsOptionsByEmotion: {
      Sadness: [
        'Bitterness',
        'Sorrow',
        'Heartbreak',
        'Pessimism',
        'Melancholy',
        'Loneliness',
        'Discouragement',
        'Despair',
        'Self-pity',
      ],
      Fear: [
        'Anxiety',
        'Apprehension',
        'Fear',
        'Worry',
        'Insignificance',
        'Restlessness',
        'Insecurity',
        'Terror',
        'Panic',
      ],
      Anger: [
        'Annoyance',
        'Rage',
        'Resentment',
        'Exasperation',
        'Indignation',
        'Bitterness',
        'Dislike',
        'Hostility',
        'Hatred',
      ],
      Disgust: [
        'Displeasure',
        'Contempt',
        'Scorn',
        'Revulsion',
        'Rejection',
        'Aversion',
        'Repulsion',
      ],
      Shame: [
        'Embarrassment',
        'Humiliation',
        'Discomfort',
        'Awkwardness',
        'Ridicule',
        'Inferiority',
        'Vulnerability',
        'Modesty',
      ],
      Guilt: [
        'Remorse',
        'Regret',
        'Sorrow',
        'Self-reproach',
        'Responsibility',
        'Embarrassment',
        'Penance',
      ],
    },
    orientationLabelByValue: {
      past: 'past',
      future: 'future',
    } as Record<TemporalOrientation, string>,
    interventionLabelByValue: {
      'feel-present': 'Feel the present',
      breathe: 'Breathe to lower the volume',
      'externalize-thought': 'Put the thought outside yourself',
    } as Record<InterventionOption, string>,
    interventionContent: {
      'feel-present': {
        title: 'Feel the present',
        durationSeconds: 45,
        body: [
          'Look around and find three things you can see, two you can touch, and one you can hear.',
          'Keep your attention on each one for a few seconds.',
        ],
        extraInfo: [
          'The 3-2-1 technique is a simple sensory orientation exercise that helps anchor attention in the immediate environment.',
          'Directing attention to present stimuli can temporarily interrupt cycles of rumination or worry.',
        ],
      },
      breathe: {
        title: 'Breathe to lower the volume',
        durationSeconds: 30,
        body: [
          'Take a deep breath in through your nose.',
          'Let the air out slowly through your mouth.',
          'Repeat the cycle three times, trying to make the exhale slower than the inhale.',
        ],
        extraInfo: [
          'Slow exhalations support activation of the parasympathetic nervous system.',
          'A calm breathing rhythm can reduce the physical activation linked to stress.',
        ],
      },
      'externalize-thought': {
        title: 'Put the thought outside yourself',
        durationSeconds: 60,
        body: [
          'Write this sentence: "I am having the thought that..."',
          'Complete it with what is going through your mind right now.',
        ],
        extraInfo: [
          'Naming the thought helps create psychological distance between the person and the mental content.',
          'This kind of phrasing is used in acceptance-based therapies to reduce cognitive fusion.',
        ],
      },
      'body-grounding': {
        title: 'Ground your body',
        durationSeconds: 40,
        body: [
          'Place both feet firmly on the floor.',
          'Rest your hands on your thighs or on the table.',
          'Notice your body making contact with the environment for a few seconds.',
        ],
        extraInfo: [
          'Paying attention to bodily sensations can help stabilize emotional activation.',
          'Grounding techniques are used to recover a sense of orientation and control during mental overload.',
        ],
      },
      'name-the-experience': {
        title: 'Name what is happening',
        durationSeconds: 30,
        body: [
          'Say silently: "I am noticing a loop of thoughts."',
          'Add: "This is a difficult emotion, but I can observe it."',
        ],
        extraInfo: [
          'Naming the emotional experience can reduce its subjective intensity.',
          'This process, known as affect labeling, is associated with better emotional regulation.',
        ],
      },
    } as Record<InterventionOption, InterventionContentItem>,
    interventionOrder,
  },
  pages: {
    detection: {
      title: 'Do you need a breather?',
      subtitle: "Let's go step by step.",
      continueWhereLeft: 'Continue where you left off',
      restartFlow: 'Start over',
    },
    estimation: {
      title: 'How would you rate the intensity of the mental noise right now?',
    },
    temporalOrientation: {
      title: 'Is this thought focused on the past or the future?',
      past: 'Past',
      future: 'Future',
    },
    primaryEmotion: {
      title: 'Which emotion is this mainly causing?',
      radioAriaLabel: 'Primary emotion',
    },
    relatedFeelings: {
      title: 'Which feelings are closest to what you are experiencing right now?',
      subtitle: 'Choose the ones that best match within that primary emotion.',
      groupAriaLabel: 'Related feelings',
    },
    recognition: {
      title: 'Conscious recognition',
      confirmationQuestion: 'Is that right?',
      summary: (params: {
        orientation: string
        intensity: string
        primaryEmotionUpper: string
        relatedFeelingsLower: string
      }) =>
        `You are caught in a mental loop about the ${params.orientation} with <strong>${params.intensity}</strong> intensity, awakening ${params.primaryEmotionUpper} and feelings of ${params.relatedFeelingsLower}.`,
    },
    attentionCheck: {
      title: 'Since opening this app, have you checked any phone notifications?',
    },
    microIntervention: {
      title: 'Brief recovery pause',
      instructionByNotificationAnswer: {
        yes: "Before continuing, let's recover your attention. Turn on Do Not Disturb for a few minutes or place your phone face down.",
        no: 'Perfect. Once you click the button, the pause will begin.',
      } as Record<NotificationOpenedAnswer, string>,
      pauseSetup: 'Keep your phone aside for a few seconds, until you hear the bell.',
      timer: (seconds: number) => `Breathe calmly... ${seconds}s`,
      startPause: '⌛ Start pause',
      waitForEndBell: 'Wait for the ending bell',
    },
    intervention: {
      title: 'Which exercise do you feel able to do right now?',
      summary: (params: {
        orientation: string
        intensity: string
        primaryEmotionUpper: string
        relatedFeelingsLower: string
      }) =>
        `You know you are in a mental loop about the ${params.orientation} with <strong>${params.intensity}</strong> intensity, generating ${params.primaryEmotionUpper} and feelings of ${params.relatedFeelingsLower}.`,
    },
    interventionTimer: {
      title: 'Exercise in progress',
      intro: (params: { title: string; seconds: number }) =>
        `You are about to do <strong>${params.title}</strong>. You have ${params.seconds} seconds.`,
      setup: 'Set the phone aside and pick it up again when the bell rings.',
      extraInfoTitle: 'Did you know...?',
      extraInfoButtonAriaLabel: 'View extra information',
      extraInfoCloseAriaLabel: 'Close extra information',
      timer: (seconds: number) => `Time remaining: ${seconds}s`,
      start: 'Start exercise',
      goToEvaluation: 'Go to final evaluation',
      waitForEndBell: 'Waiting for ending bell',
    },
    evaluation: {
      title: 'How intense is the loop now?',
      feedbackImageAlt: 'Reevaluation result',
      tryAnotherTask: 'Try another task',
      evaluate: 'Evaluate',
      feedbackLow: 'Well done. You managed to lower the volume of the loop.',
      feedbackMedium: 'You are moving in the right direction. Sometimes it takes several attempts. Do you want to try another exercise?',
      feedbackHigh: 'Loops can be persistent. Trying another exercise may help weaken it.',
      notNow: 'Not now',
      noProblem: 'It is okay to stop here. Detecting the loop and noticing it is already an important step.',
      continueToFarewell: 'Continue',
      farewell: 'Thank you for giving yourself this moment. Even small changes help restore clarity.',
    },
    history: {
      title: 'Recent history',
      subtitle: 'Your latest attempts are stored only on this device.',
      empty: 'There are no saved attempts yet.',
      progressSummary: 'The line shows how much the intensity changed in each attempt compared with the starting point.',
      scoreCardLabel: 'Recent trend score',
      scoreEyebrow: 'Recent trend',
      scoreOutOfLabel: '/ 100',
      scorePositiveLabel: 'Positive trend',
      scoreStableLabel: 'Stable trend',
      scoreNeedsCareLabel: 'Needs more attempts',
      metricsLabel: 'Progress summary',
      totalAttemptsLabel: 'attempts',
      improvedAttemptsLabel: 'with lower intensity',
      averageReductionLabel: 'average reduction',
      chartAriaLabel: 'Intensity change chart by attempt',
      chartCaption: 'Green points indicate improvement at the end; red points indicate worsening.',
      orientationLabel: 'Loop about the',
      intensityLabel: 'Intensity:',
      primaryEmotionLabel: 'Primary emotion:',
      relatedFeelingsLabel: 'Feelings:',
      interventionsLabel: 'Interventions:',
    },
    about: {
      title: 'About LOOP-OUT',
      subtitle: 'A brief tool to recover presence when a mental loop appears.',
      therapeuticPrinciples: {
        title: 'Therapeutic principles',
        intro: 'LOOP-OUT is designed as a simple self-regulation tool to help you:',
        items: [
          'detect mental loops',
          'name what is happening',
          'recover attention',
          'choose a brief grounding intervention',
          'observe whether the intensity of the loop changes',
        ],
        supportNotice:
          'It is not psychotherapy or a diagnostic tool. It is momentary support and does not replace professional mental health care.',
      },
      privacy: {
        title: 'Privacy',
        intro: 'Information is handled with a minimal-exposure approach:',
        items: [
          'data is stored only in your own browser',
          'you do not need to create an account',
          'your personal history is not sent to any server',
          'it works in airplane mode after the first load',
        ],
        closing: 'The goal is to reduce data exposure to only what is strictly necessary.',
      },
      openSource: {
        title: 'Open source',
        intro: 'The project is open and meant to be inspectable. This decision aims to support three principles:',
        values: ['transparency', 'trust', 'collaborative improvement'],
        repositoryLabel: 'Repository: github.com/devilcius/loop-out',
        repositoryUrl: 'https://github.com/devilcius/loop-out/',
      },
      acknowledgements: {
        title: 'Acknowledgements',
        copy: 'Thanks to Psicologia Crisalida for their guidance and contributions to the tool approach.',
        websiteLabel: 'psicologiacrisalida.com',
        websiteUrl: 'https://psicologiacrisalida.com',
      },
    },
    notFound: {
      title: 'This route does not exist',
    },
  },
}
