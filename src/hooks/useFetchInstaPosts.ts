import {useEffect, useState} from "react";
import {fetchInstaPosts} from "@/src/api/fetch";
import {InstaPost} from "@/src/types/InstaPost";
import {InstaPostsParser} from "@/src/parsers/InstaPostsParser";

const useFetchInstaPosts = () => {
    const [posts, setPosts] = useState<InstaPost[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const instaPosts = await fetchInstaPosts();
            if (instaPosts) {
                const parsedData = InstaPostsParser(instaPosts);
                setPosts(parsedData);
            } else {
                setError('Error fetching insta posts');
            }
        };

        fetchData();
    }, []);

    return { posts, error };
}

export default useFetchInstaPosts;