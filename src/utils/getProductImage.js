export const getProductImage = (product) => {
  if (!product) return "/img/no-image.png";

  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0];
  }

  if (typeof product.images === "string") {
    return product.images;
  }

  if (Array.isArray(product.image) && product.image.length > 0) {
    return product.image[0];
  }

  if (typeof product.image === "string") {
    return product.image;
  }

  return "/img/no-image.png";
};