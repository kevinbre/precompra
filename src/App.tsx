import {FormEvent, useEffect, useState} from "react";
import {toast} from "sonner";
import {useZxing} from "react-zxing";

import {DrawerScan} from "./components/drawer-scan";

function App() {
    const [barCode, setBarCode] = useState("");
    const [data, setData] = useState<any | undefined>(undefined);

    const [scannedData, setScannedData] = useState(false);
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

    const searchProduct = (event?: FormEvent) => {
        event?.preventDefault();
        fetch(
            `https://st.dynamicyield.com/spa/json?sec=8781555&ctx=%7B%22type%22%3A%22PRODUCT%22%2C%22data%22%3A%5B%22${barCode}%22%5D%2C%22lng%22%3A%22carrefourar0268%22%7D`,
        )
            .then((res) => res.json())
            .then((res) => {
                fetch(
                    `https://www.carrefour.com.ar/api/catalog_system/pub/products/search?fq=productName:${res?.feedProperties?.name?.replaceAll?.(
                        ".",
                        "",
                    )}`,
                )
                    .then((res) => res.json())
                    .then((res) => {
                        setData(res[0]);
                    });
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    useEffect(() => {
        if (scannedData) {
            searchProduct();
            setTimeout(() => {
                setScannedData(false);
            }, 2000);
        }
    }, [scannedData]);

    return (
        <>
            <div className="w-screen min-h-[100dvh] bg-neutral-950 text-gray-300 flex flex-col justify-center items-center p-6">
                {data ? (
                    <>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <h2>Scaneo el producto</h2>
                            {data?.items?.map((item: any) => item.name)}
                            {data?.items?.map((item: any) => (
                                <img key={item.itemId} alt={item.name} src={item?.images?.[0]?.imageUrl} width={200} />
                            ))}
                        </div>
                        <div>
                            El precio es de: $
                            <strong>{data?.items?.[0]?.sellers?.[0]?.commertialOffer?.Installments?.[0]?.Value}</strong>
                        </div>
                    </>
                ) : (
                    "Por favor busque un producto"
                )}
                El resultado es: {barCode}
                <form className="flex flex-col gap-4 justify-center items-center" onSubmit={searchProduct}>
                    <div className="flex gap-4 items-center">
                        <input
                            className="p-2 rounded-md"
                            placeholder="Enter product id"
                            type="text"
                            value={barCode}
                            onChange={(e) => setBarCode(e.currentTarget.value)}
                        />
                        <div
                            className={`max-w-96 max-h-60 overflow-hidden flex items-center justify-center relative border-2 ${
                                scannedData ? "border-green-500" : ""
                            }`}
                        >
                            <video ref={ref} />
                            <div className="absolute h-1 w-full bg-red-500 top-0 botom-0 animate-line" />
                        </div>
                        <DrawerScan scannedData={scannedData} trigger={"Scanear"}>
                            <video ref={ref} />
                        </DrawerScan>
                    </div>
                    <button type="submit">Buscar</button>
                </form>
            </div>
        </>
    );
}

export default App;
