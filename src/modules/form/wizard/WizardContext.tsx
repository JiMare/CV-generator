import React, { createContext, useContext, useState, useEffect } from 'react';
import { WizardOption, wizardOptions } from './options';

type WizardContextType = {
  draggableOptions: WizardOption[];
  setDraggableOptions: (options: WizardOption[]) => void;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draggableOptions, setDraggableOptions] = useState<WizardOption[]>(() => {
    const storedOptions = localStorage.getItem('draggableWizardTabs');
    return storedOptions ? JSON.parse(storedOptions) : wizardOptions.filter((option) => option.draggable);
  });

  useEffect(() => {
    localStorage.setItem('draggableWizardTabs', JSON.stringify(draggableOptions));
  }, [draggableOptions]);

  return <WizardContext.Provider value={{ draggableOptions, setDraggableOptions }}>{children}</WizardContext.Provider>;
};

export const useWizardContext = (): WizardContextType => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizardContext must be used within a WizardProvider');
  }
  return context;
};
