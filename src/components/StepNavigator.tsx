import { Link } from '@tanstack/react-router';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  toNext?: string;
  toPrev?: string;
};

export const StepNavigator = ({ toNext, toPrev }: Props) => {
  return (
    <div className="flex mt-4 justify-between w-full">
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
