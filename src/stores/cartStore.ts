import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product: Product) => {
        set((state) => {
          const existingItem = state.cart.find(item => item.id === product.id);
          
          if (existingItem) {
            return {
              cart: state.cart.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1 }]
            };
          }
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          cart: state.cart.filter(item => item.id !== productId)
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set((state) => ({
          cart: state.cart.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },

      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      clearCart: () => {
        set({ cart: [] });
      },

      isInCart: (productId: string) => {
        const { cart } = get();
        return cart.some(item => item.id === productId);
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
    }
  )
);
