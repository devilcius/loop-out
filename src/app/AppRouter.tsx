import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StepGuard } from '../components/StepGuard'
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
        <Route path="/estimacion" element={<EstimationPage />} />
        <Route
          path="/temporalidad"
          element={
            <StepGuard step={3}>
              <TemporalOrientationPage />
            </StepGuard>
          }
        />
        <Route
          path="/emocion-principal"
          element={
            <StepGuard step={4}>
              <PrimaryEmotionPage />
            </StepGuard>
          }
        />
        <Route
          path="/sentimientos"
          element={
            <StepGuard step={5}>
              <RelatedFeelingsPage />
            </StepGuard>
          }
        />
        <Route
          path="/reconocimiento"
          element={
            <StepGuard step={6}>
              <RecognitionPage />
            </StepGuard>
          }
        />
        <Route
          path="/atencion"
          element={
            <StepGuard step={7}>
              <AttentionCheckPage />
            </StepGuard>
          }
        />
        <Route
          path="/pausa"
          element={
            <StepGuard step={8}>
              <MicroInterventionPage />
            </StepGuard>
          }
        />
        <Route
          path="/intervencion"
          element={
            <StepGuard step={9}>
              <InterventionPage />
            </StepGuard>
          }
        />
        <Route
          path="/intervencion-pausa"
          element={
            <StepGuard step={10}>
              <InterventionTimerPage />
            </StepGuard>
          }
        />
        <Route
          path="/evaluacion"
          element={
            <StepGuard step={11}>
              <EvaluationPage />
            </StepGuard>
          }
        />
        <Route
          path="/evaluacion-feedback"
          element={
            <StepGuard step={12}>
              <EvaluationFeedbackPage />
            </StepGuard>
          }
        />
        <Route path="/historial" element={<HistoryPage />} />
        <Route path="/inicio" element={<Navigate replace to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
