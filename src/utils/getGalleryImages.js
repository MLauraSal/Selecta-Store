 export const getGalleryImages = (item) => {
    if (!item) return [];

    if (Array.isArray(item.images) && item.images.length > 0) {
      return item.images;
    }

    if (typeof item.images === "string") {
      return [item.images];
    }

    if (Array.isArray(item.image) && item.image.length > 0) {
      return item.image;
    }

    if (typeof item.image === "string") {
      return [item.image];
    }

    return [];
  };