import { create } from 'zustand';
import { Product, ProductFormData } from '../types';

interface ProductStore {
  products: Product[];
  addProduct: (product: ProductFormData) => void;
  updateProduct: (id: string, product: ProductFormData) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [
    {
      id: '1',
      name: 'Premium Brake Pads Set',
      description: 'High-performance ceramic brake pads for optimal stopping power',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3',
      category: 'Brake Systems',
      compatibility: ['Toyota', 'Honda', 'Ford'],
      stock: 50,
      translations: {
        zh: {
          name: '高级刹车片套装',
          description: '高性能陶瓷刹车片，提供最佳制动力',
          category: '制动系统'
        },
        ru: {
          name: 'Премиум тормозные колодки',
          description: 'Высокоэффективные керамические тормозные колодки для оптимальной тормозной силы',
          category: 'Тормозная система'
        },
        ar: {
          name: 'مجموعة بطانات الفرامل الممتازة',
          description: 'بطانات فرامل سيراميك عالية الأداء لقوة توقف مثالية',
          category: 'نظام الفرامل'
        },
        fr: {
          name: 'Kit de plaquettes de frein Premium',
          description: 'Plaquettes de frein en céramique haute performance pour une force de freinage optimale',
          category: 'Système de freinage'
        },
        de: {
          name: 'Premium Bremsbeläge Set',
          description: 'Hochleistungs-Keramik-Bremsbeläge für optimale Bremskraft',
          category: 'Bremssystem'
        }
      }
    },
    {
      id: '2',
      name: 'Oil Filter Pro',
      description: 'Premium quality oil filter for enhanced engine protection',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1635773054018-22c8ad65b85a',
      category: 'Filters',
      compatibility: ['Universal'],
      stock: 100,
      translations: {
        zh: {
          name: '专业机油滤清器',
          description: '优质机油滤清器，提供更好的发动机保护',
          category: '滤清器'
        },
        ru: {
          name: 'Масляный фильтр Pro',
          description: 'Масляный фильтр премиум-класса для улучшенной защиты двигателя',
          category: 'Фильтры'
        },
        ar: {
          name: 'فلتر زيت احترافي',
          description: 'فلتر زيت عالي الجودة لحماية محسنة للمحرك',
          category: 'الفلاتر'
        },
        fr: {
          name: 'Filtre à huile Pro',
          description: 'Filtre à huile de qualité premium pour une protection améliorée du moteur',
          category: 'Filtres'
        },
        de: {
          name: 'Ölfilter Pro',
          description: 'Premium-Ölfilter für verbesserten Motorschutz',
          category: 'Filter'
        }
      }
    }
  ],
  addProduct: (productData) =>
    set((state) => ({
      products: [...state.products, {
        ...productData,
        id: Math.random().toString(36).substring(2, 9)
      }],
    })),
  updateProduct: (id, productData) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...productData, id } : product
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
}));