const localImageFallbacks = ['sneakers', 'headphones', 'watch', 'backpack'].map(
  (image) => `${import.meta.env.BASE_URL}mock/products/${image}.jpg`,
);

export const getLocalImageFallback = (id: number): string =>
  localImageFallbacks[Math.abs(id) % localImageFallbacks.length];
