import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

type Props = {
  field: ControllerRenderProps<FieldValues, `languages.${number}.level`>;
};

export const LanguageProficiency = ({ field }: Props) => {
  const [type, setType] = useState<'cefr' | 'linkedin' | 'custom'>('cefr');

  return (
    <div>
      <RadioGroup
        value={type}
        onValueChange={(val) => {
          setType(val as any);
        }}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-2">
          <RadioGroupItem value="cefr" id={`${field.name}-cefr`} />
          <Label htmlFor={`${field.name}-cefr`}>CEFR Style</Label>
        </div>
        <div className="flex gap-2">
          <RadioGroupItem value="linkedin" id={`${field.name}-linkedin`} />
          <Label htmlFor={`${field.name}-linkedin`}>LinkedIn Style</Label>
        </div>
        <div className="flex gap-2">
          <RadioGroupItem value="custom" id={`${field.name}-custom`} />
          <Label htmlFor={`${field.name}-custom`}>Custom</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
