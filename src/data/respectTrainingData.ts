import { LifeSkill } from '../types';

export const respectTrainingData: LifeSkill = {
  id: 'respect',
  title: 'Respect',
  slug: 'respect',
  description: 'The fundamental recognition of worth and dignity in oneself and others, demonstrated through conscious actions, thoughtful communication, and mindful interaction in all aspects of life.',
  
  parable: {
    title: 'The Master\'s Teacup',
    content: `A wealthy businessman came to the renowned Master Li's dojo, demanding to learn "the most advanced techniques immediately." His expensive clothes and loud voice drew attention as he interrupted ongoing classes and spoke dismissively to junior students.

Master Li invited him for tea before training. As he poured, the businessman boasted about his achievements, his important connections, and his impatience with "beginner nonsense." His cup overflowed, hot tea spilling onto his expensive suit.

"Master! You're ruining my clothes!" the man shouted.

Master Li continued pouring until the pot was empty. "Tell me," he said calmly, "how much tea did your cup receive?"

"None! It was already full and overflowing!"

"Exactly," Master Li nodded. "Your mind, like this cup, is already full - of your own importance, your assumptions, your demands. Until you empty yourself and approach with respect for the process, the people, and the principles, no learning can enter."

The businessman stormed out, but returned the next week in simple training clothes. He bowed to Master Li and quietly asked, "May I begin again, Sensei?"

"Now," said Master Li with a smile, "you are ready to learn. Respect is not about being humble to get what you want - it's about recognizing that everyone and everything has value to teach you, if you approach with an open and respectful heart."

Years later, that same businessman became one of Master Li's most dedicated students, and eventually, a respected instructor himself - known for his patience with beginners and his deep reverence for the art.`,
    teachingPoints: [
      'Respect begins with recognizing our own limitations and need to learn',
      'True respect sees value in every person and situation',
      'Arrogance blocks learning and growth',
      'Respect is demonstrated through actions, not just words',
      'A respectful heart creates space for wisdom to enter'
    ]
  },

  explanations: {
    young: {
      definition: 'Respect means treating others the way you want to be treated. In martial arts, respect is like being a good friend to everyone - listening when your instructor speaks, being kind to your training partners, and taking care of your dojo like it\'s your own home.',
      keyConcepts: [
        'Bowing to show we care about our instructors and training partners',
        'Using kind words and gentle actions with everyone in class',
        'Listening carefully when others are talking or teaching',
        'Taking turns and sharing equipment without arguing',
        'Keeping our training space clean and organized for everyone'
      ]
    },
    teen: {
      definition: 'Respect in martial arts means recognizing the value and dignity of every person while honoring the traditions and principles of your art. It involves understanding that everyone has something to teach and learn, regardless of their rank or experience level.',
      keyConcepts: [
        'Demonstrating humility by acknowledging both your strengths and areas for improvement',
        'Showing courtesy to all practitioners regardless of their skill level or background',
        'Honoring martial arts traditions while understanding their deeper meaning and purpose',
        'Taking responsibility for your actions and their impact on others in the dojo',
        'Supporting your training partners\' growth through encouragement and constructive feedback'
      ]
    },
    adult: {
      definition: 'Respect in martial arts represents a fundamental understanding of interconnectedness and mutual dignity that extends far beyond courtesy or politeness. It encompasses a deep appreciation for the lineage of knowledge and the sacred responsibility of training safely with others.',
      keyConcepts: [
        'Embodying respect as a leadership quality that inspires and guides newer students',
        'Understanding respect as reciprocal trust and the responsibility that comes with others\' vulnerability',
        'Honoring the lineage and sacrifices of those who preserved and transmitted martial knowledge',
        'Integrating respectful principles into daily life decisions and interpersonal relationships',
        'Recognizing respect as a pathway to deeper self-awareness and emotional intelligence'
      ]
    }
  },

  quotes: [
    {
      id: 'respect-quote-1',
      text: 'Respect is earned. Honesty is appreciated. Trust is gained. Loyalty is returned.',
      author: 'Unknown',
      application: 'In martial arts, respect creates the foundation for all other relationships and learning.',
      category: 'philosophy'
    },
    {
      id: 'respect-quote-2',
      text: 'The way to gain a good reputation is to endeavor to be what you desire to appear.',
      author: 'Socrates',
      application: 'Authentic respect means embodying the principles both inside and outside the dojo.',
      category: 'philosophy'
    },
    {
      id: 'respect-quote-3',
      text: 'Respect for ourselves guides our morals; respect for others guides our manners.',
      author: 'Laurence Sterne',
      application: 'Self-respect and respect for others work together to create proper martial arts etiquette.',
      category: 'martial-arts'
    },
    {
      id: 'respect-quote-4',
      text: 'I speak to everyone in the same way, whether he is the garbage man or the president of the university.',
      author: 'Albert Einstein',
      application: 'True respect treats all training partners equally, regardless of rank or status.',
      category: 'leadership'
    },
    {
      id: 'respect-quote-5',
      text: 'The respect that leadership must have requires that one\'s ethics be without question.',
      author: 'James Mattis',
      application: 'Senior students and instructors must exemplify the highest standards of respectful behavior.',
      category: 'leadership'
    },
    {
      id: 'respect-quote-6',
      text: 'Being brilliant is no great feat if you respect nothing.',
      author: 'Johann Wolfgang von Goethe',
      application: 'Technical skill without respect limits one\'s potential as a complete martial artist.',
      category: 'martial-arts'
    }
  ],

  lessons: [
    {
      id: 'respect-lesson-1',
      title: 'The Foundation of Respect: Self and Others',
      description: 'Learn how respect for yourself creates the foundation for respecting others.',
      ageGroup: 'all'
    },
    {
      id: 'respect-lesson-2',
      title: 'Respectful Communication in Training',
      description: 'Master the art of giving and receiving feedback with respect and dignity.',
      ageGroup: 'teen'
    },
    {
      id: 'respect-lesson-3',
      title: 'Honoring Martial Arts Traditions',
      description: 'Understand the deeper meaning behind martial arts customs and ceremonies.',
      ageGroup: 'all'
    },
    {
      id: 'respect-lesson-4',
      title: 'Respect Through Actions, Not Words',
      description: 'Discover how small actions demonstrate bigger respect than grand gestures.',
      ageGroup: 'young'
    },
    {
      id: 'respect-lesson-5',
      title: 'Leading with Respect: Advanced Principles',
      description: 'Explore how respect becomes a tool for leadership and mentorship.',
      ageGroup: 'adult'
    }
  ],

  exercises: [
    {
      id: 'respect-exercise-1',
      title: 'The Respectful Bow Circle',
      type: 'foundational',
      duration: 10,
      materials: ['Open training space'],
      process: [
        'Form a circle with all participants facing inward',
        'Practice different types of bows: greeting bow (15 degrees), respect bow (30 degrees), and deep respect bow (45 degrees)',
        'Each person takes turns entering the circle, making eye contact, and bowing to each person',
        'Recipients return the bow with equal intention and focus',
        'Conclude with a group bow, holding for 3 seconds while reflecting on respect for the group'
      ],
      ageGroup: 'all',
      instructorNotes: 'Focus on genuine eye contact and intention rather than perfect form. Discuss how bowing makes them feel both giving and receiving.'
    },
    {
      id: 'respect-exercise-2',
      title: 'Partner Mirror Respect',
      type: 'physical',
      duration: 15,
      materials: ['Partners of similar height if possible'],
      process: [
        'Partners face each other in ready stance, maintaining eye contact',
        'One partner leads slow, controlled movements (basic blocks, strikes, stances)',
        'The other partner mirrors the movements exactly, maintaining eye contact',
        'Switch roles every 2 minutes',
        'Practice "respectful resistance" - apply gentle, controlled pressure to test partner\'s balance',
        'End with mutual bow and discussion of trust and cooperation'
      ],
      ageGroup: 'all',
      instructorNotes: 'Emphasize that this exercise requires complete trust. The leader must move slowly and safely, the follower must stay focused and present.'
    },
    {
      id: 'respect-exercise-3',
      title: 'The Compliment Kata',
      type: 'foundational',
      duration: 20,
      materials: ['Basic martial arts techniques', 'Observation sheets'],
      process: [
        'Students perform basic kata or technique sequences in pairs',
        'Observer watches for one specific positive element in partner\'s technique',
        'After each round, observer offers one genuine, specific compliment',
        'Performer accepts compliment with "Thank you" and a bow',
        'Switch roles and repeat',
        'Advanced version: include one respectful suggestion for improvement along with compliment'
      ],
      ageGroup: 'all',
      instructorNotes: 'Teach students to find genuine positives, not generic praise. Model how to give and receive compliments gracefully.'
    },
    {
      id: 'respect-exercise-4',
      title: 'Respectful Sparring Protocol',
      type: 'advanced',
      duration: 25,
      materials: ['Protective gear as appropriate', 'Timer'],
      process: [
        'Begin with formal bow and verbal agreement to train safely',
        'Practice light contact sparring with emphasis on control rather than power',
        'After each exchange, brief pause to check partner\'s wellbeing',
        'If accidental contact occurs, immediate stop, apology, and check for injury',
        'Rotate partners every 3 minutes with formal bow and gratitude expression',
        'Conclude with group discussion on how respect changes the sparring experience'
      ],
      ageGroup: 'teen',
      instructorNotes: 'Safety is paramount. Use this to teach that respect in sparring means protecting your partner while challenging them appropriately.'
    },
    {
      id: 'respect-exercise-5',
      title: 'The Teaching Circle of Honor',
      type: 'advanced',
      duration: 30,
      materials: ['Various martial arts techniques', 'Teaching rotation chart'],
      process: [
        'Senior students teach basic techniques to junior students',
        'Each teacher must adapt their instruction to their student\'s level and learning style',
        'Teachers practice patience, encouragement, and clear communication',
        'Students practice active listening, asking respectful questions, and following instruction',
        'Every 5 minutes, rotate so everyone gets to teach and be taught',
        'Conclude with appreciation circle where each person thanks their teachers and students'
      ],
      ageGroup: 'adult',
      instructorNotes: 'This develops leadership skills and humility simultaneously. Observe how advanced students adapt their teaching style and how beginners respond to peer instruction.'
    }
  ]
};