export type TemporalOrientation = "past" | "future";

export type NotificationOpenedAnswer = "yes" | "no";

export type InterventionOption =
  | "feel-present"
  | "breathe"
  | "externalize-thought"
  | "body-grounding"
  | "name-the-experience";

export interface InterventionContentItem {
  title: string;
  durationSeconds: number;
  body: string[];
  extraInfo: string[];
}

export interface CurrentSession {
  initialIntensity: number | null;
  temporalOrientation: TemporalOrientation | null;
  primaryEmotion: string | null;
  relatedFeelings: string[];
  notificationOpened: NotificationOpenedAnswer | null;
  activeIntervention: InterventionOption | null;
  interventionReady: boolean;
  selectedInterventions: InterventionOption[];
  finalIntensity: number | null;
  createdAt: string;
  updatedAt: string;
  currentStep: number;
}

export interface AttemptRecord {
  id: string;
  initialIntensity: number;
  finalIntensity: number;
  temporalOrientation: TemporalOrientation;
  primaryEmotion: string;
  relatedFeelings: string[];
  selectedInterventions: InterventionOption[];
  completedAt: string;
}

export interface PersistedData {
  currentSession: CurrentSession;
  attemptsHistory: AttemptRecord[];
}
