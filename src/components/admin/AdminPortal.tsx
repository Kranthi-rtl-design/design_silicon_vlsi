import React, { useState, useEffect } from 'react';
import {
  Shield,
  LayoutDashboard,
  Inbox,
  MessageSquare,
  Users,
  BookOpen,
  Calendar,
  CreditCard,
  FileSpreadsheet,
  Megaphone,
  Bell,
  Settings,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Sparkles,
  LogOut,
  Phone,
  Mail,
  Clock,
  Layers,
  Save,
  X,
  KeyRound,
  UserPlus,
  ShieldCheck,
  Lock,
  Ban,
  UserX,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { storageService, subscribeToDataChanges } from '../../services/storage';
import {
  Course,
  CourseModule,
  EventItem,
  ApplicationRequest,
  ChatLead,
  ContactMessage,
  ClassSchedule,
  PaymentTransaction,
  StudentProfile,
  Announcement,
  AdminAccount,
  CourseMode,
  CourseLevel,
  CourseCategory
} from '../../types';

export const AdminPortal: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const [activeSection, setActiveSection] = useState<
    | 'dashboard'
    | 'applications'
    | 'chat-leads'
    | 'contact-messages'
    | 'students'
    | 'courses'
    | 'events'
    | 'schedules'
    | 'payments'
    | 'reports'
    | 'announcements'
    | 'admin-accounts'
  >('dashboard');

  // Real-time Storage state
  const [courses, setCourses] = useState(storageService.getCourses());
  const [modules, setModules] = useState(storageService.getModules());
  const [events, setEvents] = useState(storageService.getEvents());
  const [eventRegs, setEventRegs] = useState(storageService.getEventRegistrations());
  const [applications, setApplications] = useState(storageService.getApplications());
  const [chatLeads, setChatLeads] = useState(storageService.getChatLeads());
  const [contactMsgs, setContactMsgs] = useState(storageService.getContactMessages());
  const [students, setStudents] = useState(storageService.getStudents());
  const [schedules, setSchedules] = useState(storageService.getSchedules());
  const [payments, setPayments] = useState(storageService.getPayments());
  const [paymentRecords, setPaymentRecords] = useState(storageService.getPaymentRecords());
  const [announcements, setAnnouncements] = useState(storageService.getAnnouncements());
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>(storageService.getAdminAccounts());
  const [badges, setBadges] = useState(storageService.getUnreadBadges());

  // Search & Filter States
  const [appFilter, setAppFilter] = useState<'All' | 'New' | 'Approved' | 'Converted' | 'Rejected'>('All');
  const [studentSearch, setStudentSearch] = useState('');
  const [leadSearch, setLeadSearch] = useState('');

  // Admin Account Creation State (Super Admin Only)
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');

  // Selected Detail Drawers & Modals
  const [selectedApp, setSelectedApp] = useState<ApplicationRequest | null>(null);
  const [selectedLead, setSelectedLead] = useState<ChatLead | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<EventItem> | null>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Partial<ClassSchedule> | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Partial<Announcement> | null>(null);

  // Payment Form State
  const [payStudentId, setPayStudentId] = useState(students[0]?.id || 'std-1');
  const [payCourseId, setPayCourseId] = useState(courses[0]?.id || 'course-1');
  const [payAmount, setPayAmount] = useState('20000');
  const [payMethod, setPayMethod] = useState<PaymentTransaction['paymentMethod']>('UPI');
  const [payRefId, setPayRefId] = useState('UPI-DSV-' + Math.floor(100000 + Math.random() * 900000));
  const [payInstallmentNo, setPayInstallmentNo] = useState(2);
  const [payNotes, setPayNotes] = useState('Second installment clearance');

  useEffect(() => {
    const unsub = subscribeToDataChanges(() => {
      setCourses(storageService.getCourses());
      setModules(storageService.getModules());
      setEvents(storageService.getEvents());
      setEventRegs(storageService.getEventRegistrations());
      setApplications(storageService.getApplications());
      setChatLeads(storageService.getChatLeads());
      setContactMsgs(storageService.getContactMessages());
      setStudents(storageService.getStudents());
      setSchedules(storageService.getSchedules());
      setPayments(storageService.getPayments());
      setPaymentRecords(storageService.getPaymentRecords());
      setAnnouncements(storageService.getAnnouncements());
      setAdminAccounts(storageService.getAdminAccounts());
      setBadges(storageService.getUnreadBadges());
    });
    return unsub;
  }, []);

  const isSuperAdmin = !!(user?.isSuperAdmin || user?.email?.toLowerCase() === 'admin_design_silicon@dsv.com');

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      showToast('Only Super Admin (admin_design_silicon@dsv.com) can add admin accounts.', 'error');
      return;
    }
    if (!newAdminName || !newAdminEmail || !newAdminPassword) {
      showToast('Please provide Name, Email, and Password.', 'error');
      return;
    }
    const cleanEmail = newAdminEmail.trim().toLowerCase();
    const existing = adminAccounts.some((a) => a.email.toLowerCase() === cleanEmail);
    if (existing) {
      showToast('An administrator with this email already exists.', 'error');
      return;
    }

    const newAccount: AdminAccount = {
      id: `admin-${Date.now()}`,
      name: newAdminName.trim(),
      email: cleanEmail,
      password: newAdminPassword,
      isSuperAdmin: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    storageService.saveAdminAccount(newAccount);
    setAdminAccounts(storageService.getAdminAccounts());
    setNewAdminName('');
    setNewAdminEmail('');
    setNewAdminPassword('');
    showToast(`Admin account for ${newAccount.name} created successfully!`, 'success');
  };

  const handleDeleteAdmin = (id: string, name: string) => {
    if (!isSuperAdmin) {
      showToast('Only Super Admin can remove administrator accounts.', 'error');
      return;
    }
    const ok = storageService.deleteAdminAccount(id);
    if (ok) {
      setAdminAccounts(storageService.getAdminAccounts());
      showToast(`Removed administrator account: ${name}`, 'info');
    } else {
      showToast('Cannot delete the primary Super Admin account.', 'error');
    }
  };

  // --- ACTIONS ---
  const handleApproveAndConvert = (appId: string) => {
    const newStudent = storageService.convertApplicationToStudent(appId);
    if (newStudent) {
      showToast(`Approved & enrolled ${newStudent.name} into student roster!`, 'success');
      setSelectedApp(null);
    }
  };

  const handleRejectApplication = (appId: string) => {
    storageService.updateApplicationStatus(appId, 'Rejected', 'Does not meet prerequisites');
    showToast('Application marked as rejected', 'info');
    setSelectedApp(null);
  };

  const handleBlockStudent = (studentId: string, studentName: string) => {
    const ok = storageService.blockStudent(studentId);
    if (ok) {
      setStudents(storageService.getStudents());
      showToast(`Access blocked for ${studentName}. They will not be able to log in.`, 'error');
    }
  };

  const handleUnblockStudent = (studentId: string, studentName: string) => {
    const ok = storageService.unblockStudent(studentId);
    if (ok) {
      setStudents(storageService.getStudents());
      showToast(`Access restored for ${studentName}. Previous learning content & dashboard unblocked!`, 'success');
    }
  };

  const handleRemoveStudentAccess = (studentId: string, studentName: string) => {
    if (window.confirm(`Are you sure you want to completely remove access for "${studentName}"? This will delete the student profile, all course enrollments, payment history, and login credentials.`)) {
      const ok = storageService.removeStudentAndCleanData(studentId);
      if (ok) {
        setStudents(storageService.getStudents());
        setPaymentRecords(storageService.getPaymentRecords());
        setPayments(storageService.getPayments());
        showToast(`Access removed & student data cleaned for ${studentName}.`, 'info');
      }
    }
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse?.title) return;

    const courseToSave: Course = {
      id: editingCourse.id || `course-${Date.now()}`,
      title: editingCourse.title,
      slug: (editingCourse.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortDescription: editingCourse.shortDescription || '',
      fullDescription: editingCourse.fullDescription || '',
      thumbnail: editingCourse.thumbnail || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      category: (editingCourse.category as CourseCategory) || 'RTL Design',
      level: (editingCourse.level as CourseLevel) || 'Advanced',
      duration: editingCourse.duration || '16 Weeks',
      mode: (editingCourse.mode as CourseMode) || 'Hybrid',
      fee: Number(editingCourse.fee) || 45000,
      trainer: editingCourse.trainer || 'Bhavani Bhaskar',
      batch: editingCourse.batch || 'Batch #29 (Upcoming)',
      startDate: editingCourse.startDate || '2026-11-15',
      applyEnabled: editingCourse.applyEnabled ?? true,
      featuredOnHome: editingCourse.featuredOnHome ?? true,
      popupEnabled: editingCourse.popupEnabled ?? false,
      popupPriority: Number(editingCourse.popupPriority) || 1,
      published: editingCourse.published ?? true,
      modulesCount: editingCourse.modulesCount || 4,
      lessonsCount: editingCourse.lessonsCount || 24,
      skills: editingCourse.skills || ['Synthesizable RTL', 'SpyGlass Linting'],
      toolsUsed: editingCourse.toolsUsed || ['QuestaSim', 'Verilator'],
      syllabusOverview: editingCourse.syllabusOverview || ['Digital Design Fundamentals']
    };

    storageService.saveCourse(courseToSave);
    showToast(`Course "${courseToSave.title}" saved successfully!`, 'success');
    setCourseModalOpen(false);
    setEditingCourse(null);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent?.title) return;

    const eventToSave: EventItem = {
      id: editingEvent.id || `event-${Date.now()}`,
      title: editingEvent.title,
      slug: (editingEvent.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: editingEvent.description || '',
      coverImage: editingEvent.coverImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      speaker: editingEvent.speaker || 'Bhavani Bhaskar',
      speakerRole: editingEvent.speakerRole || 'Principal RTL Architect',
      date: editingEvent.date || '2026-11-20',
      time: editingEvent.time || '10:00 AM - 1:00 PM IST',
      mode: (editingEvent.mode as CourseMode) || 'Online',
      locationOrUrl: editingEvent.locationOrUrl || 'Google Meet / Live Stream',
      registrationDeadline: editingEvent.registrationDeadline || '2026-11-19',
      applyEnabled: true,
      popupEnabled: editingEvent.popupEnabled ?? false,
      popupPriority: Number(editingEvent.popupPriority) || 1,
      published: editingEvent.published ?? true,
      registeredCount: editingEvent.registeredCount || 0,
      tags: editingEvent.tags || ['Workshop', 'VLSI']
    };

    storageService.saveEvent(eventToSave);
    showToast(`Event "${eventToSave.title}" saved!`, 'success');
    setEventModalOpen(false);
    setEditingEvent(null);
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSchedule?.topic) return;

    const schToSave: ClassSchedule = {
      id: editingSchedule.id || `sch-${Date.now()}`,
      courseId: editingSchedule.courseId || 'course-1',
      courseTitle: editingSchedule.courseTitle || 'Advanced RTL Design',
      batch: editingSchedule.batch || 'Batch #28 (Weekend)',
      topic: editingSchedule.topic,
      trainer: editingSchedule.trainer || 'Bhavani Bhaskar',
      date: editingSchedule.date || '2026-10-24',
      startTime: editingSchedule.startTime || '10:00 AM',
      endTime: editingSchedule.endTime || '01:00 PM',
      meetingLink: editingSchedule.meetingLink || 'https://meet.google.com/dsv-live',
      status: (editingSchedule.status as any) || 'Scheduled'
    };

    storageService.saveSchedule(schToSave);
    showToast('Class schedule published to student timetable!', 'success');
    setScheduleModalOpen(false);
    setEditingSchedule(null);
  };

  const handleRecordPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const std = students.find((s) => s.id === payStudentId) || students[0];
    const crs = courses.find((c) => c.id === payCourseId) || courses[0];

    storageService.recordPayment({
      studentId: std.id,
      studentName: std.name,
      courseId: crs.id,
      courseTitle: crs.title,
      amount: Number(payAmount),
      paymentMethod: payMethod,
      referenceId: payRefId,
      installmentNo: payInstallmentNo,
      notes: payNotes
    });

    showToast(`Recorded payment of ₹${Number(payAmount).toLocaleString('en-IN')} for ${std.name}!`, 'success');
    setPaymentModalOpen(false);
  };

  // --- CSV REPORT EXPORT FUNCTION ---
  const downloadCSV = (type: 'students' | 'applications' | 'payments' | 'leads' | 'events') => {
    let rows: string[][] = [];
    let filename = `dsv_report_${type}_${new Date().toISOString().split('T')[0]}.csv`;

    if (type === 'students') {
      rows.push(['Student ID', 'Name', 'Email', 'Phone', 'Education', 'Year', 'Batch', 'Status']);
      students.forEach((s) => rows.push([s.id, s.name, s.email, s.phone, s.education, s.yearOfPassout, s.batchId || '', s.status]));
    } else if (type === 'applications') {
      rows.push(['ID', 'Name', 'Email', 'Phone', 'Course', 'Passout Year', 'Status', 'Date']);
      applications.forEach((a) => rows.push([a.id, a.fullName, a.email, a.phone, a.courseTitle, a.yearOfPassout, a.status, a.createdAt]));
    } else if (type === 'payments') {
      rows.push(['Receipt #', 'Student', 'Course', 'Amount', 'Date', 'Method', 'Reference ID']);
      payments.forEach((p) => rows.push([p.receiptNumber, p.studentName, p.courseTitle, p.amount.toString(), p.paymentDate, p.paymentMethod, p.referenceId]));
    } else if (type === 'leads') {
      rows.push(['Lead ID', 'Name', 'Phone', 'Course Interest', 'Passout Year', 'Status', 'Date']);
      chatLeads.forEach((l) => rows.push([l.id, l.name, l.phone, l.courseInterest, l.yearOfPassout, l.status, l.createdAt]));
    } else if (type === 'events') {
      rows.push(['Reg ID', 'Event Title', 'Name', 'Email', 'Phone', 'College/Company', 'Date']);
      eventRegs.forEach((r) => rows.push([r.id, r.eventTitle, r.name, r.email, r.phone, r.collegeOrCompany, r.registeredAt]));
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.map(val => `"${(val || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloaded ${filename} successfully!`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col">
      {/* Top Admin Bar */}
      <div className="bg-slate-900 border-b border-rose-500/20 px-4 sm:px-6 py-3.5 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-9 h-9 rounded-xl bg-slate-950 border border-rose-500/40 overflow-hidden shrink-0">
                <img
                  src="/images/dsv-badge-dark.jpg"
                  alt="DSV Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <span>DESIGN SILICON</span>
                  <span className="text-rose-400 font-mono text-xs">ADMIN</span>
                </span>
                <span className="text-[10px] text-rose-300 font-mono block">
                  INSTITUTE OPERATIONS CONTROL CENTER
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-300 hidden sm:inline">
              Logged in: <strong className="text-rose-300">{user?.name || 'Institute Admin'}</strong>
            </span>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 text-xs font-semibold transition shadow-sm"
              title="Sign Out of Admin Portal"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Workspace with Responsive Sidebar Navigation */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 bg-slate-900 border border-slate-800 rounded-2xl p-3 shrink-0 h-fit space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-3 py-2">
            Operations &amp; Inboxes
          </div>

          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'applications', label: 'Registration Requests', icon: Inbox, badge: badges.newApplications },
            { id: 'chat-leads', label: 'Chat / Leads', icon: MessageSquare, badge: badges.newChatLeads },
            { id: 'contact-messages', label: 'Contact Messages', icon: Mail, badge: badges.newContactMsgs },
            { id: 'students', label: 'Students Roster', icon: Users },
            { id: 'courses', label: 'Courses & LMS CMS', icon: BookOpen },
            { id: 'events', label: 'Events & Workshops', icon: Calendar },
            { id: 'schedules', label: 'Class Schedules', icon: Clock },
            { id: 'payments', label: 'Payments & Dues', icon: CreditCard },
            { id: 'reports', label: 'Reports & Export', icon: FileSpreadsheet },
            { id: 'announcements', label: 'Announcements', icon: Megaphone },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-850 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className="w-4 h-4 shrink-0 text-slate-400" />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-rose-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Admin Main Content Body */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* ================= 1. ADMIN DASHBOARD HOME ================= */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Operations Center Overview</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live registration counters, unread lead messages, and batch schedules.
                  </p>
                </div>
              </div>

              {/* KPI Cards (Phase 4.1) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveSection('students')}
                  className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-xl cursor-pointer transition shadow-lg group"
                >
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Total Students</div>
                  <div className="text-2xl font-black text-white mt-1 group-hover:text-cyan-400 transition">
                    {students.length}
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-0.5">&bull; Active Cohorts</div>
                </div>

                <div
                  onClick={() => setActiveSection('applications')}
                  className="bg-slate-900 border border-rose-500/30 hover:border-rose-500/60 p-4 rounded-xl cursor-pointer transition shadow-lg group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
                    <span>New Requests</span>
                    {badges.newApplications > 0 && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    )}
                  </div>
                  <div className="text-2xl font-black text-rose-400 mt-1">
                    {badges.newApplications}
                  </div>
                  <div className="text-[10px] text-rose-300 font-mono mt-0.5">Awaiting Review</div>
                </div>

                <div
                  onClick={() => setActiveSection('chat-leads')}
                  className="bg-slate-900 border border-sky-500/30 hover:border-sky-500/60 p-4 rounded-xl cursor-pointer transition shadow-lg group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
                    <span>Chat Leads</span>
                    {badges.newChatLeads > 0 && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>
                  <div className="text-2xl font-black text-cyan-400 mt-1">
                    {badges.newChatLeads}
                  </div>
                  <div className="text-[10px] text-cyan-300 font-mono mt-0.5">From Public Chatbot</div>
                </div>

                <div
                  onClick={() => setActiveSection('payments')}
                  className="bg-slate-900 border border-amber-500/30 hover:border-amber-500/60 p-4 rounded-xl cursor-pointer transition shadow-lg group"
                >
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Pending Fees</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">
                    ₹{paymentRecords.reduce((acc, curr) => acc + curr.pendingAmount, 0).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-amber-300 font-mono mt-0.5">Collectable Dues</div>
                </div>
              </div>

              {/* Quick Queues: Latest Requests & Recent Chat Leads */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Course Applications */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-rose-400" />
                      <h3 className="text-sm font-bold text-white">Latest Admission Requests</h3>
                    </div>
                    <button
                      onClick={() => setActiveSection('applications')}
                      className="text-xs text-rose-400 hover:underline"
                    >
                      View All ({applications.length})
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {applications.slice(0, 3).map((app) => (
                      <div
                        key={app.id}
                        onClick={() => {
                          setSelectedApp(app);
                          setActiveSection('applications');
                        }}
                        className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-rose-400/50 cursor-pointer transition flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{app.fullName}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                            {app.courseTitle}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {app.phone} &bull; {app.yearOfPassout}
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            app.status === 'New'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Chat Leads */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-bold text-white">Recent Multi-Step Chat Leads</h3>
                    </div>
                    <button
                      onClick={() => setActiveSection('chat-leads')}
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      View All ({chatLeads.length})
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {chatLeads.slice(0, 3).map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setActiveSection('chat-leads');
                        }}
                        className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-400/50 cursor-pointer transition flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{lead.name}</div>
                          <div className="text-[11px] text-cyan-400 truncate max-w-[200px]">
                            {lead.courseInterest}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {lead.phone} &bull; {lead.experienceLevel}
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            lead.status === 'New'
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. REGISTRATION REQUESTS INBOX (Phase 4.2) ================= */}
          {activeSection === 'applications' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Registration Requests Inbox</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Review incoming course applications and convert them to enrolled students.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
                  {(['All', 'New', 'Approved', 'Converted', 'Rejected'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setAppFilter(st)}
                      className={`px-3 py-1 rounded-lg transition ${
                        appFilter === st
                          ? 'bg-rose-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Applications List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applications
                  .filter((a) => (appFilter === 'All' ? true : a.status === appFilter))
                  .map((app) => (
                    <div
                      key={app.id}
                      className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between space-y-4 shadow-lg hover:border-slate-700 transition"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                              app.status === 'New'
                                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                : app.status === 'Converted'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {app.status}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">{app.createdAt}</span>
                        </div>

                        <h3 className="text-base font-bold text-white">{app.fullName}</h3>
                        <div className="text-xs text-cyan-400 font-mono">{app.courseTitle}</div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                          <div>Phone: <span className="text-slate-200 font-mono">{app.phone}</span></div>
                          <div>Email: <span className="text-slate-200">{app.email}</span></div>
                          <div>Education: <span className="text-slate-200">{app.education}</span></div>
                          <div>Passout: <span className="text-slate-200">{app.yearOfPassout}</span></div>
                        </div>

                        {app.message && (
                          <div className="text-xs text-slate-300 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80 italic">
                            "{app.message}"
                          </div>
                        )}
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                        {app.status !== 'Converted' ? (
                          <>
                            <button
                              onClick={() => handleRejectApplication(app.id)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 text-xs font-semibold transition"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleApproveAndConvert(app.id)}
                              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Approve &amp; Enroll</span>
                            </button>
                          </>
                        ) : (() => {
                          const matchingStudent = students.find(
                            (s) => s.email.toLowerCase() === app.email.toLowerCase()
                          );
                          const isBlocked = matchingStudent?.status === 'Blocked';

                          return (
                            <div className="w-full flex items-center justify-between gap-2">
                              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Enrolled</span>
                              </span>

                              <div className="flex items-center gap-1.5">
                                {matchingStudent && (
                                  <>
                                    {isBlocked ? (
                                      <button
                                        onClick={() => handleUnblockStudent(matchingStudent.id, matchingStudent.name)}
                                        className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-semibold transition flex items-center gap-1"
                                        title="Unblock Student access"
                                      >
                                        <UserCheck className="w-3 h-3 text-emerald-400" />
                                        <span>Unblock</span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => handleBlockStudent(matchingStudent.id, matchingStudent.name)}
                                        className="px-2.5 py-1 rounded-lg bg-rose-950/70 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-semibold transition flex items-center gap-1"
                                        title="Block Student login"
                                      >
                                        <Ban className="w-3 h-3 text-rose-400" />
                                        <span>Block</span>
                                      </button>
                                    )}

                                    <button
                                        onClick={() => handleRemoveStudentAccess(matchingStudent.id, matchingStudent.name)}
                                        className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-rose-950 border border-slate-750 hover:border-rose-700 text-slate-400 hover:text-rose-300 text-xs font-semibold transition flex items-center gap-1"
                                        title="Remove Student Access & Clean Data"
                                      >
                                        <UserX className="w-3 h-3" />
                                        <span>Remove Access</span>
                                      </button>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ================= 3. CHAT / LEADS INBOX (Phase 4.3) ================= */}
          {activeSection === 'chat-leads' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Chat Leads Inbox</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Leads automatically captured by the 6-step website advisor assistant.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chatLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            lead.status === 'New'
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {lead.status}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{lead.createdAt}</span>
                      </div>

                      <h3 className="text-base font-bold text-white">{lead.name}</h3>
                      <div className="text-xs text-cyan-400 font-mono">{lead.courseInterest}</div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                        <div>Phone: <span className="text-slate-200 font-mono">{lead.phone}</span></div>
                        <div>Passout: <span className="text-slate-200">{lead.yearOfPassout}</span></div>
                        <div>Experience: <span className="text-slate-200">{lead.experienceLevel}</span></div>
                      </div>

                      {lead.message && (
                        <div className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                          Inquiry: "{lead.message}"
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-cyan-300 text-xs font-semibold"
                      >
                        Inspect Transcript ({lead.conversation?.length || 0} Msgs)
                      </button>

                      <select
                        value={lead.status}
                        onChange={(e) => {
                          storageService.updateChatLead(lead.id, e.target.value as any);
                          showToast(`Updated status to ${e.target.value}`, 'info');
                        }}
                        className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transcript Drawer Modal */}
              {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
                  <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl max-h-[85vh] flex flex-col">
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <h3 className="text-lg font-bold text-white mb-1">
                      Lead Transcript: {selectedLead.name}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono mb-4 pb-2 border-b border-slate-800">
                      Phone: {selectedLead.phone} &bull; Course: {selectedLead.courseInterest}
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2.5 pr-2 mb-4">
                      {selectedLead.conversation?.map((msg, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-xl text-xs ${
                            msg.sender === 'user'
                              ? 'bg-sky-950/80 border border-sky-800/60 text-sky-200 ml-6'
                              : 'bg-slate-950 border border-slate-800 text-slate-300 mr-6'
                          }`}
                        >
                          <div className="text-[10px] font-mono text-slate-500 mb-1 uppercase">
                            {msg.sender === 'user' ? 'Visitor' : 'Chatbot'} &bull; {msg.time}
                          </div>
                          <div>{msg.text}</div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedLead(null)}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
                    >
                      Close Transcript
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= 4. CONTACT MESSAGES INBOX ================= */}
          {activeSection === 'contact-messages' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Contact Messages Inbox</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Inquiries submitted via the Contact page.</p>
                </div>
              </div>

              <div className="space-y-3">
                {contactMsgs.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                          {msg.status}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{msg.createdAt}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{msg.subject}</h4>
                      <div className="text-xs text-cyan-400 font-mono">
                        From: {msg.fullName} ({msg.email} &bull; {msg.phone})
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">"{msg.message}"</p>
                    </div>

                    <button
                      onClick={() => {
                        storageService.markContactMessageRead(msg.id);
                        showToast(`Marked inquiry from ${msg.fullName} as contacted`, 'info');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs text-slate-200 border border-slate-700"
                    >
                      Mark Contacted
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 5. STUDENTS ROSTER ================= */}
          {activeSection === 'students' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Students Directory</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Active enrolled learner accounts.</p>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Student Name</th>
                      <th className="p-3.5">Email &amp; Phone</th>
                      <th className="p-3.5">Education</th>
                      <th className="p-3.5">Batch</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {students
                      .filter((s) => s.name.toLowerCase().includes(studentSearch.toLowerCase()))
                      .map((std) => (
                        <tr key={std.id} className="hover:bg-slate-850">
                          <td className="p-3.5 font-bold text-white">{std.name}</td>
                          <td className="p-3.5 text-slate-300">
                            <div>{std.email}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{std.phone}</div>
                          </td>
                          <td className="p-3.5 text-slate-300">{std.education} ({std.yearOfPassout})</td>
                          <td className="p-3.5 text-cyan-400 font-mono">{std.batchId}</td>
                          <td className="p-3.5">
                            {std.status === 'Blocked' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-950/90 text-rose-300 border border-rose-800 font-bold">
                                <Ban className="w-3 h-3 text-rose-400" />
                                <span>Blocked</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800 font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <span>{std.status}</span>
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Block / Unblock Access Button */}
                              {std.status === 'Blocked' ? (
                                <button
                                  onClick={() => handleUnblockStudent(std.id, std.name)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-semibold transition flex items-center gap-1"
                                  title="Unblock Student - restore their login and learning access"
                                >
                                  <UserCheck className="w-3 h-3 text-emerald-400" />
                                  <span>Unblock</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleBlockStudent(std.id, std.name)}
                                  className="px-2.5 py-1 rounded-lg bg-rose-950/70 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-semibold transition flex items-center gap-1"
                                  title="Block Student - prevents login, preserves previous coursework"
                                >
                                  <Ban className="w-3 h-3 text-rose-400" />
                                  <span>Block</span>
                                </button>
                              )}

                              {/* Remove Access & Clean Data Button */}
                              <button
                                onClick={() => handleRemoveStudentAccess(std.id, std.name)}
                                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-rose-950 border border-slate-750 hover:border-rose-700 text-slate-400 hover:text-rose-300 text-xs font-semibold transition flex items-center gap-1"
                                title="Remove Access - cleans student data and revokes account completely"
                              >
                                <UserX className="w-3 h-3" />
                                <span>Remove Access</span>
                              </button>

                              {/* Record Payment */}
                              <button
                                onClick={() => {
                                  setPayStudentId(std.id);
                                  setPaymentModalOpen(true);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-sky-950 border border-sky-800 text-cyan-300 text-xs hover:bg-sky-900 transition"
                              >
                                Pay
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 6. COURSES & LMS CMS (Phase 5) ================= */}
          {activeSection === 'courses' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Course &amp; Content CMS</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Create and publish courses, configure opening popups, and manage curriculum.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingCourse({
                      title: '',
                      shortDescription: '',
                      fee: 45000,
                      category: 'RTL Design',
                      level: 'Comprehensive',
                      duration: '16 Weeks',
                      mode: 'Hybrid',
                      trainer: 'Bhavani Bhaskar',
                      batch: 'Next Cohort',
                      published: true,
                      featuredOnHome: true,
                      popupEnabled: false
                    });
                    setCourseModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Course</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-cyan-300 border border-sky-800">
                          {course.category} &bull; {course.mode}
                        </span>
                        <div className="flex items-center gap-1">
                          {course.popupEnabled && (
                            <span className="text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded">
                              POPUP ACTIVE
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              course.published
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {course.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white">{course.title}</h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">{course.shortDescription}</p>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-3 mt-3 border-t border-slate-800">
                        <div>Fee: <strong className="text-emerald-400">₹{course.fee.toLocaleString('en-IN')}</strong></div>
                        <div>Trainer: <span className="text-slate-200">{course.trainer}</span></div>
                        <div>Duration: <span className="text-slate-200">{course.duration}</span></div>
                        <div>Batch: <span className="text-slate-200">{course.batch}</span></div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingCourse(course);
                          setCourseModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-cyan-300 text-xs font-semibold flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Course</span>
                      </button>

                      <button
                        onClick={() => {
                          course.published = !course.published;
                          storageService.saveCourse(course);
                          showToast(`Toggled publish status for ${course.title}`, 'info');
                        }}
                        className="text-xs text-slate-400 hover:text-white underline"
                      >
                        {course.published ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Course Creator / Editor Modal */}
              {courseModalOpen && editingCourse && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
                  <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[88vh] overflow-y-auto">
                    <button
                      onClick={() => {
                        setCourseModalOpen(false);
                        setEditingCourse(null);
                      }}
                      className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <h3 className="text-lg font-bold text-white mb-4">
                      {editingCourse.id ? 'Edit Course Program' : 'Create New VLSI Course'}
                    </h3>

                    <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Course Title *</label>
                        <input
                          type="text"
                          required
                          value={editingCourse.title || ''}
                          onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Short Description</label>
                        <textarea
                          rows={2}
                          value={editingCourse.shortDescription || ''}
                          onChange={(e) => setEditingCourse({ ...editingCourse, shortDescription: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Category</label>
                          <select
                            value={editingCourse.category || 'RTL Design'}
                            onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value as any })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                          >
                            <option value="RTL Design">RTL Design</option>
                            <option value="Verification">Verification</option>
                            <option value="Protocols">Protocols</option>
                            <option value="Physical Design">Physical Design</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Tuition Fee (₹)</label>
                          <input
                            type="number"
                            value={editingCourse.fee || 45000}
                            onChange={(e) => setEditingCourse({ ...editingCourse, fee: Number(e.target.value) })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Trainer</label>
                          <input
                            type="text"
                            value={editingCourse.trainer || 'Bhavani Bhaskar'}
                            onChange={(e) => setEditingCourse({ ...editingCourse, trainer: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Duration</label>
                          <input
                            type="text"
                            value={editingCourse.duration || '16 Weeks'}
                            onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Mode</label>
                          <select
                            value={editingCourse.mode || 'Hybrid'}
                            onChange={(e) => setEditingCourse({ ...editingCourse, mode: e.target.value as any })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                          >
                            <option value="Hybrid">Hybrid</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                          </select>
                        </div>
                      </div>

                      {/* Popup & Feature Toggles */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <div className="text-[11px] font-mono text-cyan-400 uppercase font-bold">
                          Visibility &amp; Popup Configuration (Phase 5.2)
                        </div>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingCourse.popupEnabled || false}
                              onChange={(e) => setEditingCourse({ ...editingCourse, popupEnabled: e.target.checked })}
                              className="rounded text-cyan-500"
                            />
                            <span>Enable Opening Popup</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingCourse.featuredOnHome || false}
                              onChange={(e) => setEditingCourse({ ...editingCourse, featuredOnHome: e.target.checked })}
                              className="rounded text-cyan-500"
                            />
                            <span>Featured on Home</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingCourse.published ?? true}
                              onChange={(e) => setEditingCourse({ ...editingCourse, published: e.target.checked })}
                              className="rounded text-cyan-500"
                            />
                            <span>Published</span>
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-lg shadow-cyan-500/20"
                      >
                        Save Course to Database
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= 7. EVENTS & WORKSHOPS CMS (Phase 6) ================= */}
          {activeSection === 'events' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Events &amp; Workshops CMS</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Schedule tech webinars, manage attendees, and export attendee lists.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => downloadCSV('events')}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Attendees</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingEvent({
                        title: '',
                        description: '',
                        date: '2026-11-20',
                        time: '10:00 AM - 1:00 PM IST',
                        speaker: 'Bhavani Bhaskar',
                        mode: 'Online',
                        locationOrUrl: 'Google Meet',
                        published: true,
                        popupEnabled: false
                      });
                      setEventModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Event</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {ev.registeredCount} Registered
                        </span>
                        <span className="text-xs font-mono text-cyan-400">{ev.date}</span>
                      </div>

                      <h3 className="text-base font-bold text-white">{ev.title}</h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">{ev.description}</p>
                      <div className="text-xs text-slate-400 mt-2">Speaker: {ev.speaker} &bull; {ev.mode}</div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingEvent(ev);
                          setEventModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 text-xs font-semibold"
                      >
                        Edit Event
                      </button>

                      <button
                        onClick={() => downloadCSV('events')}
                        className="text-xs text-slate-400 hover:text-white underline font-medium"
                      >
                        Download Attendees CSV
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Event Editor Modal */}
              {eventModalOpen && editingEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
                  <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl">
                    <button
                      onClick={() => setEventModalOpen(false)}
                      className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <h3 className="text-lg font-bold text-white mb-4">Event Configuration</h3>

                    <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Event Title *</label>
                        <input
                          type="text"
                          required
                          value={editingEvent.title || ''}
                          onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Description</label>
                        <textarea
                          rows={2}
                          value={editingEvent.description || ''}
                          onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Date</label>
                          <input
                            type="date"
                            value={editingEvent.date || '2026-11-20'}
                            onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Speaker</label>
                          <input
                            type="text"
                            value={editingEvent.speaker || 'Bhavani Bhaskar'}
                            onChange={(e) => setEditingEvent({ ...editingEvent, speaker: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingEvent.popupEnabled || false}
                            onChange={(e) => setEditingEvent({ ...editingEvent, popupEnabled: e.target.checked })}
                            className="rounded text-cyan-500"
                          />
                          <span>Show in Opening Popup</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingEvent.published ?? true}
                            onChange={(e) => setEditingEvent({ ...editingEvent, published: e.target.checked })}
                            className="rounded text-cyan-500"
                          />
                          <span>Published</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-lg"
                      >
                        Save Event
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= 8. CLASS SCHEDULES CMS (Phase 6.4) ================= */}
          {activeSection === 'schedules' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Class Timetable CMS</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Create batch class slots and broadcast live Google Meet links to students.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingSchedule({
                      topic: '',
                      trainer: 'Bhavani Bhaskar',
                      date: '2026-10-24',
                      startTime: '10:00 AM',
                      endTime: '01:00 PM',
                      meetingLink: 'https://meet.google.com/dsv-rtl-live',
                      batch: 'Batch #28 (Weekend)'
                    });
                    setScheduleModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Class Slot</span>
                </button>
              </div>

              <div className="space-y-3">
                {schedules.map((sch) => (
                  <div
                    key={sch.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-cyan-300 border border-sky-800">
                          {sch.batch}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{sch.date} ({sch.startTime} - {sch.endTime})</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{sch.topic}</h4>
                      <div className="text-xs text-slate-400">Trainer: {sch.trainer} &bull; Link: {sch.meetingLink}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingSchedule(sch);
                          setScheduleModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 text-xs font-semibold"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => {
                          storageService.deleteSchedule(sch.id);
                          showToast('Deleted class slot', 'info');
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Schedule Modal */}
              {scheduleModalOpen && editingSchedule && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
                  <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl">
                    <button
                      onClick={() => setScheduleModalOpen(false)}
                      className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <h3 className="text-lg font-bold text-white mb-4">Add / Edit Class Slot</h3>

                    <form onSubmit={handleSaveSchedule} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Lecture Topic *</label>
                        <input
                          type="text"
                          required
                          value={editingSchedule.topic || ''}
                          onChange={(e) => setEditingSchedule({ ...editingSchedule, topic: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Batch</label>
                          <input
                            type="text"
                            value={editingSchedule.batch || 'Batch #28 (Weekend)'}
                            onChange={(e) => setEditingSchedule({ ...editingSchedule, batch: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Trainer</label>
                          <input
                            type="text"
                            value={editingSchedule.trainer || 'Bhavani Bhaskar'}
                            onChange={(e) => setEditingSchedule({ ...editingSchedule, trainer: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Date</label>
                          <input
                            type="date"
                            value={editingSchedule.date || '2026-10-24'}
                            onChange={(e) => setEditingSchedule({ ...editingSchedule, date: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Start Time</label>
                          <input
                            type="text"
                            value={editingSchedule.startTime || '10:00 AM'}
                            onChange={(e) => setEditingSchedule({ ...editingSchedule, startTime: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">End Time</label>
                          <input
                            type="text"
                            value={editingSchedule.endTime || '01:00 PM'}
                            onChange={(e) => setEditingSchedule({ ...editingSchedule, endTime: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Meeting URL</label>
                        <input
                          type="url"
                          value={editingSchedule.meetingLink || 'https://meet.google.com/dsv-rtl-live'}
                          onChange={(e) => setEditingSchedule({ ...editingSchedule, meetingLink: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-lg"
                      >
                        Publish Slot to Student Dashboard
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= 9. PAYMENTS & FINANCIALS (Phase 7) ================= */}
          {activeSection === 'payments' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Payments &amp; Revenue Operations</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Record installment receipts, calculate balances, and review collections.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => downloadCSV('payments')}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setPaymentModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 transition flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Record Payment</span>
                  </button>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <div className="text-xs font-mono text-slate-400 uppercase">Total Revenue Collected</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    ₹{payments.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{payments.length} Verified Receipts</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <div className="text-xs font-mono text-slate-400 uppercase">Outstanding Dues</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">
                    ₹{paymentRecords.reduce((acc, curr) => acc + curr.pendingAmount, 0).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Upcoming Installments</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <div className="text-xs font-mono text-slate-400 uppercase">Enrolled Accounts</div>
                  <div className="text-2xl font-black text-white mt-1">{students.length}</div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-0.5">Active Learners</div>
                </div>
              </div>

              {/* Transactions Log Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Receipt #</th>
                      <th className="p-3.5">Student</th>
                      <th className="p-3.5">Course Program</th>
                      <th className="p-3.5">Amount Paid</th>
                      <th className="p-3.5">Method</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Reference ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {payments.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-850">
                        <td className="p-3.5 font-mono text-cyan-400 font-bold">{tx.receiptNumber}</td>
                        <td className="p-3.5 font-bold text-white">{tx.studentName}</td>
                        <td className="p-3.5 text-slate-300 truncate max-w-[200px]">{tx.courseTitle}</td>
                        <td className="p-3.5 font-bold text-emerald-400">₹{tx.amount.toLocaleString('en-IN')}</td>
                        <td className="p-3.5 text-slate-300">{tx.paymentMethod}</td>
                        <td className="p-3.5 text-slate-400">{tx.paymentDate}</td>
                        <td className="p-3.5 font-mono text-slate-500">{tx.referenceId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Record Payment Modal (Phase 7.1) */}
              {paymentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
                  <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl">
                    <button
                      onClick={() => setPaymentModalOpen(false)}
                      className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <h3 className="text-lg font-bold text-white mb-4">Record Student Payment</h3>

                    <form onSubmit={handleRecordPaymentSubmit} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Select Student *</label>
                        <select
                          value={payStudentId}
                          onChange={(e) => setPayStudentId(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                        >
                          {students.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} ({s.email})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Course Program *</label>
                        <select
                          value={payCourseId}
                          onChange={(e) => setPayCourseId(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                        >
                          {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title} (Fee: ₹{c.fee.toLocaleString('en-IN')})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Amount Paid (₹) *</label>
                          <input
                            type="number"
                            required
                            value={payAmount}
                            onChange={(e) => setPayAmount(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 mb-1 font-semibold">Payment Method *</label>
                          <select
                            value={payMethod}
                            onChange={(e) => setPayMethod(e.target.value as any)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                          >
                            <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
                            <option value="Net Banking">Net Banking</option>
                            <option value="Bank Transfer">Bank Transfer / NEFT</option>
                            <option value="Credit/Debit Card">Credit/Debit Card</option>
                            <option value="Cash">Cash at Center</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Reference / UTR ID *</label>
                        <input
                          type="text"
                          required
                          value={payRefId}
                          onChange={(e) => setPayRefId(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Internal Notes</label>
                        <input
                          type="text"
                          value={payNotes}
                          onChange={(e) => setPayNotes(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-lg"
                      >
                        Generate Receipt &amp; Auto-Update Balance
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= 10. REPORTS & CSV EXPORT (Phase 7.5) ================= */}
          {activeSection === 'reports' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-white">Institute Reports &amp; Analytics</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  1-Click CSV exports for academic audits, admissions tracking, and accounting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Students Master Directory',
                    desc: 'Full directory of all active and graduated students with contact details.',
                    count: `${students.length} Records`,
                    type: 'students' as const,
                  },
                  {
                    title: 'Course Admission Requests',
                    desc: 'All course requests with statuses, passout years, and assigned staff.',
                    count: `${applications.length} Records`,
                    type: 'applications' as const,
                  },
                  {
                    title: 'Revenue & Receipts Log',
                    desc: 'Accounting log of all received tuition payments with transaction IDs.',
                    count: `${payments.length} Transactions`,
                    type: 'payments' as const,
                  },
                  {
                    title: 'Website Chatbot Leads',
                    desc: 'Visitor leads with passout years, experience levels, and phone numbers.',
                    count: `${chatLeads.length} Leads`,
                    type: 'leads' as const,
                  },
                  {
                    title: 'Workshop & Webinar Attendees',
                    desc: 'Event registrations with attendee college/company names and contact info.',
                    count: `${eventRegs.length} Registrations`,
                    type: 'events' as const,
                  },
                ].map((rep) => (
                  <div
                    key={rep.title}
                    className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                        <span className="text-xs font-mono text-cyan-400 font-bold">{rep.count}</span>
                      </div>
                      <h3 className="text-base font-bold text-white">{rep.title}</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{rep.desc}</p>
                    </div>

                    <button
                      onClick={() => downloadCSV(rep.type)}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-cyan-300 font-bold text-xs border border-cyan-500/30 transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download CSV</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 11. ANNOUNCEMENTS CMS (Phase 6.5) ================= */}
          {activeSection === 'announcements' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Institute Announcements CMS</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Publish bulletins displayed across the public portal and student dashboards.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingAnnouncement({
                      title: '',
                      content: '',
                      targetAudience: 'All',
                      priority: 'High',
                      active: true
                    });
                    setAnnouncementModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Announcement</span>
                </button>
              </div>

              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-cyan-300 border border-sky-800">
                          {ann.targetAudience}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{ann.publishedDate}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">{ann.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{ann.content}</p>
                    </div>

                    <button
                      onClick={() => {
                        storageService.deleteAnnouncement(ann.id);
                        showToast('Removed announcement', 'info');
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Announcement Modal */}
              {announcementModalOpen && editingAnnouncement && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
                  <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl">
                    <button
                      onClick={() => setAnnouncementModalOpen(false)}
                      className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <h3 className="text-lg font-bold text-white mb-4">Post Announcement</h3>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!editingAnnouncement.title) return;
                        storageService.saveAnnouncement({
                          id: `ann-${Date.now()}`,
                          title: editingAnnouncement.title,
                          content: editingAnnouncement.content || '',
                          targetAudience: editingAnnouncement.targetAudience || 'All',
                          publishedDate: new Date().toISOString().split('T')[0],
                          priority: editingAnnouncement.priority || 'High',
                          active: true
                        });
                        showToast('Announcement published successfully!', 'success');
                        setAnnouncementModalOpen(false);
                      }}
                      className="space-y-4 text-xs"
                    >
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Title *</label>
                        <input
                          type="text"
                          required
                          value={editingAnnouncement.title || ''}
                          onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Content</label>
                        <textarea
                          rows={3}
                          value={editingAnnouncement.content || ''}
                          onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Target Audience</label>
                        <select
                          value={editingAnnouncement.targetAudience || 'All'}
                          onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, targetAudience: e.target.value as any })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                        >
                          <option value="All">All Visitors &amp; Students</option>
                          <option value="Students">Enrolled Students Only</option>
                          <option value="Public">Public Only</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-lg"
                      >
                        Publish Announcement
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
