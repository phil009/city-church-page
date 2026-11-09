import fs from "fs";
import path from "path";
import {
  ChurchService,
  ChurchMember,
  AttendanceRecord,
  AbsenteeRecord,
  FollowUpRecord,
  FollowUpStatus,
  FollowUpTemplate,
  AttendanceType,
  AttendanceStats,
} from "@/types/attendance";

interface DatabaseSchema {
  services: ChurchService[];
  members: ChurchMember[];
  attendance: AttendanceRecord[];
  followUps: FollowUpRecord[];
  templates: FollowUpTemplate[];
}

const DB_FILE_PATH = path.join(process.cwd(), "data", "attendance-db.json");

// Default initial pastoral templates
const DEFAULT_TEMPLATES: FollowUpTemplate[] = [
  {
    id: "tpl-missed-1",
    title: "1 Sunday Absence (Warm Check-in)",
    subject: "We missed you at City Church this Sunday!",
    body: "Dear {{name}},\n\nWe noticed you weren't with us at City Church for our Sunday service. We simply wanted to reach out, let you know we missed your presence, and check how your week is going.\n\nIf there's any way we can pray for you or support you, please don't hesitate to reply directly to this message.\n\nWe look forward to seeing you soon!\n\nWarmly,\nPastor Tony & the City Church Pastoral Team",
    triggerCondition: "Missed 1 Sunday Service",
  },
  {
    id: "tpl-missed-2",
    title: "2 Consecutive Absences (Caring Inquiry)",
    subject: "Thinking of you - From City Church Calabar",
    body: "Dear {{name}},\n\nIt's been a couple of weeks since we last saw you in fellowship. The City Church family holds you close in prayer, and we wanted to make sure everything is okay with you and your loved ones.\n\nPlease let us know how you are doing, or if our pastoral care team can stand with you in faith.\n\nWith love and blessings,\nCity Church Care Team",
    triggerCondition: "Missed 2 Consecutive Services",
  },
  {
    id: "tpl-missed-3",
    title: "Extended Absence (Personal Pastoral Outreach)",
    subject: "A personal note from Pastor Tony Aleogena Raphael",
    body: "Dear {{name}},\n\nGrace and peace to you in Jesus' name. You are a valued part of our spiritual family at City Church Calabar, and your presence is deeply cherished.\n\nI wanted to personally check in on you. Whatever season you may be navigating, remember that God's grace is more than sufficient, and our church family is always here for you.\n\nGod bless you abundantly,\nPastor Tony Aleogena Raphael\nLead Pastor, City Church Calabar",
    triggerCondition: "Missed 3 or more Consecutive Services",
  },
];

