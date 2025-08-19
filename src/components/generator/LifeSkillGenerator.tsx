import React, { useState } from 'react';
import { LifeSkill } from '../../types';
import { saveGeneratedLifeSkill } from '../../utils/lifeskillStorage';

interface GeneratorFormData {
  topic: string;
  description: string;
  ageGroup: 'all' | 'young' | 'teen' | 'adult';
  difficulty: 'basic' | 'intermediate' | 'advanced';
  focusArea: 'discipline' | 'respect' | 'confidence' | 'leadership' | 'character';
}

interface LifeSkillGeneratorProps {
  onClose: () => void;
  onGenerated: (lifeSkill: LifeSkill) => void;
}

const LifeSkillGenerator: React.FC<LifeSkillGeneratorProps> = ({ onClose, onGenerated }) => {
  const [formData, setFormData] = useState<GeneratorFormData>({
    topic: '',
    description: '',
    ageGroup: 'all',
    difficulty: 'intermediate',
    focusArea: 'character'
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<Partial<LifeSkill> | null>(null);
  const [error, setError] = useState<string>('');

  const handleInputChange = (field: keyof GeneratorFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSlug = (topic: string): string => {
    return topic.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  const getIcon = (topic: string): string => {
    const iconMap: { [key: string]: string } = {
      'leadership': '👑',
      'patience': '🧘',
      'courage': '🦁',
      'focus': '🎯',
      'humility': '💝',
      'teamwork': '🤝',
      'wisdom': '🦉',
      'compassion': '❤️',
      'integrity': '⚖️',
      'perseverance': '🏔️',
      'responsibility': '🎖️',
      'excellence': '⭐'
    };
    
    const key = topic.toLowerCase();
    return iconMap[key] || '🥋';
  };

  const getColorGradient = (topic: string): string => {
    const colorMap: { [key: string]: string } = {
      'leadership': 'from-purple-500 to-indigo-500',
      'patience': 'from-blue-400 to-cyan-500',
      'courage': 'from-red-500 to-pink-500',
      'focus': 'from-green-500 to-emerald-500',
      'humility': 'from-yellow-400 to-orange-500',
      'teamwork': 'from-indigo-500 to-purple-600',
      'wisdom': 'from-gray-600 to-blue-600',
      'compassion': 'from-pink-400 to-red-500',
      'integrity': 'from-teal-500 to-blue-500',
      'perseverance': 'from-orange-500 to-red-500',
      'responsibility': 'from-blue-600 to-indigo-600',
      'excellence': 'from-yellow-500 to-orange-600'
    };
    
    const key = topic.toLowerCase();
    return colorMap[key] || 'from-gray-500 to-blue-500';
  };

  const generateContent = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      // This would call the AI agents - for now we'll simulate
      // In a real implementation, these would be API calls to the AI agents
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const slug = generateSlug(formData.topic);
      const id = slug;
      
      // Mock generated content - in real implementation, this would come from AI agents
      const mockGeneratedSkill: LifeSkill = {
        id,
        title: formData.topic,
        slug,
        description: formData.description || `Develop ${formData.topic.toLowerCase()} through martial arts principles and practice.`,
        
        parable: {
          title: `The Master's Teaching on ${formData.topic}`,
          content: `[AI Generated Parable]\n\nMaster Kim stood before his students in the quiet dojo, observing their training. Today's lesson was about ${formData.topic.toLowerCase()}, a quality that would serve them both in martial arts and in life.\n\n"Watch closely," Master Kim said, as he demonstrated a simple technique. "True ${formData.topic.toLowerCase()} is not something you can force or fake. It must be cultivated through consistent practice and genuine understanding."\n\nThe students practiced the technique, each discovering their own path to embodying this important life skill.\n\n"Remember," Master Kim concluded, "what you learn on the mat today will serve you in every aspect of your life tomorrow."`,
          teachingPoints: [
            `${formData.topic} is developed through consistent practice`,
            `True ${formData.topic.toLowerCase()} comes from genuine understanding`,
            `This life skill applies both in martial arts and daily life`,
            `Everyone has their own path to developing ${formData.topic.toLowerCase()}`,
            `What we learn in training shapes who we become`
          ]
        },
        
        explanations: {
          young: {
            definition: `${formData.topic} means being really good at [simple definition for kids]. It's like being a superhero who always does the right thing!`,
            keyConcepts: [
              `${formData.topic} helps us be better friends`,
              `We can practice ${formData.topic.toLowerCase()} every day`,
              `It makes us stronger inside and outside`,
              `Everyone can learn ${formData.topic.toLowerCase()}`
            ]
          },
          teen: {
            definition: `${formData.topic} is the ability to [teen-appropriate definition] while maintaining respect for yourself and others.`,
            keyConcepts: [
              `${formData.topic} builds character and confidence`,
              `It helps in school, sports, and relationships`,
              `Developed through practice and reflection`,
              `Essential for effective leadership and teamwork`
            ]
          },
          adult: {
            definition: `${formData.topic} represents [comprehensive adult definition] that forms the foundation of ethical behavior and personal excellence.`,
            keyConcepts: [
              `${formData.topic} as a cornerstone of martial arts philosophy`,
              `Integration of this principle into professional life`,
              `Modeling ${formData.topic.toLowerCase()} for the next generation`,
              `The relationship between ${formData.topic.toLowerCase()} and inner strength`
            ]
          }
        },
        
        quotes: [
          {
            id: `${id}-quote-1`,
            text: `True ${formData.topic.toLowerCase()} is not about being perfect, but about being authentic.`,
            author: 'Generated Wisdom',
            application: `This reminds us that ${formData.topic.toLowerCase()} comes from genuine effort, not from pretending.`,
            category: 'philosophy'
          },
          {
            id: `${id}-quote-2`,
            text: `The path to ${formData.topic.toLowerCase()} is walked one step at a time.`,
            author: 'Martial Arts Proverb',
            application: `Small, consistent actions build strong ${formData.topic.toLowerCase()} over time.`,
            category: 'martial-arts'
          },
          {
            id: `${id}-quote-3`,
            text: `${formData.topic} without action is merely good intention.`,
            author: 'Ancient Teaching',
            application: `We must practice ${formData.topic.toLowerCase()} actively, not just think about it.`,
            category: 'leadership'
          }
        ],
        
        lessons: [
          {
            id: `${id}-lesson-1`,
            title: `Understanding ${formData.topic}`,
            description: `Learn what ${formData.topic.toLowerCase()} really means and why it matters in martial arts.`,
            ageGroup: 'all'
          },
          {
            id: `${id}-lesson-2`,
            title: `Practicing ${formData.topic} Daily`,
            description: `Discover practical ways to develop ${formData.topic.toLowerCase()} in everyday situations.`,
            ageGroup: 'all'
          },
          {
            id: `${id}-lesson-3`,
            title: `${formData.topic} in Relationships`,
            description: `Explore how ${formData.topic.toLowerCase()} improves our connections with others.`,
            ageGroup: 'teen'
          },
          {
            id: `${id}-lesson-4`,
            title: `Teaching ${formData.topic}`,
            description: `Learn how to model and teach ${formData.topic.toLowerCase()} to others.`,
            ageGroup: 'adult'
          }
        ],
        
        exercises: [
          {
            id: `${id}-exercise-1`,
            title: `${formData.topic} Reflection Circle`,
            type: 'foundational',
            duration: 15,
            materials: ['Open space', 'Journal'],
            process: [
              `Form a circle and discuss what ${formData.topic.toLowerCase()} means to each person`,
              `Share examples of ${formData.topic.toLowerCase()} in action`,
              `Practice techniques that require ${formData.topic.toLowerCase()}`,
              `Reflect on how to apply this in daily life`
            ],
            ageGroup: 'all',
            instructorNotes: `Focus on making ${formData.topic.toLowerCase()} practical and relatable for students.`
          },
          {
            id: `${id}-exercise-2`,
            title: `${formData.topic} Challenge Practice`,
            type: 'physical',
            duration: 20,
            materials: ['Training equipment'],
            process: [
              `Set up exercises that require ${formData.topic.toLowerCase()}`,
              `Practice techniques that build this quality`,
              `Support partners in developing ${formData.topic.toLowerCase()}`,
              `Celebrate progress and effort`
            ],
            ageGroup: 'all',
            instructorNotes: `Emphasize that ${formData.topic.toLowerCase()} is developed through consistent practice.`
          }
        ]
      };
      
      setGeneratedContent(mockGeneratedSkill);
      setCurrentStep(3);
      
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveLifeSkill = () => {
    if (generatedContent) {
      const completeLifeSkill = generatedContent as LifeSkill;
      saveGeneratedLifeSkill(completeLifeSkill);
      onGenerated(completeLifeSkill);
      onClose();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Life Skill Topic *
        </label>
        <input
          type="text"
          value={formData.topic}
          onChange={(e) => handleInputChange('topic', e.target.value)}
          placeholder="e.g., Leadership, Patience, Courage"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Brief description of this life skill..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Age Group
          </label>
          <select
            value={formData.ageGroup}
            onChange={(e) => handleInputChange('ageGroup', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ages</option>
            <option value="young">Young (6-10)</option>
            <option value="teen">Teen (11-17)</option>
            <option value="adult">Adult (18+)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) => handleInputChange('difficulty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Focus Area
          </label>
          <select
            value={formData.focusArea}
            onChange={(e) => handleInputChange('focusArea', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="character">Character Building</option>
            <option value="discipline">Discipline & Control</option>
            <option value="respect">Respect & Honor</option>
            <option value="confidence">Confidence & Self-Esteem</option>
            <option value="leadership">Leadership Skills</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Preview & Generate</h3>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${getColorGradient(formData.topic)} rounded-lg flex items-center justify-center text-2xl`}>
            {getIcon(formData.topic)}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{formData.topic}</h4>
            <p className="text-gray-600">{formData.description || `Develop ${formData.topic.toLowerCase()} through martial arts principles.`}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Age Group:</span>
            <p className="text-gray-600">{formData.ageGroup === 'all' ? 'All Ages' : formData.ageGroup}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Difficulty:</span>
            <p className="text-gray-600 capitalize">{formData.difficulty}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Focus:</span>
            <p className="text-gray-600 capitalize">{formData.focusArea.replace('-', ' ')}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Content:</span>
            <p className="text-gray-600">Parable, Lessons, Quotes, Exercises</p>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">What will be generated:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Complete martial arts parable with teaching points</li>
          <li>• Age-appropriate explanations for young, teen, and adult students</li>
          <li>• 6 inspirational quotes with practical applications</li>
          <li>• 5 actionable lessons for different age groups</li>
          <li>• 5 hands-on martial arts exercises</li>
        </ul>
      </div>
    </div>
  );

  const renderStep3 = () => {
    if (!generatedContent) return null;
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Generated Life Skill</h3>
        
        <div className={`bg-gradient-to-r ${getColorGradient(formData.topic)} rounded-lg p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{generatedContent.title}</h2>
              <p className="text-white text-opacity-90 mt-2">{generatedContent.description}</p>
            </div>
            <span className="text-4xl">{getIcon(formData.topic)}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">📖 Parable</h4>
            <p className="text-sm text-gray-600">{generatedContent.parable?.title}</p>
            <p className="text-xs text-gray-500 mt-1">Complete story with teaching points</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">🎯 Explanations</h4>
            <p className="text-sm text-gray-600">Age-appropriate definitions</p>
            <p className="text-xs text-gray-500 mt-1">Young, Teen, Adult versions</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">💬 Quotes</h4>
            <p className="text-sm text-gray-600">{generatedContent.quotes?.length} inspirational quotes</p>
            <p className="text-xs text-gray-500 mt-1">With practical applications</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">🏃‍♂️ Exercises</h4>
            <p className="text-sm text-gray-600">{generatedContent.exercises?.length} martial arts exercises</p>
            <p className="text-xs text-gray-500 mt-1">Foundational to advanced</p>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2">✅ Ready to Save</h4>
          <p className="text-sm text-green-700">
            This life skill will be immediately available in your app. Students can access the complete training module right away.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Create New Life Skill</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center mt-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step < currentStep ? 'bg-green-500 text-white' :
                  step === currentStep ? 'bg-blue-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? '✓' : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          
          {isGenerating && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900">Generating Life Skill Content</h3>
                <p className="text-gray-600 mt-2">Using AI to create parable, lessons, quotes, and exercises...</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-between">
          <div>
            {currentStep > 1 && currentStep < 3 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back
              </button>
            )}
          </div>
          
          <div className="space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            {currentStep === 1 && (
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!formData.topic.trim()}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            )}
            
            {currentStep === 2 && (
              <button
                onClick={generateContent}
                disabled={isGenerating}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </button>
            )}
            
            {currentStep === 3 && (
              <button
                onClick={saveLifeSkill}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Life Skill
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeSkillGenerator;