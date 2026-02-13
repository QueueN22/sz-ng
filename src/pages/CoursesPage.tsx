import { useState } from 'react';
import { BookOpen, User, Mail, Clock, FileText, Video, Link as LinkIcon, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { courses } from '@/data/mockData';
import { Course, CourseMaterial } from '@/types/lms';

const materialIcons = {
  pdf: FileText,
  video: Video,
  link: LinkIcon,
  document: FileText,
};

export function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Courses</h1>
        <p className="text-muted-foreground mt-1">
          You are enrolled in {courses.length} courses this semester
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <Card
            key={course.id}
            variant="interactive"
            className="cursor-pointer animate-slide-up overflow-hidden"
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => setSelectedCourse(course)}
          >
            <div className="h-2" style={{ backgroundColor: course.color }} />
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="mb-2">{course.code}</Badge>
                <Badge variant="outline">{course.creditUnits} Units</Badge>
              </div>
              <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="truncate">{course.lecturer}</span>
              </div>
              {course.materials && course.materials.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    {course.materials.length} material{course.materials.length > 1 ? 's' : ''} available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Detail Modal */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <div className="h-3 -mx-6 -mt-6 mb-4 rounded-t-lg" style={{ backgroundColor: selectedCourse.color }} />
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{selectedCourse.code}</Badge>
                  <Badge variant="outline">{selectedCourse.creditUnits} Credit Units</Badge>
                </div>
                <DialogTitle className="text-xl">{selectedCourse.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Description */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
                </div>

                {/* Lecturer Info */}
                <div className="rounded-xl bg-secondary/50 p-4">
                  <h4 className="font-semibold text-foreground mb-3">Lecturer Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{selectedCourse.lecturer}</p>
                        <p className="text-sm text-muted-foreground">{selectedCourse.lecturerEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Course Materials</h4>
                  {selectedCourse.materials && selectedCourse.materials.length > 0 ? (
                    <div className="space-y-2">
                      {selectedCourse.materials.map((material) => {
                        const Icon = materialIcons[material.type];
                        return (
                          <div
                            key={material.id}
                            className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-secondary/50"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{material.title}</p>
                              <p className="text-xs text-muted-foreground">
                                Uploaded {new Date(material.uploadedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 rounded-xl bg-secondary/30">
                      <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No materials uploaded yet</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CoursesPage;
