import apiClient from './apiClient';

export interface ProductRequest {
  name: string;
  category: string;
  brand?: string;
  keyIngredients?: string;
  frequency?: string;
  notes?: string;
  startedDate?: string;
}

export interface Product {
  id: number;
  userId: number;
  name: string;
  category: string;
  brand?: string;
  keyIngredients?: string;
  startedDate?: string;
  frequency?: string;
  notes?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get('/products');
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  create: async (productData: ProductRequest): Promise<Product> => {
    const response = await apiClient.post('/products', productData);
    return response.data;
  },

  update: async (id: number, productData: ProductRequest): Promise<Product> => {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },

  toggleActive: async (id: number): Promise<Product> => {
    const response = await apiClient.patch(`/products/${id}/toggle-active`);
    return response.data;
  },

  getImpactAnalysis: async (id: number): Promise<any> => {
    const response = await apiClient.get(`/products/${id}/impact-analysis`);
    return response.data;
  },
};