// Initial seed members to populate the dashboard immediately
const INITIAL_MEMBERS: ChurchMember[] = [
  {
    id: "CC-MBR-0001",
    fullName: "Emmanuel Bassey",
    email: "emmanuel.bassey@example.com",
    phone: "+234 803 111 2233",
    firstJoinedDate: "2024-01-14",
    lastAttendedDate: "2026-11-08",
    totalAttendancesYear: 38,
    tags: ["Worker", "Choir"],
  },
  {
    id: "CC-MBR-0002",
    fullName: "Grace Okon",
    email: "grace.okon@example.com",
    phone: "+234 802 334 4556",
    firstJoinedDate: "2024-02-10",
    lastAttendedDate: "2026-11-08",
    totalAttendancesYear: 41,
    tags: ["Ushering", "Small Group Leader"],
  },
  {
    id: "CC-MBR-0003",
    fullName: "David Udoh",
    email: "david.udoh@example.com",
    phone: "+234 810 556 6778",
    firstJoinedDate: "2024-04-21",
    lastAttendedDate: "2026-11-01",
    totalAttendancesYear: 29,
    tags: ["Media Team"],
  },
  {
    id: "CC-MBR-0004",
    fullName: "Blessing Effiong",
    email: "blessing.effiong@example.com",
    phone: "+234 703 889 9001",
    firstJoinedDate: "2024-06-05",
    lastAttendedDate: "2026-10-25",
    totalAttendancesYear: 22,
    tags: ["Member"],
  },
  {
    id: "CC-MBR-0005",
    fullName: "Victor Henshaw",
    email: "victor.henshaw@example.com",
    phone: "+234 808 223 3445",
    firstJoinedDate: "2024-03-17",
    lastAttendedDate: "2026-10-18",
    totalAttendancesYear: 18,
    tags: ["Member"],
  },
  {
    id: "CC-MBR-0006",
    fullName: "Sarah Archibong",
    email: "sarah.archibong@example.com",
    phone: "+234 812 445 5667",
    firstJoinedDate: "2024-07-28",
    lastAttendedDate: "2026-11-08",
    totalAttendancesYear: 35,
    tags: ["Children Ministry"],
  },
  {
    id: "CC-MBR-0007",
    fullName: "Kufre Asuquo",
    email: "kufre.asuquo@example.com",
    phone: "+234 809 667 7889",
    firstJoinedDate: "2024-05-12",
    lastAttendedDate: "2026-10-11",
    totalAttendancesYear: 14,
    tags: ["Member"],
  },
  {
    id: "CC-MBR-0008",
    fullName: "Mercy Edet",
    email: "mercy.edet@example.com",
    phone: "+234 816 778 8990",
    firstJoinedDate: "2024-08-04",
    lastAttendedDate: "2026-11-08",
    totalAttendancesYear: 32,
    tags: ["Hospitality"],
  },
  {
    id: "CC-MBR-0009",
    fullName: "Daniel Ekanem",
    email: "daniel.ekanem@example.com",
    phone: "+234 708 990 0112",
    firstJoinedDate: "2024-09-15",
    lastAttendedDate: "2026-11-08",
    totalAttendancesYear: 28,
    tags: ["Member"],
  },
  {
    id: "CC-MBR-0010",
    fullName: "Ruth Duke",
    email: "ruth.duke@example.com",
    phone: "+234 813 123 4567",
    firstJoinedDate: "2024-10-06",
    lastAttendedDate: "2026-10-25",
    totalAttendancesYear: 19,
    tags: ["Prayer Band"],
  },
];

// Initial services
const INITIAL_SERVICES: ChurchService[] = [
  {
    id: "svc-2026-11-08-1",
    title: "Sunday 1st Service - Covenant Day of Praise",
    date: "2026-11-08",
    startTime: "09:00",
    closingTime: "12:30",
    verificationCode: "7429",
    status: "active",
    venue: "The Big Tent, 98 Marian Road, Calabar",
    description: "In-person and livestream worship encounter with Lead Pastor Tony Aleogena Raphael.",
    createdAt: "2026-11-08T07:00:00.000Z",
  },
  {
    id: "svc-2026-11-01-1",
    title: "Sunday Worship Encounter - Supernatural Breakthrough",
    date: "2026-11-01",
    startTime: "09:00",
    closingTime: "11:30",
    verificationCode: "5831",
    status: "completed",
    venue: "The Big Tent, 98 Marian Road, Calabar",
    createdAt: "2026-11-01T07:00:00.000Z",
  },
  {
    id: "svc-2026-10-25-1",
    title: "Sunday Celebration - Walking in Divine Wisdom",
    date: "2026-10-25",
    startTime: "09:00",
    closingTime: "11:30",
    verificationCode: "3920",
    status: "completed",
    venue: "The Big Tent, 98 Marian Road, Calabar",
    createdAt: "2026-10-25T07:00:00.000Z",
  },
  {
    id: "svc-2026-10-18-1",
    title: "Sunday Service - Kingdom Advancement & Purpose",
    date: "2026-10-18",
    startTime: "09:00",
    closingTime: "11:30",
    verificationCode: "9142",
    status: "completed",
    venue: "The Big Tent, 98 Marian Road, Calabar",
    createdAt: "2026-10-18T07:00:00.000Z",
  },
];

