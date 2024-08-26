import instance from "@/lib/axios/instance";

export const taskServices = {
  getAllTask: () => {
    return instance.get(`/Task`); // Tambahkan `return` di sini
  },
  updateTask: (id: string, data: any) => instance.put(`/Task/${id}`, data),
  deleteTask: (id: string) => instance.delete(`/Task/${id}`),
};
