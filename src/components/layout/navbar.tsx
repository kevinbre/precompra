import {DrawerCart} from "../drawer-cart";

export function Navbar() {
    return (
        <nav className="bg-neutral-950 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <DrawerCart />
            </div>
        </nav>
    );
}
