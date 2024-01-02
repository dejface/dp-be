import { useState, useEffect } from 'react';
import { fetchTopProducts } from '@/src/api/fetch';
import { TopProductsParser } from '@/src/parsers/TopProductsParser';
import { TopProduct } from '@/src/types/TopProduct';

const useFetchTopProducts = () => {
    const [topProducts, setTopProducts] = useState<TopProduct[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const products = await fetchTopProducts();
            if (products) {
                const parsedData = TopProductsParser(products);
                setTopProducts(parsedData);
            } else {
                setError('Error fetching products');
            }
        };

        fetchData();
    }, []);

    return { topProducts, error };
};

export default useFetchTopProducts;