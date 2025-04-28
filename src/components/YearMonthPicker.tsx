import {  getYear } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';

const startYear = getYear(new Date());

const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const years = Array.from({ length: 50 }, (_, i) => `${startYear - i}`);

type Props = {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
};

export function YearMonthPicker({ value, onChange, label = 'Pick month and year', disabled = false }: Props) {
  const [selectedMonth, setSelectedMonth] = useState<string>(value?.split('/')[0] || '');
  const [selectedYear, setSelectedYear] = useState<string>(value?.split('/')[1] || '');

  const handleSelect = (month: string, year: string) => {
    if (month && year) {
      onChange(`${month}/${year}`);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? value : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        <div className="flex justify-between gap-2 p-4">
          <Select
            value={selectedMonth}
            onValueChange={(month) => {
              setSelectedMonth(month);
              handleSelect(month, selectedYear);
            }}
            disabled={disabled}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedYear}
            onValueChange={(year) => {
              setSelectedYear(year);
              handleSelect(selectedMonth, year);
            }}
            disabled={disabled}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
