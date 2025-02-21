const cart = {
  cartItems: undefined, //can't use export & let inside

  /*
  -in OOPs we organize our code into objects to structure our code in a better way;
  -OOPs= tries to represent our physical:
    like physical cart = digital cart;

  -use PascalCase for things that generates objects
  -function inside an object = method
  -don't pass arrow functions inside objects because they don't bind well with (this.function)
  -inside an object: 
    export function loadFromStorage() {} === loadFromStorage: function() {}
      -shorthand syntax: loadFromStorage: function() {} === loadFromStorage() {}
  */

  /*
  loadFromStorage: function() {
    cart.cartItems = JSON.parse(localStorage.getItem('cart'));
    
    if (!cart.cartItems) {
      cart.cartItems = [{
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
  improved code using this, is given below: 
  so we don't have to rename our function everywhere;
  this gives us outer object so it doesn't matter what name outer variable is;
  */

  loadFromStorage: function() {
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
    
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
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
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

cart.loadFromStorage();
// cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
// console.log(cart);


/*
const businessCart = {
  cartItems: undefined,
  
  
  loadFromStorage: function() {
    this.cartItems = JSON.parse(localStorage.getItem('cart-business'));
    
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
    localStorage.setItem('cart-business', JSON.stringify(this.cartItems));
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

businessCart.loadFromStorage();

// console.log(cart);
// console.log(businessCart);
//objects helps us to create two separate carts, both with their distinct items, like normal cart and business cart
*/