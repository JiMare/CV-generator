import { WizardProvider } from '@/modules/form/wizard/WizardContext';
import { WizardTab } from '@/modules/form/wizard/WizardTab';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/wizard')({
  beforeLoad: ({ location }) => {
    if (location.pathname === '/wizard') {
      throw redirect({ to: '/wizard/personal' });
    }
  },
  component: () => (
    <WizardProvider>
      <WizardTab />
    </WizardProvider>
  ),
});
