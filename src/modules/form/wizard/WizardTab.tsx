import { Outlet, Link } from '@tanstack/react-router';

export const WizardTab = () => {
  return (
    <div className="flex gap-8">
      <nav className="w-64 border-r pr-4 space-y-2">
        <Link to="/wizard/personal" className="block hover:underline">
          Personal Info
        </Link>
        <Link to="/wizard/summary" className="block hover:underline">
          Summary
        </Link>
      </nav>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
