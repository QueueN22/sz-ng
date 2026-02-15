import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { StaffLayout } from "@/components/layout/StaffLayout";
import Dashboard from "@/pages/Dashboard";
import CoursesPage from "@/pages/CoursesPage";
import GradesPage from "@/pages/GradesPage";
import TimetablePage from "@/pages/TimetablePage";
import AnnouncementsPage from "@/pages/AnnouncementsPage";
import LibraryPage from "@/pages/LibraryPage";
import ProfilePage from "@/pages/ProfilePage";
import RoleSelectPage from "@/pages/RoleSelectPage";
import StaffDashboard from "@/pages/staff/StaffDashboard";
import StaffCoursesPage from "@/pages/staff/StaffCoursesPage";
import CourseManagementPage from "@/pages/staff/CourseManagementPage";
import StaffAttendancePage from "@/pages/staff/StaffAttendancePage";
import StaffResultsPage from "@/pages/staff/StaffResultsPage";
import StaffAnnouncementsPage from "@/pages/staff/StaffAnnouncementsPage";
import StaffProfilePage from "@/pages/staff/StaffProfilePage";
import { AdminLayout } from "@/components/layout/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagementPage from "@/pages/admin/UserManagementPage";
import AdminCourseManagement from "@/pages/admin/AdminCourseManagement";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Role Selection */}
          <Route path="/" element={<RoleSelectPage />} />

          {/* Student Routes */}
          <Route path="/student" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="grades" element={<GradesPage />} />
            <Route path="timetable" element={<TimetablePage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Staff Routes */}
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<StaffDashboard />} />
            <Route path="courses" element={<StaffCoursesPage />} />
            <Route path="courses/:courseId" element={<CourseManagementPage />} />
            <Route path="attendance" element={<StaffAttendancePage />} />
            <Route path="results" element={<StaffResultsPage />} />
            <Route path="announcements" element={<StaffAnnouncementsPage />} />
            <Route path="profile" element={<StaffProfilePage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="courses" element={<AdminCourseManagement />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
