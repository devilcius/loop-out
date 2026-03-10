import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StepGuard } from '../components/StepGuard'
import { AboutPage } from '../pages/AboutPage'
import { AttentionCheckPage } from '../pages/AttentionCheckPage'
import { DetectionPage } from '../pages/DetectionPage'
import { EstimationPage } from '../pages/EstimationPage'
import { EvaluationPage } from '../pages/EvaluationPage'
import { EvaluationFeedbackPage } from '../pages/EvaluationFeedbackPage'
import { HistoryPage } from '../pages/HistoryPage'
import { InterventionPage } from '../pages/InterventionPage'
import { InterventionTimerPage } from '../pages/InterventionTimerPage'
import { MicroInterventionPage } from '../pages/MicroInterventionPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PrimaryEmotionPage } from '../pages/PrimaryEmotionPage'
import { RecognitionPage } from '../pages/RecognitionPage'
import { RelatedFeelingsPage } from '../pages/RelatedFeelingsPage'
import { TemporalOrientationPage } from '../pages/TemporalOrientationPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DetectionPage />} />
        <Route path="/estimation" element={<EstimationPage />} />
        <Route
          path="/temporal-orientation"
          element={
            <StepGuard step={3}>
              <TemporalOrientationPage />
            </StepGuard>
          }
        />
        <Route
          path="/primary-emotion"
          element={
            <StepGuard step={4}>
              <PrimaryEmotionPage />
            </StepGuard>
          }
        />
        <Route
          path="/related-feelings"
          element={
            <StepGuard step={5}>
              <RelatedFeelingsPage />
            </StepGuard>
          }
        />
        <Route
          path="/recognition"
          element={
            <StepGuard step={6}>
              <RecognitionPage />
            </StepGuard>
          }
        />
        <Route
          path="/attention"
          element={
            <StepGuard step={7}>
              <AttentionCheckPage />
            </StepGuard>
          }
        />
        <Route
          path="/pause"
          element={
            <StepGuard step={8}>
              <MicroInterventionPage />
            </StepGuard>
          }
        />
        <Route
          path="/intervention"
          element={
            <StepGuard step={9}>
              <InterventionPage />
            </StepGuard>
          }
        />
        <Route
          path="/intervention-pause"
          element={
            <StepGuard step={10}>
              <InterventionTimerPage />
            </StepGuard>
          }
        />
        <Route
          path="/evaluation"
          element={
            <StepGuard step={11}>
              <EvaluationPage />
            </StepGuard>
          }
        />
        <Route
          path="/evaluation-feedback"
          element={
            <StepGuard step={12}>
              <EvaluationFeedbackPage />
            </StepGuard>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/inicio" element={<Navigate replace to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
