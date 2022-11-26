import {Cart} from "./cart.js";
import {Payment} from "./payment.js";


window.addEventListener('load', () => {
  Cart.renderCart()
  rerenderFinalPrice() // Начальное обновление цены
  addListenerOnCheckboxes();
  addListenerOnProductCounter();
})

function addListenerOnProductCounter() {
  const increasedElementCountButtons = document.querySelectorAll('.counter_plus')
  const decreaseElementCountButtons = document.querySelectorAll('.counter_minus')

  increasedElementCountButtons.forEach(increaseBtn => {
    increaseBtn.addEventListener('click', (e) => {
      const id = e.target.dataset.id
      const counter = e.target.previousElementSibling

      Cart.increaseProductCount(id)
      rerenderCount(counter, id)
      rerenderFinalPrice()

      changeQuantityBasedPrice(id)

    })

  })

  decreaseElementCountButtons.forEach(increaseBtn => {
    increaseBtn.addEventListener('click', (e) => {
      const id = e.target.dataset.id
      const counter = e.target.nextElementSibling

      Cart.decreaseProductCount(id)
      rerenderCount(counter, id)
      rerenderFinalPrice()
      changeQuantityBasedPrice(id)
    })

  })

}

function addListenerOnCheckboxes() {
  const checkboxes = document.querySelectorAll('.check_box');
  const selectAllCheckbox = document.getElementById('select_all');

  selectAllCheckbox.addEventListener('click', (e) => {
    Cart.onSelectAll()
    rerenderFinalPrice();
  })



  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', (e) => {
      const input = e.target.previousElementSibling;
      const id = input.dataset.id

      if (!input || !id) {
        return;
      }

      Cart.onSelectElement(id)
      rerenderFinalPrice()
    })
  })
}

function rerenderFinalPrice() {
  const finalPriceSpan = document.querySelector('.final_price')
  const finalPriceMobileSpan = document.querySelector('.final_price_mobile')
  const finalPrice = Cart.getFinalBasketPrice();

  finalPriceSpan.textContent = `${finalPrice} сом`;
  finalPriceMobileSpan.textContent = `${finalPrice} сом`;
}
function rerenderCount(counter, id) {
  const productIndex = Cart.cart.findIndex(el => el.id === +id)

  counter.textContent = Cart.cart[productIndex].count
}

function changeQuantityBasedPrice(id) {
  const productIndex = Cart.cart.findIndex(el => el.id === +id)

  const finalPriceElementContainer = document.querySelectorAll('.product_cost_container')[productIndex]
  const finalPriceElementMobileContainer = document.querySelectorAll('.product_cost_container_mobile')[productIndex]
  const price = finalPriceElementContainer.querySelector('.cost')
  const priceWithoutDiscount = finalPriceElementContainer.querySelector('.cost_without-discount')
  const mobilePrice = finalPriceElementMobileContainer.querySelector('.cost')
  const mobilePriceWithoutDiscount = finalPriceElementMobileContainer.querySelector('.cost_without-discount')

  const {newPrice, lastPrice} = Cart.getQuantityBasedPrice(id)

  price.textContent = `${newPrice} сом`;
  mobilePrice.textContent = `${newPrice} сом`;
  priceWithoutDiscount.textContent = `${lastPrice} сом`;
  mobilePriceWithoutDiscount.textContent = `${lastPrice} сом`;
}
