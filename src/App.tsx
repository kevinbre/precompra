import { FormEvent, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function App() {
    const [barCode, setBarCode] = useState("");
    const [data, setData] = useState<any[] | undefined>(undefined);

    const [scannedData, setScannedData] = useState("");

    console.log("DATA", scannedData);

    const searchProduct = (event: FormEvent) => {
        event.preventDefault();
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
                console.log(err);
            });
    };

    return (
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

            <BarcodeScannerComponent
                height={500}
                width={500}
                onUpdate={(err, result) => {
                    if (result) setBarCode(result.text);
                    else setScannedData("Not Found");
                }}
            />
            <form onSubmit={searchProduct}>
                <input
                    className="p-2 rounded-md"
                    placeholder="Enter product id"
                    type="text"
                    onChange={(e) => setBarCode(e.currentTarget.value)}
                />
                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}

export default App;
