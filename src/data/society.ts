export const society = {
  name: "Sunrise Residency CHS",
  code: "DEMO-SUNRISE-RESIDENCY-CHS-001",
  admin: "Demo Admin",
  fyFrom: "01 Apr 2026",
  fyTo: "31 Mar 2027",
};

export const dashboardStats = [
  { label: "Total Members", value: "5", hint: "Active members", tone: "primary", icon: "users" },
  { label: "Occupied Flats", value: "5", hint: "Units occupied", tone: "success", icon: "building" },
  { label: "Collection (FY)", value: "₹11,000", hint: "Receipts posted", tone: "primary", icon: "rupee" },
  { label: "Interest (FY)", value: "₹0", hint: "Interest ledger", tone: "info", icon: "trend" },
  { label: "Upcoming Dues", value: "—", hint: "Coming soon", tone: "muted", icon: "calendar" },
  { label: "Complaints Open", value: "—", hint: "Coming soon", tone: "muted", icon: "headset" },
] as const;

export const collectionSeries = [
  { month: "Apr 2026", sales: 8000, collection: 4200 },
  { month: "May 2026", sales: 8200, collection: 6000 },
  { month: "Jun 2026", sales: 6400, collection: 800 },
  { month: "Jul 2026", sales: 0, collection: 0 },
  { month: "Aug 2026", sales: 0, collection: 0 },
  { month: "Sep 2026", sales: 0, collection: 0 },
  { month: "Oct 2026", sales: 0, collection: 0 },
  { month: "Nov 2026", sales: 0, collection: 0 },
  { month: "Dec 2026", sales: 0, collection: 0 },
  { month: "Jan 2027", sales: 0, collection: 0 },
  { month: "Feb 2027", sales: 0, collection: 0 },
  { month: "Mar 2027", sales: 0, collection: 0 },
];

export const chargeTypes = [
  { name: "Maintenance Charges", value: 18000 },
  { name: "Water Charges", value: 2650 },
  { name: "Parking Charges", value: 950 },
  { name: "CGST / SGST", value: 900 },
];

export const events = [
  {
    id: "e1",
    tag: "Past",
    day: "31",
    mon: "JUL",
    time: "2:00 PM",
    place: "First",
    title: "Test",
    body: "We Are Here",
    recipients: 2,
    at: "2026-07-22T14:55:15+05:30",
  },
  {
    id: "e2",
    tag: "Past",
    day: "31",
    mon: "JUL",
    time: "1:15 PM",
    place: "ClubHouse",
    title: "Water Supply Meeting",
    body: "Discussion on tanker schedule",
    recipients: 1,
    at: "2026-07-16T22:09:35+05:30",
  },
];

export const polls = [
  {
    id: "p1",
    status: "Expired",
    title: "Society Vote",
    anchor: "Society Vote",
    recipients: 1,
    at: "2026-07-17T17:29:17+05:30",
    options: [
      { label: "Upgrade It", votes: 0 },
      { label: "No Not Needed Now", votes: 0 },
    ],
  },
  {
    id: "p2",
    status: "Expired",
    title: "Pool",
    anchor: "Amenity Upgrade",
    recipients: 2,
    at: "2026-07-12T12:23:29+05:30",
    options: [
      { label: "Yes", votes: 1 },
      { label: "No", votes: 0 },
    ],
  },
];

export const notifications = [
  { id: "n1", kind: "GENERAL", title: "AGM", body: "AGM OF SOCIETY SCHEDULED ON SUNDAY", photo: true, recipients: 2, at: "2026-07-31T14:57:28+05:30" },
  { id: "n2", kind: "GENERAL", title: "FCM Test", body: "FCM", recipients: 2, at: "2026-07-28T18:14:48+05:30" },
  { id: "n3", kind: "GENERAL", title: "Hello", body: "This is FCM testing", recipients: 2, at: "2026-07-28T15:04:18+05:30" },
  { id: "n4", kind: "GENERAL", title: "Test", body: "Test", recipients: 2, at: "2026-07-28T14:37:48+05:30" },
  { id: "n5", kind: "GENERAL", title: "Hello", body: "Hello", recipients: 2, at: "2026-07-28T14:19:49+05:30" },
  { id: "n6", kind: "EMERGENCY", title: "Test", body: "Lift maintenance in B wing", recipients: 2, at: "2026-07-28T13:58:01+05:30" },
];

