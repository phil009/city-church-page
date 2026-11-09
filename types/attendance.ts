export type AttendanceType = "physical" | "online";

export type ServiceStatus = "active" | "inactive" | "completed";

export interface ChurchService {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm (e.g. "09:00")
  closingTime: string; // HH:mm (e.g. "12:00")
  verificationCode: string; // 4 or 5 digits, e.g. "7429"
  status: ServiceStatus;
  description?: string;
  venue?: string;
  createdAt: string;
}

export interface ChurchMember {
  id: string; // Internal Member ID, e.g. "CC-MBR-0042"
  fullName: string;
  email: string; // Primary lookup identifier
  phone?: string;
  firstJoinedDate: string;
  lastAttendedDate?: string;
  totalAttendancesYear: number;
  tags?: string[];
}

export interface AttendanceRecord {
  id: string;
  serviceId: string;
  serviceTitle: string;
  serviceDate: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  attendanceType: AttendanceType;
  verificationCodeUsed: string;
  checkInTime: string; // ISO string
  deviceInfo?: string;
}

export interface AbsenteeRecord {
  memberId: string;
  fullName: string;
  email: string;
  phone?: string;
  lastAttendedDate?: string;
  lastAttendedServiceTitle?: string;
  consecutiveAbsences: number;
  followUpStatus: "none" | "pending_review" | "approved" | "sent";
  lastFollowUpDate?: string;
}

export type FollowUpStatus = "pending_review" | "approved" | "sent";

export interface FollowUpRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  serviceId: string;
  serviceTitle: string;
  templateId: string;
  subject: string;
  messageContent: string;
  status: FollowUpStatus;
  createdAt: string;
  approvedAt?: string;
  sentAt?: string;
  adminNotes?: string;
}

export interface FollowUpTemplate {
  id: string;
  title: string;
  subject: string;
  body: string;
  triggerCondition: string;
}

export interface AttendanceStats {
  totalAttendance: number;
  physicalCount: number;
  onlineCount: number;
  serviceCount: number;
  activeService: ChurchService | null;
  recentAttendance: AttendanceRecord[];
}

