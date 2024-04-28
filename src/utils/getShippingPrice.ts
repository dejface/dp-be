import { ShippingOption } from "@/src/types/Types";

export const getShippingPrice = (
    shippingOptions: ShippingOption[],
    selectedShippingOption: ShippingOption | null,
    hasFreeShipping: boolean,
) => {
    if (hasFreeShipping) {
        return 0;
    } else {
        return selectedShippingOption
            ? shippingOptions.find(
                  (option) => option.sys.id === selectedShippingOption.sys.id,
              )?.price ?? 0
            : null;
    }
};
