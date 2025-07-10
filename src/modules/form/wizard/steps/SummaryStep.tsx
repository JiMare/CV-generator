import { AutoResizeTextarea } from '@/components/AutorsizeTextArea';
import { StepNavigator } from '@/components/StepNavigator';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';

export const SummaryStep = () => {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <Label>Summary</Label>
        <AutoResizeTextarea {...register('summary')} />
        <p className="text-sm text-gray-500 mt-2">Briefly describe who you are now and what your future ambitions are.</p>
      </div>
      <StepNavigator />
    </div>
  );
};
