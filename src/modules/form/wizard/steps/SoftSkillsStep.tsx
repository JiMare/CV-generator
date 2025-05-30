import { StepNavigator } from '@/components/StepNavigator';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { SoftSkill } from '../../FormContext';
import { StepFieldCard } from '@/components/StepFieldCard';

export const SoftSkillsStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'softSkills',
  });

  const softSkillsHidden = useWatch({ name: 'softSkillsHidden' });
  const softSkills = useWatch({ control, name: 'softSkills' });

  const handleAddSoftSkill = () => {
    append({ name: '', details: '' });
  };

  const isSoftSkillsValid = softSkills.every((skill: SoftSkill) => skill.name.trim() !== '');
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
      {!softSkillsHidden && (
        <>
          <div>
            <Label>Heading</Label>
            <Input type="text" {...register('softSkillsHeading')} />
          </div>
          <div className="flex flex-col gap-4 flex-grow overflow-y-auto">
            {fields.map((field, index) => {
              return (
                <StepFieldCard onRemove={() => remove(index)} key={field.id}>
                  <div>
                    <Label>Name</Label>
                    <Input
                      {...register(`softSkills.${index}.name`, {
                        validate: (value) => value.trim() !== '',
                      })}
                      placeholder="Enter soft skill name"
                      className={cn('border', Boolean((errors?.softSkills as any)?.[index]?.name) && 'border-red-500')}
                    />
                  </div>

                  <div>
                    <Label>Details</Label>
                    <Textarea {...register(`softSkills.${index}.details`)} placeholder="Enter soft skill details" />
                  </div>
                </StepFieldCard>
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button type="button" onClick={handleAddSoftSkill} disabled={!isSoftSkillsValid}>
              + Add Soft skill
            </Button>
          </div>
        </>
      )}
      <StepNavigator toPrev="/wizard/languages" toNext="/wizard/interests" />
    </div>
  );
};
