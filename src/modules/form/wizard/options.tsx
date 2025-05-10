import { Briefcase, FolderPlus, GraduationCap, Lightbulb, User } from 'lucide-react';
import { FileText } from 'lucide-react';

export type WizardOption = {
  label: string;
  path: string;
  icon: React.ReactNode;
  draggable: boolean;
  position: number;
};

export const wizardOptions = [
  {
    label: 'Personal Info',
    path: '/wizard/personal',
    icon: <User />,
    draggable: false,
    position: 1,
  },
  {
    label: 'Summary',
    path: '/wizard/summary',
    icon: <FileText />,
    draggable: false,
    position: 2,
  },
  {
    label: 'Skills',
    path: '/wizard/skills',
    icon: <Lightbulb />,
    draggable: true,
    position: 3,
  },
  {
    label: 'Experience',
    path: '/wizard/experience',
    icon: <Briefcase />,
    draggable: true,
    position: 4,
  },
  {
    label: 'Education',
    path: '/wizard/education',
    icon: <GraduationCap />,
    draggable: true,
    position: 5,
  },
  {
    label: 'Projects',
    path: '/wizard/projects',
    icon: <FolderPlus />,
    draggable: true,
    position: 6,
  },
];
