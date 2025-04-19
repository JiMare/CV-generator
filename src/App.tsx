import { FormProvider, useForm } from 'react-hook-form';
import { Layout } from './components/Layout';
import { CvForm } from './modules/CvForm';
import { CvPreview } from './modules/CvPreview';

const App = () => {
  const methods = useForm({
    defaultValues: {
      name: '',
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
