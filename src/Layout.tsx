import React, { useEffect, useState } from 'react';
import Header from '@/src/components/Header';
import { Analytics } from '@vercel/analytics/react';
import {fetchImages} from '@/src/utils';
import {AssetFile} from "contentful";
import HpTopImages from "@/src/components/HpTopImages";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [hpTopLeft, setHpTopLeft] = useState<AssetFile | null>(null);
    const [hpTopRight, setHpTopRight] = useState<AssetFile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { leftImage, rightImage, error } = await fetchImages();
            setHpTopLeft(leftImage);
            setHpTopRight(rightImage);
            setError(error);
        };

        fetchData();
    }, []); // Empty dependency array to run the effect only once when the component mounts

    if (error || !hpTopLeft || !hpTopRight) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="columns is-gapless is-centered has-background-white">
            <div className="column is-10 is-offset-1">
                <Header />
                <HpTopImages leftImage={hpTopLeft} rightImage={hpTopRight} />
            </div>
            <Analytics />
        </div>
    );
};

export default Layout;