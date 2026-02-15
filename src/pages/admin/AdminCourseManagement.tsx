import { useState } from 'react';
import { BookOpen, Plus, Search, Users, MoreVertical, Edit3, Trash2, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const initialCourses = [
    {
        id: 'CSC301',
        name: 'Advanced Web Development',
        assignedStaff: 'Dr. Robert Wilson',
        students: 124,
        semester: 'Fall 2025',
        color: 'bg-indigo-500'
    },
    {
        id: 'CSC302',
        name: 'Database Management Systems',
        assignedStaff: 'Sarah Miller',
        students: 98,
        semester: 'Fall 2025',
        color: 'bg-emerald-500'
    },
    {
        id: 'CSC303',
        name: 'Introduction to AI',
        assignedStaff: 'Unassigned',
        students: 0,
        semester: 'Spring 2026',
        color: 'bg-amber-500'
    },
];

export default function AdminCourseManagement() {
    const [courses, setCourses] = useState(initialCourses);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Course Management</h1>
                    <p className="text-muted-foreground">Manage curriculum, create courses, and assign teaching staff.</p>
                </div>
                <Button className="gradient-primary">
                    <Plus className="mr-2 h-4 w-4" /> Create New Course
                </Button>
            </div>

            <div className="grid gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search courses..."
                            className="pl-10 h-11 bg-secondary/30 border-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="px-3 py-1">All Semesters</Badge>
                        <Badge variant="outline" className="px-3 py-1">Active Only</Badge>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <Card key={course.id} className="border-none shadow-card hover:shadow-card-hover transition-all duration-300 group">
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start">
                                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center text-white mb-4", course.color)}>
                                        <BookOpen className="h-6 w-6" />
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem><Edit3 className="mr-2 h-4 w-4" /> Edit Details</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete Course</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <Badge variant="secondary" className="mb-2 w-fit font-bold uppercase tracking-wider text-[10px]">
                                    {course.id} • {course.semester}
                                </Badge>
                                <CardTitle className="text-xl">{course.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Students</span>
                                        </div>
                                        <span className="text-sm font-bold">{course.students}</span>
                                    </div>

                                    <div className="pt-2">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Assigned Staff</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 ring-2 ring-background">
                                                    <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-bold">
                                                        {course.assignedStaff !== 'Unassigned' ? course.assignedStaff.split(' ').map(n => n[0]).join('') : '?'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className={cn("text-sm font-semibold", course.assignedStaff === 'Unassigned' && "text-muted-foreground italic")}>
                                                    {course.assignedStaff}
                                                </span>
                                            </div>
                                            <Button variant="ghost" size="icon-sm" className="text-primary hover:bg-primary/10">
                                                <UserPlus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { cn } from '@/lib/utils';
