// Vercel serverless function for AI-powered life skill generation
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { topic, description, ageGroup, difficulty, focusArea } = req.body;

    // Validate required fields
    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // Generate slug and ID
    const slug = topic.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const id = slug;

    // Comprehensive AI prompt for life skill generation
    const prompt = `You are an expert martial arts instructor and curriculum developer. Create a complete life skills training module for martial arts students.

TOPIC: ${topic}
DESCRIPTION: ${description || `Develop ${topic.toLowerCase()} through martial arts principles and practice.`}
AGE GROUP FOCUS: ${ageGroup}
DIFFICULTY LEVEL: ${difficulty}
FOCUS AREA: ${focusArea}

Create a comprehensive life skills module with the following components:

1. PARABLE (300-500 words):
Write an engaging martial arts story that teaches ${topic}. Include:
- Dojo setting with Master and students
- Clear conflict that requires ${topic.toLowerCase()} to resolve
- Dialogue and martial arts techniques
- Character growth and lesson learned
- Clear moral that connects to real life

2. AGE-APPROPRIATE EXPLANATIONS:
Create three versions explaining ${topic}:
- YOUNG (6-10): Simple, fun language with examples kids understand
- TEEN (11-17): Practical applications for school, friends, sports
- ADULT (18+): Professional context, deeper philosophy, leadership aspects
Each needs 4-5 key concepts in bullet points.

3. INSPIRATIONAL QUOTES (6 total):
Generate quotes about ${topic} from different sources:
- 2 from martial arts masters/philosophy
- 2 from general philosophy/wisdom
- 2 from leadership/character development
Each quote needs a practical application to martial arts training.

4. PRACTICAL LESSONS (5 total):
Create actionable lessons that students can apply:
- Make them specific to martial arts training
- Vary age groups (some "all", some specific)
- Focus on "how to practice ${topic.toLowerCase()}" not just "what is ${topic.toLowerCase()}"
- Connect to situations outside the dojo

5. MARTIAL ARTS EXERCISES (5 total):
Design hands-on activities that physically teach ${topic}:
- Mix of foundational (discussion), physical (movement), advanced (scenarios)
- Include duration (5-30 minutes), materials needed, step-by-step process
- Age-appropriate variations
- Instructor notes for teaching tips
- Connect physical practice to character development

IMPORTANT: Format your response as valid JSON with this exact structure:

{
  "parable": {
    "title": "Story Title Here",
    "content": "Full story text here...",
    "teachingPoints": ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"]
  },
  "explanations": {
    "young": {
      "definition": "Simple explanation for kids...",
      "keyConcepts": ["Concept 1", "Concept 2", "Concept 3", "Concept 4"]
    },
    "teen": {
      "definition": "Teen-appropriate explanation...",
      "keyConcepts": ["Concept 1", "Concept 2", "Concept 3", "Concept 4"]
    },
    "adult": {
      "definition": "Comprehensive adult explanation...",
      "keyConcepts": ["Concept 1", "Concept 2", "Concept 3", "Concept 4", "Concept 5"]
    }
  },
  "quotes": [
    {
      "id": "${id}-quote-1",
      "text": "Quote text here",
      "author": "Author Name",
      "application": "How this applies to martial arts training",
      "category": "martial-arts"
    }
  ],
  "lessons": [
    {
      "id": "${id}-lesson-1",
      "title": "Lesson Title",
      "description": "What students will learn and how to apply it",
      "ageGroup": "all"
    }
  ],
  "exercises": [
    {
      "id": "${id}-exercise-1",
      "title": "Exercise Name",
      "type": "foundational",
      "duration": 15,
      "materials": ["List of materials"],
      "process": ["Step 1", "Step 2", "Step 3", "Step 4"],
      "ageGroup": "all",
      "instructorNotes": "Tips for instructors"
    }
  ]
}

Ensure all content is:
- Appropriate for martial arts training environment
- Respectful and inclusive
- Practical and actionable
- Age-appropriate for specified groups
- Connected to physical martial arts practice
- Professional quality for instructors to use directly

Generate high-quality, original content that an experienced martial arts instructor would be proud to teach.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert martial arts instructor and curriculum developer. You create professional-quality life skills training content that combines martial arts practice with character development. Always respond with valid JSON in the exact format requested."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const aiResponse = completion.choices[0].message.content;
    
    // Parse the AI response as JSON
    let generatedContent;
    try {
      generatedContent = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      throw new Error('AI response was not valid JSON');
    }

    // Build complete life skill object
    const completeLifeSkill = {
      id,
      title: topic,
      slug,
      description: description || `Develop ${topic.toLowerCase()} through martial arts principles and practice.`,
      ...generatedContent
    };

    // Return the generated life skill
    res.status(200).json({
      success: true,
      lifeSkill: completeLifeSkill
    });

  } catch (error) {
    console.error('AI Generation Error:', error);
    
    // Return error response
    res.status(500).json({
      error: 'Failed to generate life skill content',
      message: error.message,
      fallback: true
    });
  }
}

// Helper function to generate fallback content if AI fails
function generateFallbackContent(topic, description, id) {
  return {
    id,
    title: topic,
    slug: id,
    description: description || `Develop ${topic.toLowerCase()} through martial arts principles and practice.`,
    parable: {
      title: `The Path to ${topic}`,
      content: `[Fallback Content] Master Chen gathered his students in the dojo to teach them about ${topic.toLowerCase()}. Through dedicated practice and mindful training, they learned that ${topic.toLowerCase()} is not just a concept, but a way of being that transforms both martial arts practice and daily life.`,
      teachingPoints: [
        `${topic} is developed through consistent practice`,
        `True ${topic.toLowerCase()} comes from genuine understanding`,
        `This life skill applies both in martial arts and daily life`,
        `Everyone can learn and develop ${topic.toLowerCase()}`,
        `What we practice becomes who we are`
      ]
    },
    explanations: {
      young: {
        definition: `${topic} means being really good at doing the right thing, even when it's hard!`,
        keyConcepts: [
          `${topic} helps us be better friends`,
          `We can practice ${topic.toLowerCase()} every day`,
          `It makes us stronger inside and outside`,
          `Everyone can learn ${topic.toLowerCase()}`
        ]
      },
      teen: {
        definition: `${topic} is the ability to make good choices and stick with them, especially when facing challenges.`,
        keyConcepts: [
          `${topic} builds character and confidence`,
          `It helps in school, sports, and relationships`,
          `Developed through practice and reflection`,
          `Essential for leadership and teamwork`
        ]
      },
      adult: {
        definition: `${topic} represents a fundamental character strength that guides ethical decision-making and personal excellence.`,
        keyConcepts: [
          `${topic} as a cornerstone of martial arts philosophy`,
          `Integration into professional and personal life`,
          `Modeling ${topic.toLowerCase()} for others`,
          `The relationship between ${topic.toLowerCase()} and inner strength`
        ]
      }
    },
    quotes: [
      {
        id: `${id}-quote-1`,
        text: `True ${topic.toLowerCase()} is not about being perfect, but about being authentic in your efforts.`,
        author: 'Martial Arts Wisdom',
        application: `This reminds us that ${topic.toLowerCase()} comes from genuine practice, not from pretending.`,
        category: 'philosophy'
      }
    ],
    lessons: [
      {
        id: `${id}-lesson-1`,
        title: `Understanding ${topic}`,
        description: `Learn what ${topic.toLowerCase()} really means and why it matters in martial arts training.`,
        ageGroup: 'all'
      }
    ],
    exercises: [
      {
        id: `${id}-exercise-1`,
        title: `${topic} Practice Circle`,
        type: 'foundational',
        duration: 15,
        materials: ['Open space'],
        process: [
          `Form a circle and discuss what ${topic.toLowerCase()} means`,
          `Share examples of ${topic.toLowerCase()} in action`,
          `Practice techniques that require ${topic.toLowerCase()}`,
          `Reflect on daily applications`
        ],
        ageGroup: 'all',
        instructorNotes: `Focus on making ${topic.toLowerCase()} practical and relatable for students.`
      }
    ]
  };
}