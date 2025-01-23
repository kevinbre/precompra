import {useZxing} from "react-zxing";
import {Dispatch, SetStateAction} from "react";

import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "./ui/drawer";

interface Props {
    scannedData: any;
    setScannedData: Dispatch<SetStateAction<boolean>>;
    setBarCode: Dispatch<SetStateAction<string>>;
    trigger: React.ReactNode;
}

export function DrawerScan({scannedData, setScannedData, setBarCode, trigger}: Props) {
    const barcodeSound = new Audio("/barcode.mp3");

    const {ref} = useZxing({
        onDecodeResult(result) {
            barcodeSound.play();
            setScannedData(true);
            setBarCode(result.getText());
        },
        timeBetweenDecodingAttempts: 1000,
        constraints: {
            video: {
                facingMode: "environment",
                aspectRatio: {ideal: 16 / 9},
                noiseSuppression: true,
                width: {ideal: 1920},
                height: {ideal: 1080},
                advanced: [
                    {
                        echoCancellation: true,
                        autoGainControl: true,
                        displaySurface: "monitor",
                    },
                ],
            },
        },
    });

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
}
