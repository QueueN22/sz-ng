import { useState } from 'react';
import {
  User,
  Mail,
  Building2,
  Hash,
  Edit,
  Save,
  X,
  Key,
  BookOpen,
  Camera,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { currentStaff, staffCourses } from '@/data/staffMockData';
import { useToast } from '@/hooks/use-toast';

export default function StaffProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentStaff.firstName,
    lastName: currentStaff.lastName,
    email: currentStaff.email,
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({ title: 'Profile Updated', description: 'Your profile information has been saved.' });
  };

  const handlePasswordChange = () => {
    setShowPasswordModal(false);
    toast({ title: 'Password Changed', description: 'Your password has been updated.' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">View and manage your staff profile</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card variant="default" className="lg:col-span-1 animate-slide-up">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                  <AvatarImage src={currentStaff.avatar} />
                  <AvatarFallback className="bg-accent text-accent-foreground text-2xl font-bold">
                    {currentStaff.firstName[0]}{currentStaff.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md hover:bg-accent/90 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-foreground">
                {currentStaff.title} {currentStaff.firstName} {currentStaff.lastName}
              </h2>
              <p className="text-muted-foreground">{currentStaff.staffId}</p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="info">Lecturer</Badge>
                <Badge variant="secondary">{currentStaff.department}</Badge>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-xl bg-secondary/50">
                <p className="text-2xl font-bold text-accent">{staffCourses.length}</p>
                <p className="text-xs text-muted-foreground">Courses</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-secondary/50">
                <p className="text-2xl font-bold text-primary">
                  {staffCourses.reduce((s, c) => s + c.enrolledCount, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card variant="default" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-accent" />
                Personal Information
              </CardTitle>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button variant="default" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <InfoRow icon={User} label="Full Name" value={`${currentStaff.title} ${currentStaff.firstName} ${currentStaff.lastName}`} />
                  <InfoRow icon={Mail} label="Email" value={currentStaff.email} />
                  <InfoRow icon={Hash} label="Staff ID" value={currentStaff.staffId} />
                  <InfoRow icon={Building2} label="Department" value={currentStaff.department} />
                  <InfoRow icon={Building2} label="Faculty" value={currentStaff.faculty} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security */}
          <Card variant="default" className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-accent" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 45 days ago</p>
                </div>
                <Button variant="outline" onClick={() => setShowPasswordModal(true)}>
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Password Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Change Password
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
            </div>
            <Button variant="default" className="w-full" onClick={handlePasswordChange}>
              Update Password
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}
