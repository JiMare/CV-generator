import { Link, useLocation } from '@tanstack/react-router';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WizardOption } from '@/modules/form/wizard/options';
import { useWizardContext } from '@/modules/form/wizard/WizardContext';

export const StepNavigator = () => {
  const { pathname } = useLocation();

  const { draggableOptions } = useWizardContext();

  const optionPaths = draggableOptions.map((option: WizardOption) => option.path);

  const currentIndex = optionPaths.indexOf(pathname);
  const toNext =
    pathname === '/wizard/personal'
      ? '/wizard/summary'
      : pathname === '/wizard/summary'
      ? optionPaths[0]
      : optionPaths[currentIndex + 1] || null;
  const toPrev =
    pathname === '/wizard/personal'
      ? null
      : pathname === '/wizard/summary'
      ? '/wizard/personal'
      : currentIndex === 0
      ? '/wizard/summary'
      : optionPaths[currentIndex - 1] || null;

  return (
    <div className="flex mt-auto justify-between w-full">
      <div>
        {toPrev && (
          <Button asChild className="flex items-center gap-2" variant="secondary">
            <Link to={toPrev}>
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Link>
          </Button>
        )}
      </div>
      <div>
        {toNext && (
          <Button asChild className="flex items-center gap-2">
            <Link to={toNext}>
              Next
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
