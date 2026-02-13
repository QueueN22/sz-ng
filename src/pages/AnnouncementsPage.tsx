import { useState } from 'react';
import { Megaphone, AlertTriangle, User, Calendar, ChevronRight, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { announcements } from '@/data/mockData';
import { Announcement } from '@/types/lms';
import { cn } from '@/lib/utils';

const roleColors = {
  Admin: 'bg-primary text-primary-foreground',
  Lecturer: 'bg-accent text-accent-foreground',
  Department: 'bg-warning text-warning-foreground',
};

export function AnnouncementsPage() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [filter, setFilter] = useState<'all' | 'important'>('all');

  const filteredAnnouncements = announcements.filter(
    (a) => filter === 'all' || (filter === 'important' && a.isImportant)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with the latest news and notices
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'important' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('important')}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Important
          </Button>
        </div>
      </div>

      {/* Important Announcements Banner */}
      {announcements.some((a) => a.isImportant) && filter === 'all' && (
        <Card variant="outline" className="border-destructive/50 bg-destructive/5 animate-slide-up">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                You have {announcements.filter((a) => a.isImportant).length} important announcement(s)
              </p>
              <p className="text-sm text-muted-foreground">
                Please review them as they may require your attention
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Announcements Feed */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement, index) => (
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
                    {announcement.isImportant && (
                      <Badge variant="destructive" className="text-[10px]">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Important
                      </Badge>
                    )}
                    <Badge className={roleColors[announcement.authorRole]}>
                      {announcement.authorRole}
                    </Badge>
                    {announcement.courseId && (
                      <Badge variant="secondary">Course Related</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground text-lg line-clamp-1 mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      <span>{announcement.author}</span>
                    </div>
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

      {/* Empty State */}
      {filteredAnnouncements.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary mb-4">
            <Megaphone className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">No announcements found</h3>
          <p className="text-sm text-muted-foreground">
            {filter === 'important'
              ? 'There are no important announcements at this time'
              : 'Check back later for new announcements'}
          </p>
        </div>
      )}

      {/* Announcement Detail Modal */}
      <Dialog open={!!selectedAnnouncement} onOpenChange={() => setSelectedAnnouncement(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedAnnouncement && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  {selectedAnnouncement.isImportant && (
                    <Badge variant="destructive">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Important
                    </Badge>
                  )}
                  <Badge className={roleColors[selectedAnnouncement.authorRole]}>
                    {selectedAnnouncement.authorRole}
                  </Badge>
                </div>
                <DialogTitle className="text-xl">{selectedAnnouncement.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Meta Info */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{selectedAnnouncement.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(selectedAnnouncement.createdAt)} at{' '}
                      {formatTime(selectedAnnouncement.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-sm max-w-none text-foreground">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {selectedAnnouncement.content}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AnnouncementsPage;
