import { useState } from 'react';
import { Bell, ChevronDown, LogOut, Settings, User, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AdminSidebarTrigger } from './AdminSidebar';
import { Link } from 'react-router-dom';

interface AdminTopBarProps {
    onMenuClick: () => void;
}

const adminUser = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@studyzone.com',
    avatar: '',
};

export function AdminTopBar({ onMenuClick }: AdminTopBarProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
            <div className="flex items-center gap-4">
                <AdminSidebarTrigger onClick={onMenuClick} />
                <div className="hidden lg:flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Admin Portal</h2>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                                5
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <div className="p-3 border-b border-border">
                            <h4 className="font-semibold text-foreground">System Alerts</h4>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                                <span className="font-medium text-sm">New Staff Registration</span>
                                <span className="text-xs text-muted-foreground">Dr. Sarah Connor registered as a new lecturer</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                                <span className="font-medium text-sm">Backup Complete</span>
                                <span className="text-xs text-muted-foreground">System backup successfully completed at 02:00 AM</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                                <span className="font-medium text-sm">Security Alert</span>
                                <span className="text-xs text-muted-foreground">Multiple failed login attempts from IP 192.168.1.1</span>
                            </DropdownMenuItem>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 px-2 border border-transparent hover:border-border">
                            <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold uppercase">
                                    AU
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden flex-col items-start md:flex">
                                <span className="text-sm font-semibold text-foreground">
                                    Admin User
                                </span>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Super Admin</span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="p-2">
                            <p className="text-sm font-bold">{adminUser.firstName} {adminUser.lastName}</p>
                            <p className="text-xs text-muted-foreground">{adminUser.email}</p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link to="/admin/profile" className="flex items-center cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link to="/" className="flex items-center cursor-pointer text-destructive font-medium">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout to Portal
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
