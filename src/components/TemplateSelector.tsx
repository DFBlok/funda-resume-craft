
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: 'Professional' | 'Modern';
  description: string;
  features: string[];
  preview: string;
}

const templates: Template[] = [
  // Professional Templates
  {
    id: 'professional-1',
    name: 'Executive Classic',
    category: 'Professional',
    description: 'Traditional layout perfect for corporate roles and senior positions.',
    features: ['Clean typography', 'Formal structure', 'ATS-friendly'],
    preview: 'bg-gradient-to-br from-blue-50 to-blue-100'
  },
  {
    id: 'professional-2',
    name: 'Corporate Elite',
    category: 'Professional',
    description: 'Sophisticated design for finance and consulting professionals.',
    features: ['Professional colors', 'Structured layout', 'Conservative design'],
    preview: 'bg-gradient-to-br from-gray-50 to-gray-100'
  },
  {
    id: 'professional-3',
    name: 'Business Standard',
    category: 'Professional',
    description: 'Versatile template suitable for various business roles.',
    features: ['Flexible sections', 'Professional fonts', 'Clean margins'],
    preview: 'bg-gradient-to-br from-slate-50 to-slate-100'
  },
  {
    id: 'professional-4',
    name: 'Academic Focus',
    category: 'Professional',
    description: 'Tailored for academia and research positions.',
    features: ['Publication sections', 'Research-focused', 'Academic formatting'],
    preview: 'bg-gradient-to-br from-emerald-50 to-emerald-100'
  },
  {
    id: 'professional-5',
    name: 'Legal Professional',
    category: 'Professional',
    description: 'Designed specifically for legal professionals and law firms.',
    features: ['Conservative layout', 'Professional hierarchy', 'Law-focused sections'],
    preview: 'bg-gradient-to-br from-amber-50 to-amber-100'
  },
  
  // Modern Templates
  {
    id: 'modern-1',
    name: 'Tech Innovator',
    category: 'Modern',
    description: 'Contemporary design perfect for tech and startup environments.',
    features: ['Modern typography', 'Creative layout', 'Tech-focused'],
    preview: 'bg-gradient-to-br from-purple-50 to-purple-100'
  },
  {
    id: 'modern-2',
    name: 'Creative Studio',
    category: 'Modern',
    description: 'Bold and creative template for designers and artists.',
    features: ['Creative elements', 'Visual hierarchy', 'Portfolio-friendly'],
    preview: 'bg-gradient-to-br from-pink-50 to-pink-100'
  },
  {
    id: 'modern-3',
    name: 'Minimalist Pro',
    category: 'Modern',
    description: 'Clean, minimal design focusing on content over decoration.',
    features: ['Minimal design', 'Focus on content', 'Modern spacing'],
    preview: 'bg-gradient-to-br from-teal-50 to-teal-100'
  }
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) => {
  const professionalTemplates = templates.filter(t => t.category === 'Professional');
  const modernTemplates = templates.filter(t => t.category === 'Modern');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Template</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select from our collection of professional and modern resume templates, 
          all optimized for ATS systems and designed to make you stand out.
        </p>
      </div>

      {/* Professional Templates */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Professional Templates</h3>
          <Badge variant="secondary">5 Templates</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionalTemplates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedTemplate === template.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  {selectedTemplate === template.id && (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <Badge variant="outline" className="w-fit">
                  {template.category}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Template Preview */}
                <div className={`h-32 rounded-lg ${template.preview} border-2 border-dashed border-gray-300 flex items-center justify-center`}>
                  <Eye className="h-8 w-8 text-gray-400" />
                </div>
                
                <p className="text-sm text-gray-600">{template.description}</p>
                
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">Key Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTemplate(template.id);
                    }}
                  >
                    {selectedTemplate === template.id ? 'Selected' : 'Select'}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Modern Templates */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">Modern Templates</h3>
          <Badge variant="secondary">3 Templates</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modernTemplates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedTemplate === template.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  {selectedTemplate === template.id && (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <Badge variant="outline" className="w-fit">
                  {template.category}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Template Preview */}
                <div className={`h-32 rounded-lg ${template.preview} border-2 border-dashed border-gray-300 flex items-center justify-center`}>
                  <Eye className="h-8 w-8 text-gray-400" />
                </div>
                
                <p className="text-sm text-gray-600">{template.description}</p>
                
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">Key Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTemplate(template.id);
                    }}
                  >
                    {selectedTemplate === template.id ? 'Selected' : 'Select'}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Template Comparison */}
      <section className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Template Comparison Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-blue-600">Professional Templates</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Best for corporate, finance, and legal roles</li>
                  <li>• Conservative design with formal structure</li>
                  <li>• Traditional fonts and professional colors</li>
                  <li>• Optimized for senior-level positions</li>
                  <li>• High ATS compatibility</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 text-purple-600">Modern Templates</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Perfect for tech, creative, and startup roles</li>
                  <li>• Contemporary design with creative elements</li>
                  <li>• Modern typography and color schemes</li>
                  <li>• Great for entry to mid-level positions</li>
                  <li>• Balance of style and ATS compatibility</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default TemplateSelector;
