import api from "@/lib/axios";


export const getStudents = async () => {
    const response = await api.get(
        "/student/all"
    );

    return response.data;
};

export const createStudent = async (student: any) => {
  const response = await api.post(
    "/student/create",
    student
  );

  return response.data;
};

export const deleteStudent = async (id: number) => {
  return api.delete(`/student/${id}`);
};

export const updateStudent = async (
  id: number,
  student: any
) => {
  const response = await api.put(
    `/student/${id}`,
    student
  );

  return response.data;
};

export const assignCourse = async (
  studentId: number,
  courseId: number
) => {
  const response = await api.put(
    `/student/${studentId}/course/${courseId}`
  );

  return response.data;
};

export const removeCourse = async (
  studentId: number,
  courseId: number
) => {
  const response = await api.delete(
    `/student/${studentId}/course/${courseId}`
  );

  return response.data;
};

export const updateAddress = async (
  studentId: number,
  address: any
) => {
  const response = await api.put(
    `/student/${studentId}/address`,
    address
  );

  return response.data;
};

export const getStudentById = async (
  id: number
) => {
  const response = await api.get(
    `/student/${id}`
  );

  return response.data;
};


export const getCurrentStudent = async () => {
  const response = await api.get("/student/me");

  return response.data;
};

export const getCurrentStudentCourses = async () => {
  const response = await api.get("/student/me/courses");

  return response.data;
};

export const getCurrentStudentDepartment = async () => {
  const response = await api.get("/student/me/department");

  return response.data;
};