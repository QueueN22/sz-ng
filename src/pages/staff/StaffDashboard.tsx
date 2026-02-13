import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  FileSpreadsheet,
  ClipboardList,
  Megaphone,
  ArrowRight,
  Sparkles,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { currentStaff, staffCourses, staffAnnouncements, enrolledStudents } from '@/data/staffMockData';

export default function StaffDashboard() {
  const totalStudents = staffCourses.reduce((sum, c) => sum + c.enrolledCount, 0);
  const pendingResults = 2;

  const quickActions = [
    { icon: BookOpen, label: 'Manage Courses', path: '/staff/courses', color: 'bg-accent' },
    { icon: ClipboardList, label: 'Take Attendance', path: '/staff/attendance', color: 'bg-primary' },
    { icon: FileSpreadsheet, label: 'Upload Results', path: '/staff/results', color: 'bg-warning' },
    { icon: Megaphone, label: 'Post Announcement', path: '/staff/announcements', color: 'bg-success' },
  ];

  const recentActivity = [
    { text: 'Published CSC 301 attendance for Oct 7', time: '2 hours ago', type: 'attendance' },
    { text: 'Saved CSC 401 results as draft', time: '5 hours ago', type: 'results' },
    { text: 'Posted announcement for CSC 301', time: '1 day ago', type: 'announcement' },
    { text: 'Updated CSC 205 course materials', time: '2 days ago', type: 'material' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl p-6 lg:p-8" style={{ background: 'linear-gradient(135deg, hsl(172 66% 50% / 0.1), hsl(239 84% 67% / 0.1))' }}>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-accent">Staff Portal</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Welcome, {currentStaff.title} {currentStaff.lastName}! 👋
          </h1>
          <p className="text-muted-foreground max-w-xl">
            You have {staffCourses.length} courses this semester with {totalStudents} students enrolled.
          </p>
        </div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-10 -right-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Courses Taught</p>
                <p className="text-3xl font-bold text-foreground mt-1">{staffCourses.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {staffCourses.reduce((s, c) => s + c.creditUnits, 0)} credit units total
            </p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-foreground mt-1">{totalStudents}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Across all courses</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Results</p>
                <p className="text-3xl font-bold text-foreground mt-1">{pendingResults}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                <FileSpreadsheet className="h-6 w-6 text-warning" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              <span className="text-warning font-medium">Awaiting publication</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => (
          <Link key={action.path} to={action.path}>
            <Card
              variant="interactive"
              className="h-full animate-slide-up"
              style={{ animationDelay: `${0.25 + index * 0.05}s` }}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color}`}>
                  <action.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-medium text-foreground text-sm">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card variant="default" className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-secondary/50"
              >
                <div className="h-2 w-2 rounded-full bg-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* My Courses Quick View */}
        <Card variant="default" className="animate-slide-up" style={{ animationDelay: '0.45s' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              My Courses
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/staff/courses" className="flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {staffCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-secondary/50"
              >
                <div
                  className="h-12 w-1.5 rounded-full"
                  style={{ backgroundColor: course.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{course.title}</p>
                  <p className="text-sm text-muted-foreground">{course.code}</p>
                </div>
                <Badge variant="secondary">{course.enrolledCount} students</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
