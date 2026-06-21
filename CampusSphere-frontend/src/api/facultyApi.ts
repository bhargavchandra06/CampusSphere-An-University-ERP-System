import api from "@/lib/axios";

export const getFaculties = async () => {
  const response = await api.get("/faculties/all");

  return response.data;
};

export const createFaculty = async (faculty: any) => {
  const response = await api.post(
    "/faculties/create",
    faculty
  );

  return response.data;
};

export const updateFaculty = async (
  id: number,
  faculty: any
) => {
  const response = await api.put(
    `/faculties/${id}`,
    faculty
  );

  return response.data;
};

export const deleteFaculty = async (
  id: number
) => {
  const response = await api.delete(
    `/faculties/${id}`
  );

  return response.data;
};

export const getFacultyById = async (
  id: number
) => {
  const response = await api.get(
    `/faculties/${id}`
  );

  return response.data;
};

export const getCurrentFaculty = async () => {

  const response = await api.get(
    "/faculties/me"
  );

  return response.data;

};
export const getCurrentFacultyCourses = async () => {

  const response = await api.get(
    "/faculties/me/courses"
  );

  return response.data;

};

export const getStudentsByMyCourse = async (
  courseId: number
) => {

  const response = await api.get(
    `/faculties/me/courses/${courseId}/students`
  );

  return response.data;

};