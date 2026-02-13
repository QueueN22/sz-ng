export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  staffId: string;
  department: string;
  faculty: string;
  title: string;
  avatar?: string;
}

export interface EnrolledStudent {
  id: string;
  firstName: string;
  lastName: string;
  matricNumber: string;
  level: string;
  department: string;
}

export interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'absent' | 'late';
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  date: string;
  records: AttendanceRecord[];
}

export interface StudentResult {
  studentId: string;
  courseId: string;
  continuousAssessment: number;
  examScore: number;
  totalScore: number;
  grade: string;
}

export interface StaffAnnouncement {
  id: string;
  title: string;
  content: string;
  target: 'all' | string; // 'all' or courseId
  isImportant: boolean;
  status: 'draft' | 'published';
  createdAt: string;
}
