import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { staffCourses } from '@/data/staffMockData';

export default function StaffCoursesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Courses</h1>
        <p className="text-muted-foreground mt-1">Manage your assigned courses for this semester</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {staffCourses.map((course, index) => (
          <Link key={course.id} to={`/staff/courses/${course.id}`}>
            <Card
              variant="interactive"
              className="h-full animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-0">
                <div
                  className="h-2 rounded-t-xl"
                  style={{ backgroundColor: course.color }}
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{course.code}</Badge>
                    <Badge variant="muted" className="text-xs">{course.creditUnits} CU</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-3 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{course.enrolledCount} students</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>{course.materials.length} materials</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
