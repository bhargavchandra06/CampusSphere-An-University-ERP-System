import api from "@/lib/axios";

export const getCourses = async () => {
  const response = await api.get("/courses/all");
  return response.data;
};

export const createCourse = async (course: any) => {
  const response = await api.post(
    "/courses/create",
    course
  );
  return response.data;
};

export const updateCourse = async (
  id: number,
  course: any
) => {
  const response = await api.put(
    `/courses/${id}`,
    course
  );

  return response.data;
};

export const deleteCourse = async (
  id: number
) => {
  const response = await api.delete(
    `/courses/${id}`
  );

  return response.data;
};
export const assignFaculty = async (
  courseId: number,
  facultyId: number
) => {
  const response = await api.put(
    `/courses/${courseId}/faculty/${facultyId}`
  );

  return response.data;
};

export const removeFaculty = async (
  courseId: number
) => {

  const response = await api.delete(
    `/courses/${courseId}/faculty`
  );

  return response.data;

};

export const getCourseById = async (
  id: number
) => {

  const response = await api.get(
    `/courses/${id}`
  );

  return response.data;

};