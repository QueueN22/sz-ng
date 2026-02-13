import { TrendingUp, Award, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { grades, currentStudent } from '@/data/mockData';

const getGradeBadgeVariant = (grade: string) => {
  if (grade === 'A') return 'success';
  if (grade === 'B') return 'info';
  if (grade === 'C') return 'warning';
  if (grade === 'D') return 'warning';
  return 'destructive';
};

const getScoreColor = (score: number) => {
  if (score >= 70) return 'text-success';
  if (score >= 60) return 'text-info';
  if (score >= 50) return 'text-warning';
  return 'text-destructive';
};

export function GradesPage() {
  const totalCredits = grades.reduce((sum, g) => sum + g.creditUnits, 0);
  const totalWeightedPoints = grades.reduce((sum, g) => sum + g.gradePoint * g.creditUnits, 0);
  const calculatedGPA = totalWeightedPoints / totalCredits;

  const gradeDistribution = grades.reduce((acc, g) => {
    acc[g.grade] = (acc[g.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Academic Performance</h1>
        <p className="text-muted-foreground mt-1">
          View your grades and academic progress
        </p>
      </div>

      {/* GPA Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current GPA</p>
                <p className="text-3xl font-bold text-foreground mt-1">{calculatedGPA.toFixed(2)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Out of 5.00</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-3xl font-bold text-foreground mt-1">{totalCredits}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">This semester</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Courses Graded</p>
                <p className="text-3xl font-bold text-foreground mt-1">{grades.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Award className="h-6 w-6 text-accent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">All results released</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-muted-foreground mb-3">Grade Distribution</p>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(gradeDistribution).map(([grade, count]) => (
                  <Badge key={grade} variant={getGradeBadgeVariant(grade)}>
                    {grade}: {count}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grades Table */}
      <Card variant="default" className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CardHeader>
          <CardTitle>Grade Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead className="hidden sm:table-cell">Course Title</TableHead>
                  <TableHead className="text-center">CA (30%)</TableHead>
                  <TableHead className="text-center">Exam (70%)</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Units</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade) => (
                  <TableRow key={grade.courseId}>
                    <TableCell className="font-medium">{grade.courseCode}</TableCell>
                    <TableCell className="hidden sm:table-cell max-w-[200px] truncate">
                      {grade.courseTitle}
                    </TableCell>
                    <TableCell className="text-center">{grade.continuousAssessment}</TableCell>
                    <TableCell className="text-center">{grade.examScore}</TableCell>
                    <TableCell className={`text-center font-semibold ${getScoreColor(grade.totalScore)}`}>
                      {grade.totalScore}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getGradeBadgeVariant(grade.grade)}>{grade.grade}</Badge>
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">{grade.creditUnits}</TableCell>
                    <TableCell className="text-center hidden md:table-cell">{grade.gradePoint.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Grade Cards */}
          <div className="sm:hidden mt-4 space-y-3">
            {grades.map((grade) => (
              <div key={grade.courseId} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{grade.courseCode}</Badge>
                  <Badge variant={getGradeBadgeVariant(grade.grade)}>{grade.grade}</Badge>
                </div>
                <p className="font-medium text-foreground text-sm mb-3">{grade.courseTitle}</p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-secondary p-2">
                    <p className="text-muted-foreground">CA</p>
                    <p className="font-semibold">{grade.continuousAssessment}</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-2">
                    <p className="text-muted-foreground">Exam</p>
                    <p className="font-semibold">{grade.examScore}</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-2">
                    <p className="text-muted-foreground">Total</p>
                    <p className={`font-semibold ${getScoreColor(grade.totalScore)}`}>{grade.totalScore}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* GPA Calculation Note */}
      <Card variant="outline" className="animate-slide-up" style={{ animationDelay: '0.35s' }}>
        <CardContent className="flex items-start gap-3 p-4">
          <AlertCircle className="h-5 w-5 text-info shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">How GPA is Calculated</p>
            <p className="text-muted-foreground mt-1">
              GPA = Sum of (Grade Point × Credit Units) / Total Credit Units. 
              Grade points: A=5.0, B=4.0, C=3.0, D=2.0, E=1.0, F=0.0
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default GradesPage;
