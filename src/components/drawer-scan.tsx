import {forwardRef, useEffect} from "react";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";

interface Props {
    scannedData: any;
    trigger: React.ReactNode;
    setPaused: (paused: boolean) => void;
}

export const DrawerScan = forwardRef<HTMLVideoElement, Props>(({scannedData, setPaused, trigger}, ref) => {
    useEffect(() => {
        setPaused(false);

        return () => {
            setPaused(true);
        };
    }, [setPaused]);

    return (
        <Drawer>
            <DrawerTrigger>{trigger}</DrawerTrigger>{" "}
            <div
                className={`max-w-96 max-h-60 overflow-hidden flex items-center justify-center relative border-2 ${
                    scannedData ? "border-green-500" : ""
                }`}
            >
                <video ref={ref} />
                <div className="absolute h-1 w-full bg-red-500 top-0 botom-0 animate-line" />
            </div>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Acerque un código de barras</DrawerTitle>
                    <DrawerDescription />
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
});

DrawerScan.displayName = "DrawerScan";
