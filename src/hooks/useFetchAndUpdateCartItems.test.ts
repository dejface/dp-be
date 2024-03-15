import { useFetchAndUpdateCartItems } from "@/src/hooks/useFetchAndUpdateCartItems";
import { fetchProductInCartLocalizedInfo } from "@/src/api/fetch";
import { renderHook, waitFor } from "@testing-library/react";
import { generateCartItem } from "../../test/helpers/generateCartItem";

jest.mock("@/api/fetch");

describe("useFetchAndUpdateCartItems hook", () => {
    it("fetches and updates cart items correctly", async () => {
        const items = [
            generateCartItem("1", 100, 2),
            generateCartItem("2", 200, 1),
        ];
        const setItems = jest.fn();
        const locale = "cs";

        (fetchProductInCartLocalizedInfo as jest.Mock).mockResolvedValue([
            {
                sys: { id: "1" },
                title: "New Title 1",
                price: 150,
                slug: "new-slug-1",
            },
            {
                sys: { id: "2" },
                title: "New Title 2",
                price: 250,
                slug: "new-slug-2",
            },
        ]);

        renderHook(() => useFetchAndUpdateCartItems(items, setItems, locale));

        await waitFor(() =>
            expect(setItems).toHaveBeenCalledWith([
                {
                    ...items[0],
                    title: "New Title 1",
                    price: 150,
                    slug: "new-slug-1",
                },
                {
                    ...items[1],
                    title: "New Title 2",
                    price: 250,
                    slug: "new-slug-2",
                },
            ]),
        );
    });
});
