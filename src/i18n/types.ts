import type {
  InterventionContentItem,
  InterventionOption,
  NotificationOpenedAnswer,
  TemporalOrientation,
} from '../domain/types'

export interface I18nDictionary {
  app: {
    name: string
    logoAlt: string
    tagline: string
    temporalityImageAlt: string
    attentionImageAlt: string
    pauseImageAlt: string
    interventionPauseImageAlt: string
    primaryEmotionImageAlt: string
    recognitionImageAlt: string
  }
  common: {
    yes: string
    no: string
    continue: string
    finish: string
    start: string
    back: string
    history: string
    restart: string
    backToStart: string
  }
  components: {
    intensitySlider: {
      ariaLabel: string
    }
    screenShell: {
      historyLink: string
      aboutLink: string
      footerNavAriaLabel: string
      versionLabel: (version: string) => string
    }
    installNotice: {
      title: string
      installPrompt: string
      iosInstructions: string
      installAction: string
      dismissAction: string
      dontShowAgainAction: string
    }
    updateNotice: {
      title: string
      text: string
      updateAction: string
      updating: string
      dismissAction: string
    }
  }
  domain: {
    intensityLabelByLevel: Record<number, string>
    emotionOptions: string[]
    relatedFeelingsOptionsByEmotion: Record<string, string[]>
    orientationLabelByValue: Record<TemporalOrientation, string>
    interventionLabelByValue: Record<InterventionOption, string>
    interventionContent: Record<InterventionOption, InterventionContentItem>
    interventionOrder: InterventionOption[]
  }
  pages: {
    detection: {
      title: string
      subtitle: string
      continueWhereLeft: string
      restartFlow: string
    }
    estimation: {
      title: string
    }
    temporalOrientation: {
      title: string
      past: string
      future: string
    }
    primaryEmotion: {
      title: string
      radioAriaLabel: string
    }
    relatedFeelings: {
      title: string
      subtitle: string
      groupAriaLabel: string
    }
    recognition: {
      title: string
      confirmationQuestion: string
      summary: (params: {
        orientation: string
        intensity: string
        primaryEmotionUpper: string
        relatedFeelingsLower: string
      }) => string
    }
    attentionCheck: {
      title: string
    }
    microIntervention: {
      title: string
      instructionByNotificationAnswer: Record<NotificationOpenedAnswer, string>
      pauseSetup: string
      timer: (seconds: number) => string
      startPause: string
      waitForEndBell: string
    }
    intervention: {
      title: string
      summary: (params: {
        orientation: string
        intensity: string
        primaryEmotionUpper: string
        relatedFeelingsLower: string
      }) => string
    }
    interventionTimer: {
      title: string
      intro: (params: { title: string; seconds: number }) => string
      setup: string
      extraInfoTitle: string
      extraInfoButtonAriaLabel: string
      extraInfoCloseAriaLabel: string
      timer: (seconds: number) => string
      start: string
      goToEvaluation: string
      waitForEndBell: string
    }
    evaluation: {
      title: string
      feedbackImageAlt: string
      tryAnotherTask: string
      evaluate: string
      feedbackLow: string
      feedbackMedium: string
      feedbackHigh: string
      notNow: string
      noProblem: string
      continueToFarewell: string
      farewell: string
    }
    history: {
      title: string
      subtitle: string
      empty: string
      progressSummary: string
      scoreCardLabel: string
      scoreEyebrow: string
      scoreOutOfLabel: string
      scorePositiveLabel: string
      scoreStableLabel: string
      scoreNeedsCareLabel: string
      metricsLabel: string
      totalAttemptsLabel: string
      improvedAttemptsLabel: string
      averageReductionLabel: string
      chartAriaLabel: string
      chartCaption: string
      orientationLabel: string
      intensityLabel: string
      primaryEmotionLabel: string
      relatedFeelingsLabel: string
      interventionsLabel: string
    }
    about: {
      title: string
      subtitle: string
      therapeuticPrinciples: {
        title: string
        intro: string
        items: string[]
        supportNotice: string
      }
      privacy: {
        title: string
        intro: string
        items: string[]
        closing: string
      }
      openSource: {
        title: string
        intro: string
        values: string[]
        repositoryLabel: string
        repositoryUrl: string
      }
      acknowledgements: {
        title: string
        copy: string
        websiteLabel: string
        websiteUrl: string
      }
    }
    notFound: {
      title: string
    }
  }
}
