import { useState } from 'react';
import {
  FileSpreadsheet,
  Save,
  Send,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { staffCourses, enrolledStudents, studentResults } from '@/data/staffMockData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

function computeGrade(total: number): string {
  if (total >= 70) return 'A';
  if (total >= 60) return 'B';
  if (total >= 50) return 'C';
  if (total >= 45) return 'D';
  if (total >= 40) return 'E';
  return 'F';
}

export default function StaffResultsPage() {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState(staffCourses[0].id);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  const [results, setResults] = useState(() =>
    enrolledStudents.map((student) => {
      const existing = studentResults.find(
        (r) => r.studentId === student.id && r.courseId === staffCourses[0].id
      );
      return {
        studentId: student.id,
        ca: existing?.continuousAssessment ?? 0,
        exam: existing?.examScore ?? 0,
      };
    })
  );

  const updateResult = (studentId: string, field: 'ca' | 'exam', value: number) => {
    setResults((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, [field]: value } : r))
    );
  };

  const handleSaveDraft = () => {
    setStatus('draft');
    toast({ title: 'Draft Saved', description: 'Results saved as draft.' });
  };

  const handlePublish = () => {
    setStatus('published');
    toast({ title: 'Results Published', description: 'Results are now visible to students.' });
  };

  const gradeColor = (grade: string) => {
    if (grade === 'A') return 'text-success';
    if (grade === 'B') return 'text-primary';
    if (grade === 'C') return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Results</h1>
          <p className="text-muted-foreground mt-1">Enter and manage student grades</p>
        </div>
        <Badge variant={status === 'published' ? 'success' : 'warning'} className="self-start text-sm px-3 py-1">
          {status === 'published' ? 'Published' : 'Draft'}
        </Badge>
      </div>

      {/* Course Selector */}
      <Card variant="default">
        <CardContent className="p-4">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {staffCourses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.code} - {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Results Table - Desktop */}
      <Card variant="default" className="hidden md:block">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">S/N</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Matric No.</th>
                <th className="text-center p-4 text-sm font-medium text-muted-foreground">CA (30)</th>
                <th className="text-center p-4 text-sm font-medium text-muted-foreground">Exam (70)</th>
                <th className="text-center p-4 text-sm font-medium text-muted-foreground">Total</th>
                <th className="text-center p-4 text-sm font-medium text-muted-foreground">Grade</th>
              </tr>
            </thead>
            <tbody>
              {enrolledStudents.map((student, index) => {
                const result = results.find((r) => r.studentId === student.id)!;
                const total = result.ca + result.exam;
                const grade = computeGrade(total);
                return (
                  <tr key={student.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 text-sm text-muted-foreground">{index + 1}</td>
                    <td className="p-4 text-sm font-medium text-foreground">{student.lastName}, {student.firstName}</td>
                    <td className="p-4 text-sm text-muted-foreground">{student.matricNumber}</td>
                    <td className="p-4">
                      <Input
                        type="number"
                        min={0}
                        max={30}
                        value={result.ca}
                        onChange={(e) => updateResult(student.id, 'ca', Math.min(30, Number(e.target.value)))}
                        className="w-20 mx-auto text-center"
                      />
                    </td>
                    <td className="p-4">
                      <Input
                        type="number"
                        min={0}
                        max={70}
                        value={result.exam}
                        onChange={(e) => updateResult(student.id, 'exam', Math.min(70, Number(e.target.value)))}
                        className="w-20 mx-auto text-center"
                      />
                    </td>
                    <td className="p-4 text-center text-sm font-semibold text-foreground">{total}</td>
                    <td className={cn("p-4 text-center text-sm font-bold", gradeColor(grade))}>{grade}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {enrolledStudents.map((student) => {
          const result = results.find((r) => r.studentId === student.id)!;
          const total = result.ca + result.exam;
          const grade = computeGrade(total);
          return (
            <Card key={student.id} variant="default">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm">{student.lastName}, {student.firstName}</p>
                    <p className="text-xs text-muted-foreground">{student.matricNumber}</p>
                  </div>
                  <span className={cn("text-lg font-bold", gradeColor(grade))}>{grade}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">CA (30)</p>
                    <Input
                      type="number"
                      min={0}
                      max={30}
                      value={result.ca}
                      onChange={(e) => updateResult(student.id, 'ca', Math.min(30, Number(e.target.value)))}
                      className="text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Exam (70)</p>
                    <Input
                      type="number"
                      min={0}
                      max={70}
                      value={result.exam}
                      onChange={(e) => updateResult(student.id, 'exam', Math.min(70, Number(e.target.value)))}
                      className="text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <div className="flex items-center justify-center h-10 rounded-md bg-secondary text-sm font-semibold text-foreground">
                      {total}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button variant="outline" onClick={handleSaveDraft}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button onClick={handlePublish}>
          <Send className="h-4 w-4 mr-2" />
          Publish Results
        </Button>
      </div>
    </div>
  );
}
