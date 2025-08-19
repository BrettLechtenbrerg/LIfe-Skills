# How to Add New Life Skill Programs - Team Instructions

## Overview
Follow these step-by-step instructions to add any new life skill program to the PMMA Academy Training App. Each life skill includes parables, explanations, quotes, lessons, and exercises.

## Prerequisites
- Access to the project code
- Basic understanding of file editing
- 30-60 minutes per life skill program

---

## STEP 1: Choose Your Life Skill Topic

Pick any life skill relevant to martial arts training:
- **Examples**: Respect, Discipline, Confidence, Leadership, Patience, Focus, Humility, Courage, Teamwork, etc.

**Your chosen topic**: ________________

---

## STEP 2: Create the Data File

### 2.1 File Location
Navigate to: `src/data/`

### 2.2 Create New File
Create a new file named: `[your-topic]TrainingData.ts`

**Examples**:
- `respectTrainingData.ts`
- `disciplineTrainingData.ts`
- `confidenceTrainingData.ts`

### 2.3 Copy This Template
```typescript
import { LifeSkill } from '../types';

export const [TOPIC_NAME]TrainingData: LifeSkill = {
  id: '[TOPIC_ID]',
  title: '[TOPIC_TITLE]',
  slug: '[TOPIC_SLUG]',
  description: '[BRIEF_DESCRIPTION]',
  
  parable: {
    title: '[PARABLE_TITLE]',
    content: `[YOUR_MARTIAL_ARTS_STORY_HERE]`,
    teachingPoints: [
      '[KEY_LESSON_1]',
      '[KEY_LESSON_2]',
      '[KEY_LESSON_3]',
      '[KEY_LESSON_4]',
      '[KEY_LESSON_5]'
    ]
  },

  explanations: {
    young: {
      definition: '[SIMPLE_EXPLANATION_FOR_KIDS_6-10]',
      keyConcepts: [
        '[SIMPLE_CONCEPT_1]',
        '[SIMPLE_CONCEPT_2]',
        '[SIMPLE_CONCEPT_3]',
        '[SIMPLE_CONCEPT_4]'
      ]
    },
    teen: {
      definition: '[DETAILED_EXPLANATION_FOR_TEENS_11-17]',
      keyConcepts: [
        '[TEEN_CONCEPT_1]',
        '[TEEN_CONCEPT_2]',
        '[TEEN_CONCEPT_3]',
        '[TEEN_CONCEPT_4]'
      ]
    },
    adult: {
      definition: '[COMPREHENSIVE_EXPLANATION_FOR_ADULTS_18+]',
      keyConcepts: [
        '[ADULT_CONCEPT_1]',
        '[ADULT_CONCEPT_2]',
        '[ADULT_CONCEPT_3]',
        '[ADULT_CONCEPT_4]',
        '[ADULT_CONCEPT_5]'
      ]
    }
  },

  quotes: [
    {
      id: '[TOPIC_ID]-quote-1',
      text: '[INSPIRATIONAL_QUOTE_1]',
      author: '[AUTHOR_NAME]',
      application: '[HOW_IT_APPLIES_TO_MARTIAL_ARTS]',
      category: 'martial-arts'
    },
    {
      id: '[TOPIC_ID]-quote-2',
      text: '[INSPIRATIONAL_QUOTE_2]',
      author: '[AUTHOR_NAME]',
      application: '[HOW_IT_APPLIES_TO_MARTIAL_ARTS]',
      category: 'philosophy'
    },
    {
      id: '[TOPIC_ID]-quote-3',
      text: '[INSPIRATIONAL_QUOTE_3]',
      author: '[AUTHOR_NAME]',
      application: '[HOW_IT_APPLIES_TO_MARTIAL_ARTS]',
      category: 'leadership'
    },
    {
      id: '[TOPIC_ID]-quote-4',
      text: '[INSPIRATIONAL_QUOTE_4]',
      author: '[AUTHOR_NAME]',
      application: '[HOW_IT_APPLIES_TO_MARTIAL_ARTS]',
      category: 'martial-arts'
    },
    {
      id: '[TOPIC_ID]-quote-5',
      text: '[INSPIRATIONAL_QUOTE_5]',
      author: '[AUTHOR_NAME]',
      application: '[HOW_IT_APPLIES_TO_MARTIAL_ARTS]',
      category: 'philosophy'
    },
    {
      id: '[TOPIC_ID]-quote-6',
      text: '[INSPIRATIONAL_QUOTE_6]',
      author: '[AUTHOR_NAME]',
      application: '[HOW_IT_APPLIES_TO_MARTIAL_ARTS]',
      category: 'leadership'
    }
  ],

  lessons: [
    {
      id: '[TOPIC_ID]-lesson-1',
      title: '[LESSON_TITLE_1]',
      description: '[WHAT_STUDENTS_WILL_LEARN]',
      ageGroup: 'all'
    },
    {
      id: '[TOPIC_ID]-lesson-2',
      title: '[LESSON_TITLE_2]',
      description: '[WHAT_STUDENTS_WILL_LEARN]',
      ageGroup: 'all'
    },
    {
      id: '[TOPIC_ID]-lesson-3',
      title: '[LESSON_TITLE_3]',
      description: '[WHAT_STUDENTS_WILL_LEARN]',
      ageGroup: 'teen'
    },
    {
      id: '[TOPIC_ID]-lesson-4',
      title: '[LESSON_TITLE_4]',
      description: '[WHAT_STUDENTS_WILL_LEARN]',
      ageGroup: 'young'
    },
    {
      id: '[TOPIC_ID]-lesson-5',
      title: '[LESSON_TITLE_5]',
      description: '[WHAT_STUDENTS_WILL_LEARN]',
      ageGroup: 'adult'
    }
  ],

  exercises: [
    {
      id: '[TOPIC_ID]-exercise-1',
      title: '[EXERCISE_NAME_1]',
      type: 'foundational',
      duration: 10,
      materials: ['[MATERIAL_1]', '[MATERIAL_2]'],
      process: [
        '[STEP_1_OF_EXERCISE]',
        '[STEP_2_OF_EXERCISE]',
        '[STEP_3_OF_EXERCISE]',
        '[STEP_4_OF_EXERCISE]'
      ],
      ageGroup: 'all',
      instructorNotes: '[TIPS_FOR_INSTRUCTORS]'
    },
    {
      id: '[TOPIC_ID]-exercise-2',
      title: '[EXERCISE_NAME_2]',
      type: 'physical',
      duration: 20,
      materials: ['[MATERIAL_1]', '[MATERIAL_2]'],
      process: [
        '[STEP_1_OF_EXERCISE]',
        '[STEP_2_OF_EXERCISE]',
        '[STEP_3_OF_EXERCISE]',
        '[STEP_4_OF_EXERCISE]'
      ],
      ageGroup: 'all',
      instructorNotes: '[TIPS_FOR_INSTRUCTORS]'
    },
    {
      id: '[TOPIC_ID]-exercise-3',
      title: '[EXERCISE_NAME_3]',
      type: 'foundational',
      duration: 5,
      materials: ['[MATERIAL_1]'],
      process: [
        '[STEP_1_OF_EXERCISE]',
        '[STEP_2_OF_EXERCISE]',
        '[STEP_3_OF_EXERCISE]'
      ],
      ageGroup: 'all',
      instructorNotes: '[TIPS_FOR_INSTRUCTORS]'
    },
    {
      id: '[TOPIC_ID]-exercise-4',
      title: '[EXERCISE_NAME_4]',
      type: 'advanced',
      duration: 60,
      materials: ['[MATERIAL_1]', '[MATERIAL_2]'],
      process: [
        '[STEP_1_OF_EXERCISE]',
        '[STEP_2_OF_EXERCISE]',
        '[STEP_3_OF_EXERCISE]',
        '[STEP_4_OF_EXERCISE]'
      ],
      ageGroup: 'teen',
      instructorNotes: '[TIPS_FOR_INSTRUCTORS]'
    },
    {
      id: '[TOPIC_ID]-exercise-5',
      title: '[EXERCISE_NAME_5]',
      type: 'advanced',
      duration: 45,
      materials: ['[MATERIAL_1]', '[MATERIAL_2]'],
      process: [
        '[STEP_1_OF_EXERCISE]',
        '[STEP_2_OF_EXERCISE]',
        '[STEP_3_OF_EXERCISE]',
        '[STEP_4_OF_EXERCISE]'
      ],
      ageGroup: 'adult',
      instructorNotes: '[TIPS_FOR_INSTRUCTORS]'
    }
  ]
};
```