export type Member = {
  id: string;
  name: string;
  flat: string;
  wing: string;
  initials: string;
  balance: number;
  phone: string;
  email: string;
  active: boolean;
};

export const members: Member[] = [
  { id: "A101", name: "Priya Mehta", flat: "A 101", wing: "A", initials: "PM", balance: 2500, phone: "9900000101", email: "societymember@test.com", active: true },
  { id: "A102", name: "Anil Kumar", flat: "A 102", wing: "A", initials: "AK", balance: 7500, phone: "9900000102", email: "anil@test.com", active: true },
  { id: "A103", name: "Sunita Rao", flat: "A 103", wing: "A", initials: "SR", balance: 3000, phone: "9900000103", email: "sunita@test.com", active: true },
  { id: "B201", name: "Vikram Patel", flat: "B 201", wing: "B", initials: "VP", balance: 2500, phone: "9900000201", email: "vikram@test.com", active: true },
  { id: "B202", name: "Deepa Nair", flat: "B 202", wing: "B", initials: "DN", balance: 3500, phone: "9900000202", email: "deepa@test.com", active: false },
];

export const paymentTrend = [
  { m: "Apr", v: 2500 },
  { m: "May", v: 2500 },
  { m: "Jun", v: 0 },
  { m: "Jul", v: 0 },
  { m: "Aug", v: 0 },
  { m: "Sep", v: 0 },
  { m: "Oct", v: 0 },
  { m: "Nov", v: 0 },
  { m: "Dec", v: 0 },
  { m: "Jan", v: 0 },
  { m: "Feb", v: 0 },
  { m: "Mar", v: 0 },
];

export const ageing = [
  { label: "0-30 Days", amount: 0, pct: 0 },
  { label: "31-60 Days", amount: 2500, pct: 33 },
  { label: "61-90 Days", amount: 2500, pct: 33 },
  { label: "90+ Days", amount: 2500, pct: 33 },
];

export const transactions = [
  { date: "01 Jun 2026", voucher: "MAINT/2026/JUN/001", type: "Society Bill", narration: "June 2026 Maintenance — Priya M...", debit: 2500, credit: 0 },
  { date: "09 May 2026", voucher: "RC/2026/MAY/004", type: "Receipt", narration: "Receipt against May bill", debit: 0, credit: 2500 },
  { date: "01 May 2026", voucher: "MAINT/2026/MAY/001", type: "Society Bill", narration: "May 2026 Maintenance — Priya M...", debit: 2500, credit: 0 },
  { date: "08 Apr 2026", voucher: "RC/2026/APR/001", type: "Receipt", narration: "Opening receipt", debit: 0, credit: 2500 },
  { date: "01 Apr 2026", voucher: "MAINT/2026/APR/001", type: "Society Bill", narration: "April 2026 Maintenance", debit: 2500, credit: 0 },
];

export const voucherStats = [
  { label: "Total Vouchers", value: "12", sub: "", tone: "primary" },
  { label: "Payments", value: "0", sub: "₹0", tone: "warning" },
  { label: "Receipts", value: "4", sub: "₹11,000", tone: "success" },
  { label: "Society Bills", value: "8", sub: "₹22,500", tone: "info" },
] as const;

