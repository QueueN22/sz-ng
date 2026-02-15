import { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, Shield, UserPlus, GraduationCap, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice.j@studyzone.com', role: 'Student', status: 'Active', avatar: '' },
    { id: 2, name: 'Dr. Robert Wilson', email: 'r.wilson@studyzone.com', role: 'Staff', status: 'Active', avatar: '' },
    { id: 3, name: 'Charlie Davis', email: 'charlie.d@studyzone.com', role: 'Student', status: 'Inactive', avatar: '' },
    { id: 4, name: 'Sarah Miller', email: 's.miller@studyzone.com', role: 'Staff', status: 'Active', avatar: '' },
    { id: 5, name: 'Admin User', email: 'admin@studyzone.com', role: 'Admin', status: 'Active', avatar: '' },
    { id: 6, name: 'James Brown', email: 'j.brown@studyzone.com', role: 'Student', status: 'Suspended', avatar: '' },
];

export default function UserManagementPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">User Management</h1>
                    <p className="text-muted-foreground">Manage platform users, roles, and account statuses.</p>
                </div>
                <Button className="gradient-primary">
                    <UserPlus className="mr-2 h-4 w-4" /> Add New User
                </Button>
            </div>

            <Card className="border-none shadow-card">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search users by name or email..."
                                className="pl-10 h-11 bg-secondary/30 border-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="h-11">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border text-left">
                                    <th className="pb-4 pt-0 font-bold text-muted-foreground text-xs uppercase tracking-wider">User</th>
                                    <th className="pb-4 pt-0 font-bold text-muted-foreground text-xs uppercase tracking-wider">Role</th>
                                    <th className="pb-4 pt-0 font-bold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                                    <th className="pb-4 pt-0 font-bold text-muted-foreground text-xs uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-secondary/20 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-sm">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Mail className="h-3 w-3" /> {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                {user.role === 'Admin' && <Shield className="h-4 w-4 text-primary" />}
                                                {user.role === 'Staff' && <Briefcase className="h-4 w-4 text-accent" />}
                                                {user.role === 'Student' && <GraduationCap className="h-4 w-4 text-blue-500" />}
                                                <span className="text-sm">{user.role}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <Badge
                                                variant={
                                                    user.status === 'Active' ? 'success' :
                                                        user.status === 'Suspended' ? 'destructive' :
                                                            'outline'
                                                }
                                                className="font-bold text-[10px]"
                                            >
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td className="py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                                                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">Suspend Account</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
