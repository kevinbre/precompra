import {useZxing} from "react-zxing";

export interface ZxingInfoProps {
    scannedData: boolean;
    setScannedData: (scannedData: boolean) => void;
    setBarCode: (barCode: string) => void;
}

export function ZxingInfo({scannedData, setScannedData, setBarCode}: ZxingInfoProps) {
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
        <div
            className={`max-w-96 max-h-60 overflow-hidden flex items-center justify-center relative border-2 ${
                scannedData ? "border-green-500" : ""
            }`}
        >
            <video ref={ref} />
            <div className="absolute h-1 w-full bg-red-500 top-0 botom-0 animate-line" />
        </div>
    );
}
