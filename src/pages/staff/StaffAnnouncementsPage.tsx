import { useState } from 'react';
import {
  Megaphone,
  Plus,
  AlertTriangle,
  User,
  Calendar,
  ChevronRight,
  Send,
  Save,
  X,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { staffCourses, staffAnnouncements } from '@/data/staffMockData';
import { StaffAnnouncement } from '@/types/staff';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function StaffAnnouncementsPage() {
  const { toast } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<StaffAnnouncement | null>(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    target: 'all',
    isImportant: false,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handlePublish = () => {
    setShowCreateModal(false);
    setNewAnnouncement({ title: '', content: '', target: 'all', isImportant: false });
    toast({ title: 'Announcement Published', description: 'Your announcement has been sent to students.' });
  };

  const handleSaveDraft = () => {
    setShowCreateModal(false);
    setNewAnnouncement({ title: '', content: '', target: 'all', isImportant: false });
    toast({ title: 'Draft Saved', description: 'Your announcement has been saved as a draft.' });
  };

  const getTargetLabel = (target: string) => {
    if (target === 'all') return 'All Students';
    const course = staffCourses.find((c) => c.id === target);
    return course ? course.code : target;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground mt-1">Create and manage announcements for students</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {staffAnnouncements.map((announcement, index) => (
          <Card
            key={announcement.id}
            variant="interactive"
            className={cn(
              "cursor-pointer animate-slide-up",
              announcement.isImportant && "border-destructive/30"
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => setSelectedAnnouncement(announcement)}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge variant={announcement.status === 'published' ? 'success' : 'warning'}>
                      {announcement.status}
                    </Badge>
                    {announcement.isImportant && (
                      <Badge variant="destructive" className="text-[10px]">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Important
                      </Badge>
                    )}
                    <Badge variant="secondary">{getTargetLabel(announcement.target)}</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg line-clamp-1 mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(announcement.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Announcement Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-accent" />
              Create Announcement
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="ann-title">Title</Label>
              <Input
                id="ann-title"
                placeholder="Announcement title"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ann-content">Message</Label>
              <Textarea
                id="ann-content"
                placeholder="Write your announcement..."
                rows={5}
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Target Audience</Label>
                <Select
                  value={newAnnouncement.target}
                  onValueChange={(v) => setNewAnnouncement({ ...newAnnouncement, target: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    {staffCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.code} - {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch
                  checked={newAnnouncement.isImportant}
                  onCheckedChange={(checked) =>
                    setNewAnnouncement({ ...newAnnouncement, isImportant: checked })
                  }
                />
                <Label>Mark as important</Label>
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handlePublish}>
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Announcement Modal */}
      <Dialog open={!!selectedAnnouncement} onOpenChange={() => setSelectedAnnouncement(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedAnnouncement && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <Badge variant={selectedAnnouncement.status === 'published' ? 'success' : 'warning'}>
                    {selectedAnnouncement.status}
                  </Badge>
                  {selectedAnnouncement.isImportant && (
                    <Badge variant="destructive">Important</Badge>
                  )}
                  <Badge variant="secondary">{getTargetLabel(selectedAnnouncement.target)}</Badge>
                </div>
                <DialogTitle className="text-xl">{selectedAnnouncement.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selectedAnnouncement.createdAt)}</span>
                  </div>
                </div>
                <p className="whitespace-pre-wrap leading-relaxed text-foreground">
                  {selectedAnnouncement.content}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
