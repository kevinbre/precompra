import {useState} from "react";

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
import {ZxingInfo, ZxingInfoProps} from "./zxing-info";

interface Props extends ZxingInfoProps {
    trigger: React.ReactNode;
}

export function DrawerScan({scannedData, setBarCode, setScannedData, trigger}: Props) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger>{trigger}</DrawerTrigger>
            <DrawerContent className="flex items-center justify-center gap-6 flex-col">
                <DrawerHeader>
                    <DrawerTitle>Acerque un código de barras</DrawerTitle>
                    <DrawerDescription />
                </DrawerHeader>
                <ZxingInfo scannedData={scannedData} setBarCode={setBarCode} setScannedData={setScannedData} />
                <DrawerFooter>
                    <DrawerClose />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

DrawerScan.displayName = "DrawerScan";
