export interface Education {
  institution: string;
  logo?: string;
  degree: string;
  date: string;
  coursework: string[];
}

export const educationConfig: Education[] = [
  {
    institution: 'Faculté des Sciences et Techniques Mohammedia (FSTM)',
    logo: 'https://www.fstm.ac.ma/images/LOGO-30-ANS-FSTM.jpg',
    degree: "Engineer's Degree, Software Engineering and Information Systems",
    date: '2026 - Present',
    coursework: [],
  },
  {
    institution: 'Faculty of Sciences, Mohammed V University, Rabat',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQcpzb33CwDcR2-RtdFnVZf-vCXhDRY9FGqRLdR7CP0b3ceHIWqxBRmnM&s=10',
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
