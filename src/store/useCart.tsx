import {create} from "zustand";

export interface Product {
    id: string | number;
    name: string;
    price: string | number;
    priceWithoutDiscount: string | number;
    image: string;
    pricePerUnit: string | number;
    quantity?: number;
}

interface QuantityEdit {
    productId: string | number;
    quantity?: number;
}

interface CartState {
    cart: Product[];
    total: number;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string | number) => void;
    quantityEdit: ({productId, quantity}: QuantityEdit) => void;
    clearCart: () => void;
    totalPrice: () => void;
}

export const useCart = create<CartState>((set) => {
    return {
        cart: [],
        total: 0,
        quantity: undefined,
        addToCart: (product: any) =>
            set((state) => {
                const productIndex = state.cart.findIndex((item) => item.id === product.id);

                if (productIndex !== -1 && state.cart[productIndex].quantity) {
                    state.cart[productIndex].quantity += 1;

                    return {cart: [...state.cart]};
                }

                return {cart: [...state.cart, {...product, quantity: 1}]};
            }),
        quantityEdit: ({productId, quantity}: QuantityEdit) =>
            set((state) => {
                const productIndex = state.cart.findIndex((item) => item.id === productId);

                if (quantity === 0) {
                    return {cart: state.cart.filter((item) => item.id !== productId)};
                }

                if (productIndex !== -1) {
                    state.cart[productIndex].quantity = quantity;

                    return {cart: [...state.cart]};
                }

                return {
                    cart: [...state.cart],
                };
            }),
        removeFromCart: (productId: string | number) =>
            set((state) => {
                return {cart: state.cart.filter((item) => item.id !== productId)};
            }),
        totalPrice: () => {
            return set((state) => {
                const total = state.cart?.reduce((acc, item) => {
                    return acc + (item.price as number) * (item.quantity || 1);
                }, 0);

                return {total: Number(total.toFixed(2))};
            });
        },
        clearCart: () => {
            return set(() => ({cart: []}));
        },
    };
});
