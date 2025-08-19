import { LifeSkill } from '../types';

export const gritTrainingData: LifeSkill = {
  id: 'grit',
  title: 'Grit',
  slug: 'grit',
  description: 'The ability to persevere through challenges, maintain long-term commitment, and develop resilience through sustained effort and determination.',
  
  parable: {
    title: 'The Bamboo and the Oak',
    content: `Master Chen stood before his students in the dojo, holding two items: a thick oak branch and a thin piece of bamboo. The class had just witnessed several students struggle with their belt testing, some giving up when techniques became difficult.

"Which is stronger?" Master Chen asked, holding up both pieces.

"The oak!" called out several students, pointing to its obvious thickness and solidity.

Master Chen smiled and began to bend both. The oak branch, rigid and unyielding, snapped with a sharp crack. The bamboo bent completely, touching the ground, then sprang back to its original position, unbroken.

"Young Jake here," Master Chen gestured to a student who had quit mid-test, "trains like the oak. He builds strength quickly, shows impressive power, but when real pressure comes - when the test becomes truly challenging - he breaks. He expects immediate results and gives up when progress slows."

He turned to Sarah, a student who had failed her test three times but kept returning. "Sarah trains like the bamboo. She bends under pressure but never breaks. Each failure teaches her. Each setback makes her more flexible, more resilient. She understands that true strength comes not from avoiding the storm, but from learning to dance with it."

Master Chen placed both pieces on the ground. "The oak grows tall quickly but falls in the first strong wind. The bamboo grows slowly, bends with every storm, and stands for generations. In martial arts, as in life, grit is not about being unbreakable - it's about being unbendable. It's about returning to your stance no matter how many times you're knocked down."

Six months later, Sarah earned her black belt. Jake was still talking about "when he had time" to return to training.`,
    teachingPoints: [
      'True strength comes from resilience, not rigidity',
      'Failure is a teacher, not an endpoint',
      'Consistent effort over time surpasses sporadic intensity',
      'Grit means adapting to challenges while maintaining core purpose',
      'Character is built through how we respond to setbacks'
    ]
  },

  explanations: {
    young: {
      definition: 'Grit is like being a martial arts superhero. Even when training gets hard, even when you want to quit, you keep trying. It\'s having a brave heart that never gives up.',
      keyConcepts: [
        'Grit means "I\'ll try again" instead of "I can\'t do it"',
        'Every martial artist gets frustrated - that\'s normal and okay',
        'The belt around your waist shows how much grit you\'ve built',
        'Grit grows stronger each time you choose to continue when things are hard'
      ]
    },
    teen: {
      definition: 'Grit is the combination of passion and perseverance toward long-term goals. In martial arts, it\'s the mental toughness that keeps you training when motivation fades, helps you learn from defeats, and drives continuous improvement despite plateaus and setbacks.',
      keyConcepts: [
        'Grit involves both resilience (bouncing back) and persistence (not giving up)',
        'It\'s different from talent - grit can be developed through practice',
        'Martial arts provides perfect training ground for building grit',
        'Grit transfers from dojo to school, relationships, and future careers'
      ]
    },
    adult: {
      definition: 'Grit encompasses the psychological trait of passion and perseverance for long-term and meaningful goals. It\'s the ability to maintain effort and interest despite failures, adversity, and plateaus in progress. In martial arts context, grit manifests as sustained commitment to mastery, resilience in facing challenges, and the wisdom to view setbacks as essential components of growth.',
      keyConcepts: [
        'Grit predicts success better than talent or intelligence',
        'It involves deliberate practice through discomfort zones',
        'Develops through progressive challenges and reflection on experiences',
        'Creates a growth mindset that embraces challenges as opportunities',
        'Builds character that extends far beyond physical techniques'
      ]
    }
  },

  quotes: [
    {
      id: 'quote-1',
      text: 'The ultimate aim of martial arts is not having to use them.',
      author: 'Miyamoto Musashi',
      application: 'True grit builds inner strength that prevents many conflicts through confidence and composure.',
      category: 'martial-arts'
    },
    {
      id: 'quote-2',
      text: 'I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.',
      author: 'Bruce Lee',
      application: 'Grit is demonstrated through repetitive, consistent practice rather than sporadic efforts.',
      category: 'martial-arts'
    },
    {
      id: 'quote-3',
      text: 'The best fighter is never angry.',
      author: 'Lao Tzu',
      application: 'Grit includes emotional regulation - persevering without losing control or composure.',
      category: 'philosophy'
    },
    {
      id: 'quote-4',
      text: 'Fall down seven times, get up eight.',
      author: 'Japanese Proverb',
      application: 'The essence of grit - resilience and the refusal to stay down.',
      category: 'philosophy'
    },
    {
      id: 'quote-5',
      text: 'It is not the mountain we conquer, but ourselves.',
      author: 'Sir Edmund Hillary',
      application: 'Martial arts training with grit is ultimately about self-mastery.',
      category: 'leadership'
    },
    {
      id: 'quote-6',
      text: 'Grit is passion and perseverance for very long-term goals. Grit is having stamina.',
      author: 'Angela Duckworth',
      application: 'Direct definition emphasizing the long-term nature of true grit.',
      category: 'leadership'
    }
  ],

  lessons: [
    {
      id: 'lesson-1',
      title: 'Understanding Grit vs. Stubbornness',
      description: 'Learn the crucial difference between adaptive persistence (grit) and rigid stubbornness.',
      ageGroup: 'all'
    },
    {
      id: 'lesson-2',
      title: 'The Grit-Building Cycle in Martial Arts',
      description: 'Discover how each belt level represents completed grit development cycles.',
      ageGroup: 'all'
    },
    {
      id: 'lesson-3',
      title: 'Internal vs. External Motivation',
      description: 'Explore the difference between training for external rewards vs. internal growth.',
      ageGroup: 'teen'
    },
    {
      id: 'lesson-4',
      title: 'The Power of "Yet"',
      description: 'Transform limiting beliefs by adding one simple word to your vocabulary.',
      ageGroup: 'young'
    },
    {
      id: 'lesson-5',
      title: 'Embracing the Beginner\'s Mind',
      description: 'Learn how humility in learning keeps grit growing throughout your martial arts journey.',
      ageGroup: 'adult'
    }
  ],

  exercises: [
    {
      id: 'exercise-1',
      title: 'The Grit Assessment Mirror',
      type: 'foundational',
      duration: 10,
      materials: ['Journal or reflection sheet'],
      process: [
        'Students reflect on their current training challenges',
        'Rate their typical response on a scale of 1-10 (1 = give up quickly, 10 = never give up)',
        'Identify one specific area where they want to build more grit',
        'Set a measurable goal for the next 30 days'
      ],
      ageGroup: 'all',
      instructorNotes: 'This creates self-awareness and personal investment in grit development.'
    },
    {
      id: 'exercise-2',
      title: 'The Technique Persistence Challenge',
      type: 'physical',
      duration: 20,
      materials: ['Basic martial arts equipment'],
      process: [
        'Choose one challenging technique each student struggles with',
        'Set a timer for 15 minutes of focused practice',
        'Track attempts, not successes',
        'Celebrate the student who makes the most attempts, regardless of success rate',
        'Debrief on how persistence felt and what they learned'
      ],
      ageGroup: 'all',
      instructorNotes: 'Shifts focus from perfection to effort and persistence.'
    },
    {
      id: 'exercise-3',
      title: 'The Failure Journal',
      type: 'foundational',
      duration: 5,
      materials: ['Small notebook for each student'],
      process: [
        'After each class, students write down one thing that didn\'t go well',
        'Next to it, they write what they learned from the experience',
        'Weekly review to see patterns and growth',
        'Monthly sharing of biggest learning moments'
      ],
      ageGroup: 'all',
      instructorNotes: 'Reframes failure as valuable data for improvement.'
    },
    {
      id: 'exercise-4',
      title: 'The Grit Buddy System',
      type: 'advanced',
      duration: 60,
      materials: ['Partnership contracts'],
      process: [
        'Pair students with similar goals but different strengths',
        'Each commits to supporting their partner\'s grit development',
        'Weekly check-ins on goals and challenges',
        'Monthly presentations on their partner\'s growth'
      ],
      ageGroup: 'teen',
      instructorNotes: 'Builds accountability and teaches grit through helping others develop it.'
    },
    {
      id: 'exercise-5',
      title: 'The Plateau Breakthrough Project',
      type: 'advanced',
      duration: 45,
      materials: ['Progress tracking sheets'],
      process: [
        'Identify students experiencing plateaus in their training',
        'Create specific 30-day challenges to push through the plateau',
        'Daily micro-goals with weekly assessments',
        'Document the breakthrough process for others to learn from'
      ],
      ageGroup: 'adult',
      instructorNotes: 'Teaches that plateaus are normal and can be overcome with strategic grit.'
    }
  ]
};