export const voucherRows = [
  { date: "1 Jun 2026", no: "MAINT/2026/JUN/001", party: "Priya Mehta", type: "SOCIETY BILL", debit: 2500, credit: 0 },
  { date: "1 Jun 2026", no: "MAINT/2026/JUN/005", party: "Deepa Nair", type: "SOCIETY BILL", debit: 3500, credit: 0 },
  { date: "9 May 2026", no: "RC/2026/MAY/004", party: "HDFC Bank OD Account", type: "RECEIPT", debit: 0, credit: 3500 },
  { date: "8 May 2026", no: "RC/2026/MAY/001", party: "HDFC Bank OD Account", type: "RECEIPT", debit: 0, credit: 2500 },
  { date: "1 May 2026", no: "MAINT/2026/MAY/001", party: "Priya Mehta", type: "SOCIETY BILL", debit: 2500, credit: 0 },
  { date: "1 May 2026", no: "MAINT/2026/MAY/002", party: "Anil Kumar", type: "SOCIETY BILL", debit: 7500, credit: 0 },
  { date: "1 May 2026", no: "MAINT/2026/MAY/004", party: "Vikram Patel", type: "SOCIETY BILL", debit: 2500, credit: 0 },
  { date: "12 Apr 2026", no: "RC/2026/APR/002", party: "HDFC Bank OD Account", type: "RECEIPT", debit: 0, credit: 2500 },
];

export const ledgerAccounts = [
  { id: "CA", name: "Cash", initials: "CA", balance: 0, side: "Nil", inactive: true },
  { id: "CP", name: "CGST Payable", initials: "CP", balance: 450, side: "Cr", inactive: false },
  { id: "HB", name: "HDFC Bank OD Account", initials: "HB", balance: 11000, side: "Dr", inactive: false },
  { id: "MC", name: "Maintenance Charges Income", initials: "MC", balance: 18000, side: "Cr", inactive: false },
  { id: "PC", name: "Parking Charges Income", initials: "PC", balance: 950, side: "Cr", inactive: false },
  { id: "SP", name: "SGST Payable", initials: "SP", balance: 450, side: "Cr", inactive: false },
  { id: "WC", name: "Water Charges Income", initials: "WC", balance: 2650, side: "Cr", inactive: false },
];

export const staff = [
  { name: "Sukhi Bai", email: "bai@sukhi.com", role: "Housekeeping", gate: "—", status: "Active", note: "password reset pending" },
  { name: "Ram Kalesh", email: "ram@kalesh.com", role: "Security Guard", gate: "Gate1", status: "Active", note: "" },
];

export const visitors = [
  { name: "Allok Kejriwal", type: "Visitor Pass", phone: "8879454420", purpose: "Guest", flat: "A 101", gate: "—", inAt: "22 Jul, 03:01 PM", outAt: "—", status: "Inside", photo: false },
  { name: "Aakash Jain", type: "Visitor Pass", phone: "7498210773", purpose: "Guest", flat: "A 101", gate: "—", inAt: "21 Jul, 06:24 PM", outAt: "—", status: "Inside", photo: false },
  { name: "Aakash Anil Jain", type: "Helper", phone: "123456789", purpose: "Maid", flat: "—", gate: "—", inAt: "21 Jul, 05:55 PM", outAt: "21 Jul, 05:59 PM", status: "Left", photo: false },
  { name: "Aakash Anil Jain", type: "Helper", phone: "123456789", purpose: "Maid", flat: "—", gate: "—", inAt: "21 Jul, 05:55 PM", outAt: "21 Jul, 05:55 PM", status: "Left", photo: false },
  { name: "fdgff", type: "Walk-in", phone: "5555555555", purpose: "Service", flat: "B 202", gate: "—", inAt: "08 Jul, 07:12 PM", outAt: "08 Jul, 04:24 PM", status: "Left", photo: true },
  { name: "aa", type: "Walk-in", phone: "7977686537", purpose: "Guest", flat: "A 101", gate: "—", inAt: "08 Jul, 07:11 PM", outAt: "08 Jul, 04:24 PM", status: "Left", photo: false },
  { name: "alok", type: "Walk-in", phone: "8879454420", purpose: "Service", flat: "A 101", gate: "—", inAt: "08 Jul, 07:06 PM", outAt: "08 Jul, 01:37 PM", status: "Left", photo: true },
];