---

## STEP 3: Fill in Your Content

### 3.1 Replace Placeholders
Replace ALL text in `[BRACKETS]` with your content:

**Example for "Respect":**
- `[TOPIC_NAME]` → `respect`
- `[TOPIC_ID]` → `respect`
- `[TOPIC_TITLE]` → `Respect`
- `[TOPIC_SLUG]` → `respect`
- `[BRIEF_DESCRIPTION]` → `Learn to honor yourself, others, and your training environment.`

### 3.2 Content Guidelines

**Parable (Story):**
- 300-500 words
- Martial arts setting
- Clear moral lesson
- Relatable characters

**Age Group Explanations:**
- **Young (6-10)**: Simple, fun language
- **Teen (11-17)**: More detailed, practical
- **Adult (18+)**: Comprehensive, philosophical

**Quotes:**
- Mix of martial arts, philosophy, leadership
- Include author names
- Explain how each applies to training

**Lessons:**
- 5 clear, actionable lessons
- Specify age groups
- Focus on practical application

**Exercises:**
- 5 hands-on activities
- Include materials needed
- Step-by-step instructions
- Instructor tips

---

## STEP 4: Register Your Life Skill

### 4.1 Open the Index File
Navigate to: `src/data/index.ts`

### 4.2 Add Import Statement
Add your import at the top:
```typescript
import { respectTrainingData } from './respectTrainingData';
```

