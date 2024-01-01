export interface FetchOptions {
    method: string;
    headers: {
        'Content-Type': string
        'Authorization': string;
    };
    body: string;
}

export const getFetchOptions = (query: string): FetchOptions => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`
        },
        body: JSON.stringify({ query })
    };
}