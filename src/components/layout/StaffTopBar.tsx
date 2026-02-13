import { useState } from 'react';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { semesters } from '@/data/mockData';
import { currentStaff } from '@/data/staffMockData';
import { StaffSidebarTrigger } from './StaffSidebar';
import { Link } from 'react-router-dom';

interface StaffTopBarProps {
  onMenuClick: () => void;
}

export function StaffTopBar({ onMenuClick }: StaffTopBarProps) {
  const [selectedSemester, setSelectedSemester] = useState(semesters[0].id);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <StaffSidebarTrigger onClick={onMenuClick} />

        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger className="w-[200px] border-border bg-secondary/50">
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            {semesters.map((semester) => (
              <SelectItem key={semester.id} value={semester.id}>
                <span className="flex items-center gap-2">
                  {semester.name} {semester.year}
                  {semester.isCurrent && (
                    <Badge variant="success" className="text-[10px] px-1.5 py-0">
                      Current
                    </Badge>
                  )}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                2
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b border-border">
              <h4 className="font-semibold text-foreground">Notifications</h4>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <span className="font-medium text-sm">Results Pending Review</span>
                <span className="text-xs text-muted-foreground">CSC 301 results need to be published</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <span className="font-medium text-sm">Low Attendance Alert</span>
                <span className="text-xs text-muted-foreground">CSC 205 attendance dropped below 70%</span>
              </DropdownMenuItem>
            </div>
            <div className="p-2 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentStaff.avatar} />
                <AvatarFallback className="bg-accent text-accent-foreground text-xs font-semibold">
                  {currentStaff.firstName[0]}{currentStaff.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start md:flex">
                <span className="text-sm font-medium text-foreground">
                  {currentStaff.title} {currentStaff.firstName} {currentStaff.lastName}
                </span>
                <span className="text-xs text-muted-foreground">Lecturer</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="p-2">
              <p className="text-sm font-medium">{currentStaff.title} {currentStaff.firstName} {currentStaff.lastName}</p>
              <p className="text-xs text-muted-foreground">{currentStaff.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/staff/profile" className="flex items-center cursor-pointer">
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
              <Link to="/" className="flex items-center cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Switch to Student
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
