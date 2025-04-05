import { ResponseOption, SleepHours, CigarettesPerDay } from '../types';

export const RESPONSE_SCORES: Record<ResponseOption, number> = {
  'Always': 5,
  'Often': 4,
  'Sometimes': 3,
  'Rarely': 2,
  'Never': 1
};

export const SLEEP_SCORES: Record<SleepHours, number> = {
  '0-4': 1,
  '4-6': 2,
  '6-8': 4,
  '8+': 5
};

export const SMOKING_SCORES: Record<CigarettesPerDay, number> = {
  '0': 5,
  '1-5': 4,
  '6-10': 3,
  '11-20': 2,
  '20+': 1
};

export const PHYSICAL_QUESTIONS = [
  {
    id: 'breaks',
    text: 'Do you take short breaks during work to stand up or walk around?',
    type: 'likert' as const
  },
  {
    id: 'hydration',
    text: 'How often do you drink enough water to stay hydrated throughout the day?',
    type: 'likert' as const
  },
  {
    id: 'movement',
    text: 'How often do you incorporate natural movement into your day (e.g., Walking, stretching)?',
    type: 'likert' as const
  },
  {
    id: 'foodChoices',
    text: 'Do you monitor your food to make healthier food choices during meals or snacks?',
    type: 'likert' as const
  },
  {
    id: 'smoking',
    text: 'How many cigarettes do you smoke in a day?',
    type: 'smoking' as const
  }
];

export const EMOTIONAL_QUESTIONS = [
  {
    id: 'socialInteraction',
    text: 'How often do you interact with a friend or colleague to connect meaningfully during the day?',
    type: 'likert' as const
  },
  {
    id: 'familyTime',
    text: 'Do you spend quality time with family or loved ones after work?',
    type: 'likert' as const
  },
  {
    id: 'gratitude',
    text: 'How often do you express gratitude or appreciation to others (e.g., colleagues, friends, family)?',
    type: 'likert' as const
  },
  {
    id: 'hobbies',
    text: 'Do you engage in your hobbies / activities that bring you joy (e.g., films, outings)?',
    type: 'likert' as const
  },
  {
    id: 'vacationPlanning',
    text: 'I enjoy family vacation and I\'m always on the lookout to plan something.',
    type: 'likert' as const
  }
];

export const PSYCHOLOGICAL_QUESTIONS = [
  {
    id: 'breaks',
    text: 'How often do you take breaks to unwind through your day?',
    type: 'likert' as const
  },
  {
    id: 'phoneDetox',
    text: 'How often do you detox from your phone through the day?',
    type: 'likert' as const
  },
  {
    id: 'satisfaction',
    text: 'Do you feel satisfied at the end of each day?',
    type: 'likert' as const
  },
  {
    id: 'sleep',
    text: 'How much Quality Sleep do you get in a day?',
    type: 'sleep' as const
  },
  {
    id: 'focus',
    text: 'How often do you feel calm and focused during your workday?',
    type: 'likert' as const
  }
];

export const SCORE_RANGES = {
  thriving: { min: 60, max: 75 },
  doingWell: { min: 45, max: 59 },
  needsImprovement: { min: 0, max: 44 }
};

export const FEEDBACK_MESSAGES = {
  thriving: 'You\'re thriving! Keep up your amazing habits and inspire others.',
  doingWell: 'You\'re doing well! A few small changes can make a big difference.',
  needsImprovement: 'There\'s room for improvement—consider incorporating small steps toward better well-being.'
};

export const SECTION_TIPS = {
  physical: 'Try drinking more water and taking short walks during breaks',
  emotional: 'Consider scheduling regular time with friends and family',
  psychological: 'Take a few minutes daily for mindfulness or quiet reflection'
}; 