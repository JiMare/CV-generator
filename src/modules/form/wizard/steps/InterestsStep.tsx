import { StepNavigator } from '@/components/StepNavigator';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Interest } from '../../FormContext';
import { DragDropStepWrapper } from '../../DragDropStepWrapper';
import React from 'react';
import { AutoResizeTextarea } from '@/components/AutorsizeTextArea';

export const InterestsStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'interests',
  });

  const interestsHidden = useWatch({ name: 'interestsHidden' });
  const interests = useWatch({ control, name: 'interests' });

  const handleAddInterest = () => {
    append({ name: '', details: '' });
  };

  const isInterestsValid = interests.every((interest: Interest) => interest.name.trim() !== '');
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-baseline justify-between">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Interests</h2>
        <div className="flex items-center gap-2">
          <Controller
            name="interestsHidden"
            control={control}
            render={({ field }) => (
              <Label htmlFor="hide-interests" className="flex items-center gap-2 text-sm">
                <Checkbox id="hide-interests" checked={field.value} onCheckedChange={field.onChange} />
                Hide
              </Label>
            )}
          />
        </div>
      </div>
      {!interestsHidden && (
        <>
          <div>
            <Label>Heading</Label>
            <Input type="text" {...register('interestsHeading')} />
          </div>
          <DragDropStepWrapper
            droppableId="interests"
            fields={fields}
            move={move}
            onRemove={remove}
            renderItem={(field, index) => (
              <React.Fragment key={field.id}>
                <div>
                  <Label>Name</Label>
                  <Input
                    {...register(`interests.${index}.name`, {
                      validate: (value) => value.trim() !== '',
                    })}
                    placeholder="Enter hobby name"
                    className={cn('border', Boolean((errors?.interests as any)?.[index]?.name) && 'border-red-500')}
                  />
                </div>
                <div>
                  <Label>Details</Label>
                  <AutoResizeTextarea {...register(`interests.${index}.details`)} placeholder="Enter hobby details" />
                </div>
              </React.Fragment>
            )}
          />
          <div className="flex justify-end">
            <Button type="button" onClick={handleAddInterest} disabled={!isInterestsValid}>
              + Add Hobby
            </Button>
          </div>
        </>
      )}
      <StepNavigator />
    </div>
  );
};
