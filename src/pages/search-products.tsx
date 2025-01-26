import {Barcode, ScanBarcode} from "lucide-react";
import {FormEvent, useEffect, useMemo, useState} from "react";
import {toast} from "sonner";

import {DrawerScan} from "@/components/drawer-scan";
import {Input} from "@/components/ui/input";
import {Product, useCart} from "@/store/useCart";

const CARREFOUR_API_PRODUCT_NAME =
    "https://www.carrefour.com.ar/api/catalog_system/pub/products/search?fq=productName:";

const CARREFOUR_API_PRODUCT_ID = "https://www.carrefour.com.ar/api/catalog_system/pub/products/search?fq=productId:";

const getProductInfo = (code: string) =>
    `https://st.dynamicyield.com/spa/json?sec=8781555&ctx=%7B%22type%22%3A%22PRODUCT%22%2C%22data%22%3A%5B%22${code}%22%5D%2C%22lng%22%3A%22carrefourar0268%22%7D`;

export function SearchProducts() {
    const [barCode, setBarCode] = useState("");
    const [data, setData] = useState<Product | undefined>(undefined);
    const [scannedData, setScannedData] = useState(false);

    const addToCart = useCart((state) => state.addToCart);
    const cart = useCart((state) => state.cart);

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
                        fetch(`${CARREFOUR_API_PRODUCT_ID}${items?.productId}`)
                            .then((res) => res.json())
                            .then((idItems) => {
                                const finalItems = idItems.find((finalItem: any) => finalItem.EAN[0] === barCode);

                                setData({
                                    id: finalItems?.items?.[0]?.itemId,
                                    name: finalItems?.items?.[0]?.name,
                                    price: finalItems?.items?.[0]?.sellers?.[0]?.commertialOffer?.Price,
                                    priceWithoutDiscount:
                                        finalItems?.items?.[0]?.sellers?.[0]?.commertialOffer?.PriceWithoutDiscount,
                                    image: finalItems?.items?.[0]?.images?.[0]?.imageUrl,
                                    pricePerUnit: finalItems?.["Precio x unidad"][0],
                                });
                            });
                    });
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    const quantity = useMemo(() => {
        const item = cart.find((item) => item?.id === data?.id);

        return item?.quantity ?? 0;
    }, [cart, data?.id]);

    useEffect(() => {
        if (scannedData) {
            searchProduct();
            setTimeout(() => {
                setScannedData(false);
            }, 2000);
        }
    }, [scannedData]);

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="h-full">
                {data ? (
                    <>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <h2 className="text-xl font-semibold">Productos {store}</h2>

                            <div key={data.id}>
                                <img alt={data.name} src={data?.image} width={200} />
                            </div>

                            <span>{data.pricePerUnit}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4>{data?.name}</h4>
                            <span className="text-blue-500 line-through">${data?.priceWithoutDiscount}</span>
                            <span className="text-red-500">${data?.price}</span>
                        </div>
                        <button
                            onClick={() => {
                                addToCart(data);
                            }}
                        >
                            Agregar al carrito {quantity ? `(${quantity})` : ""}
                        </button>
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
