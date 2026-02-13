import { useState } from 'react';
import {
  ClipboardList,
  Calendar,
  CheckCircle2,
  XCircle,
  Users,
  Check,
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
import { staffCourses, enrolledStudents } from '@/data/staffMockData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type AttendanceStatus = 'present' | 'absent' | 'unmarked';

export default function StaffAttendancePage() {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState(staffCourses[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<Record<string, AttendanceStatus>>(
    Object.fromEntries(enrolledStudents.map((s) => [s.id, 'unmarked' as AttendanceStatus]))
  );

  const presentCount = Object.values(records).filter((s) => s === 'present').length;
  const absentCount = Object.values(records).filter((s) => s === 'absent').length;
  const totalMarked = presentCount + absentCount;

  const toggleStatus = (studentId: string) => {
    setRecords((prev) => {
      const current = prev[studentId];
      const next: AttendanceStatus =
        current === 'unmarked' ? 'present' : current === 'present' ? 'absent' : 'present';
      return { ...prev, [studentId]: next };
    });
  };

  const markAllPresent = () => {
    setRecords(Object.fromEntries(enrolledStudents.map((s) => [s.id, 'present' as AttendanceStatus])));
  };

  const handleSave = () => {
    toast({
      title: 'Attendance Saved',
      description: `Attendance for ${selectedDate} has been recorded.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground mt-1">Record and manage student attendance</p>
      </div>

      {/* Controls */}
      <Card variant="default">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
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
            </div>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="sm:w-48"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid gap-4 grid-cols-3">
        <Card variant="elevated">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{presentCount}</p>
              <p className="text-xs text-muted-foreground">Present</p>
            </div>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{absentCount}</p>
              <p className="text-xs text-muted-foreground">Absent</p>
            </div>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{enrolledStudents.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={markAllPresent}>
          <Check className="h-4 w-4 mr-2" />
          Mark All Present
        </Button>
        <Button onClick={handleSave} disabled={totalMarked === 0}>
          Save Attendance
        </Button>
      </div>

      {/* Student List - Desktop table */}
      <Card variant="default" className="hidden md:block">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">S/N</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Matric No.</th>
                <th className="text-center p-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {enrolledStudents.map((student, index) => (
                <tr key={student.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 text-sm text-muted-foreground">{index + 1}</td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-foreground">{student.lastName}, {student.firstName}</p>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{student.matricNumber}</td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => toggleStatus(student.id)}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-xs font-semibold transition-colors",
                          records[student.id] === 'present' && "bg-success/15 text-success",
                          records[student.id] === 'absent' && "bg-destructive/15 text-destructive",
                          records[student.id] === 'unmarked' && "bg-secondary text-muted-foreground"
                        )}
                      >
                        {records[student.id] === 'unmarked' ? 'Tap to mark' : records[student.id].charAt(0).toUpperCase() + records[student.id].slice(1)}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {enrolledStudents.map((student, index) => (
          <Card key={student.id} variant="default">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">{student.lastName}, {student.firstName}</p>
                <p className="text-xs text-muted-foreground">{student.matricNumber}</p>
              </div>
              <button
                onClick={() => toggleStatus(student.id)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold transition-colors",
                  records[student.id] === 'present' && "bg-success/15 text-success",
                  records[student.id] === 'absent' && "bg-destructive/15 text-destructive",
                  records[student.id] === 'unmarked' && "bg-secondary text-muted-foreground"
                )}
              >
                {records[student.id] === 'unmarked' ? 'Mark' : records[student.id].charAt(0).toUpperCase() + records[student.id].slice(1)}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
