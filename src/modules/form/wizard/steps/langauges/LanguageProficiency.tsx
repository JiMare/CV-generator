import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languageCefrOptions, languageLinkedinOptions } from '@/lib/constants';
import { useState } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

type Props = {
  field: ControllerRenderProps<FieldValues, `languages.${number}.level`>;
};

export const LanguageProficiency = ({ field }: Props) => {
  const [type, setType] = useState<'cefr' | 'linkedin' | 'custom'>('custom');

  return (
    <div>
      <RadioGroup
        value={type}
        onValueChange={(val) => {
          field.onChange('')
          setType(val as any);
        }}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-2 items-baseline">
          <div className="flex gap-2">
            <RadioGroupItem value="cefr" id={`${field.name}-cefr`} />
            <Label htmlFor={`${field.name}-cefr`}>CEFR Style</Label>
          </div>
          {type === 'cefr' && (
            <Select
              value={field.value}
              onValueChange={(level) => {
                field.onChange(level);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                {languageCefrOptions.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex gap-2 items-baseline">
          <div className="flex gap-2">
            <RadioGroupItem value="linkedin" id={`${field.name}-linkedin`} />
            <Label htmlFor={`${field.name}-linkedin`}>LinkedIn Style</Label>
          </div>
          {type === 'linkedin' && (
            <Select
              value={field.value}
              onValueChange={(level) => {
                field.onChange(level);
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                {languageLinkedinOptions.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex gap-2 items-baseline">
          <div className="flex gap-2">
            <RadioGroupItem value="custom" id={`${field.name}-custom`} />
            <Label htmlFor={`${field.name}-custom`}>Custom</Label>
          </div>
          {type === 'custom' && <Input value={field.value} onChange={field.onChange} />}
        </div>
      </RadioGroup>
    </div>
  );
};
