import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Studio } from '../../types';

interface StudioTemplate {
  id: string;
  name: string;
  type: 'martial-arts' | 'yoga' | 'sports-team' | 'fitness';
  description: string;
  icon: string;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    name: string;
    terminology: {
      instructor: string;
      student: string;
      session: string;
      skill: string;
    };
  };
}

const studioTemplates: StudioTemplate[] = [
  {
    id: 'martial-arts',
    name: 'Martial Arts Academy',
    type: 'martial-arts',
    description: 'Traditional martial arts focus with discipline and respect',
    icon: '🥋',
    branding: {
      primaryColor: '#fbbf24', // martial arts gold
      secondaryColor: '#dc2626', // red
      name: 'Martial Arts Academy',
      terminology: {
        instructor: 'Sensei',
        student: 'Student',
        session: 'Training',
        skill: 'Life Skill'
      }
    }
  },
  {
    id: 'yoga-studio',
    name: 'Yoga & Wellness Studio',
    type: 'yoga',
    description: 'Mindfulness and wellness-focused approach',
    icon: '🧘‍♀️',
    branding: {
      primaryColor: '#10b981', // green
      secondaryColor: '#8b5cf6', // purple
      name: 'Wellness Studio',
      terminology: {
        instructor: 'Teacher',
        student: 'Practitioner',
        session: 'Practice',
        skill: 'Life Practice'
      }
    }
  },
  {
    id: 'sports-team',
    name: 'Athletic Team',
    type: 'sports-team',
    description: 'Team-building and athletic performance focus',
    icon: '🏆',
    branding: {
      primaryColor: '#2563eb', // blue
      secondaryColor: '#dc2626', // red
      name: 'Athletic Team',
      terminology: {
        instructor: 'Coach',
        student: 'Athlete',
        session: 'Training',
        skill: 'Character Trait'
      }
    }
  },
  {
    id: 'fitness-center',
    name: 'Fitness Center',
    type: 'fitness',
    description: 'Health and fitness with personal development',
    icon: '💪',
    branding: {
      primaryColor: '#f59e0b', // orange
      secondaryColor: '#059669', // teal
      name: 'Fitness Center',
      terminology: {
        instructor: 'Trainer',
        student: 'Member',
        session: 'Workout',
        skill: 'Personal Skill'
      }
    }
  }
];

const StudioCustomization: React.FC = () => {
  const { state, dispatch } = useApp();
  const [selectedTemplate, setSelectedTemplate] = useState<StudioTemplate | null>(
    studioTemplates.find(t => t.type === state.studio?.type) || studioTemplates[0]
  );
  const [customName, setCustomName] = useState(state.studio?.branding?.name || '');
  const [showSuccess, setShowSuccess] = useState(false);

  const applyTemplate = () => {
    if (!selectedTemplate) return;

    const newStudio: Studio = {
      id: state.studio?.id || 'studio-1',
      name: customName || selectedTemplate.branding.name,
      type: selectedTemplate.type,
      branding: {
        ...selectedTemplate.branding,
        name: customName || selectedTemplate.branding.name
      }
    };

    dispatch({
      type: 'SET_STUDIO',
      payload: newStudio
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Studio Customization</h2>
        <p className="text-gray-600">
          Customize the app to match your studio's style and terminology
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          ✅ Studio settings updated successfully!
        </div>
      )}

      {/* Current Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-600">Studio Name:</span>
            <p className="font-semibold">{state.studio?.branding?.name || 'Not Set'}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Studio Type:</span>
            <p className="font-semibold capitalize">{state.studio?.type?.replace('-', ' ') || 'Not Set'}</p>
          </div>
        </div>
      </div>

      {/* Template Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Studio Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studioTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate?.id === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${template.branding.primaryColor}20` }}
                >
                  {template.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  
                  {/* Color Preview */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs text-gray-500">Colors:</span>
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: template.branding.primaryColor }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: template.branding.secondaryColor }}
                    />
                  </div>

                  {/* Terminology Preview */}
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Instructor:</span> {template.branding.terminology.instructor} • 
                    <span className="font-medium"> Student:</span> {template.branding.terminology.student}
                  </div>
                </div>
                
                {selectedTemplate?.id === template.id && (
                  <div className="text-blue-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Name Input */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customize Studio Name</h3>
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Studio Name
          </label>
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder={selectedTemplate?.branding.name || "Enter your studio name"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            This name will appear throughout the app
          </p>
        </div>
      </div>

      {/* Preview */}
      {selectedTemplate && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
          <div 
            className="p-6 rounded-lg text-white"
            style={{ 
              background: `linear-gradient(to right, ${selectedTemplate.branding.primaryColor}, ${selectedTemplate.branding.secondaryColor})` 
            }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{selectedTemplate.icon}</span>
              <div>
                <h4 className="text-xl font-bold">
                  {customName || selectedTemplate.branding.name}
                </h4>
                <p className="opacity-90">Welcome to your life skills training!</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Instructors called:</span> {selectedTemplate.branding.terminology.instructor}
            </div>
            <div>
              <span className="font-medium">Students called:</span> {selectedTemplate.branding.terminology.student}
            </div>
            <div>
              <span className="font-medium">Sessions called:</span> {selectedTemplate.branding.terminology.session}
            </div>
            <div>
              <span className="font-medium">Skills called:</span> {selectedTemplate.branding.terminology.skill}
            </div>
          </div>
        </div>
      )}

      {/* Apply Button */}
      <div className="flex justify-end">
        <button
          onClick={applyTemplate}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          Apply Studio Settings
        </button>
      </div>
    </div>
  );
};

export default StudioCustomization;