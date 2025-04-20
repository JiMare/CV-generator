import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/wizard/')({
  loader: () => {
    throw redirect({ to: '/wizard/personal' });
  },
  component: () => null,
});
