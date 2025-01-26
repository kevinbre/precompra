import {Outlet} from "react-router-dom";

import {Navbar} from "./navbar";

export function Layout() {
    return (
        <div className="w-screen min-h-[100dvh] bg-neutral-950 h-full text-gray-300 flex flex-col justify-center items-center p-6">
            <Navbar />
            <Outlet />
        </div>
    );
}