### 4.3 Add to Exports
Add to the export line:
```typescript
export { gritTrainingData, respectTrainingData };
```

### 4.4 Add to Array
Add to the `allLifeSkills` array:
```typescript
export const allLifeSkills: LifeSkill[] = [
  gritTrainingData,
  respectTrainingData  // Add your new skill here
];
```

---

## STEP 5: Update the Display

### 5.1 Open LifeSkills Page
Navigate to: `src/pages/LifeSkills.tsx`

### 5.2 Add Icon and Color
Find the `iconMap` and `colorMap` objects, add your skill:

```typescript
const iconMap = {
  'grit': '💪',
  'respect': '🙏',        // Add your icon
  'discipline': '🎯',
  'confidence': '🌟'
};

const colorMap = {
  'grit': 'from-red-500 to-orange-500',
  'respect': 'from-blue-500 to-purple-500',  // Add your colors
  'discipline': 'from-green-500 to-teal-500',
  'confidence': 'from-yellow-500 to-orange-500'
};
```

### 5.3 Choose Your Icon and Colors
**Popular Emoji Icons:**
- 🙏 (Respect)
- 🎯 (Discipline) 
- 🌟 (Confidence)
- 👑 (Leadership)
- 🧘 (Patience)
- 🎯 (Focus)
- 💝 (Humility)
- 🦁 (Courage)
- 🤝 (Teamwork)

**Color Gradients:**
- `from-blue-500 to-purple-500` (Blue to Purple)
- `from-green-500 to-teal-500` (Green to Teal)
- `from-purple-500 to-pink-500` (Purple to Pink)
- `from-indigo-500 to-blue-500` (Indigo to Blue)
- `from-yellow-500 to-orange-500` (Yellow to Orange)

---

## STEP 6: Test Your Life Skill

### 6.1 Save All Files
Make sure all files are saved.

### 6.2 Start the App
```bash
npm start
```

### 6.3 Check the Display
1. Go to the Life Skills page
2. Verify your new skill appears
3. Click on it to test functionality

### 6.4 Test All Features
- Parable displays correctly
- Explanations show for different age groups
- Quotes are formatted properly
- Lessons are clear and actionable
- Exercises have all required information

---

## STEP 7: Using AI Agents (Optional)

The app includes AI agents that can help generate content. You can use Claude or other AI tools to help create:

1. **Parables**: Ask for "a martial arts parable about [your topic]"
2. **Quotes**: Request "inspirational quotes about [your topic] for martial arts"
3. **Exercises**: Ask for "practical martial arts exercises that teach [your topic]"

---

## TROUBLESHOOTING

### Common Issues:

**1. Skill doesn't appear on the page**
- Check that you added the import in `index.ts`
- Verify you added it to the `allLifeSkills` array
- Make sure the file name matches the import

**2. App won't start**
- Check for syntax errors in your file
- Ensure all brackets `[]` are replaced with actual content
- Verify all commas and quotes are correct

**3. Content doesn't display**
- Check that all required fields are filled
- Ensure quote IDs are unique
- Verify exercise and lesson IDs follow the pattern

**4. Styling looks wrong**
- Check that your color gradient is spelled correctly
- Ensure your emoji icon is properly formatted
- Verify you added both icon and color to the maps

---

## EXAMPLE REFERENCE

See `src/data/gritTrainingData.ts` for a complete example of how a life skill should be structured.

---

## DEPLOYMENT

After adding your life skill:

1. Test locally first
2. Commit changes to git
3. Push to GitHub
4. Vercel will automatically deploy

---

**Questions?** Contact the development team for assistance.

**Next Steps:** Once comfortable with this process, you can create multiple life skills efficiently and even develop themed training packages!