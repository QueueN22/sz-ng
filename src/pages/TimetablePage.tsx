import { useState } from 'react';
import { Calendar, Clock, MapPin, List, Grid } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { timetable } from '@/data/mockData';
import { cn } from '@/lib/utils';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00'];

export function TimetablePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getClassesForDayAndTime = (day: string, startTime: string) => {
    return timetable.filter(
      (entry) => entry.day === day && entry.startTime === startTime
    );
  };

  const getClassesForDay = (day: string) => {
    return timetable
      .filter((entry) => entry.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Weekly Timetable</h1>
          <p className="text-muted-foreground mt-1">
            Your class schedule for this semester
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="hidden lg:flex"
          >
            <Grid className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      {/* Grid View (Desktop) */}
      {viewMode === 'grid' && (
        <Card variant="default" className="hidden lg:block animate-slide-up">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="border-b border-r border-border p-3 text-left text-sm font-medium text-muted-foreground w-20">
                      Time
                    </th>
                    {days.map((day) => (
                      <th
                        key={day}
                        className="border-b border-border p-3 text-center text-sm font-medium text-foreground min-w-[160px]"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time, index) => (
                    <tr key={time} className={index % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}>
                      <td className="border-r border-border p-3 text-sm text-muted-foreground font-medium">
                        {time}
                      </td>
                      {days.map((day) => {
                        const classes = getClassesForDayAndTime(day, time);
                        return (
                          <td key={`${day}-${time}`} className="border-border p-2 align-top h-24">
                            {classes.map((entry) => (
                              <div
                                key={entry.id}
                                className="rounded-lg p-3 h-full transition-transform hover:scale-[1.02]"
                                style={{
                                  backgroundColor: `${entry.color}15`,
                                  borderLeft: `4px solid ${entry.color}`,
                                }}
                              >
                                <p className="font-semibold text-sm text-foreground truncate">
                                  {entry.courseCode}
                                </p>
                                <p className="text-xs text-muted-foreground truncate mt-1">
                                  {entry.courseTitle}
                                </p>
                                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{entry.startTime} - {entry.endTime}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate">{entry.venue}</span>
                                </div>
                              </div>
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List View */}
      {(viewMode === 'list' || viewMode === 'grid') && (
        <div className={cn("space-y-4", viewMode === 'grid' && "lg:hidden")}>
          {days.map((day, dayIndex) => {
            const dayClasses = getClassesForDay(day);
            return (
              <Card 
                key={day} 
                variant="default" 
                className="animate-slide-up"
                style={{ animationDelay: `${dayIndex * 0.05}s` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    {day}
                    <Badge variant="secondary" className="ml-auto">
                      {dayClasses.length} class{dayClasses.length !== 1 ? 'es' : ''}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dayClasses.length > 0 ? (
                    dayClasses.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center gap-4 rounded-xl border border-border p-4 transition-all hover:bg-secondary/30"
                      >
                        <div
                          className="h-14 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: entry.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="secondary"
                              className="text-xs"
                              style={{ backgroundColor: `${entry.color}20`, color: entry.color }}
                            >
                              {entry.courseCode}
                            </Badge>
                          </div>
                          <p className="font-medium text-foreground mt-1 truncate">
                            {entry.courseTitle}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1 text-sm font-medium text-foreground justify-end">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{entry.startTime} - {entry.endTime}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground justify-end mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{entry.venue}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center py-8 text-muted-foreground">
                      <span>No classes scheduled</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <Card variant="outline" className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CardContent className="p-4">
          <p className="text-sm font-medium text-foreground mb-3">Course Legend</p>
          <div className="flex flex-wrap gap-3">
            {Array.from(new Set(timetable.map((t) => t.courseCode))).map((code) => {
              const entry = timetable.find((t) => t.courseCode === code)!;
              return (
                <div key={code} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs text-muted-foreground">{code}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TimetablePage;
