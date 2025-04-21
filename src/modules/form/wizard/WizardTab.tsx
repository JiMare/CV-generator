import { Outlet } from '@tanstack/react-router';
import { wizardOptions } from './options';
import { DraggableTab } from '@/components/DraggableTab';

export const WizardTab = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <nav className="md:w-64 md:pr-4 space-y-2">
        {wizardOptions.map((option) => (
          <DraggableTab key={option.label} route={option} />
        ))}
      </nav>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
