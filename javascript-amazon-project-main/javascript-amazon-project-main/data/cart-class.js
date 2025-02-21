/*
-classes are object generators/constructors
-they have extra features, put setup code to make code cleaner
-after we crete the object, we can run it in constructor to setup the object
*/
class Cart {
  cartItems; //public property
  #localStorageKey; //private property, can't be accessed from outside of class

  constructor(localStorageKey) { /*setup code*/
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  } // this points to object we generate


  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
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
  }


  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }


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
  }


  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (productId !== cartItem.productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
  
    this.saveToStorage();
  }


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

const cart = new Cart('cart-oop');
const cart2 = new Cart('cart-2');
 /*each object we generate is called instance of the class*/

console.log(cart);
console.log(cart2);
//console.log(cart2 instanceof Cart);