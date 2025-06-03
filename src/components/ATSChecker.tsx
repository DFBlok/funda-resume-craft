
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertTriangle, Search, FileText } from 'lucide-react';

interface ATSResult {
  score: number;
  issues: Array<{
    type: 'error' | 'warning' | 'success';
    message: string;
    category: string;
  }>;
  keywords: string[];
  recommendations: string[];
}

const ATSChecker = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ATSResult | null>(null);

  const analyzeResume = async () => {
    setIsAnalyzing(true);
    
    // Simulate ATS analysis
    setTimeout(() => {
      const mockResult: ATSResult = {
        score: 78,
        issues: [
          {
            type: 'success',
            message: 'Contact information is clearly formatted',
            category: 'Formatting'
          },
          {
            type: 'success',
            message: 'Standard section headings detected',
            category: 'Structure'
          },
          {
            type: 'warning',
            message: 'Missing keywords: "project management", "agile"',
            category: 'Keywords'
          },
          {
            type: 'error',
            message: 'Some bullet points lack quantifiable achievements',
            category: 'Content'
          },
          {
            type: 'warning',
            message: 'Consider adding more industry-specific terminology',
            category: 'Keywords'
          },
          {
            type: 'success',
            message: 'Professional summary is present and well-written',
            category: 'Content'
          }
        ],
        keywords: [
          'software development', 'team leadership', 'problem solving',
          'communication', 'project management', 'agile', 'technical skills'
        ],
        recommendations: [
          'Add quantifiable metrics to your achievements (e.g., "increased efficiency by 25%")',
          'Include more industry-specific keywords from the job description',
          'Ensure all experience descriptions start with strong action verbs',
          'Consider adding a skills section with technical competencies',
          'Review job description for additional relevant keywords to incorporate'
        ]
      };
      
      setResults(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreColorBg = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">ATS Compatibility Checker</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Test how well your resume performs with Applicant Tracking Systems (ATS). 
          Get detailed feedback and optimization suggestions to improve your chances of getting past initial screening.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Your Resume Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your resume text here or upload your resume file..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={12}
                className="min-h-[300px]"
              />
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {resumeText.length} characters
                </span>
                <Button variant="outline" size="sm">
                  Upload Resume File
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Job Description (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste the job description to get targeted keyword analysis..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
              />
              <p className="text-sm text-gray-500 mt-2">
                Adding a job description helps identify relevant keywords and improve matching accuracy.
              </p>
            </CardContent>
          </Card>

          <Button 
            onClick={analyzeResume}
            disabled={!resumeText || isAnalyzing}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Resume...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Analyze ATS Compatibility
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {results ? (
            <>
              {/* Score Card */}
              <Card>
                <CardHeader>
                  <CardTitle>ATS Compatibility Score</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className={`text-6xl font-bold mb-4 ${getScoreColor(results.score)}`}>
                    {results.score}%
                  </div>
                  <Progress value={results.score} className="w-full mb-4" />
                  <p className="text-gray-600">
                    {results.score >= 80 ? 'Excellent! Your resume is highly ATS-friendly.' :
                     results.score >= 60 ? 'Good! Some improvements needed for better compatibility.' :
                     'Needs improvement. Several issues detected that may affect ATS parsing.'}
                  </p>
                </CardContent>
              </Card>

              {/* Issues Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {results.issues.map((issue, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      {issue.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                      {issue.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                      {issue.type === 'error' && <XCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {issue.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">{issue.message}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Keywords Found */}
              <Card>
                <CardHeader>
                  <CardTitle>Keywords Detected</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    These keywords were found in your resume and are important for ATS matching.
                  </p>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Improvement Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700 flex-1">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
                <p className="text-gray-600">
                  Paste your resume text and click "Analyze ATS Compatibility" to get started.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What is ATS?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Applicant Tracking Systems are software tools used by employers to scan, 
              sort, and rank resumes before they reach human recruiters.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Why It Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Over 95% of large companies use ATS software. If your resume isn't 
              ATS-friendly, it may never be seen by a human recruiter.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Keyword matching, proper formatting, clear structure, and relevant 
              content are crucial for ATS compatibility.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ATSChecker;
