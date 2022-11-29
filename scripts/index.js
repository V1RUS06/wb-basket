import {Cart} from "./cart.js";
import {Payment} from "./payment.js";
import {Address} from "./address.js";


window.addEventListener('load', () => {
  Cart.renderCart()
  Address.renderAddress()
  Payment.renderPayment()

  addListenersOnArrows()
  rerenderFinalPrice() // Начальное обновление цены
  addListenerOnCheckboxes();
  addListenerOnProductCounter();
  addModalsListeners();
})

function addListenersOnArrows(){
  const firstArrow = document.getElementById('first_arrow')
  const secondArrow = document.getElementById('second_arrow')
  const activeBasketContainer = document.getElementById('active_basket_container')
  const disabledBasketContainer = document.getElementById('disabled_basket_container')

  firstArrow.addEventListener('click', e => rotateArrowAndHideContainer(activeBasketContainer, e.target))
  secondArrow.addEventListener('click', e => rotateArrowAndHideContainer(disabledBasketContainer, e.target))
}

function rotateArrowAndHideContainer(container, arrow) {
    if (arrow.classList.contains('rotate')){
      arrow.classList.remove('rotate')
      container.classList.remove('hidden')
      return
    }
    arrow.classList.add('rotate')
    container.classList.add('hidden')

}

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

function addModalsListeners(){

  const changeButtons = document.querySelectorAll('.change-btn')
  changeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const action = e.target.dataset.action

      if(action ==='payment-modal'){
        Payment.renderPaymentModal()
        addPaymentModalListeners()
      }
      if (action === 'address-modal'){
        Address.renderAddressModal()
        Address.renderDelivery();
        addAddressModalListeners()
      }
    })
  })

}

function addAddressModalListeners() {
  const closeBtn = document.querySelector('.close_btn')
  const checkboxesLabel = document.querySelectorAll('.circle_checkbox_address')
  const chooseBtn = document.querySelector('.modal_button')

  closeBtn.addEventListener('click', e => {
    closeModal()
  })

  checkboxesLabel.forEach(elem => {
    elem.addEventListener('click', e => {
      const index = e.currentTarget.dataset.index
      Address.changeSelectedAddressIndex(index)
    })
  })

  chooseBtn.addEventListener('click', () => {
    rerenderAddresses()
  })

  const methodsButtons = document.querySelectorAll('.delivery_method_btn')

  methodsButtons.forEach(button => {
    button.addEventListener('click', e => {
      const button = e.target
      const action = e.currentTarget.dataset.action
      if (action === 'courier') {
        button.classList.add('active')
        Address.changeDeliveryMethod(action)
        button.previousElementSibling.classList.remove('active')
      }
      if (action === 'delivery_point') {
        button.classList.add('active')
        Address.changeDeliveryMethod(action)
        button.nextElementSibling.classList.remove('active')
      }
      Address.renderDelivery()
    })
  })

}

function addPaymentModalListeners() {
  const closeBtn = document.querySelector('.close_btn')
  const checkboxesLabel = document.querySelectorAll('.circle_checkbox')
  const chooseBtn = document.querySelector('.modal_button')


  closeBtn.addEventListener('click', e => {
    closeModal()
  })
  checkboxesLabel.forEach(elem => {
    elem.addEventListener('click', e => {
      const index = e.currentTarget.dataset.index
      Payment.changeCardInState(index)
    })
  })

  chooseBtn.addEventListener('click', () => {
    rerenderCard()
  })
}


function closeModal(){
  const modal = document.querySelector('.modal')
  const overlay = document.querySelector('.overlay')

  modal.remove()
  overlay.remove()
}



function addListenerOnCheckboxes() {
  const checkboxes = document.querySelectorAll('.check_box');
  const selectAllCheckbox = document.getElementById('select_all');
  const paymentCheckbox = document.getElementById('payment_checkbox')
  const paymentCheckboxComment = document.getElementById('payment_checkbox_comment')
  const payBtn = document.getElementById('pay_button')
  const price = Cart.getFinalBasketPrice()

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

  paymentCheckbox.addEventListener('click', e => {
    if (paymentCheckboxComment.classList.contains('hidden')){
      paymentCheckboxComment.classList.remove('hidden')
      payBtn.innerHTML = `Заказать`
      rerenderFinalPrice()
      return
    }
    paymentCheckboxComment.classList.add('hidden')
    payBtn.innerHTML = `Оплатить ${price} сом`
    rerenderFinalPrice()
  })
}


function rerenderFinalPrice() {
  const finalPriceSpan = document.querySelector('.final_price')
  const finalPriceMobileSpan = document.querySelector('.final_price_mobile')
  const finalPrice = Cart.getFinalBasketPrice();

  finalPriceSpan.textContent = `${finalPrice} сом`;
  finalPriceMobileSpan.textContent = `${finalPrice} сом`;
  rerenderPayBtnText()
}

function rerenderPayBtnText () {
  const payBtn = document.getElementById('pay_button')
  const finalPrice = Cart.getFinalBasketPrice();
  const paymentCheckboxComment = document.getElementById('payment_checkbox_comment')
  if (paymentCheckboxComment.classList.contains('hidden')) {
    payBtn.innerHTML = `Оплатить ${finalPrice} сом`
  }
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

function rerenderCard() {
  const cardSpan = document.querySelectorAll('.card-span')
  const cardImg = document.getElementById('img_card_on_payment_container')
  const cardImgMobile = document.getElementById('img_card_on_payment_mobile_container')
  const cardImgOnBasket = document.getElementById('img_card_on_payment_basket_container')
  const index = Payment.selectedCardIndex

  cardSpan.forEach(elem => {
    elem.textContent = Payment.cards[index].card_number + " " + Payment.cards[index].card_day
  })
  cardImg.src = Payment.cards[index].img_source
  cardImgOnBasket.src = Payment.cards[index].img_source
  cardImgMobile.src = Payment.cards[index].img_source
  closeModal()
}

function rerenderAddresses() {
  const addressSpan = document.querySelectorAll('.address_span')
  const addressRateSpan = document.querySelectorAll('.address_rate')
  const index = Address.activeAddressIndex
  const delivery_method = Address.delivery_method


  addressSpan.forEach(elem => {
    if (delivery_method === 'courier') {
      elem.textContent = Address.addresses[index].address
    } else {
      elem.textContent = Address.points_addresses[index].address
    }
  })
  addressRateSpan.forEach(elem => {
    if (delivery_method === 'courier') {
      elem.textContent = Address.addresses[index].rate
    } else {
      elem.textContent = Address.points_addresses[index].rate
    }
  })
  closeModal()
}
