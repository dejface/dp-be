export const ReviewsQuery = `{
    reviewCollection {
        items {
            reviewer,
            description
            image {
                url,
                width,
                height
            }
        }
    }
}`;