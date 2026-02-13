import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Megaphone, 
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { currentStudent, courses, grades, timetable, announcements } from '@/data/mockData';

export function Dashboard() {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }) as 
    'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  
  const todaysClasses = timetable.filter(entry => entry.day === dayOfWeek);
  const recentAnnouncements = announcements.slice(0, 3);
  const totalCredits = courses.reduce((sum, course) => sum + course.creditUnits, 0);

  const quickLinks = [
    { icon: BookOpen, label: 'Courses', path: '/student/courses', color: 'bg-primary' },
    { icon: GraduationCap, label: 'Grades', path: '/student/grades', color: 'bg-success' },
    { icon: Calendar, label: 'Timetable', path: '/student/timetable', color: 'bg-warning' },
    { icon: Megaphone, label: 'Announcements', path: '/student/announcements', color: 'bg-accent' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl gradient-hero p-6 lg:p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Welcome back</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Hello, {currentStudent.firstName}! 👋
          </h1>
          <p className="text-muted-foreground max-w-xl">
            You're making great progress this semester. Keep up the excellent work in your {courses.length} courses!
          </p>
        </div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-10 -right-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                <p className="text-3xl font-bold text-foreground mt-1">{courses.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">{totalCredits} credit units total</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current GPA</p>
                <p className="text-3xl font-bold text-foreground mt-1">{currentStudent.gpa.toFixed(2)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              <span className="text-success font-medium">+0.12</span> from last semester
            </p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Classes</p>
                <p className="text-3xl font-bold text-foreground mt-1">{todaysClasses.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">{dayOfWeek}</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Announcements</p>
                <p className="text-3xl font-bold text-foreground mt-1">{announcements.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Megaphone className="h-6 w-6 text-accent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {announcements.filter(a => a.isImportant).length} important
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link, index) => (
          <Link key={link.path} to={link.path}>
            <Card 
              variant="interactive" 
              className="h-full animate-slide-up"
              style={{ animationDelay: `${0.3 + index * 0.05}s` }}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${link.color}`}>
                  <link.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-medium text-foreground">{link.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <Card variant="default" className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Schedule
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/timetable" className="flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaysClasses.length > 0 ? (
              todaysClasses.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-secondary/50"
                >
                  <div
                    className="h-12 w-1.5 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{entry.courseTitle}</p>
                    <p className="text-sm text-muted-foreground">{entry.courseCode}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-foreground">
                      {entry.startTime} - {entry.endTime}
                    </p>
                    <p className="text-xs text-muted-foreground">{entry.venue}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No classes scheduled for today</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card variant="default" className="animate-slide-up" style={{ animationDelay: '0.45s' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-primary" />
              Recent Announcements
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/announcements" className="flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="rounded-xl border border-border p-4 transition-colors hover:bg-secondary/50"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-medium text-foreground line-clamp-1">{announcement.title}</h4>
                  {announcement.isImportant && (
                    <Badge variant="destructive" className="shrink-0 text-[10px]">Important</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {announcement.content}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{announcement.author}</span>
                  <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
