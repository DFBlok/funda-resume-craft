
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ResumePreview from './ResumePreview';
import ExportOptions from './ExportOptions';
import ContentSuggestions from './ContentSuggestions';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: string[];
  languages: string[];
  references: Reference[];
  selectedIndustry: string;
}

interface ResumeBuilderProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

const ResumeBuilder = ({ selectedTemplate, onTemplateChange }: ResumeBuilderProps) => {
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: [],
    references: [],
    selectedIndustry: ''
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate'
    };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addReference = () => {
    const newRef: Reference = {
      id: Date.now().toString(),
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      relationship: ''
    };
    setResumeData(prev => ({
      ...prev,
      references: [...prev.references, newRef]
    }));
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.map(ref =>
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const removeReference = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref.id !== id)
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Resume Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="New York, NY"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={resumeData.personalInfo.website}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  placeholder="www.johndoe.com"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={resumeData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                placeholder="Brief professional summary highlighting your key achievements and career objectives..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry/Field</Label>
              <Select 
                value={resumeData.selectedIndustry} 
                onValueChange={(value) => setResumeData(prev => ({ ...prev, selectedIndustry: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Work Experience</CardTitle>
            <Button onClick={addExperience} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Experience Entry</h4>
                  <Button
                    onClick={() => removeExperience(exp.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <Label>Position</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="Job Title"
                    />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  />
                  <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                  />
                </div>
              </div>
            ))}
            {resumeData.experience.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No experience added yet. Click "Add Experience" to get started.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Education</CardTitle>
            <Button onClick={addEducation} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Education Entry</h4>
                  <Button
                    onClick={() => removeEducation(edu.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <Label>Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <Label>Graduation Date</Label>
                    <Input
                      type="month"
                      value={edu.graduationDate}
                      onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>GPA (Optional)</Label>
                    <Input
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="3.8"
                    />
                  </div>
                </div>
              </div>
            ))}
            {resumeData.education.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No education added yet. Click "Add Education" to get started.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Skills</CardTitle>
            <Button onClick={addSkill} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {resumeData.skills.map((skill) => (
              <div key={skill.id} className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    placeholder="Skill name"
                  />
                </div>
                <div className="w-32">
                  <Select
                    value={skill.level}
                    onValueChange={(value) => updateSkill(skill.id, 'level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={() => removeSkill(skill.id)}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {resumeData.skills.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No skills added yet. Click "Add Skill" to get started.
              </p>
            )}
          </CardContent>
        </Card>

        {/* References Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>References</CardTitle>
            <Button onClick={addReference} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Reference
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {resumeData.references.map((ref) => (
              <div key={ref.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Reference</h4>
                  <Button
                    onClick={() => removeReference(ref.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={ref.name}
                      onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                      placeholder="Reference Name"
                    />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={ref.title}
                      onChange={(e) => updateReference(ref.id, 'title', e.target.value)}
                      placeholder="Job Title"
                    />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={ref.company}
                      onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={ref.email}
                      onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                      placeholder="reference@email.com"
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={ref.phone}
                      onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label>Relationship</Label>
                    <Input
                      value={ref.relationship}
                      onChange={(e) => updateReference(ref.id, 'relationship', e.target.value)}
                      placeholder="Former Manager"
                    />
                  </div>
                </div>
              </div>
            ))}
            {resumeData.references.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No references added yet. Click "Add Reference" to get started.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => setShowPreview(true)} 
              className="w-full"
              variant="outline"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Resume
            </Button>
            <Button 
              onClick={() => setShowExport(true)} 
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Resume
            </Button>
          </CardContent>
        </Card>

        {/* Content Suggestions */}
        <ContentSuggestions 
          industry={resumeData.selectedIndustry}
          resumeData={resumeData}
          onSuggestionApply={(suggestion) => {
            toast({
              title: "Suggestion Applied",
              description: "The suggestion has been applied to your resume.",
            });
          }}
        />

        {/* Template Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Current Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Template: {selectedTemplate.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.dispatchEvent(new CustomEvent('switchTab', { detail: 'templates' }))}
              >
                Change Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {showPreview && (
        <ResumePreview
          resumeData={resumeData}
          template={selectedTemplate}
          onClose={() => setShowPreview(false)}
        />
      )}
      
      {showExport && (
        <ExportOptions
          resumeData={resumeData}
          template={selectedTemplate}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
};

export default ResumeBuilder;
