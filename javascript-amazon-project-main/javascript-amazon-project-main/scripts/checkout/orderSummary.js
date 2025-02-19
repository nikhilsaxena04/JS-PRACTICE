import {cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //default import(only one per file); ESM version of dayjs
import { deliveryOptions } from '../../data/deliveryOptions.js';

// const today = dayjs(); //external library, read docs
// const deliveryDate = today.add(7, 'day'); // 7 days from now
// console.log(deliveryDate.format('dddd, MMMM D')); // Tuesday, June 21

export function renderOrderSummary(){
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
  
    let matchingProduct;
  
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
    //console.log(matchingProduct);
    const deliveryOptionsId = cartItem.deliveryOptionsId;
    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionsId) {
        deliveryOption = option;
      }
    });
  
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');
  
    cartSummaryHTML += 
  
      `<div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">
  
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                    Update
              </span>
              <span 
                class="delete-quantity-link link-primary
                  js-delete-link"
                data-product-id="${matchingProduct.id}">
                    Delete
              </span>
            </div>
          </div>
  
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
     </div>`;
  });
  //console.log(cartSummaryHTML);
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
  
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;
  
        html += `
          <div class="delivery-option
            js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
             ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        `
    });
    return html;
  }
  
  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;
  
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        //console.log(productId)
        removeFromCart(productId);
        //console.log(cart);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        //console.log(container);
        container.remove();
      });
  });
  
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
      });
  });
}