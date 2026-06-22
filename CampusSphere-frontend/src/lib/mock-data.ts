export interface Department {
  id: string;
  code: string;
  name: string;
  head: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  departmentCode: string;
  facultyId: string;
  facultyName: string;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  departmentCode: string;
  year: number;
  enrolledCourseIds: string[];
}

export interface Faculty {
  id: string;
  empNo: string;
  name: string;
  email: string;
  departmentCode: string;
  designation: string;
}

export const departments: Department[] = [
  { id: "d1", code: "CSE", name: "Computer Science & Engineering", head: "Dr. K. Iyer" },
  { id: "d2", code: "ECE", name: "Electronics & Communication", head: "Dr. M. Banerjee" },
  { id: "d3", code: "MEC", name: "Mechanical Engineering", head: "Dr. S. Khan" },
  { id: "d4", code: "MAT", name: "Mathematics", head: "Dr. L. Verma" },
];

export const faculties: Faculty[] = [
  { id: "f1", empNo: "EMP001", name: "Prof. Rahul Mehta", email: "rahul@campus.edu", departmentCode: "CSE", designation: "Associate Professor" },
  { id: "f2", empNo: "EMP002", name: "Dr. Neha Kapoor", email: "neha@campus.edu", departmentCode: "CSE", designation: "Professor" },
  { id: "f3", empNo: "EMP003", name: "Prof. Arjun Das", email: "arjun@campus.edu", departmentCode: "ECE", designation: "Assistant Professor" },
  { id: "f4", empNo: "EMP004", name: "Dr. Sneha Roy", email: "sneha@campus.edu", departmentCode: "MAT", designation: "Professor" },
  { id: "f5", empNo: "EMP005", name: "Prof. Vikram Singh", email: "vikram@campus.edu", departmentCode: "MEC", designation: "Associate Professor" },
];

export const courses: Course[] = [
  { id: "c1", code: "CS301", title: "Data Structures & Algorithms", credits: 4, departmentCode: "CSE", facultyId: "f1", facultyName: "Prof. Rahul Mehta" },
  { id: "c2", code: "CS401", title: "Operating Systems", credits: 4, departmentCode: "CSE", facultyId: "f1", facultyName: "Prof. Rahul Mehta" },
  { id: "c3", code: "CS402", title: "Database Management Systems", credits: 3, departmentCode: "CSE", facultyId: "f2", facultyName: "Dr. Neha Kapoor" },
  { id: "c4", code: "EC301", title: "Digital Signal Processing", credits: 4, departmentCode: "ECE", facultyId: "f3", facultyName: "Prof. Arjun Das" },
  { id: "c5", code: "MA201", title: "Linear Algebra", credits: 3, departmentCode: "MAT", facultyId: "f4", facultyName: "Dr. Sneha Roy" },
  { id: "c6", code: "ME301", title: "Thermodynamics", credits: 3, departmentCode: "MEC", facultyId: "f5", facultyName: "Prof. Vikram Singh" },
];

export const students: Student[] = [
  { id: "s1", rollNo: "21CSE001", name: "Priya Sharma", email: "priya@campus.edu", departmentCode: "CSE", year: 3, enrolledCourseIds: ["c1", "c2", "c3", "c5"] },
  { id: "s2", rollNo: "21CSE002", name: "Aman Gupta", email: "aman@campus.edu", departmentCode: "CSE", year: 3, enrolledCourseIds: ["c1", "c3"] },
  { id: "s3", rollNo: "21CSE003", name: "Ritika Jain", email: "ritika@campus.edu", departmentCode: "CSE", year: 3, enrolledCourseIds: ["c1", "c2"] },
  { id: "s4", rollNo: "21ECE001", name: "Karan Patel", email: "karan@campus.edu", departmentCode: "ECE", year: 3, enrolledCourseIds: ["c4", "c5"] },
  { id: "s5", rollNo: "21ECE002", name: "Sara Ali", email: "sara@campus.edu", departmentCode: "ECE", year: 3, enrolledCourseIds: ["c4"] },
  { id: "s6", rollNo: "21MEC001", name: "Vivek Nair", email: "vivek@campus.edu", departmentCode: "MEC", year: 2, enrolledCourseIds: ["c6", "c5"] },
  { id: "s7", rollNo: "20CSE018", name: "Meera Joshi", email: "meera@campus.edu", departmentCode: "CSE", year: 4, enrolledCourseIds: ["c2", "c3"] },
];
