
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Plus, Sparkles } from 'lucide-react';

interface ContentSuggestionsProps {
  industry: string;
  resumeData: any;
  onSuggestionApply: (suggestion: any) => void;
}

const ContentSuggestions = ({ industry, resumeData, onSuggestionApply }: ContentSuggestionsProps) => {
  const getIndustryKeywords = (industry: string): string[] => {
    const keywordMap: Record<string, string[]> = {
      technology: [
        'agile development', 'software engineering', 'cloud computing', 'DevOps',
        'machine learning', 'API development', 'microservices', 'continuous integration',
        'data analysis', 'cybersecurity', 'full-stack development', 'automation'
      ],
      healthcare: [
        'patient care', 'clinical research', 'healthcare compliance', 'medical records',
        'patient safety', 'quality improvement', 'evidence-based practice', 'HIPAA',
        'electronic health records', 'interdisciplinary collaboration', 'case management'
      ],
      finance: [
        'financial analysis', 'risk management', 'investment portfolio', 'compliance',
        'financial modeling', 'budget forecasting', 'regulatory reporting', 'audit',
        'financial planning', 'market analysis', 'cost optimization', 'due diligence'
      ],
      marketing: [
        'digital marketing', 'brand management', 'customer acquisition', 'SEO/SEM',
        'content strategy', 'social media marketing', 'market research', 'campaign management',
        'lead generation', 'conversion optimization', 'analytics', 'customer retention'
      ],
      education: [
        'curriculum development', 'student assessment', 'classroom management', 'educational technology',
        'differentiated instruction', 'student engagement', 'professional development', 'data-driven instruction',
        'collaborative learning', 'special needs', 'parent communication', 'academic achievement'
      ],
      consulting: [
        'strategic planning', 'process improvement', 'change management', 'stakeholder engagement',
        'project management', 'business analysis', 'solution design', 'client relationship management',
        'performance optimization', 'operational efficiency', 'market entry', 'organizational development'
      ],
      engineering: [
        'product development', 'technical documentation', 'quality assurance', 'system design',
        'project engineering', 'technical leadership', 'process optimization', 'safety compliance',
        'cross-functional collaboration', 'problem solving', 'innovation', 'continuous improvement'
      ],
      design: [
        'user experience', 'visual design', 'creative direction', 'brand identity',
        'design thinking', 'user research', 'prototyping', 'design systems',
        'cross-functional collaboration', 'creative problem solving', 'design strategy', 'accessibility'
      ],
      sales: [
        'client relationship management', 'revenue growth', 'sales strategy', 'lead generation',
        'customer acquisition', 'territory management', 'sales forecasting', 'negotiation',
        'account management', 'pipeline development', 'customer retention', 'market penetration'
      ],
      operations: [
        'process optimization', 'supply chain management', 'quality control', 'operational efficiency',
        'inventory management', 'vendor management', 'cost reduction', 'performance metrics',
        'workflow improvement', 'resource allocation', 'compliance', 'continuous improvement'
      ]
    };
    
    return keywordMap[industry] || [];
  };

  const getSummaryTemplates = (industry: string): string[] => {
    const templates: Record<string, string[]> = {
      technology: [
        "Experienced software engineer with expertise in full-stack development and cloud technologies. Proven track record of delivering scalable solutions and leading agile development teams.",
        "Results-driven technology professional specializing in DevOps and automation. Strong background in implementing CI/CD pipelines and optimizing system performance.",
        "Innovative developer with deep expertise in machine learning and data analysis. Passionate about leveraging technology to solve complex business challenges."
      ],
      healthcare: [
        "Dedicated healthcare professional with extensive experience in patient care and clinical operations. Committed to improving patient outcomes through evidence-based practice.",
        "Experienced clinical researcher with expertise in protocol development and regulatory compliance. Strong background in interdisciplinary collaboration and quality improvement.",
        "Healthcare administrator with proven track record in managing clinical operations and ensuring regulatory compliance. Focused on patient safety and quality care delivery."
      ],
      finance: [
        "Results-oriented financial analyst with expertise in risk management and investment portfolio optimization. Strong analytical skills and attention to regulatory compliance.",
        "Experienced finance professional specializing in financial modeling and market analysis. Proven ability to drive cost optimization and support strategic decision-making.",
        "Investment management professional with deep expertise in portfolio analysis and client relationship management. Committed to delivering superior investment performance."
      ],
      marketing: [
        "Creative marketing professional with expertise in digital marketing and brand management. Proven track record of driving customer acquisition and engagement.",
        "Results-driven marketing strategist specializing in content marketing and campaign management. Strong analytical skills and data-driven approach to marketing optimization.",
        "Experienced brand manager with deep expertise in market research and customer insights. Passionate about building strong brand relationships and driving growth."
      ],
      education: [
        "Dedicated educator with expertise in curriculum development and student assessment. Committed to fostering student engagement and academic achievement.",
        "Experienced instructional designer with strong background in educational technology and differentiated instruction. Passionate about improving learning outcomes.",
        "Educational leader with proven track record in program development and teacher mentoring. Focused on data-driven instruction and continuous improvement."
      ]
    };
    
    return templates[industry] || [
      "Motivated professional with strong analytical and communication skills. Proven ability to work collaboratively and deliver results in fast-paced environments."
    ];
  };

  const getSkillSuggestions = (industry: string): Array<{ name: string; level: string }> => {
    const skillsMap: Record<string, Array<{ name: string; level: string }>> = {
      technology: [
        { name: 'JavaScript', level: 'Advanced' },
        { name: 'Python', level: 'Advanced' },
        { name: 'React', level: 'Advanced' },
        { name: 'Node.js', level: 'Intermediate' },
        { name: 'AWS', level: 'Intermediate' },
        { name: 'Docker', level: 'Intermediate' },
        { name: 'Git', level: 'Advanced' },
        { name: 'Agile/Scrum', level: 'Advanced' }
      ],
      healthcare: [
        { name: 'Electronic Health Records', level: 'Advanced' },
        { name: 'HIPAA Compliance', level: 'Expert' },
        { name: 'Clinical Research', level: 'Advanced' },
        { name: 'Patient Care', level: 'Expert' },
        { name: 'Medical Terminology', level: 'Expert' },
        { name: 'Quality Improvement', level: 'Advanced' }
      ],
      finance: [
        { name: 'Financial Modeling', level: 'Advanced' },
        { name: 'Excel/VBA', level: 'Expert' },
        { name: 'Bloomberg Terminal', level: 'Advanced' },
        { name: 'Risk Management', level: 'Advanced' },
        { name: 'SQL', level: 'Intermediate' },
        { name: 'Financial Analysis', level: 'Expert' }
      ],
      marketing: [
        { name: 'Google Analytics', level: 'Advanced' },
        { name: 'SEO/SEM', level: 'Advanced' },
        { name: 'Adobe Creative Suite', level: 'Intermediate' },
        { name: 'Social Media Marketing', level: 'Advanced' },
        { name: 'Content Strategy', level: 'Advanced' },
        { name: 'Email Marketing', level: 'Advanced' }
      ]
    };
    
    return skillsMap[industry] || [];
  };

  const industryKeywords = getIndustryKeywords(industry);
  const summaryTemplates = getSummaryTemplates(industry);
  const skillSuggestions = getSkillSuggestions(industry);

  if (!industry) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Content Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm">
            Select your industry to see personalized content suggestions and keywords.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Industry Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Industry Keywords
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">
            Include these keywords to optimize your resume for {industry} roles:
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {industryKeywords.slice(0, 8).map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
          {industryKeywords.length > 8 && (
            <Button variant="outline" size="sm" className="text-xs">
              Show More Keywords
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Summary Suggestions */}
      {!resumeData.personalInfo.summary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Summary Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {summaryTemplates.slice(0, 2).map((template, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">{template}</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onSuggestionApply({ type: 'summary', content: template })}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Use This
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Skill Suggestions */}
      {skillSuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Skill Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              Consider adding these skills for {industry} roles:
            </p>
            <div className="space-y-2">
              {skillSuggestions.slice(0, 4).map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <Badge variant="outline" className="text-xs">{skill.level}</Badge>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onSuggestionApply({ type: 'skill', content: skill })}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            ATS Optimization Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Use standard section headings (Experience, Education, Skills)</li>
            <li>• Include relevant keywords naturally in your descriptions</li>
            <li>• Use simple formatting without complex graphics or tables</li>
            <li>• Save in PDF format for best compatibility</li>
            <li>• Quantify achievements with numbers and percentages</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentSuggestions;
