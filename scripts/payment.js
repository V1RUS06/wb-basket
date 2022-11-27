export const Payment = {
  cards: [
    {
      id: 1,
      img_source: '/assets/icons/card_mir.svg',
      card_number: '1234 56•• •••• 1234',
      card_day: '01/30',
    },
    {
      id: 2,
      img_source: '/assets/icons/visa_card.svg',
      card_number: '1234 56•• •••• 2222',
      card_day: '01/30',
    },
    {
      id: 3,
      img_source: '/assets/icons/master_card.svg',
      card_number: '1234 56•• •••• 3333',
      card_day: '01/30',
    },
    {
      id: 4,
      img_source: '/assets/icons/maestro_card.svg',
      card_number: '1234 56•• •••• 4444',
      card_day: '01/30',
    },
  ],
  selectedCardIndex: 0,

  changeCardInState(index){
    this.selectedCardIndex = index
  },

  renderPaymentModal(){
    const cards = this.cards.map((card, index) => {
      return`<div class="cards_container">
            <label class="circle_checkbox" data-index="${index}">
              <input ${index === this.selectedCardIndex ? 'checked' : ''} data-id="${card.id}" ${this.selectedCardIndex === index ? 'checked' : ''} class="check_input" type="radio" name="radio-btn">            
              <span class="circle_check_box"></span>
              <div class="bank_card card_margin pl-10">
              <img src="${card.img_source}" alt="bank_card" class="card_img">
                ${card.card_number}
            </div>
            </label>
            
          </div>`}).join('')

    const modal = `
     <div class="modal">
      <div class="modal_header">
        <div class="modal_title">Способ оплаты</div>
        <div class="close_btn">
          <img class="close_img" src="/assets/icons/close.svg" alt="close">
        </div>
      </div>
      
      <div class="content">
        ${cards}
      </div>
      
      <button class="modal_button">Выбрать</button>

    </div>
    
    <div class="overlay"></div>`

    const container = document.querySelector('.payment_container')

    container.insertAdjacentHTML('afterend', modal)
  },

  renderPayment(){
    const payment = `    
    <div class="white_wrapper">
      <div class="white_wrapper_header">
        <div class="white_wrapper_title">Способ оплаты</div>
        <div data-action="payment-modal" class="white_wrapper_change_btn change-btn">Изменить</div>
      </div>

      <div class="bank_card">
        <img id="img_card_on_payment_container" src="${this.cards[this.selectedCardIndex].img_source}" alt="bank_card">
              
        <span class="card-span">${this.cards[this.selectedCardIndex].card_number} ${this.cards[this.selectedCardIndex].card_day}</span>
      </div>

      <div class="comment">
        Спишем оплату с карты при получении
      </div>
    </div>
    `
    const listContainer = document.querySelector('.payment_container')

    listContainer.innerHTML = payment
  }
}
