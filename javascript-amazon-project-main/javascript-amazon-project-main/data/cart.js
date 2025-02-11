export const cart = [];

export function addToCart (productId) {
  let matchingItem;

  cart.find((cartItem) => { //.find used instead of .forEach, to stop searching after product is found
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity : 1
  });
}};