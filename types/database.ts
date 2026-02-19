// User roles
export enum UserRole {
  ADMIN = 'admin',
  INSTRUCTOR = 'instructor',
  STUDENT = 'student',
}

// Project status
export enum ProjectStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

// Evaluation status
export enum EvaluationStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

// User database model
export interface User {
  id: string;
  matricule: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  isFirstLogin: boolean;
  lastLoginAt: Date | null;
}

// Student profile
export interface StudentProfile {
  id: string;
  userId: string;
  batch: string;
  specialization?: string;
  profileImage?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Instructor profile
export interface InstructorProfile {
  id: string;
  userId: string;
  department: string;
  expertise?: string;
  profileImage?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Project
export interface Project {
  id: string;
  title: string;
  description: string;
  batchId: string;
  instructorId: string;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
  requirements?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Student project submission
export interface StudentProject {
  id: string;
  projectId: string;
  studentId: string;
  status: ProjectStatus;
  submissionUrl?: string;
  submissionDate?: Date;
  documentUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Project evaluation
export interface ProjectEvaluation {
  id: string;
  studentProjectId: string;
  evaluatorId: string;
  criterionId: string;
  score: number;
  feedback?: string;
  evaluatedAt: Date;
  createdAt: Date;
}

// Evaluation criterion
export interface EvaluationCriterion {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  maxScore: number;
  weight: number;
  createdAt: Date;
}

// Analytics/Dashboard data
export interface StudentDashboardStats {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  averageScore: number;
  recentProjects: StudentProject[];
}

export interface InstructorDashboardStats {
  totalStudents: number;
  totalProjects: number;
  activeEvaluations: number;
  batchSummary: Array<{
    batch: string;
    studentCount: number;
    projectCount: number;
  }>;
}
