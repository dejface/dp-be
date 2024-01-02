import { useState, useEffect } from 'react';
import { fetchHpTopImages } from '@/src/api/fetch';
import { HpTopImageParser } from '@/src/parsers/HpTopImageParser';
import { HpTopImage } from '@/src/types/HpTopImage';

const useFetchHpTopImages = () => {
    const [hpTopLeft, setHpTopLeft] = useState<HpTopImage | null>(null);
    const [hpTopRight, setHpTopRight] = useState<HpTopImage | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const topImages = await fetchHpTopImages();
            if (topImages) {
                const parsedData = HpTopImageParser(topImages);
                if (parsedData) {
                    const [leftImage, rightImage] = parsedData;
                    setHpTopLeft(leftImage);
                    setHpTopRight(rightImage);
                } else {
                    setError('Error parsing images');
                }
            } else {
                setError('Error fetching images');
            }
        };

        fetchData();
    }, []);
    return { hpTopLeft, hpTopRight, error };
};

export default useFetchHpTopImages;