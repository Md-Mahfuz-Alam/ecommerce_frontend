export const initialValues = (product?: ProductType) => {
  if (product) {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      quantity_available: product.quantity_available,
      seller_id: product.seller.id,
      category_id: product.category.id,
      images: product.images,
    };
  } else {
    return {
      seller_id: 1,
    };
  }
};
