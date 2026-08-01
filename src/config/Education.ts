export interface Education {
  institution: string;
  degree: string;
  date: string;
  coursework: string[];
}

export const educationConfig: Education[] = [
  {
    institution: 'Faculty of Sciences, Mohammed V University, Rabat',
    degree: "Bachelor's Degree in Computer Science (Software Engineering)",
    date: 'Jun 2026',
    coursework: [
      'Operating Systems',
      'Computer Networks',
      'Databases',
      'Software Engineering',
      'Object-Oriented Design',
      'Cryptography',
    ],
  },
];
