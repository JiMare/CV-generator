import { Briefcase, FolderPlus, GraduationCap, Heart, Languages, Lightbulb, Smile, User } from 'lucide-react';
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
  {
    label: 'Languages',
    path: '/wizard/languages',
    icon: <Languages />,
    draggable: true,
    position: 7,
  },
  {
    label: 'Soft Skills',
    path: '/wizard/soft-skills',
    icon: <Smile />,
    draggable: true,
    position: 8,
  },
  {
    label: 'Interests',
    path: '/wizard/interests',
    icon: <Heart />,
    draggable: true,
    position: 9,
  },
];
