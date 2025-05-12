import { TrashIcon } from 'lucide-react';

type Props = {
  onRemove: () => void;
  children: React.ReactNode;
};
export const StepFieldCard = ({ onRemove, children }: Props) => {
  return (
    <div className="p-6 border rounded-lg flex flex-col gap-4 relative">
      <button type="button" onClick={onRemove} className="absolute top-4 right-4 text-red-500">
        <TrashIcon className="h-4 w-4" />
      </button>
      {children}
    </div>
  );
};
