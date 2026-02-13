import { Link } from 'react-router-dom';
import { GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function RoleSelectPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Welcome to Study Zone
          </h1>
          <p className="text-muted-foreground text-lg">
            Select your role to continue
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Link to="/student">
            <Card variant="interactive" className="h-full group">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Student</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Access courses, grades, timetable, and announcements
                </p>
                <div className="flex items-center gap-1 text-primary font-medium text-sm">
                  Continue <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/staff">
            <Card variant="interactive" className="h-full group">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 mb-5 group-hover:bg-accent/20 transition-colors">
                  <Briefcase className="h-10 w-10 text-accent" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Staff / Lecturer</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage courses, attendance, results, and announcements
                </p>
                <div className="flex items-center gap-1 text-accent font-medium text-sm">
                  Continue <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
