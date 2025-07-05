import { Briefcase, FolderPlus, GraduationCap, Heart, Languages, Lightbulb, Smile, User } from 'lucide-react';
import { FileText } from 'lucide-react';

export const iconMap = {
  User,
  FileText,
  Lightbulb,
  Briefcase,
  GraduationCap,
  FolderPlus,
  Languages,
  Smile,
  Heart,
};

export type WizardOption = {
  label: string;
  path: string;
  icon: string;
  draggable: boolean;
};

export const wizardOptions = [
  {
    label: 'Personal Info',
    path: '/wizard/personal',
    icon: 'User',
    draggable: false,
  },
  {
    label: 'Summary',
    path: '/wizard/summary',
    icon: 'FileText',
    draggable: false,
  },
  {
    label: 'Skills',
    path: '/wizard/skills',
    icon: 'Lightbulb',
    draggable: true,
  },
  {
    label: 'Experience',
    path: '/wizard/experience',
    icon: 'Briefcase',
    draggable: true,
  },
  {
    label: 'Education',
    path: '/wizard/education',
    icon: 'GraduationCap',
    draggable: true,
  },
  {
    label: 'Projects',
    path: '/wizard/projects',
    icon: 'FolderPlus',
    draggable: true,
  },
  {
    label: 'Languages',
    path: '/wizard/languages',
    icon: 'Languages',
    draggable: true,
  },
  {
    label: 'Soft Skills',
    path: '/wizard/soft-skills',
    icon: 'Smile',
    draggable: true,
  },
  {
    label: 'Interests',
    path: '/wizard/interests',
    icon: 'Heart',
    draggable: true,
  },
];
