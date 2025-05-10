import { FormProvider, useForm } from 'react-hook-form';
import { CvForm } from './CvForm';

export const FormContext = () => {
  const methods = useForm({
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
