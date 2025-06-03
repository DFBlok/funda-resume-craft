
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Download, Edit } from 'lucide-react';

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

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: string;
  onClose: () => void;
}

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const ResumePreview = ({ resumeData, template, onClose }: ResumePreviewProps) => {
  const renderProfessionalTemplate = () => (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
      {/* Header */}
      <header className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {resumeData.personalInfo.email && (
            <span>{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <span>{resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo.location && (
            <span>{resumeData.personalInfo.location}</span>
          )}
          {resumeData.personalInfo.linkedin && (
            <span>{resumeData.personalInfo.linkedin}</span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resumeData.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Professional Experience
          </h2>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                <span className="text-sm text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
              {exp.description && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Education
          </h2>
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
                <span className="text-sm text-gray-600">
                  {formatDate(edu.graduationDate)}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="flex justify-between">
                <span className="text-gray-700">{skill.name}</span>
                <span className="text-sm text-gray-600">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {resumeData.references.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            References
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.references.map((ref) => (
              <div key={ref.id} className="text-sm">
                <p className="font-semibold text-gray-800">{ref.name}</p>
                <p className="text-gray-700">{ref.title}</p>
                <p className="text-gray-700">{ref.company}</p>
                <p className="text-gray-600">{ref.email}</p>
                <p className="text-gray-600">{ref.phone}</p>
                <p className="text-gray-600 text-xs">({ref.relationship})</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderModernTemplate = () => (
    <div className="max-w-4xl mx-auto bg-white shadow-lg">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm opacity-90">
          {resumeData.personalInfo.email && (
            <span>{resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo.phone && (
            <span>{resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo.location && (
            <span>{resumeData.personalInfo.location}</span>
          )}
          {resumeData.personalInfo.linkedin && (
            <span>{resumeData.personalInfo.linkedin}</span>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-blue-600">
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {resumeData.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Experience</h2>
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                  <Badge variant="secondary">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </Badge>
                </div>
                <p className="text-lg text-blue-600 font-semibold mb-3">{exp.company}</p>
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {resumeData.skills.map((skill) => (
                <Badge key={skill.id} variant="outline" className="px-3 py-1 text-sm">
                  {skill.name} ({skill.level})
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Education</h2>
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-blue-600 font-semibold">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <Badge variant="secondary">
                    {formatDate(edu.graduationDate)}
                  </Badge>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* References */}
        {resumeData.references.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">References</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.references.map((ref) => (
                <div key={ref.id} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-bold text-gray-800 text-lg">{ref.name}</p>
                  <p className="text-blue-600 font-semibold">{ref.title}</p>
                  <p className="text-gray-700">{ref.company}</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>{ref.email}</p>
                    <p>{ref.phone}</p>
                    <p className="text-xs italic">({ref.relationship})</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle>Resume Preview</DialogTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="overflow-auto max-h-[calc(90vh-100px)] p-6">
          {template.startsWith('professional') ? renderProfessionalTemplate() : renderModernTemplate()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreview;
