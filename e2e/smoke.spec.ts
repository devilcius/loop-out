import { expect, test } from '@playwright/test'

const STORAGE_KEY = 'bucle.app.v1'

async function seedSession(page: import('@playwright/test').Page, data: unknown) {
  await page.addInitScript(
    ([key, value]) => {
      window.localStorage.setItem(key, JSON.stringify(value))
    },
    [STORAGE_KEY, data],
  )
}

test('starts flow from detection page', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Comenzar' }).click()

  await expect(page).toHaveURL(/\/estimation$/)
})

test('redirects blocked deep link to highest accessible step', async ({ page }) => {
  await page.goto('/evaluation')

  await expect(page).toHaveURL(/\/estimation$/)
})

test('resumes persisted progress from detection page', async ({ page }) => {
  await seedSession(page, {
    currentSession: {
      initialIntensity: 4,
      temporalOrientation: 'future',
      primaryEmotion: 'Ansiedad',
      relatedFeelings: ['Inquietud'],
      notificationOpened: null,
      activeIntervention: null,
      interventionReady: false,
      selectedInterventions: [],
      finalIntensity: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentStep: 5,
    },
    attemptsHistory: [],
  })

  await page.goto('/')

  await expect(page.getByRole('button', { name: 'Continuar donde lo dejaste' })).toBeVisible()
  await page.getByRole('button', { name: 'Continuar donde lo dejaste' }).click()

  await expect(page).toHaveURL(/\/related-feelings$/)
})

test('records an attempt when finishing from evaluation feedback', async ({ page }) => {
  await seedSession(page, {
    currentSession: {
      initialIntensity: 4,
      temporalOrientation: 'future',
      primaryEmotion: 'Ansiedad',
      relatedFeelings: ['Inquietud'],
      notificationOpened: 'no',
      activeIntervention: 'breathe',
      interventionReady: true,
      selectedInterventions: ['breathe'],
      finalIntensity: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentStep: 11,
    },
    attemptsHistory: [],
  })

  await page.goto('/evaluation')
  await page.getByRole('button', { name: 'Continuar' }).click()

  await expect(page).toHaveURL(/\/evaluation-feedback$/)
  await page.getByRole('button', { name: 'Finalizar' }).click()

  await expect(page).toHaveURL(/\/$/)

  const attemptsLength = await page.evaluate((key) => {
    const raw = window.localStorage.getItem(key)
    if (!raw) {
      return 0
    }

    const parsed = JSON.parse(raw) as { attemptsHistory?: unknown[] }
    return parsed.attemptsHistory?.length ?? 0
  }, STORAGE_KEY)

  expect(attemptsLength).toBe(1)
})
