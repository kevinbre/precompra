import Quagga from "@ericblade/quagga2";
import { useCallback, useEffect } from "react";

interface ScannerProps {
    onDetected: (result: any) => void;
}

export function Scanner({ onDetected }: ScannerProps) {
    const _onDetected = useCallback(
        (result: any) => {
            onDetected(result);
        },
        [onDetected],
    );

    useEffect(() => {
        Quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    constraints: {
                        width: 500,
                        height: 250,
                        facingMode: "environment", // or user
                    },
                },
                locator: {
                    patchSize: "medium",
                    halfSample: true,
                },
                numOfWorkers: 4,
                decoder: {
                    readers: [
                        "ean_reader",
                        "ean_2_reader",
                        "ean_5_reader",
                        "ean_8_reader",
                        "code_39_reader",
                        "code_39_vin_reader",
                        "codabar_reader",
                        "upc_reader",
                        "upc_e_reader",
                        "i2of5_reader",
                        "2of5_reader",
                        "code_93_reader",
                        "code_128_reader",
                    ],
                },
                locate: true,
            },
            function (err) {
                if (err) {
                    return console.log(err);
                }
                Quagga.start();
            },
        );
        Quagga.onDetected(_onDetected);

        return () => {
            Quagga.offDetected(_onDetected);
            Quagga.stop(); // Detiene el escaneo cuando el componente se desmonta
        };
    }, [_onDetected]);

    return (
        <div
            className="viewport"
            id="interactive"
            style={{
                width: "640px",
                height: "480px",
                margin: "0 auto",
            }}
        />
    );
}
