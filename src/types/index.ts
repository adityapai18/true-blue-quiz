export type Organization = 'LV' | 'HoABL' | 'Bonito';

export type Department = 'HR' | 'Finance' | 'Operations' | 'IT' | 'Marketing' | 'Sales' | 'Others';

export type ResponseOption = 'Always' | 'Often' | 'Sometimes' | 'Rarely' | 'Never';

export type SleepHours = '0-4' | '4-6' | '6-8' | '8+';

export type CigarettesPerDay = '0' | '1-5' | '6-10' | '11-20' | '20+';

export interface UserInfo {
  name: string;
  organization: Organization;
  department: Department;
  role: string;
}

export interface QuizResponse {
  physical: {
    breaks: ResponseOption;
    hydration: ResponseOption;
    movement: ResponseOption;
    foodChoices: ResponseOption;
    smoking: CigarettesPerDay;
  };
  emotional: {
    socialInteraction: ResponseOption;
    familyTime: ResponseOption;
    gratitude: ResponseOption;
    hobbies: ResponseOption;
    vacationPlanning: ResponseOption;
  };
  psychological: {
    breaks: ResponseOption;
    phoneDetox: ResponseOption;
    satisfaction: ResponseOption;
    sleep: SleepHours;
    focus: ResponseOption;
  };
}

export interface QuizResult {
  userInfo: UserInfo;
  responses: QuizResponse;
  scores: {
    physical: number;
    emotional: number;
    psychological: number;
    total: number;
  };
} 