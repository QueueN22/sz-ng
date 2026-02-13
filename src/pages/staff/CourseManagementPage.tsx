import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Upload,
  Trash2,
  Save,
  Plus,
  Video,
  Link as LinkIcon,
  File,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { staffCourses } from '@/data/staffMockData';
import { useToast } from '@/hooks/use-toast';

const typeIcons = {
  pdf: FileText,
  video: Video,
  link: LinkIcon,
  document: File,
};

export default function CourseManagementPage() {
  const { courseId } = useParams();
  const { toast } = useToast();
  const course = staffCourses.find((c) => c.id === courseId);

  const [formData, setFormData] = useState({
    title: course?.title || '',
    code: course?.code || '',
    description: course?.description || '',
    creditUnits: course?.creditUnits || 3,
  });

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary mb-4">
          <BookOpen className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">Course not found</h3>
        <Button variant="outline" asChild className="mt-4">
          <Link to="/staff/courses">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
          </Link>
        </Button>
      </div>
    );
  }

  const handleSave = () => {
    toast({
      title: 'Course Updated',
      description: `${formData.code} has been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/staff/courses">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary">{course.code}</Badge>
            <Badge variant="muted">{course.creditUnits} CU</Badge>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{course.title}</h1>
        </div>
      </div>

      <Tabs defaultValue="info">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="info">Course Info</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" />
                Course Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Course Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="creditUnits">Credit Units</Label>
                  <Input
                    id="creditUnits"
                    type="number"
                    min={1}
                    max={6}
                    value={formData.creditUnits}
                    onChange={(e) => setFormData({ ...formData, creditUnits: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Semester</Label>
                  <Input value="First Semester 2024/2025" disabled />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="mt-6 space-y-4">
          {/* Upload area */}
          <Card variant="outline" className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 mb-4">
                <Upload className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Upload Materials</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag & drop files here, or click to browse
              </p>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </CardContent>
          </Card>

          {/* Materials list */}
          {course.materials.length > 0 ? (
            <Card variant="default">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Course Materials ({course.materials.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {course.materials.map((material) => {
                  const Icon = typeIcons[material.type] || File;
                  return (
                    <div
                      key={material.id}
                      className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-secondary/50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{material.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded {new Date(material.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="secondary" className="capitalize">{material.type}</Badge>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ) : (
            <Card variant="default">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">No materials yet</h3>
                <p className="text-sm text-muted-foreground">
                  Upload course materials for your students
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
