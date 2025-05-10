import { FormProvider, useForm } from 'react-hook-form';
import { CvForm } from './CvForm';

export type Skill = {
  name: string;
  details: string;
};

export type Experience = {
  title: string;
  company: string;
  from: string;
  isCurrent: boolean;
  to: string;
};

export type Education = {
  institution: string;
  from: string;
  isCurrent: boolean;
  to: string;
};

export type Project = {
  name: string;
  description: string;
  repoLink: string;
  demoLink: string;
};

export type Language = {
  name: string;
  level: string;
};

export type SoftSkill = {
  name: string;
  details: string;
};

export type Interest = {
  name: string;
  details: string;
};

type FormData = {
  fullName: string;
  position: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  skillsHeading: string;
  skills: Skill[];
  skillsHidden: boolean;
  experienceHeading: string;
  experience: Experience[];
  experienceHidden: boolean;
  educationHeading: string;
  education: Education[];
  educationHidden: boolean;
  projectsHeading: string;
  projects: Project[];
  projectsHidden: boolean;
  languagesHeading: string;
  languages: Language[];
  languagesHidden: boolean;
  softSkillsHeading: string;
  softSkills: SoftSkill[];
  softSkillsHidden: boolean;
  interestsHeading: string;
  interests: Interest[];
  interestsHidden: boolean;
};

export const FormContext = () => {
  const methods = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      position: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      summary: '',
      skillsHeading: 'Skills',
      skills: [],
      skillsHidden: false,
      experienceHeading: 'Experience',
      experience: [],
      experienceHidden: false,
      educationHeading: 'Education',
      education: [],
      educationHidden: false,
      projectsHeading: 'Projects',
      projects: [],
      projectsHidden: false,
      languagesHeading: 'Languages',
      languages: [],
      languagesHidden: false,
      softSkillsHeading: 'Soft Skills',
      softSkills: [],
      softSkillsHidden: false,
      interestsHeading: 'Interests',
      interests: [],
      interestsHidden: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <CvForm />
    </FormProvider>
  );
};
