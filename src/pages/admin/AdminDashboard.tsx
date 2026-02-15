import { Users, BookOpen, GraduationCap, ShieldCheck, Activity, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
    {
        title: 'Total Students',
        value: '12,543',
        change: '+12.5%',
        icon: GraduationCap,
        color: 'text-primary',
        bg: 'bg-primary/10',
    },
    {
        title: 'Active Faculty',
        value: '456',
        change: '+3.2%',
        icon: ShieldCheck,
        color: 'text-accent',
        bg: 'bg-accent/10',
    },
    {
        title: 'Current Courses',
        value: '89',
        change: '+5.4%',
        icon: BookOpen,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
    },
    {
        title: 'System Activity',
        value: '98.9%',
        change: '+0.1%',
        icon: Activity,
        color: 'text-success',
        bg: 'bg-success/10',
    },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, here's what's happening across the platform today.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border-none shadow-card hover:shadow-card-hover transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                                {stat.title}
                            </CardTitle>
                            <div className={cn("p-2 rounded-lg", stat.bg)}>
                                <stat.icon className={cn("h-4 w-4", stat.color)} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="flex items-center gap-1 mt-1">
                                <TrendingUp className="h-3 w-3 text-success" />
                                <span className="text-xs font-semibold text-success">{stat.change}</span>
                                <span className="text-xs text-muted-foreground ml-1">from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-none shadow-card">
                    <CardHeader>
                        <CardTitle>Recent System Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { user: 'Dr. Emily Smith', action: 'Created new course: Advanced Machine Learning', time: '2 hours ago' },
                                { user: 'System', action: 'Automatic backup completed successfully', time: '5 hours ago' },
                                { user: 'Admin', action: 'Modified system permissions for Faculty role', time: 'Yesterday' },
                                { user: 'John Doe', action: 'Student account flagged for suspicious activity', time: 'Yesterday' },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                                        <p className="text-xs text-muted-foreground">
                                            <span className="font-semibold text-foreground">{activity.user}</span> • {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-card">
                    <CardHeader>
                        <CardTitle>Platform Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 rounded-xl bg-secondary/30">
                                <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                                    <span className="text-sm font-medium">Authentication Service</span>
                                </div>
                                <span className="text-xs font-bold text-success">OPERATIONAL</span>
                            </div>
                            <div className="flex justify-between items-center p-4 rounded-xl bg-secondary/30">
                                <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                                    <span className="text-sm font-medium">Database Cluster</span>
                                </div>
                                <span className="text-xs font-bold text-success">OPERATIONAL</span>
                            </div>
                            <div className="flex justify-between items-center p-4 rounded-xl bg-secondary/30">
                                <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-warning animate-pulse" />
                                    <span className="text-sm font-medium">Storage Service</span>
                                </div>
                                <span className="text-xs font-bold text-warning">HIGH LOAD</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

import { cn } from '@/lib/utils';