export const helpers = [
  { name: "Sunita Devi", role: "Maid", flats: "A 101, A 102", phone: "9822001122", shift: "7 AM – 12 PM", verified: true },
  { name: "Ramesh Yadav", role: "Driver", flats: "B 201", phone: "9822004455", shift: "8 AM – 8 PM", verified: true },
  { name: "Kavita Bai", role: "Cook", flats: "A 103, B 202", phone: "9822007788", shift: "9 AM – 2 PM", verified: false },
];

export const complaints = [
  { id: "CMP-005", title: "Light not working", desc: "djdjsks jdidjfjed krkfjfjek", by: "Priya Mehta", status: "Open", assigned: "—", photos: 2, at: "28 Jul 2026", note: "" },
  { id: "CMP-004", title: "pipe damage", desc: "drainage pipe is damaged.", by: "Priya Mehta", status: "Open", assigned: "—", photos: 0, at: "07 Jul 2026", note: "" },
  { id: "CMP-003", title: "utjgzutxoyflu", desc: "jtitdiyiyc oyuffuuffufu f", by: "Demo Admin", status: "Resolved", assigned: "—", photos: 1, at: "28 Jul 2026", note: "" },
  { id: "CMP-002", title: "Test check", desc: "Test we are checking", by: "Priya Mehta", status: "Closed", assigned: "—", photos: 1, at: "23 Jul 2026", note: "WE have resolved" },
  { id: "CMP-001", title: "face lock is not working", desc: "we tried many times but not working", by: "Demo Admin", status: "Closed", assigned: "Demo Admin", photos: 0, at: "23 Jul 2026", note: "" },
];

export const committeeTerm = { from: "01 Apr 2026", to: "31 Mar 2030", current: true };

export const committee = [
  { name: "Anil Kumar", post: "President", flat: "A 102", phone: "09930756166", email: "societymember@test.com", status: "Active" },
  { name: "Priya Mehta", post: "Committee Member", flat: "A 101", phone: "7977686537", email: "societymember@test.com", status: "Active" },
];

export const emergencyContacts: { label: string; value: string; type: string }[] = [];

export const loginHistory = [
  { event: "Login", ip: "152.59.9.206", device: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…", note: "—", at: "05 Aug 2026 02:52:40" },
  { event: "Logout", ip: "152.59.9.206", device: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…", note: "—", at: "04 Aug 2026 23:20:42" },
  { event: "Login", ip: "152.59.9.206", device: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…", note: "—", at: "04 Aug 2026 23:12:31" },
  { event: "Logout", ip: "152.59.9.206", device: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…", note: "—", at: "04 Aug 2026 23:12:06" },
  { event: "Login", ip: "152.59.9.206", device: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…", note: "—", at: "04 Aug 2026 23:10:21" },
  { event: "Logout", ip: "47.11.46.254", device: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…", note: "—", at: "03 Aug 2026 20:43:09" },
  { event: "Login", ip: "47.11.46.254", device: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Ap…", note: "—", at: "03 Aug 2026 20:42:07" },
  { event: "Login", ip: "152.59.6.137", device: "Mozilla/5.0 (iPhone; CPU iPhone OS 27_0_0 like Mac …", note: "—", at: "29 Jul 2026 20:38:31" },
  { event: "Login", ip: "49.36.98.148", device: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWe…", note: "—", at: "29 Jul 2026 20:30:59" },
  { event: "Login", ip: "49.36.101.233", device: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWe…", note: "—", at: "28 Jul 2026 18:14:28" },
  { event: "Login", ip: "49.36.101.233", device: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWe…", note: "—", at: "28 Jul 2026 15:53:57" },
  { event: "Login", ip: "49.36.101.233", device: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWe…", note: "—", at: "28 Jul 2026 14:16:35" },
  { event: "Login", ip: "49.36.101.233", device: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWe…", note: "—", at: "23 Jul 2026 14:31:07" },
  { event: "Login", ip: "49.36.101.233", device: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWe…", note: "—", at: "21 Jul 2026 17:55:01" },
  { event: "Logout", ip: "49.36.101.233", device: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWe…", note: "—", at: "21 Jul 2026 17:34:12" },
];


export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
