import { useFormContext } from 'react-hook-form';

export const CvPreview = () => {
  const { watch } = useFormContext();
  const fullName = watch('fullName');
  return (
    <div>
      <p>{fullName || 'No name yet...'}</p>
    </div>
  );
};
