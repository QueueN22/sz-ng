import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  FileSpreadsheet,
  Megaphone,
  User,
  Menu,
  X,
  ChevronLeft,
  GraduationCap,
} from 'lucide-react';

interface StaffSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  onCollapseToggle: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/staff' },
  { icon: BookOpen, label: 'My Courses', path: '/staff/courses' },
  { icon: ClipboardList, label: 'Attendance', path: '/staff/attendance' },
  { icon: FileSpreadsheet, label: 'Results', path: '/staff/results' },
  { icon: Megaphone, label: 'Announcements', path: '/staff/announcements' },
  { icon: User, label: 'Profile', path: '/staff/profile' },
];

export function StaffSidebar({ isOpen, onToggle, isCollapsed, onCollapseToggle }: StaffSidebarProps) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full flex-col border-r border-sidebar-border transition-all duration-300",
          "bg-sidebar",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          "w-72"
        )}
      >
        <div className={cn(
          "flex h-16 items-center border-b border-sidebar-border px-4",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <Link to="/staff" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <GraduationCap className="h-5 w-5 text-accent-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">Study Zone</span>
                <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Staff</span>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
              <GraduationCap className="h-5 w-5 text-accent-foreground" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggle}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path !== '/staff' && location.pathname.startsWith(item.path));
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) onToggle();
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                      isCollapsed && "justify-center px-3"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-accent")} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden border-t border-sidebar-border p-4 lg:block">
          <Button
            variant="ghost"
            size="sm"
            className={cn("w-full", isCollapsed && "px-0")}
            onClick={onCollapseToggle}
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
            {!isCollapsed && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}

export function StaffSidebarTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClick}>
      <Menu className="h-5 w-5" />
    </Button>
  );
}
