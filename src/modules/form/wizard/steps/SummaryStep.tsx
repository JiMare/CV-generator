import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

export const SummaryStep = () => {
  const { register } = useFormContext();
  return (
    <div>
        summary
      <Input type="text" {...register('summary')} className="w-full border border-border rounded-md px-3 py-2" />
    </div>
  );
};
