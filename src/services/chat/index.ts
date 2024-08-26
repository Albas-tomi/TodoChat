import instance from "@/lib/axios/instance";

// MENGGUNAKAN  ENDPOINT DENGAN METHOD GET, POST DAN PUT  === LANGKAH KE 3 ===

export const productServices = {
  getAllProducts: () => instance.get("/api/product"),

  getProductById: (id: string) => instance.get(`/api/product/${id}`),

  addProduct: (data: any, token: string) =>
    instance.post("/api/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  updateProduct: (id: string, data: any, token: string) =>
    instance.put(
      `/api/product/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),

  deleteProduct: (id: string, token: string) =>
    instance.delete(`/api/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
