// User types
export type UserRole = "CULINARY" | "HOSPITALITY" | "TOGO_BAR" | "GM";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Metric types
export interface Metric {
  id: string;
  userId: string;
  date: Date;
  role: UserRole;

  // Culinary metrics
  foodGreat72?: number;
  safeScore?: number;
  specSold100?: number;
  tmsAbove72?: number;
  pullThaw?: number;

  // Hospitality metrics
  dineInGwap?: number;
  serverAttentive?: number;
  clean?: number;
  incrementalAddOns?: number;
  runnerGap?: number;

  // To-Go/Bar metrics
  togoGwap?: number;
  missingItems?: number;
  barIncremental?: number;
  mcrSignUps?: number;

  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Task types
export type TaskFrequency = "DAILY" | "WEEKLY" | "MON_WED" | "EOP" | "MONTHLY" | "QUARTERLY" | "YEARLY" | "CUSTOM";

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  role: UserRole;
  frequency: TaskFrequency;
  dueDate?: Date;
  completedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Team member types
export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  position: string;
  hireDate?: Date;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Coaching note types
export interface CoachingNote {
  id: string;
  userId: string;
  teamMemberId: string;
  date: Date;
  topic: string;
  notes: string;
  followUpDate?: Date;
  actionItems?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Training types
export type TrainingStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface Training {
  id: string;
  teamMemberId: string;
  trainingType: string;
  status: TrainingStatus;
  completionDate?: Date;
  expirationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Schedule posting types
export interface SchedulePosting {
  id: string;
  userId: string;
  role: UserRole;
  dueDate: Date;
  postedAt?: Date;
  isLate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Big swing types
export interface BigSwing {
  id: string;
  userId: string;
  quarter: string;
  initiative: string;
  subTasks: string[];
  completedTasks: number;
  totalTasks: number;
  progress: number;
  notes?: string;
  photoUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}
