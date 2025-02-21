import { addToCart, cart, loadFromStorage } from '../../../data/cart.js';

//not working properly

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {

  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem'); //mock a method

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    }); //study flaky test
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(saveToStorage).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});