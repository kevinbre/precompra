import {ShoppingCart, Trash} from "lucide-react";
import {useEffect} from "react";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";
import {Input} from "./ui/input";

import {useCart} from "@/store/useCart";

export function DrawerCart() {
    const {total, removeFromCart, quantityEdit} = useCart();
    const cart = useCart((state) => state.cart);
    const totalPrice = useCart().totalPrice;

    useEffect(() => {
        totalPrice();
    }, [cart, totalPrice]);

    return (
        <div className="max-h-[100dvh]">
            <Drawer direction="left">
                <DrawerTrigger>
                    <ShoppingCart />
                </DrawerTrigger>
                <DrawerContent className="max-w-80 h-full max-h-[100dvh]" lineClassName="w-0">
                    <DrawerHeader className="flex items-center justify-start gap-6 flex-col h-full">
                        <DrawerTitle>Articulos</DrawerTitle>
                        <DrawerDescription className="h-full overflow-y-auto">
                            {cart?.map((product) => (
                                <li key={product.id} className="flex items-center gap-4">
                                    <img alt={product.name} src={product.image} width={100} />
                                    <div className="flex flex-col gap-2">
                                        <h3>{product.name}</h3>
                                        <span className="text-start">${product.price}</span>
                                        <div className="flex items-center gap-4">
                                            <Input
                                                className="text-red-500 w-fit max-w-32"
                                                type="text"
                                                value={product.quantity || ""}
                                                onChange={(e) => {
                                                    const value = e.currentTarget.value;

                                                    quantityEdit({
                                                        productId: product.id,
                                                        quantity: value.length > 0 ? Number(value) : undefined,
                                                    });
                                                }}
                                            />
                                            <Trash
                                                className="text-red-500 hover:text-red-400 cursor-pointer"
                                                onClick={() => removeFromCart(product.id)}
                                            />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </DrawerDescription>
                    </DrawerHeader>
                    ${total}
                    <DrawerFooter />
                </DrawerContent>
            </Drawer>
        </div>
    );
}
