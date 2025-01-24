import {Outlet} from "react-router-dom";

export function Layout() {
    return (
        <div className="w-screen min-h-[100dvh] bg-neutral-950 h-full text-gray-300 flex flex-col justify-center items-center p-6">
            <Outlet />
        </div>
    );
}
