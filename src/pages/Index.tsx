
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Search, Settings, Users } from 'lucide-react';
import ResumeBuilder from '@/components/ResumeBuilder';
import TemplateSelector from '@/components/TemplateSelector';
import ATSChecker from '@/components/ATSChecker';
import JobMatcher from '@/components/JobMatcher';

const Index = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [selectedTemplate, setSelectedTemplate] = useState('professional-1');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Funda Resume Maker
              </h1>
            </div>
            <p className="text-gray-600 hidden md:block">
              Create ATS-friendly resumes with AI-powered optimization
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'builder', label: 'Resume Builder', icon: FileText },
              { id: 'templates', label: 'Templates', icon: Settings },
              { id: 'ats-checker', label: 'ATS Checker', icon: Search },
              { id: 'job-matcher', label: 'Job Matcher', icon: Users },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'builder' && (
          <ResumeBuilder 
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />
        )}
        {activeTab === 'templates' && (
          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        )}
        {activeTab === 'ats-checker' && <ATSChecker />}
        {activeTab === 'job-matcher' && <JobMatcher />}
      </main>
    </div>
  );
};

export default Index;
