export type UserRole = 'guest' | 'student' | 'admin';

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  isSuperAdmin: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  token?: string;
  isSuperAdmin?: boolean;
}

export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  yearOfPassout: string;
  experienceLevel: 'Fresher' | '1-2 Years' | '3+ Years';
  city: string;
  batchId?: string;
  enrolledCourseIds: string[];
  joinedDate: string;
  status: 'Active' | 'Blocked' | 'On Hold' | 'Graduated';
}

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Comprehensive';
export type CourseMode = 'Online' | 'Offline' | 'Hybrid';
export type CourseCategory = 'RTL Design' | 'Verification' | 'Physical Design' | 'Protocols' | 'Full Custom' | 'System Architecture';

export type LessonType = 'video' | 'text' | 'pdf' | 'code' | 'quiz' | 'link';

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: LessonType;
  durationMinutes: number;
  isPublicPreview: boolean;
  contentUrl?: string; // Video URL or external doc
  textContent?: string;
  codeSnippet?: string; // Verilog / SystemVerilog code
  resources?: { name: string; url: string; size: string }[];
  sortOrder: number;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  sortOrder: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  previewVideoUrl?: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  mode: CourseMode;
  fee: number;
  trainer: string;
  batch: string;
  startDate: string;
  applyEnabled: boolean;
  featuredOnHome: boolean;
  popupEnabled: boolean;
  popupPriority?: number;
  popupActiveFrom?: string;
  popupActiveUntil?: string;
  published: boolean;
  modulesCount: number;
  lessonsCount: number;
  skills: string[];
  toolsUsed: string[];
  syllabusOverview: string[];
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  completedLessonIds: string[];
  status: 'Active' | 'Completed' | 'Suspended';
  certificateIssued: boolean;
}

export type ApplicationStatus = 'New' | 'Under Review' | 'Contacted' | 'Approved' | 'Rejected' | 'Converted';

export interface ApplicationRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  courseTitle: string;
  yearOfPassout: string;
  education: string;
  experienceLevel: string;
  preferredMode: CourseMode;
  preferredBatch: string;
  message?: string;
  createdAt: string;
  status: ApplicationStatus;
  assignedStaff?: string;
  followUpDate?: string;
  internalNotes?: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullContent?: string;
  coverImage: string;
  shortVideo?: string;
  speaker: string;
  speakerRole: string;
  date: string;
  time: string;
  mode: CourseMode;
  locationOrUrl: string;
  registrationDeadline: string;
  applyEnabled: boolean;
  popupEnabled: boolean;
  popupPriority?: number;
  published: boolean;
  maxAttendees?: number;
  registeredCount: number;
  tags: string[];
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  collegeOrCompany: string;
  yearOfPassout?: string;
  registeredAt: string;
}

export interface ClassSchedule {
  id: string;
  courseId: string;
  courseTitle: string;
  batch: string;
  topic: string;
  trainer: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  meetingLink: string;
  status: 'Scheduled' | 'Live Now' | 'Completed' | 'Rescheduled' | 'Cancelled';
  notes?: string;
}

export type PaymentStatus = 'Paid' | 'Partially Paid' | 'Pending' | 'Overdue';
export type PaymentMethod = 'UPI' | 'Net Banking' | 'Credit/Debit Card' | 'Bank Transfer' | 'Cash';

export interface PaymentTransaction {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  referenceId: string;
  installmentNo: number;
  totalInstallments: number;
  receiptNumber: string;
  notes?: string;
}

export interface StudentPaymentRecord {
  studentId: string;
  courseId: string;
  totalFee: number;
  totalPaid: number;
  pendingAmount: number;
  status: PaymentStatus;
  nextDueDate?: string;
  transactions: PaymentTransaction[];
}

export interface ChatLead {
  id: string;
  name: string;
  yearOfPassout: string;
  experienceLevel: string;
  courseInterest: string;
  phone: string;
  message?: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Closed';
  notes?: string;
  unread: boolean;
  conversation: { sender: 'bot' | 'user'; text: string; time: string }[];
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Closed';
  internalNotes?: string;
  unread: boolean;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  deadline: string;
  resourcesUrl?: string;
  maxMarks: number;
  submissions: {
    studentId: string;
    studentName: string;
    submittedAt: string;
    fileUrl: string;
    fileName: string;
    marksObtained?: number;
    feedback?: string;
    status: 'Submitted' | 'Graded' | 'Needs Revision';
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetAudience: 'All' | 'Public' | 'Students' | 'Specific Course';
  courseId?: string;
  publishedDate: string;
  expiryDate?: string;
  priority: 'Normal' | 'High' | 'Urgent';
  actionUrl?: string;
  active: boolean;
}

export interface SiteSectionContent {
  eyebrow: string;
  title: string;
  description: string;
}

export type SiteContent = Record<string, SiteSectionContent>;

export interface NotificationItem {
  id: string;
  userId?: string; // empty means for admin
  recipientRole: 'admin' | 'student' | 'all';
  title: string;
  message: string;
  type: 'lead' | 'request' | 'payment' | 'event' | 'schedule' | 'general';
  linkTarget?: string;
  createdAt: string;
  read: boolean;
}
