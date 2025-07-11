import { StepNavigator } from '@/components/StepNavigator';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Skill } from '../../FormContext';
import { DragDropStepWrapper } from '../../DragDropStepWrapper';
import React from 'react';

export const SkillsStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'skills',
  });

  const skillsHidden = useWatch({ name: 'skillsHidden' });
  const skills = useWatch({ control, name: 'skills' });

  const handleAddSkill = () => {
    append({ name: '', details: '' });
  };

  const isSkillsValid = skills.every((skill: Skill) => skill.name.trim() !== '');
  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <div className="flex items-baseline justify-between">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Skills</h2>
          <div className="flex items-center gap-2">
            <Controller
              name="skillsHidden"
              control={control}
              render={({ field }) => (
                <Label htmlFor="hide-skills" className="flex items-center gap-2 text-sm">
                  <Checkbox id="hide-skills" checked={field.value} onCheckedChange={field.onChange} />
                  Hide
                </Label>
              )}
            />
          </div>
        </div>
        <p className="text-sm text-gray-500">List your technical skills, methodologies and tools.</p>
      </div>
      {!skillsHidden && (
        <>
          <div>
            <Label>Heading</Label>
            <Input type="text" {...register('skillsHeading')} />
          </div>
          <DragDropStepWrapper
            droppableId="skills"
            fields={fields}
            move={move}
            onRemove={remove}
            renderItem={(field, index) => (
              <React.Fragment key={field.id}>
                <div>
                  <Label>Name</Label>
                  <Input
                    {...register(`skills.${index}.name`, {
                      validate: (value) => value.trim() !== '',
                    })}
                    placeholder="Enter skill name"
                    className={cn('border', Boolean((errors?.skills as any)?.[index]?.name) && 'border-red-500')}
                  />
                </div>

                <div>
                  <Label>Details</Label>
                  <Input {...register(`skills.${index}.details`)} placeholder="Enter skill details" />
                </div>
              </React.Fragment>
            )}
          />
          <div className="flex justify-end">
            <Button type="button" onClick={handleAddSkill} disabled={!isSkillsValid}>
              + Add Skill
            </Button>
          </div>
        </>
      )}
      <StepNavigator />
    </div>
  );
};