// Initial attendance records for past services
const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "att-001",
    serviceId: "svc-2026-11-08-1",
    serviceTitle: "Sunday 1st Service - Covenant Day of Praise",
    serviceDate: "2026-11-08",
    memberId: "CC-MBR-0001",
    memberName: "Emmanuel Bassey",
    memberEmail: "emmanuel.bassey@example.com",
    attendanceType: "physical",
    verificationCodeUsed: "7429",
    checkInTime: "2026-11-08T09:12:30.000Z",
  },
  {
    id: "att-002",
    serviceId: "svc-2026-11-08-1",
    serviceTitle: "Sunday 1st Service - Covenant Day of Praise",
    serviceDate: "2026-11-08",
    memberId: "CC-MBR-0002",
    memberName: "Grace Okon",
    memberEmail: "grace.okon@example.com",
    attendanceType: "physical",
    verificationCodeUsed: "7429",
    checkInTime: "2026-11-08T09:18:15.000Z",
  },
  {
    id: "att-003",
    serviceId: "svc-2026-11-08-1",
    serviceTitle: "Sunday 1st Service - Covenant Day of Praise",
    serviceDate: "2026-11-08",
    memberId: "CC-MBR-0006",
    memberName: "Sarah Archibong",
    memberEmail: "sarah.archibong@example.com",
    attendanceType: "online",
    verificationCodeUsed: "7429",
    checkInTime: "2026-11-08T09:25:40.000Z",
  },
  {
    id: "att-004",
    serviceId: "svc-2026-11-08-1",
    serviceTitle: "Sunday 1st Service - Covenant Day of Praise",
    serviceDate: "2026-11-08",
    memberId: "CC-MBR-0008",
    memberName: "Mercy Edet",
    memberEmail: "mercy.edet@example.com",
    attendanceType: "physical",
    verificationCodeUsed: "7429",
    checkInTime: "2026-11-08T09:31:10.000Z",
  },
  {
    id: "att-005",
    serviceId: "svc-2026-11-08-1",
    serviceTitle: "Sunday 1st Service - Covenant Day of Praise",
    serviceDate: "2026-11-08",
    memberId: "CC-MBR-0009",
    memberName: "Daniel Ekanem",
    memberEmail: "daniel.ekanem@example.com",
    attendanceType: "online",
    verificationCodeUsed: "7429",
    checkInTime: "2026-11-08T09:44:02.000Z",
  },
];

// In-memory cache to ensure speed and reliability across serverless invocations
let memoryCache: DatabaseSchema | null = null;

function ensureDataDirectory(): void {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      // directory creation silently handled
    }
  }
}

function loadDatabase(): DatabaseSchema {
  if (memoryCache) {
    return memoryCache;
  }

  ensureDataDirectory();

  if (fs.existsSync(DB_FILE_PATH)) {
    try {
      const raw = fs.readFileSync(DB_FILE_PATH, "utf-8");
      memoryCache = JSON.parse(raw) as DatabaseSchema;
      return memoryCache;
    } catch {
      // Fallback if parsing fails
    }
  }

  // Seed default data
  const initialData: DatabaseSchema = {
    services: INITIAL_SERVICES,
    members: INITIAL_MEMBERS,
    attendance: INITIAL_ATTENDANCE,
    followUps: [],
    templates: DEFAULT_TEMPLATES,
  };

  memoryCache = initialData;
  saveDatabase(initialData);
  return memoryCache;
}

function saveDatabase(data: DatabaseSchema): void {
  memoryCache = data;
  try {
    ensureDataDirectory();
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Notice: Persistent DB write failed, running in memory:", err);
  }
}

