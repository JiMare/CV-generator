import { StepNavigator } from '@/components/StepNavigator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Controller, useFormContext } from 'react-hook-form';

export const SoftSkillsStep = () => {
  const {
    register,
    control,
    formState: { errors },
    trigger,
  } = useFormContext();
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-baseline justify-between">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Soft Skills</h2>
        <div className="flex items-center gap-2">
          <Controller
            name="softSkillsHidden"
            control={control}
            render={({ field }) => (
              <Label htmlFor="hide-softSkills" className="flex items-center gap-2 text-sm">
                <Checkbox id="hide-softSkills" checked={field.value} onCheckedChange={field.onChange} />
                Hide
              </Label>
            )}
          />
        </div>
      </div>
      <StepNavigator toPrev="/wizard/languages" toNext="/wizard/interests" />
    </div>
  );
};
