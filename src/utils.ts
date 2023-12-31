import {AssetFile, createClient} from 'contentful';

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string
});

interface FetchImagesResult {
    leftImage: AssetFile | null;
    rightImage: AssetFile | null;
    error: string | null;
}

export const fetchImages = async (): Promise<FetchImagesResult> => {
    try {
        const [leftImage, rightImage] = await getHpTopImages();
        return { leftImage, rightImage, error: null };
    } catch (error) {
        console.error('Error fetching images:', error);
        return { leftImage: null, rightImage: null, error: 'Error fetching images' };
    }
};

const getHpTopImages = async (): Promise<[AssetFile, AssetFile]> => {
    const response = await client.getAssets();
    let hpTopLeft, hpTopRight;

    if (response.items) {
        hpTopLeft = response.items.find(item => item.fields.title === 'hp-top-left');
        hpTopRight = response.items.find(item => item.fields.title === 'hp-top-right');
    }

    if (!hpTopLeft || !hpTopLeft.fields.file || !hpTopRight || !hpTopRight.fields.file)
        throw new Error('Could not find hp-top-left or hp-top-right');

    return [ hpTopLeft.fields.file, hpTopRight.fields.file];
};

export default getHpTopImages;