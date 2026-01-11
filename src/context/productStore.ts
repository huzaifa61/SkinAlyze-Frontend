import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
    id: number;
    name: string;
    category: string;
    brand?: string;
    keyIngredients?: string;
    frequency?: string;
    notes?: string;
    active: boolean;
    startedDate?: string;
}

interface ProductState {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: number, product: Partial<Product>) => void;
    deleteProduct: (id: number) => void;
    toggleActive: (id: number) => void;
}

export const useProductStore = create<ProductState>()(
    persist(
        (set) => ({
            products: [
                {
                    id: 1,
                    name: 'Cetaphil Gentle Cleanser',
                    category: 'CLEANSER',
                    brand: 'Cetaphil',
                    keyIngredients: 'Glycerin, Panthenol',
                    frequency: 'Twice daily',
                    active: true,
                    startedDate: '2024-01-01',
                },
                {
                    id: 2,
                    name: 'CeraVe Moisturizing Cream',
                    category: 'MOISTURIZER',
                    brand: 'CeraVe',
                    keyIngredients: 'Ceramides, Hyaluronic Acid',
                    frequency: 'Twice daily',
                    active: true,
                    startedDate: '2024-01-01',
                },
            ],
            addProduct: (product) =>
                set((state) => ({
                    products: [
                        ...state.products,
                        { ...product, id: Math.max(...state.products.map((p) => p.id), 0) + 1 },
                    ],
                })),
            updateProduct: (id, updatedProduct) =>
                set((state) => ({
                    products: state.products.map((p) =>
                        p.id === id ? { ...p, ...updatedProduct } : p
                    ),
                })),
            deleteProduct: (id) =>
                set((state) => ({
                    products: state.products.filter((p) => p.id !== id),
                })),
            toggleActive: (id) =>
                set((state) => ({
                    products: state.products.map((p) =>
                        p.id === id ? { ...p, active: !p.active } : p
                    ),
                })),
        }),
        {
            name: 'products-storage',
        }
    )
);
