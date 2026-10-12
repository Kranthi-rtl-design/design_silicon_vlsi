import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { storageService } from '../services/storage';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isSuperAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  registerStudent: (formData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    education: string;
    yearOfPassout: string;
    experienceLevel: 'Fresher' | '1-2 Years' | '3+ Years';
    city: string;
    preferredCourseId?: string;
  }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = 'ds_vlsi_current_user_v5';
const STUDENT_PASS_KEY = 'ds_vlsi_student_passes';

/** Helper: read {email→password} map from localStorage */
function getStudentPassMap(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STUDENT_PASS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStudentPass(email: string, password: string) {
  const map = getStudentPassMap();
  map[email.trim().toLowerCase()] = password;
  localStorage.setItem(STUDENT_PASS_KEY, JSON.stringify(map));
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_USER_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, []);

  /**
   * Unified login:
   *  1. Check if email is one of the 4 admin accounts → verify password via storageService
   *  2. Otherwise treat as student → must be registered AND password must match
   */
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    // ── ADMIN CHECK ──────────────────────────────────────────────────────────
    const authenticatedAdmin = storageService.authenticateAdmin(cleanEmail, password);
    if (authenticatedAdmin) {
      const adminUser: User = {
        id: authenticatedAdmin.id,
        name: authenticatedAdmin.name,
        email: authenticatedAdmin.email,
        role: 'admin',
        isSuperAdmin: authenticatedAdmin.isSuperAdmin,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      };
      setUser(adminUser);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(adminUser));
      return { success: true };
    }

    // Check if email is an ADMIN email but wrong password
    const adminAccounts = storageService.getAdminAccounts();
    const isAdminEmail = adminAccounts.some(a => a.email.toLowerCase() === cleanEmail);
    if (isAdminEmail) {
      return {
        success: false,
        message: 'Incorrect password for this admin account.'
      };
    }

    // ── STUDENT CHECK ─────────────────────────────────────────────────────────
    const students = storageService.getStudents();
    const matched = students.find((s) => s.email.toLowerCase() === cleanEmail);

    if (!matched) {
      return {
        success: false,
        message: 'No account found with this email. Please register first or check your email.'
      };
    }

    // Check if student access has been blocked by institute administrator
    if (matched.status === 'Blocked') {
      return {
        success: false,
        message: 'Your account access has been blocked by the Institute Administrator. Please contact admissions@dsv.com.'
      };
    }

    // Verify password against stored student password map
    const passMap = getStudentPassMap();
    const storedPass = passMap[cleanEmail];

    if (!storedPass) {
      return {
        success: false,
        message: 'Your account was created before the password system. Please re-register or contact admissions.'
      };
    }

    if (storedPass !== password) {
      return {
        success: false,
        message: 'Incorrect password. Please try again.'
      };
    }

    const studentUser: User = {
      id: matched.userId,
      name: matched.name,
      email: matched.email,
      role: 'student',
      phone: matched.phone,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };

    setUser(studentUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(studentUser));
    return { success: true };
  };

  const registerStudent = async (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    education: string;
    yearOfPassout: string;
    experienceLevel: 'Fresher' | '1-2 Years' | '3+ Years';
    city: string;
    preferredCourseId?: string;
  }): Promise<boolean> => {
    const cleanEmail = data.email.trim().toLowerCase();

    // Block admin emails from registering as students
    const adminAccounts = storageService.getAdminAccounts();
    if (adminAccounts.some(a => a.email.toLowerCase() === cleanEmail)) {
      return false;
    }

    // Check if already registered
    const existing = storageService.getStudents().find(s => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      return false; // duplicate
    }

    const studentId = `std-${Date.now()}`;
    const userId = `user-${Date.now()}`;

    storageService.saveStudent({
      id: studentId,
      userId,
      name: data.fullName,
      email: cleanEmail,
      phone: data.phone,
      education: data.education,
      yearOfPassout: data.yearOfPassout,
      experienceLevel: data.experienceLevel,
      city: data.city,
      batchId: 'Upcoming Batch',
      enrolledCourseIds: data.preferredCourseId ? [data.preferredCourseId] : [],
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    });

    // Save password for future logins
    saveStudentPass(cleanEmail, data.password);

    const courseId = data.preferredCourseId || '';
    if (courseId) {
      const enrollments = storageService.getEnrollments();
      enrollments.unshift({
        id: `enr-${Date.now()}`,
        studentId,
        courseId,
        enrolledAt: new Date().toISOString().split('T')[0],
        progressPercent: 0,
        completedLessonIds: [],
        status: 'Active',
        certificateIssued: false
      });
      localStorage.setItem('ds_vlsi_enrollments', JSON.stringify(enrollments));
    }

    const studentUser: User = {
      id: userId,
      name: data.fullName,
      email: cleanEmail,
      role: 'student',
      phone: data.phone
    };

    setUser(studentUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(studentUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const role: UserRole = user ? user.role : 'guest';
  const isSuperAdmin: boolean = !!(user && user.isSuperAdmin);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isSuperAdmin,
        isAuthenticated: !!user,
        login,
        registerStudent,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
