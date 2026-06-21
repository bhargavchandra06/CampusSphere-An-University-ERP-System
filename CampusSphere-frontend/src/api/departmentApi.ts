import api from "@/lib/axios";

export const getDepartments = async () => {
  const response = await api.get("/departments/all");
  return response.data;
};

export const createDepartment = async (
  department: any
) => {
  const response = await api.post(
    "/departments/create",
    department
  );

  return response.data;
};

export const updateDepartment = async (
  id: number,
  department: any
) => {
  const response = await api.put(
    `/departments/${id}`,
    department
  );

  return response.data;
};

export const deleteDepartment = async (
  id: number
) => {

  const response = await api.delete(
    `/departments/${id}`
  );

  return response.data;

};

export const getDepartmentById = async (
  id: number
) => {

  const response = await api.get(
    `/departments/${id}`
  );

  return response.data;

};