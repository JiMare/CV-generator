import { StepNavigator } from '@/components/StepNavigator';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

export const SkillsStep = () => {
  const [newSkillName, setNewSkillName] = useState('');

  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const skillsHidden = useWatch({ name: 'skillsHidden' });
  const skills = useWatch({ control, name: 'skills' });

  const handleAddSkill = () => {
    if (newSkillName.trim() !== '') {
      append({ name: newSkillName, details: '' });
      setNewSkillName('');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Skills</h2>
        <p className="text-sm text-gray-500 mt-2">List your technical skills, methodologies and tools.</p>
      </div>
      <div className="flex items-center gap-2">
        <Controller
          name="skillsHidden"
          control={control}
          render={({ field }) => (
            <Label htmlFor="hide-skills" className="flex items-center gap-2 text-sm">
              <Checkbox id="hide-skills" checked={field.value} onCheckedChange={field.onChange} />
              Hide Skills
            </Label>
          )}
        />
      </div>
      <div>
        <Label>Heading</Label>
        <Input type="text" {...register('skillsHeading')} disabled={skillsHidden} />
      </div>
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="Enter skill name"
            disabled={skillsHidden}
          />
        </div>
        <Button type="button" onClick={handleAddSkill} disabled={!newSkillName.trim() || skillsHidden}>
          + Add Skill
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => {
          const isNameError = skills?.[index]?.name?.trim() === '';
          return (
            <div key={field.id} className="p-6 border rounded-lg flex flex-col gap-4 relative">
              <button type="button" onClick={() => remove(index)} className="absolute top-4 right-4 text-red-500" disabled={skillsHidden}>
                <TrashIcon className="h-4 w-4" />
              </button>

              <div>
                <Label>Name</Label>
                <Input
                  {...register(`skills.${index}.name`, {
                    validate: (value) => value.trim() !== '',
                  })}
                  placeholder="Enter skill name"
                  disabled={skillsHidden}
                  className={cn('border', isNameError && 'border-red-500')}
                />
              </div>

              <div>
                <Label>Details</Label>
                <Input {...register(`skills.${index}.details`)} placeholder="Enter skill details" disabled={skillsHidden} />
              </div>
            </div>
          );
        })}
      </div>
      <StepNavigator toPrev="/wizard/summary" toNext="/wizard/skills" />
    </div>
  );
};
