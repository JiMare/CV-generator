import { WizardTab } from '@/modules/form/wizard/WizardTab'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wizard')({
  component: WizardTab,
})
