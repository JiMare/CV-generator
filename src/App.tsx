import { FormProvider, useForm } from 'react-hook-form';
import { Layout } from './components/Layout';
import { CvForm } from './modules/form/CvForm';
import { CvPreview } from './modules/output/CvPreview';

const App = () => {
  const methods = useForm({
    defaultValues: {
      fullName: '',
      position: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      summary: '',
      skillsHeading: "Skills",
      skills: [],
      skillsHidden: false,
      experienceHeading: "Experience",
      experience: [],
      experienceHidden: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <Layout>
        <CvForm />
        <CvPreview />
      </Layout>
    </FormProvider>
  );
};

export default App;
