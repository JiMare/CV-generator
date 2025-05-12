import { StepNavigator } from '@/components/StepNavigator';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { urlRegex } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Project } from '../../FormContext';
import { StepFieldCard } from '@/components/StepFieldCard';

export const ProjectsStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const projectsHidden = useWatch({ name: 'projectsHidden' });
  const projects = useWatch({ control, name: 'projects' });

  const handleAddProject = () => {
    append({ name: '', description: '', repoLink: '', demoLink: '' });
  };

  const isProjectsValid = projects.every((project: Project) => {
    const { name, repoLink, demoLink } = project;
    return name.trim() !== '' && (repoLink === '' || urlRegex.test(repoLink)) && (demoLink === '' || urlRegex.test(demoLink));
  });

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-baseline justify-between">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Projects</h2>
        <div className="flex items-center gap-2">
          <Controller
            name="projectsHidden"
            control={control}
            render={({ field }) => (
              <Label htmlFor="hide-projects" className="flex items-center gap-2 text-sm">
                <Checkbox id="hide-projects" checked={field.value} onCheckedChange={field.onChange} />
                Hide
              </Label>
            )}
          />
        </div>
      </div>
      {!projectsHidden && (
        <>
          <div>
            <Label>Heading</Label>
            <Input type="text" {...register('projectsHeading')} />
          </div>
          <div className="flex flex-col gap-4">
            {fields.map((field, index) => {
              return (
                <StepFieldCard onRemove={() => remove(index)} key={field.id}>
                  <div>
                    <Label>Project Name</Label>
                    <Input
                      {...register(`projects.${index}.name`, {
                        validate: (value) => value.trim() !== '',
                      })}
                      placeholder="My Awesome Project"
                      className={cn('border', Boolean((errors?.projects as any)?.[index]?.name) && 'border-red-500')}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea {...register(`projects.${index}.description`)} />
                  </div>
                  <div>
                    <Label>Repository Link</Label>
                    <Input
                      type="text"
                      {...register(`projects.${index}.repoLink`, {
                        validate: (value) => {
                          if (value === '') return true;
                          return urlRegex.test(value);
                        },
                      })}
                      className={cn('border', Boolean((errors?.projects as any)?.[index]?.repoLink) && 'border-red-500')}
                    />
                  </div>
                  <div>
                    <Label>Demo Link</Label>
                    <Input
                      type="text"
                      {...register(`projects.${index}.demoLink`, {
                        validate: (value) => {
                          if (value === '') return true;
                          return urlRegex.test(value);
                        },
                      })}
                      className={cn('border', Boolean((errors?.projects as any)?.[index]?.demoLink) && 'border-red-500')}
                    />
                  </div>
                </StepFieldCard>
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button type="button" onClick={handleAddProject} disabled={!isProjectsValid}>
              + Add Project
            </Button>
          </div>
        </>
      )}
      <StepNavigator toPrev="/wizard/education" toNext="/wizard/languages" />
    </div>
  );
};
