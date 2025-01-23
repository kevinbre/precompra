import {forwardRef, PropsWithChildren} from "react";

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

interface Props extends PropsWithChildren {
    scannedData: any;
    trigger: React.ReactNode;
}

export const DrawerScan = forwardRef<HTMLVideoElement, Props>(({scannedData, trigger}, ref) => {
    return (
        <Drawer>
            <DrawerTrigger>{trigger}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Acerque un código de barras</DrawerTitle>
                    <DrawerDescription>
                        {" "}
                        <div
                            className={`max-w-96 max-h-60 overflow-hidden flex items-center justify-center relative border-2 ${
                                scannedData ? "border-green-500" : ""
                            }`}
                        >
                            <video ref={ref} />
                            <div className="absolute h-1 w-full bg-red-500 top-0 botom-0 animate-line" />
                        </div>
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
});

DrawerScan.displayName = "DrawerScan";
