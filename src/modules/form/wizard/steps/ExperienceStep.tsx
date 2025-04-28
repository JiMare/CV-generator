import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { YearMonthPicker } from '@/components/YearMonthPicker';
import { cn } from '@/lib/utils';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

export const ExperienceStep = () => {
  const [newExperience, setNewExperience] = useState({ title: '', company: '', from: '', isCurrent: false, to: '' });

  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  const experienceHidden = useWatch({ name: 'experienceHidden' });
  const experience = useWatch({ control, name: 'experience' });

  const handleAddExperience = () => {
    if (newExperience.title.trim() !== '') {
      const experience = {
        title: newExperience.title,
        company: newExperience.company,
        from: newExperience.from,
        isCurrent: newExperience.isCurrent,
        to: newExperience.isCurrent ? '' : newExperience.to,
      };
      append(experience);
      setNewExperience({ title: '', company: '', from: '', isCurrent: false, to: '' });
    }
  };

  const isAddingAllowed =
    newExperience.title.trim() !== '' &&
    newExperience.from !== '' &&
    (newExperience.isCurrent || newExperience.to !== '') &&
    !experienceHidden;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Experience</h2>
      </div>
      <div className="flex items-center gap-2">
        <Controller
          name="experienceHidden"
          control={control}
          render={({ field }) => (
            <Label htmlFor="hide-experience" className="flex items-center gap-2 text-sm">
              <Checkbox id="hide-experience" checked={field.value} onCheckedChange={field.onChange} />
              Hide Experience
            </Label>
          )}
        />
      </div>
      <div>
        <Label>Heading</Label>
        <Input type="text" {...register('experienceHeading')} disabled={experienceHidden} />
      </div>
      <div className="flex gap-6 flex-col">
        <h2 className="font-bold">Add New Work Experience</h2>
        <div className="flex-1">
          <Label>Job Title</Label>
          <Input
            value={newExperience.title}
            onChange={(e) => setNewExperience((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Software Developer"
            disabled={experienceHidden}
          />
        </div>
        <div className="flex-1">
          <Label>Company</Label>
          <Input
            value={newExperience.company}
            onChange={(e) => setNewExperience((prev) => ({ ...prev, company: e.target.value }))}
            placeholder="Acme"
            disabled={experienceHidden}
          />
        </div>
        <div>
          <Label>From</Label>
          <YearMonthPicker
            value={newExperience.from}
            onChange={(value) => setNewExperience((prev) => ({ ...prev, from: value }))}
            disabled={experienceHidden}
            label="Start date"
          />
        </div>
        <Label htmlFor="is-current" className="flex items-center gap-2 text-sm">
          <Checkbox
            id="is-current"
            checked={newExperience.isCurrent}
            onCheckedChange={(checked) => setNewExperience((prev) => ({ ...prev, isCurrent: Boolean(checked) }))}
            disabled={experienceHidden}
          />
          I am currently working in this role
        </Label>
        {!newExperience.isCurrent && (
          <div>
            <Label>To</Label>
            <YearMonthPicker
              value={newExperience.to}
              onChange={(value) => setNewExperience((prev) => ({ ...prev, to: value }))}
              disabled={experienceHidden}
              label="End date"
            />
          </div>
        )}
        <Button type="button" onClick={handleAddExperience} disabled={!isAddingAllowed}>
          + Add Experience
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => {
          const isTitleError = experience?.[index]?.title?.trim() === '';
          return (
            <div key={field.id} className="p-6 border rounded-lg flex flex-col gap-4 relative">
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-4 right-4 text-red-500"
                disabled={experienceHidden}
              >
                <TrashIcon className="h-4 w-4" />
              </button>

              <div>
                <Label>Job Title</Label>
                <Input
                  {...register(`experience.${index}.title`, {
                    validate: (value) => value.trim() !== '',
                  })}
                  placeholder="Software Developer"
                  disabled={experienceHidden}
                  className={cn('border', isTitleError && 'border-red-500')}
                />
              </div>

              <div>
                <Label>Company</Label>
                <Input {...register(`experience.${index}.company`)} placeholder="Acme" disabled={experienceHidden} />
              </div>

              <div>
                <Label>From</Label>
                <Controller
                  control={control}
                  name={`experience.${index}.from`}
                  render={({ field }) => (
                    <YearMonthPicker value={field.value} label="Start date" onChange={field.onChange} disabled={experienceHidden} />
                  )}
                />
              </div>

              <div className="flex items-center gap-2">
                <Controller
                  name={`experience.${index}.isCurrent`}
                  control={control}
                  render={({ field }) => (
                    <Label htmlFor={`is-current-${index}`} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        id={`is-current-${index}`}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={experienceHidden}
                      />
                      I am currently working in this role
                    </Label>
                  )}
                />
              </div>
              {!experience?.[index]?.isCurrent && (
                <div>
                  <Label>To</Label>
                  <Controller
                    control={control}
                    name={`experience.${index}.to`}
                    render={({ field }) => {
                      const isError = experience?.[index]?.isCurrent === false && !field.value;
                      return (
                        <div>
                          <YearMonthPicker value={field.value} label="End date" onChange={field.onChange} disabled={experienceHidden} />
                          {isError && <p className="text-red-500 text-sm">End date is required if not currently working</p>}
                        </div>
                      );
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
