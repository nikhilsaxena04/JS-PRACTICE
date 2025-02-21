import { addToCart } from './cart.js';

/*here we'll use functions to generate the cart objects, use PascalCase*/
function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
  
  
    loadFromStorage: function() {
      // this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
      this.cartItems = JSON.parse(localStorage.getItem('localStorageKey'));
      
      if (!this.cartItems) {
        this.cartItems = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionsId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionsId: '2'
        }];
      }
    },
  
  
    saveToStorage() {
      localStorage.setItem('localStorageKey', JSON.stringify(this.cartItems));
    },
  
  
    addToCart(productId) {
      let matchingItem;
    
        this.cartItems.find((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
    
        if (matchingItem) {
          matchingItem.quantity += 1;
        } else {
          this.cartItems.push({
            productId: productId,
            quantity : 1,
            deliveryOptionsId: '1'
        });
      }
  
      this.saveToStorage();
    },
  
  
    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (productId !== cartItem.productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
    
      this.saveToStorage();
    },
  
  
    updateDeliveryOption(productId, deliveryOptionsId) {  
      let matchingItem;
    
      this.cartItems.find((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      matchingItem.deliveryOptionsId = deliveryOptionsId;
      this.saveToStorage();
    }
  };

  return cart;
}

/*i
-instead of copy-pastinga and repeating the code, we can use the Cart function to generate multiple cart objects with different keys;
-use key as parameters so data is saved and accessed separately;
*/
const cart = Cart('cart-oop');
const cart2 = Cart('cart-2');

cart.loadFromStorage();
cart2.loadFromStorage();

console.log(cart);
console.log(cart2);