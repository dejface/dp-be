export const HpTopImagesQuery = `{
  assetCollection (where: {title_in: ["hp-top-right", "hp-top-left"]}) {
    items {
        title,
        url,
        width,
        height
    }
  }
}`;