import { Staff, EnrolledStudent, AttendanceSession, StudentResult, StaffAnnouncement } from '@/types/staff';

export const currentStaff: Staff = {
  id: 's1',
  firstName: 'Michael',
  lastName: 'Chen',
  email: 'm.chen@university.edu',
  staffId: 'STF/2015/0023',
  department: 'Computer Science',
  faculty: 'Science',
  title: 'Dr.',
};

export const staffCourses = [
  {
    id: '1',
    code: 'CSC 301',
    title: 'Data Structures & Algorithms',
    description: 'This course covers fundamental data structures including arrays, linked lists, trees, graphs, and hash tables. Students will learn algorithm design techniques and complexity analysis.',
    creditUnits: 4,
    semester: '1',
    color: 'hsl(239, 84%, 67%)',
    enrolledCount: 87,
    materials: [
      { id: 'm1', title: 'Week 1 - Introduction to DSA', type: 'pdf' as const, url: '#', uploadedAt: '2024-09-02' },
      { id: 'm2', title: 'Sorting Algorithms Video', type: 'video' as const, url: '#', uploadedAt: '2024-09-10' },
      { id: 'm3', title: 'Assignment 1 - Arrays', type: 'pdf' as const, url: '#', uploadedAt: '2024-09-15' },
    ],
  },
  {
    id: '7',
    code: 'CSC 401',
    title: 'Compiler Construction',
    description: 'Introduction to compiler design including lexical analysis, parsing, semantic analysis, and code generation.',
    creditUnits: 3,
    semester: '1',
    color: 'hsl(280, 70%, 55%)',
    enrolledCount: 52,
    materials: [
      { id: 'm4', title: 'Lexical Analysis Notes', type: 'pdf' as const, url: '#', uploadedAt: '2024-09-05' },
    ],
  },
  {
    id: '8',
    code: 'CSC 205',
    title: 'Introduction to Programming',
    description: 'Fundamentals of programming using Python. Variables, control structures, functions, and object-oriented programming basics.',
    creditUnits: 3,
    semester: '1',
    color: 'hsl(172, 66%, 50%)',
    enrolledCount: 145,
    materials: [],
  },
];

export const enrolledStudents: EnrolledStudent[] = [
  { id: '1', firstName: 'Sarah', lastName: 'Johnson', matricNumber: 'CSC/2021/0042', level: '300 Level', department: 'Computer Science' },
  { id: '2', firstName: 'Emmanuel', lastName: 'Okafor', matricNumber: 'CSC/2021/0015', level: '300 Level', department: 'Computer Science' },
  { id: '3', firstName: 'Fatima', lastName: 'Bello', matricNumber: 'CSC/2021/0028', level: '300 Level', department: 'Computer Science' },
  { id: '4', firstName: 'David', lastName: 'Adekunle', matricNumber: 'CSC/2021/0033', level: '300 Level', department: 'Computer Science' },
  { id: '5', firstName: 'Grace', lastName: 'Nwankwo', matricNumber: 'CSC/2021/0051', level: '300 Level', department: 'Computer Science' },
  { id: '6', firstName: 'James', lastName: 'Okeke', matricNumber: 'CSC/2021/0019', level: '300 Level', department: 'Computer Science' },
  { id: '7', firstName: 'Amina', lastName: 'Yusuf', matricNumber: 'CSC/2021/0044', level: '300 Level', department: 'Computer Science' },
  { id: '8', firstName: 'Peter', lastName: 'Obi', matricNumber: 'CSC/2021/0062', level: '300 Level', department: 'Computer Science' },
  { id: '9', firstName: 'Chioma', lastName: 'Eze', matricNumber: 'CSC/2021/0037', level: '300 Level', department: 'Computer Science' },
  { id: '10', firstName: 'John', lastName: 'Adewale', matricNumber: 'CSC/2021/0008', level: '300 Level', department: 'Computer Science' },
];

export const attendanceSessions: AttendanceSession[] = [
  {
    id: 'a1',
    courseId: '1',
    date: '2024-10-07',
    records: [
      { studentId: '1', status: 'present' },
      { studentId: '2', status: 'present' },
      { studentId: '3', status: 'absent' },
      { studentId: '4', status: 'present' },
      { studentId: '5', status: 'present' },
      { studentId: '6', status: 'late' },
      { studentId: '7', status: 'present' },
      { studentId: '8', status: 'absent' },
      { studentId: '9', status: 'present' },
      { studentId: '10', status: 'present' },
    ],
  },
];

export const studentResults: StudentResult[] = [
  { studentId: '1', courseId: '1', continuousAssessment: 28, examScore: 62, totalScore: 90, grade: 'A' },
  { studentId: '2', courseId: '1', continuousAssessment: 22, examScore: 48, totalScore: 70, grade: 'B' },
  { studentId: '3', courseId: '1', continuousAssessment: 18, examScore: 40, totalScore: 58, grade: 'C' },
  { studentId: '4', courseId: '1', continuousAssessment: 25, examScore: 55, totalScore: 80, grade: 'A' },
  { studentId: '5', courseId: '1', continuousAssessment: 20, examScore: 35, totalScore: 55, grade: 'C' },
  { studentId: '6', courseId: '1', continuousAssessment: 26, examScore: 58, totalScore: 84, grade: 'A' },
  { studentId: '7', courseId: '1', continuousAssessment: 15, examScore: 30, totalScore: 45, grade: 'D' },
  { studentId: '8', courseId: '1', continuousAssessment: 24, examScore: 50, totalScore: 74, grade: 'B' },
  { studentId: '9', courseId: '1', continuousAssessment: 27, examScore: 60, totalScore: 87, grade: 'A' },
  { studentId: '10', courseId: '1', continuousAssessment: 21, examScore: 42, totalScore: 63, grade: 'B' },
];

export const staffAnnouncements: StaffAnnouncement[] = [
  {
    id: 'sa1',
    title: 'CSC 301 Assignment Submission Deadline Extended',
    content: 'The deadline for the Data Structures assignment has been extended to October 10th, 2024. Please ensure you submit your work through the course portal before 11:59 PM on the due date.',
    target: '1',
    isImportant: false,
    status: 'published',
    createdAt: '2024-10-02T14:30:00Z',
  },
  {
    id: 'sa2',
    title: 'Guest Lecture: Introduction to Machine Learning',
    content: 'The department is hosting a guest lecture on Introduction to Machine Learning by Dr. Emily Tran from TechCorp AI Labs.',
    target: 'all',
    isImportant: false,
    status: 'published',
    createdAt: '2024-10-05T16:00:00Z',
  },
  {
    id: 'sa3',
    title: 'CSC 401 Mid-Term Test Schedule',
    content: 'The mid-term test for Compiler Construction will be held on October 15th in LT 203. Topics: Lexical analysis and parsing.',
    target: '7',
    isImportant: true,
    status: 'published',
    createdAt: '2024-10-06T09:00:00Z',
  },
  {
    id: 'sa4',
    title: 'Lab Session Rescheduled',
    content: 'The practical session for CSC 205 has been moved to Friday 2PM due to lab maintenance.',
    target: '8',
    isImportant: false,
    status: 'draft',
    createdAt: '2024-10-07T11:00:00Z',
  },
];
