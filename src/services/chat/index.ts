import instance from "@/lib/axios/instance";

export const chatServices = {
  getAllChats: () => {
    return instance.get(`/chat`); // Tambahkan `return` di sini
  },
  createChat: (data: any) => instance.post(`/Task`, data),
  updateChat: (id: string, data: any) => instance.put(`/Task/${id}`, data),
  deleteChat: (id: string) => instance.delete(`/Task/${id}`),
};
