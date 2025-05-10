import { FormProvider, useForm } from 'react-hook-form';
import { CvForm } from './CvForm';

export type Skill = {
  name: string;
  details: string;
};

type FormData = {
  fullName: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  skillsHeading: string;
  skills: Skill[];
  skillsHidden: boolean;
  experienceHeading: string;
  experience: { title: string; company: string; date: string; description: string }[];
  experienceHidden: boolean;
};

export const FormContext = () => {
  const methods = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      position: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      summary: '',
      skillsHeading: 'Skills',
      skills: [],
      skillsHidden: false,
      experienceHeading: 'Experience',
      experience: [],
      experienceHidden: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <CvForm />
    </FormProvider>
  );
};
