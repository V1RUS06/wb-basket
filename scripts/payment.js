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
      card_number: '1234 56•• •••• 1234',
      card_day: '01/30',
    },
    {
      id: 3,
      img_source: '/assets/icons/master_card.svg',
      card_number: '1234 56•• •••• 1234',
      card_day: '01/30',
    },
    {
      id: 4,
      img_source: '/assets/icons/maestro_card.svg',
      card_number: '1234 56•• •••• 1234',
      card_day: '01/30',
    },
  ],
  selectedCardIndex: 0,

  renderPayment(){
    const payment = `
    <div class="modal">
      <div class="modal_header">
        <div class="modal_title">Способ оплаты</div>
        <div class="close">
          <img class="close_img" src="/assets/icons/close.svg" alt="close">
        </div>
      </div>
      
      <div class="content">
        ${this.cards.map((card, index) => {
          return`<div class="cards_container">
            <label class="circle_checkbox">
              <input data-id="${card.id}" ${this.selectedCardIndex === index ? 'checked' : ''} class="check_input" type="checkbox">            <span class="circle_check_box"></span>
            </label>
            <div class="bank_card card_margin pl-10">
              <img src="${card.img_source}" alt="bank_card">
                ${card.card_number}
            </div>
          </div>`})}
      </div>
      
      <button class="modal_button">Выбрать</button>

    </div>
    
    <div class="overlay"></div>
    
    <div class="white_wrapper">
      <div class="white_wrapper_header">
        <div class="white_wrapper_title">Способ оплаты</div>
        <div class="white_wrapper_change_btn">Изменить</div>
      </div>

      <div class="bank_card">
        <img src="${this.cards[this.selectedCardIndex].img_source}" alt="bank_card">
              ${this.cards[this.selectedCardIndex].card_number}
        <span>${this.cards[this.selectedCardIndex].card_day}</span>
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
