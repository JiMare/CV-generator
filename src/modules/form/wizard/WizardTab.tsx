import { Outlet, Link } from '@tanstack/react-router';

export const WizardTab = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <nav className="md:w-64 md:border-r md:pr-4 space-y-2">
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