// Public API Store Methods
export const AttendanceStore = {
  // SERVICES
  getAllServices(): ChurchService[] {
    const db = loadDatabase();
    return [...db.services].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getServiceById(id: string): ChurchService | undefined {
    const db = loadDatabase();
    return db.services.find((s) => s.id === id);
  },

  getActiveService(): ChurchService | undefined {
    const db = loadDatabase();
    return db.services.find((s) => s.status === "active");
  },

  createService(payload: Omit<ChurchService, "id" | "createdAt">): ChurchService {
    const db = loadDatabase();
    const id = `svc-${payload.date}-${Date.now().toString(36)}`;
    const newService: ChurchService = {
      ...payload,
      id,
      createdAt: new Date().toISOString(),
    };

    // If new service is active, deactivate others
    if (newService.status === "active") {
      db.services = db.services.map((s) => (s.status === "active" ? { ...s, status: "completed" } : s));
    }

    db.services.unshift(newService);
    saveDatabase(db);
    return newService;
  },

  updateService(id: string, updates: Partial<ChurchService>): ChurchService | null {
    const db = loadDatabase();
    const index = db.services.findIndex((s) => s.id === id);
    if (index === -1) return null;

    if (updates.status === "active") {
      db.services = db.services.map((s) => (s.id !== id && s.status === "active" ? { ...s, status: "completed" } : s));
    }

    db.services[index] = { ...db.services[index], ...updates };
    saveDatabase(db);
    return db.services[index];
  },

  deleteService(id: string): boolean {
    const db = loadDatabase();
    const prevLength = db.services.length;
    db.services = db.services.filter((s) => s.id !== id);
    if (db.services.length !== prevLength) {
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // MEMBERS
  getAllMembers(): ChurchMember[] {
    const db = loadDatabase();
    return [...db.members].sort((a, b) => a.fullName.localeCompare(b.fullName));
  },

  getMemberByEmail(email: string): ChurchMember | undefined {
    const db = loadDatabase();
    return db.members.find((m) => m.email.toLowerCase().trim() === email.toLowerCase().trim());
  },

  getOrCreateMember(fullName: string, email: string, phone?: string): ChurchMember {
    const db = loadDatabase();
    const normalizedEmail = email.toLowerCase().trim();
    let member = db.members.find((m) => m.email.toLowerCase().trim() === normalizedEmail);

    if (member) {
      // Update phone or name if provided
      if (fullName && fullName.trim() !== member.fullName) {
        member.fullName = fullName.trim();
      }
      if (phone && phone.trim()) {
        member.phone = phone.trim();
      }
      saveDatabase(db);
      return member;
    }

    // Generate unique internal member ID
    const count = db.members.length + 1;
    const memberId = `CC-MBR-${String(count).padStart(4, "0")}`;
    member = {
      id: memberId,
      fullName: fullName.trim(),
      email: normalizedEmail,
      phone: phone?.trim(),
      firstJoinedDate: new Date().toISOString().split("T")[0],
      totalAttendancesYear: 0,
      tags: ["Member"],
    };

    db.members.push(member);
    saveDatabase(db);
    return member;
  },

  // ATTENDANCE CHECK-IN
  hasMemberCheckedIn(memberId: string, serviceId: string): boolean {
    const db = loadDatabase();
    return db.attendance.some((a) => a.memberId === memberId && a.serviceId === serviceId);
  },

  recordAttendance(params: {
    serviceId: string;
    fullName: string;
    email: string;
    phone?: string;
    attendanceType: AttendanceType;
    verificationCode: string;
  }): { success: boolean; message: string; record?: AttendanceRecord; member?: ChurchMember } {
    const db = loadDatabase();
    const service = db.services.find((s) => s.id === params.serviceId);

    if (!service) {
      return { success: false, message: "Selected service was not found." };
    }

    if (service.status !== "active") {
      return {
        success: false,
        message: "Attendance registration for this service is currently closed or inactive.",
      };
    }

    // Verify code
    if (service.verificationCode.trim() !== params.verificationCode.trim()) {
      return {
        success: false,
        message: "Invalid verification code. Please check the 4- or 5-digit code displayed for this service.",
      };
    }

    // Member identification / registration
    const member = this.getOrCreateMember(params.fullName, params.email, params.phone);

    // Prevent duplicate check-in
    if (this.hasMemberCheckedIn(member.id, service.id)) {
      return {
        success: false,
        message: `You have already registered attendance for this service today (${member.fullName}).`,
      };
    }

    // Record check-in
    const newRecord: AttendanceRecord = {
      id: `att-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      serviceId: service.id,
      serviceTitle: service.title,
      serviceDate: service.date,
      memberId: member.id,
      memberName: member.fullName,
      memberEmail: member.email,
      attendanceType: params.attendanceType,
      verificationCodeUsed: params.verificationCode,
      checkInTime: new Date().toISOString(),
    };

    db.attendance.unshift(newRecord);

    // Update member's stats
    member.lastAttendedDate = service.date;
    member.totalAttendancesYear = (member.totalAttendancesYear || 0) + 1;

    saveDatabase(db);
    return { success: true, message: "Attendance successfully registered!", record: newRecord, member };
  },

  getAttendanceRecords(serviceId?: string): AttendanceRecord[] {
    const db = loadDatabase();
    if (serviceId) {
      return db.attendance.filter((a) => a.serviceId === serviceId);
    }
    return db.attendance;
  },

  // ABSENTEE MONITORING
  getAbsenteesForService(serviceId: string): AbsenteeRecord[] {
    const db = loadDatabase();
    const targetService = db.services.find((s) => s.id === serviceId);
    if (!targetService) return [];

    // Attendees for this service
    const attendeeMemberIds = new Set(
      db.attendance.filter((a) => a.serviceId === serviceId).map((a) => a.memberId)
    );

    // Sort past services by date descending up to this service
    const pastServices = db.services
      .filter((s) => new Date(s.date) <= new Date(targetService.date))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const absentees: AbsenteeRecord[] = [];

    for (const member of db.members) {
      if (!attendeeMemberIds.has(member.id)) {
        // Calculate consecutive absences
        let consecutive = 0;
        for (const svc of pastServices) {
          const attended = db.attendance.some((a) => a.memberId === member.id && a.serviceId === svc.id);
          if (!attended) {
            consecutive++;
          } else {
            break;
          }
        }

        // Find last attended service title
        const lastRecord = db.attendance
          .filter((a) => a.memberId === member.id)
          .sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime())[0];

        // Check if follow-up exists for this absence
        const existingFollowUp = db.followUps.find(
          (f) => f.memberId === member.id && f.serviceId === serviceId
        );

        absentees.push({
          memberId: member.id,
          fullName: member.fullName,
          email: member.email,
          phone: member.phone,
          lastAttendedDate: member.lastAttendedDate,
          lastAttendedServiceTitle: lastRecord ? lastRecord.serviceTitle : undefined,
          consecutiveAbsences: Math.max(consecutive, 1),
          followUpStatus: existingFollowUp ? existingFollowUp.status : "none",
          lastFollowUpDate: existingFollowUp ? existingFollowUp.sentAt || existingFollowUp.createdAt : undefined,
        });
      }
    }

    // Sort by most consecutive absences first
    return absentees.sort((a, b) => b.consecutiveAbsences - a.consecutiveAbsences);
  },

  // FOLLOW-UPS
  getFollowUps(): FollowUpRecord[] {
    const db = loadDatabase();
    return db.followUps;
  },

  createFollowUp(params: {
    memberId: string;
    serviceId: string;
    templateId: string;
    subject: string;
    messageContent: string;
  }): FollowUpRecord | { error: string } {
    const db = loadDatabase();
    const member = db.members.find((m) => m.id === params.memberId);
    const service = db.services.find((s) => s.id === params.serviceId);

    if (!member || !service) {
      return { error: "Invalid member or service." };
    }

    // Avoid duplicate follow-up for the same absence
    const existing = db.followUps.find((f) => f.memberId === params.memberId && f.serviceId === params.serviceId);
    if (existing) {
      return { error: `Follow-up already created for ${member.fullName} for this service.` };
    }

    const record: FollowUpRecord = {
      id: `flw-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      memberId: member.id,
      memberName: member.fullName,
      memberEmail: member.email,
      serviceId: service.id,
      serviceTitle: service.title,
      templateId: params.templateId,
      subject: params.subject,
      messageContent: params.messageContent,
      status: "pending_review",
      createdAt: new Date().toISOString(),
    };

    db.followUps.unshift(record);
    saveDatabase(db);
    return record;
  },

  updateFollowUpStatus(id: string, status: FollowUpStatus): FollowUpRecord | null {
    const db = loadDatabase();
    const item = db.followUps.find((f) => f.id === id);
    if (!item) return null;

    item.status = status;
    if (status === "approved") {
      item.approvedAt = new Date().toISOString();
    }
    if (status === "sent") {
      item.sentAt = new Date().toISOString();
    }

    saveDatabase(db);
    return item;
  },

  getTemplates(): FollowUpTemplate[] {
    const db = loadDatabase();
    return db.templates;
  },

  // STATS & OVERVIEW
  getStats(serviceId?: string): AttendanceStats {
    const db = loadDatabase();
    const activeService = db.services.find((s) => s.status === "active") || null;
    const targetServiceId = serviceId || (activeService ? activeService.id : undefined);

    let targetRecords = db.attendance;
    if (targetServiceId) {
      targetRecords = db.attendance.filter((a) => a.serviceId === targetServiceId);
    }

    const physicalCount = targetRecords.filter((a) => a.attendanceType === "physical").length;
    const onlineCount = targetRecords.filter((a) => a.attendanceType === "online").length;

    return {
      totalAttendance: targetRecords.length,
      physicalCount,
      onlineCount,
      serviceCount: db.services.length,
      activeService,
      recentAttendance: db.attendance.slice(0, 15),
    };
  },
};
