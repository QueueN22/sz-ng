export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  matricNumber: string;
  department: string;
  faculty: string;
  level: string;
  avatar?: string;
  gpa: number;
  totalCredits: number;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  lecturer: string;
  lecturerEmail: string;
  creditUnits: number;
  semester: string;
  color: string;
  materials?: CourseMaterial[];
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
  uploadedAt: string;
}

export interface Grade {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  continuousAssessment: number;
  examScore: number;
  totalScore: number;
  grade: string;
  gradePoint: number;
  creditUnits: number;
}

export interface TimetableEntry {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  startTime: string;
  endTime: string;
  venue: string;
  color: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: 'Admin' | 'Lecturer' | 'Department';
  createdAt: string;
  isImportant: boolean;
  courseId?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  format: 'PDF' | 'Physical' | 'Both';
  department?: string;
  courseId?: string;
  isbn: string;
  inStock: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
  format: 'PDF' | 'Physical';
}

export interface Semester {
  id: string;
  name: string;
  year: string;
  isCurrent: boolean;
}
