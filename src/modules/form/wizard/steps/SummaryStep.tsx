import { StepNavigator } from '@/components/StepNavigator';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';

export const SummaryStep = () => {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Label>Summary</Label>
        <Textarea {...register('summary')} />
        <p className="text-sm text-gray-500 mt-2">Briefly describe who you are now and what your future ambitions are.</p>
      </div>
      <StepNavigator toPrev="/wizard/personal" toNext="/wizard/skills" />
    </div>
  );
};
