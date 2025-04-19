import { useFormContext } from 'react-hook-form';

export const CvForm = () => {
  const { register } = useFormContext();
  return (
    <form>
      CvForm
      <input type="text" {...register('fullName')} className="w-full border border-border rounded-md px-3 py-2" />
    </form>
  );
};
