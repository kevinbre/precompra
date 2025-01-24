import {Barcode, ScanBarcode} from "lucide-react";
import {FormEvent, useEffect, useState} from "react";
import {toast} from "sonner";

import {DrawerScan} from "@/components/drawer-scan";
import {Input} from "@/components/ui/input";

const CARREFOUR_API_PRODUCT_NAME =
    "https://www.carrefour.com.ar/api/catalog_system/pub/products/search?fq=productName:";

const CARREFOUR_API_PRODUCT_ID = "https://www.carrefour.com.ar/api/catalog_system/pub/products/search?fq=productId:";

const getProductInfo = (code: string) =>
    `https://st.dynamicyield.com/spa/json?sec=8781555&ctx=%7B%22type%22%3A%22PRODUCT%22%2C%22data%22%3A%5B%22${code}%22%5D%2C%22lng%22%3A%22carrefourar0268%22%7D`;

export function SearchProducts() {
    const [barCode, setBarCode] = useState("");
    const [data, setData] = useState<any | undefined>(undefined);
    const [scannedData, setScannedData] = useState(false);

    const store = "Carrefour";

    const searchProduct = (event?: FormEvent) => {
        event?.preventDefault();
        fetch(getProductInfo(barCode))
            .then((res) => res.json())
            .then((res) => {
                fetch(`${CARREFOUR_API_PRODUCT_NAME}${res?.feedProperties?.name?.replaceAll?.(/[.+]/g, "")}`)
                    .then((res) => res.json())
                    .then((data) => {
                        const items = data.find((item: any) => item.EAN[0] === barCode);

                        if (!items) return;
                        fetch(
                            `${CARREFOUR_API_PRODUCT_ID}${items?.productId}&geoCoordinates=-58.98713;-27.43824&sc=1&country=ARG`,
                        )
                            .then((res) => res.json())
                            .then((idItems) => {
                                const finalItems = idItems.find((finalItem: any) => finalItem.EAN[0] === barCode);

                                console.log(finalItems);
                                setData(finalItems);
                            });
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

    console.log(data?.items);

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="h-full">
                {data ? (
                    <>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <h2 className="text-xl font-semibold">Productos {store}</h2>
                            {data?.items?.map((item: any) => {
                                return (
                                    <div key={item.itemId}>
                                        <img alt={item.name} src={item?.images?.[0]?.imageUrl} width={200} />
                                    </div>
                                );
                            })}
                            <span>{data?.["Precio x unidad"][0]}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4>{data?.items?.map((item: any) => item.name)}</h4>
                            <span className="text-blue-500 line-through">
                                ${data?.items?.[0]?.sellers?.[0]?.commertialOffer?.PriceWithoutDiscount}
                            </span>
                            <span className="text-red-500">
                                ${data?.items?.[0]?.sellers?.[0]?.commertialOffer?.Price}
                            </span>
                        </div>
                    </>
                ) : (
                    "Por favor busque un producto"
                )}
                <form className="flex flex-col gap-4 justify-center items-center" onSubmit={searchProduct}>
                    <div className="flex gap-4 items-center">
                        <Input
                            className="p-2 rounded-md"
                            placeholder="Ingrese código de barras"
                            type="text"
                            value={barCode}
                            onChange={(e) => setBarCode(e.currentTarget.value)}
                        />
                        <DrawerScan
                            scannedData={scannedData}
                            setBarCode={setBarCode}
                            setScannedData={setScannedData}
                            trigger={<ScanBarcode className="text-gray-400 hover:text-gray-50 transition-all" />}
                        />
                    </div>
                    <button type="submit">Buscar</button>
                </form>
            </div>
            <div className="text-xs flex-col flex items-center justify-center">
                <span className="flex">
                    <Barcode />
                    <Barcode />
                    <Barcode />
                    <Barcode className="rotate-180" />
                </span>
                {barCode}
            </div>
        </div>
    );
}
