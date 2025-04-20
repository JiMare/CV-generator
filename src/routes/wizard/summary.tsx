import { SummaryStep } from '@/modules/form/wizard/steps/SummaryStep'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wizard/summary')({
  component: SummaryStep,
})
