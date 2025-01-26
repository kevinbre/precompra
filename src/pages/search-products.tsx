import {Barcode, ScanBarcode} from "lucide-react";
import {FormEvent, useEffect, useMemo, useState} from "react";

import {DrawerScan} from "@/components/drawer-scan";
import {Input} from "@/components/ui/input";
import {Product, useCart} from "@/store/useCart";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const CARREFOUR_API_EAN = "https://www.carrefour.com.ar/api/catalog_system/pub/products/search?fq=alternateIds_Ean:";

export function SearchProducts() {
    const [barCode, setBarCode] = useState("");
    const [data, setData] = useState<Product | undefined>(undefined);
    const [scannedData, setScannedData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const addToCart = useCart((state) => state.addToCart);
    const cart = useCart((state) => state.cart);

    const store = "Carrefour";

    const searchProduct = (event?: FormEvent) => {
        event?.preventDefault();
        setIsLoading(true);
        fetch(`${CARREFOUR_API_EAN}${barCode}`)
            .then((res) => res.json())
            .then((item) => {
                const finalItem = item?.[0].items?.[0];

                setData({
                    id: finalItem.ean,
                    name: finalItem.name,
                    price: finalItem.sellers?.[0]?.commertialOffer?.Price,
                    priceWithoutDiscount: finalItem.sellers?.[0]?.commertialOffer?.PriceWithoutDiscount,
                    image: finalItem.images?.[0]?.imageUrl,
                    pricePerUnit: item?.[0]["Precio x unidad"]?.[0],
                });
                setIsLoading(false);
            });
    };
    const samePrice = data?.priceWithoutDiscount !== data?.price;

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
    }, [scannedData]); //eslint-disable-line

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-4 justify-center items-center">
                <div className="flex flex-col items-center justify-center gap-4">
                    <h2 className="text-xl font-semibold">Productos {store}</h2>

                    <div
                        className={cn(
                            "w-[200px] h-[200px] flex items-center justify-center flex-col gap-1",
                            isLoading && "animate-pulse bg-neutral-900",
                        )}
                    >
                        {data?.image ? (
                            <img alt={data?.name} src={data?.image} width={200} />
                        ) : (
                            <span className={cn("text-xs text-gray-200", isLoading && "text-neutral-900")}>
                                Por favor busque un producto
                            </span>
                        )}
                        <span className="text-xs text-neutral-400">{data?.pricePerUnit}</span>
                    </div>
                </div>
                {data && (
                    <div className="flex flex-col items-center">
                        <h4 className="font-medium">{data?.name}</h4>
                        <span className={cn("text-blue-500", samePrice ? "line-through" : "font-bold")}>
                            ${data?.priceWithoutDiscount}
                        </span>
                        {samePrice && <span className="text-red-500 font-bold">${data?.price}</span>}
                    </div>
                )}
                <Button
                    disabled={!data}
                    onClick={() => {
                        data && addToCart(data);
                    }}
                >
                    Agregar al carrito {quantity ? `(${quantity})` : ""}
                </Button>

                <form className="flex flex-col gap-4 justify-center items-center" onSubmit={searchProduct}>
                    <div className="flex gap-2 items-center">
                        <span className="w-6 h-6" />
                        <Input
                            className="p-2 rounded-md max-w-[170px]"
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
                    <Button disabled={!barCode} type="submit">
                        Buscar
                    </Button>
                </form>
                <div className="text-xs flex-col flex items-center justify-center">
                    <span className="flex">
                        <Barcode />
                        <Barcode />
                        <Barcode />
                        <Barcode className="rotate-180" />
                    </span>
                    <span className="h-4">{barCode}</span>
                </div>
            </div>
        </div>
    );
}
