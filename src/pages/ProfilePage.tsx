import { useState } from 'react';
import {
  User,
  Mail,
  Building2,
  GraduationCap,
  Hash,
  Edit,
  Save,
  X,
  Key,
  Award,
  BookOpen,
  TrendingUp,
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
import { currentStudent, grades, courses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentStudent.firstName,
    lastName: currentStudent.lastName,
    email: currentStudent.email,
  });

  const totalCredits = grades.reduce((sum, g) => sum + g.creditUnits, 0);
  const totalWeightedPoints = grades.reduce((sum, g) => sum + g.gradePoint * g.creditUnits, 0);
  const gpa = totalWeightedPoints / totalCredits;

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved successfully.',
    });
  };

  const handlePasswordChange = () => {
    setShowPasswordModal(false);
    toast({
      title: 'Password Changed',
      description: 'Your password has been updated successfully.',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your personal information
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card variant="default" className="lg:col-span-1 animate-slide-up">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                  <AvatarImage src={currentStudent.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {currentStudent.firstName[0]}{currentStudent.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-foreground">
                {currentStudent.firstName} {currentStudent.lastName}
              </h2>
              <p className="text-muted-foreground">{currentStudent.matricNumber}</p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="default">{currentStudent.level}</Badge>
                <Badge variant="secondary">{currentStudent.department}</Badge>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-xl bg-secondary/50">
                <p className="text-2xl font-bold text-primary">{gpa.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Current GPA</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-secondary/50">
                <p className="text-2xl font-bold text-accent">{courses.length}</p>
                <p className="text-xs text-muted-foreground">Courses</p>
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
                <User className="h-5 w-5 text-primary" />
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
                  <InfoRow icon={User} label="Full Name" value={`${currentStudent.firstName} ${currentStudent.lastName}`} />
                  <InfoRow icon={Mail} label="Email" value={currentStudent.email} />
                  <InfoRow icon={Hash} label="Matric Number" value={currentStudent.matricNumber} />
                  <InfoRow icon={Building2} label="Department" value={currentStudent.department} />
                  <InfoRow icon={Building2} label="Faculty" value={currentStudent.faculty} />
                  <InfoRow icon={GraduationCap} label="Level" value={currentStudent.level} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Academic Summary */}
          <Card variant="default" className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Academic Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{gpa.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Cumulative GPA</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                      <BookOpen className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{currentStudent.totalCredits}</p>
                      <p className="text-xs text-muted-foreground">Total Credits</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-success/10 to-success/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/20">
                      <Award className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {gpa >= 4.5 ? 'First Class' : gpa >= 3.5 ? 'Second Class Upper' : 'Second Class Lower'}
                      </p>
                      <p className="text-xs text-muted-foreground">Expected Class</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card variant="default" className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                </div>
                <Button variant="outline" onClick={() => setShowPasswordModal(true)}>
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Password Change Modal */}
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

export default ProfilePage;
