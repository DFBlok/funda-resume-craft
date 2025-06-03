
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Globe, File, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  references: Array<{
    id: string;
    name: string;
    title: string;
    company: string;
    email: string;
    phone: string;
    relationship: string;
  }>;
  selectedIndustry: string;
}

interface ExportOptionsProps {
  resumeData: ResumeData;
  template: string;
  onClose: () => void;
}

const ExportOptions = ({ resumeData, template, onClose }: ExportOptionsProps) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'html' | 'docx' | null>(null);

  const exportFormats = [
    {
      id: 'pdf' as const,
      name: 'PDF Document',
      description: 'Most common format for job applications',
      icon: FileText,
      features: ['ATS Friendly', 'Universal Compatibility', 'Print Ready'],
      recommended: true
    },
    {
      id: 'html' as const,
      name: 'HTML Web Page',
      description: 'Interactive web version of your resume',
      icon: Globe,
      features: ['Responsive Design', 'Easy Sharing', 'Online Portfolio'],
      recommended: false
    },
    {
      id: 'docx' as const,
      name: 'Word Document',
      description: 'Editable Microsoft Word format',
      icon: File,
      features: ['Fully Editable', 'Track Changes', 'Comments Support'],
      recommended: false
    }
  ];

  const generateHTMLResume = () => {
    const formatDate = (dateString: string): string => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const isModern = template.startsWith('modern');
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.personalInfo.fullName || 'Resume'}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        
        .resume {
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        
        .header {
            ${isModern ? 
              'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px;' :
              'border-bottom: 3px solid #333; padding: 30px; text-align: center;'
            }
        }
        
        .header h1 {
            font-size: ${isModern ? '2.5rem' : '2rem'};
            margin-bottom: 10px;
            font-weight: bold;
        }
        
        .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            font-size: 0.9rem;
            ${isModern ? 'opacity: 0.9;' : 'color: #666;'}
        }
        
        .content {
            padding: 30px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section h2 {
            font-size: 1.4rem;
            margin-bottom: 15px;
            ${isModern ? 
              'color: #667eea; border-bottom: 2px solid #667eea;' :
              'color: #333; border-bottom: 1px solid #ccc;'
            }
            padding-bottom: 5px;
        }
        
        .experience-item, .education-item, .reference-item {
            margin-bottom: 20px;
            ${isModern ? 'padding: 15px; background: #f8f9fa; border-radius: 6px;' : ''}
        }
        
        .experience-header, .education-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 5px;
            flex-wrap: wrap;
        }
        
        .position, .degree {
            font-size: 1.1rem;
            font-weight: bold;
            color: #333;
        }
        
        .company, .institution {
            color: ${isModern ? '#667eea' : '#666'};
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .date {
            color: #666;
            font-size: 0.9rem;
            ${isModern ? 'background: white; padding: 4px 8px; border-radius: 4px; font-weight: 500;' : ''}
        }
        
        .description {
            color: #555;
            margin-top: 8px;
            line-height: 1.7;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
        }
        
        .skill-item {
            display: flex;
            justify-content: space-between;
            ${isModern ? 
              'background: #f8f9fa; padding: 8px 12px; border-radius: 4px; border-left: 3px solid #667eea;' :
              'padding: 5px 0; border-bottom: 1px dotted #ddd;'
            }
        }
        
        .skill-name {
            font-weight: 500;
        }
        
        .skill-level {
            color: #666;
            font-size: 0.9rem;
        }
        
        .references-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        
        .reference-item {
            ${isModern ? 'border: 1px solid #e9ecef;' : 'border-left: 3px solid #333; padding-left: 15px;'}
        }
        
        .reference-name {
            font-weight: bold;
            font-size: 1.1rem;
            margin-bottom: 5px;
        }
        
        .reference-title {
            color: ${isModern ? '#667eea' : '#666'};
            font-weight: 600;
            margin-bottom: 3px;
        }
        
        .reference-contact {
            color: #666;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .resume {
                box-shadow: none;
                border-radius: 0;
            }
        }
        
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .content {
                padding: 20px;
            }
            
            .header {
                padding: 20px;
            }
            
            .experience-header, .education-header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .date {
                margin-top: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="resume">
        <header class="header">
            <h1>${resumeData.personalInfo.fullName || 'Your Name'}</h1>
            <div class="contact-info">
                ${resumeData.personalInfo.email ? `<span>${resumeData.personalInfo.email}</span>` : ''}
                ${resumeData.personalInfo.phone ? `<span>${resumeData.personalInfo.phone}</span>` : ''}
                ${resumeData.personalInfo.location ? `<span>${resumeData.personalInfo.location}</span>` : ''}
                ${resumeData.personalInfo.linkedin ? `<span>${resumeData.personalInfo.linkedin}</span>` : ''}
            </div>
        </header>
        
        <div class="content">
            ${resumeData.personalInfo.summary ? `
            <section class="section">
                <h2>Professional Summary</h2>
                <p class="description">${resumeData.personalInfo.summary}</p>
            </section>
            ` : ''}
            
            ${resumeData.experience.length > 0 ? `
            <section class="section">
                <h2>Professional Experience</h2>
                ${resumeData.experience.map(exp => `
                <div class="experience-item">
                    <div class="experience-header">
                        <div>
                            <div class="position">${exp.position}</div>
                            <div class="company">${exp.company}</div>
                        </div>
                        <div class="date">
                            ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
                        </div>
                    </div>
                    ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
                </div>
                `).join('')}
            </section>
            ` : ''}
            
            ${resumeData.education.length > 0 ? `
            <section class="section">
                <h2>Education</h2>
                ${resumeData.education.map(edu => `
                <div class="education-item">
                    <div class="education-header">
                        <div>
                            <div class="degree">${edu.degree} ${edu.field ? `in ${edu.field}` : ''}</div>
                            <div class="institution">${edu.institution}</div>
                            ${edu.gpa ? `<div style="color: #666; font-size: 0.9rem;">GPA: ${edu.gpa}</div>` : ''}
                        </div>
                        <div class="date">${formatDate(edu.graduationDate)}</div>
                    </div>
                </div>
                `).join('')}
            </section>
            ` : ''}
            
            ${resumeData.skills.length > 0 ? `
            <section class="section">
                <h2>Technical Skills</h2>
                <div class="skills-grid">
                    ${resumeData.skills.map(skill => `
                    <div class="skill-item">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-level">${skill.level}</span>
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
            
            ${resumeData.references.length > 0 ? `
            <section class="section">
                <h2>References</h2>
                <div class="references-grid">
                    ${resumeData.references.map(ref => `
                    <div class="reference-item">
                        <div class="reference-name">${ref.name}</div>
                        <div class="reference-title">${ref.title}</div>
                        <div class="reference-contact">
                            ${ref.company}<br>
                            ${ref.email}<br>
                            ${ref.phone}<br>
                            <em>(${ref.relationship})</em>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </div>
    </div>
</body>
</html>
    `;
  };

  const handleExport = async (format: 'pdf' | 'html' | 'docx') => {
    setIsExporting(true);
    setExportFormat(format);

    try {
      const fileName = `${resumeData.personalInfo.fullName || 'Resume'}_${new Date().toISOString().split('T')[0]}`;
      
      if (format === 'html') {
        const htmlContent = generateHTMLResume();
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${fileName}.html`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast({
          title: "Resume Exported Successfully!",
          description: "Your HTML resume has been downloaded.",
        });
      } else if (format === 'pdf') {
        // For PDF generation, we'll simulate the process
        // In a real implementation, you would use a library like jsPDF or Puppeteer
        setTimeout(() => {
          toast({
            title: "PDF Export (Demo)",
            description: "PDF export would be implemented using jsPDF or Puppeteer in production.",
          });
        }, 2000);
      } else if (format === 'docx') {
        // For DOCX generation, we'll simulate the process
        // In a real implementation, you would use a library like docx
        setTimeout(() => {
          toast({
            title: "DOCX Export (Demo)",
            description: "DOCX export would be implemented using the docx library in production.",
          });
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportFormat(null);
      }, 2000);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Export Your Resume</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-gray-600">
            Choose your preferred format to download your resume. Each format has its own advantages 
            depending on how you plan to use your resume.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exportFormats.map((format) => {
              const Icon = format.icon;
              const isExportingThis = isExporting && exportFormat === format.id;
              
              return (
                <Card 
                  key={format.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    format.recommended ? 'ring-2 ring-blue-500' : ''
                  } ${isExportingThis ? 'opacity-50' : ''}`}
                >
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <div className={`p-3 rounded-full ${
                        format.recommended ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Icon className="h-8 w-8" />
                      </div>
                    </div>
                    <CardTitle className="flex items-center justify-center gap-2">
                      {format.name}
                      {format.recommended && (
                        <Badge variant="default" className="text-xs">Recommended</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 text-center">
                      {format.description}
                    </p>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700">Features:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {format.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      onClick={() => handleExport(format.id)}
                      disabled={isExporting}
                      className="w-full"
                      variant={format.recommended ? "default" : "outline"}
                    >
                      {isExportingThis ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Export {format.name}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Export Tips</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• PDF format is most widely accepted by employers and ATS systems</li>
                    <li>• HTML format is perfect for online portfolios and personal websites</li>
                    <li>• DOCX format allows further customization but may not be ATS-friendly</li>
                    <li>• Always review your exported resume before submitting to employers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportOptions;
