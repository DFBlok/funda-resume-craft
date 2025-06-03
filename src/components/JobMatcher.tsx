
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface MatchResult {
  overallMatch: number;
  skillsMatch: number;
  experienceMatch: number;
  keywordMatch: number;
  missingSkills: string[];
  matchingSkills: string[];
  suggestions: string[];
  improvementAreas: Array<{
    area: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
  }>;
}

const JobMatcher = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<MatchResult | null>(null);

  const analyzeMatch = async () => {
    setIsAnalyzing(true);
    
    // Simulate job matching analysis
    setTimeout(() => {
      const mockResult: MatchResult = {
        overallMatch: 73,
        skillsMatch: 68,
        experienceMatch: 82,
        keywordMatch: 71,
        missingSkills: [
          'Kubernetes', 'Docker', 'AWS Lambda', 'GraphQL', 'TypeScript'
        ],
        matchingSkills: [
          'React', 'Node.js', 'JavaScript', 'Python', 'Git', 'Agile', 'REST APIs'
        ],
        suggestions: [
          'Highlight your experience with cloud technologies more prominently',
          'Add specific examples of microservices architecture work',
          'Include metrics for team leadership and project management',
          'Mention any experience with containerization technologies',
          'Emphasize your experience with modern JavaScript frameworks'
        ],
        improvementAreas: [
          {
            area: 'Cloud Technologies',
            priority: 'high',
            description: 'Job requires extensive cloud experience. Consider highlighting any AWS, Azure, or GCP work.'
          },
          {
            area: 'DevOps Skills',
            priority: 'high',
            description: 'Container orchestration and CI/CD pipeline experience is strongly preferred.'
          },
          {
            area: 'Team Leadership',
            priority: 'medium',
            description: 'Position involves leading a small development team. Highlight leadership experience.'
          },
          {
            area: 'API Design',
            priority: 'medium',
            description: 'RESTful API design and GraphQL experience would strengthen your application.'
          }
        ]
      };
      
      setResults(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Matching Analysis</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Analyze how well your resume matches specific job requirements. Get personalized 
          recommendations to improve your application and increase your chances of getting hired.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Job Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <Input
                  placeholder="e.g., Senior Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <Textarea
                  placeholder="Paste the complete job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={12}
                  className="min-h-[300px]"
                />
              </div>
              
              <Button 
                onClick={analyzeMatch}
                disabled={!jobTitle || !jobDescription || isAnalyzing}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing Match...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Analyze Job Match
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {results ? (
            <>
              {/* Overall Match Score */}
              <Card>
                <CardHeader>
                  <CardTitle>Overall Match Score</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className={`text-6xl font-bold mb-4 ${getMatchColor(results.overallMatch)}`}>
                    {results.overallMatch}%
                  </div>
                  <Progress value={results.overallMatch} className="w-full mb-4" />
                  <p className="text-gray-600">
                    {results.overallMatch >= 80 ? 'Excellent match! You\'re well-qualified for this position.' :
                     results.overallMatch >= 60 ? 'Good match! Some areas could be strengthened.' :
                     'Moderate match. Consider improving key areas before applying.'}
                  </p>
                </CardContent>
              </Card>

              {/* Detailed Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Match Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Skills Match</span>
                      <span className={`font-bold ${getMatchColor(results.skillsMatch)}`}>
                        {results.skillsMatch}%
                      </span>
                    </div>
                    <Progress value={results.skillsMatch} />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Experience Match</span>
                      <span className={`font-bold ${getMatchColor(results.experienceMatch)}`}>
                        {results.experienceMatch}%
                      </span>
                    </div>
                    <Progress value={results.experienceMatch} />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Keyword Match</span>
                      <span className={`font-bold ${getMatchColor(results.keywordMatch)}`}>
                        {results.keywordMatch}%
                      </span>
                    </div>
                    <Progress value={results.keywordMatch} />
                  </div>
                </CardContent>
              </Card>

              {/* Skills Analysis */}
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      Matching Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {results.matchingSkills.map((skill, index) => (
                        <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      Missing Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {results.missingSkills.map((skill, index) => (
                        <Badge key={index} variant="destructive" className="bg-red-100 text-red-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Consider highlighting these skills if you have experience with them, or mention related technologies.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
                <p className="text-gray-600">
                  Enter the job title and description to see how well your resume matches the requirements.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Results continued */}
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Improvement Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Improvement Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.improvementAreas.map((area, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{area.area}</h4>
                    <Badge className={getPriorityColor(area.priority)} variant="secondary">
                      {area.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{area.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700 flex-1">{suggestion}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Help Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Our AI analyzes job descriptions and compares them with your resume to identify 
              matches and gaps in skills, experience, and keywords.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Match Scoring</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Scores are based on keyword frequency, skill alignment, experience relevance, 
              and industry-specific requirements.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Optimization Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Use the recommendations to tailor your resume for each application. 
              Higher match scores significantly improve your chances.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobMatcher;
