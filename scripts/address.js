export const Address = {
  addresses: [
    {
      id: 1,
      rate: 4.9,
      workTime: "Ежедневно с 10 до 21 ",
      address: "Бишкек, улица Ахматбека Суюмбаева, 12/1",
    },
    {
      id: 2,
      rate: 4.3,
      workTime: "Ежедневно с 10 до 21 ",
      address: "Бишкек, улица Жукеева-Пудовкина, 77/1",
    },
    {
      id: 3,
      rate: 5,
      workTime: "Ежедневно с 10 до 21 ",
      address: "Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1",
    },
  ],
  points_addresses: [
    {
      id: 1,
      rate: 4.2,
      workTime: "Ежедневно с 10 до 21 ",
      address: "Москва, улица Табышалиева, 22",
    },
    {
      id: 2,
      rate: 4.3,
      workTime: "Ежедневно с 10 до 21 ",
      address: "Питер, улица Табышалиева, 45",
    },
  ],
  activeAddressIndex: 0,
  delivery_method: "delivery_point", // courier || delivery_point

  changeSelectedAddressIndex(index) {
    this.activeAddressIndex = index;
  },

  changeDeliveryMethod(method) {
    this.delivery_method = method;
  },
  renderDelivery() {
    if (this.delivery_method === "delivery_point") {
      this.renderPointAddresses();
    } else {
      this.renderAddresses();
    }
  },
  renderPointAddresses() {
    const points_addresses = this.points_addresses
      .map((address, index) => {
        return `
              <div class="address_card_container">

            <label class="circle_checkbox_address w-100" data-index="${index}">
              <input class="check_input" ${
                index === this.selectedCardIndex ? "checked" : ""
              } data-id="${address.id}" ${
          this.selectedCardIndex === index ? "checked" : ""
        }  type="radio" name="radio-btn">            
              <span class="circle_check_box_address"></span>
              <div class="address_card pl-10">
                <span class="address_span">${address.address}</span>
              </div>
            </label>
             <svg class="trash_icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 3C0.5 2.72386 0.723858 2.5 1 2.5H15C15.2761 2.5 15.5 2.72386 15.5 3C15.5 3.27614 15.2761 3.5 15 3.5H1C0.723858 3.5 0.5 3.27614 0.5 3Z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4584 2.5H14.5059L13.6411 13.6926C13.5405 14.9947 12.4546 16 11.1486 16H4.84639C3.54299 16 2.45829 14.9986 2.35435 13.6994L1.4584 2.5ZM2.5416 3.5L3.35117 13.6196C3.41353 14.3992 4.06435 15 4.84639 15H11.1486C11.9322 15 12.5837 14.3968 12.6441 13.6155L13.4256 3.5H2.5416Z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 3.5H5V1.46875C5 0.657582 5.65758 0 6.46875 0H9.53125C10.3424 0 11 0.657582 11 1.46875V3.5ZM6.46875 1C6.20987 1 6 1.20987 6 1.46875V2.5H10V1.46875C10 1.20987 9.79013 1 9.53125 1H6.46875Z" fill="black"/>
             </svg>
            
        </div>`;
      })
      .join("");

    const container = document.querySelector(".addresses_cards_container");
    container.innerHTML = points_addresses;
  },

  renderAddresses() {
    const addresses = this.addresses
      .map((address, index) => {
        return `
              <div class="address_card_container">
                <label class="circle_checkbox_address w-100" data-index="${index}">
              <input class="check_input" data-id="${address.id}" ${
          this.selectedCardIndex === index ? "checked" : ""
        }  type="radio" name="radio-btn">            
              <span class="circle_check_box_address"></span>
              <div class="address_card pl-10">
                <span class="address_span">${address.address}</span>
              </div>
            </label>
             <svg class="trash_icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 3C0.5 2.72386 0.723858 2.5 1 2.5H15C15.2761 2.5 15.5 2.72386 15.5 3C15.5 3.27614 15.2761 3.5 15 3.5H1C0.723858 3.5 0.5 3.27614 0.5 3Z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4584 2.5H14.5059L13.6411 13.6926C13.5405 14.9947 12.4546 16 11.1486 16H4.84639C3.54299 16 2.45829 14.9986 2.35435 13.6994L1.4584 2.5ZM2.5416 3.5L3.35117 13.6196C3.41353 14.3992 4.06435 15 4.84639 15H11.1486C11.9322 15 12.5837 14.3968 12.6441 13.6155L13.4256 3.5H2.5416Z" fill="black"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 3.5H5V1.46875C5 0.657582 5.65758 0 6.46875 0H9.53125C10.3424 0 11 0.657582 11 1.46875V3.5ZM6.46875 1C6.20987 1 6 1.20987 6 1.46875V2.5H10V1.46875C10 1.20987 9.79013 1 9.53125 1H6.46875Z" fill="black"/>
             </svg>
            
            </div>
            `;
      })
      .join("");

    const container = document.querySelector(".addresses_cards_container");
    container.innerHTML = addresses;
  },

  renderAddressModal() {
    const modal = `
     <div class="modal address_modal-width">
      <div class="modal_header">
        <div class="modal_title">Способ доставки</div>
        <div class="close_btn">
          <img class="close_img" src="/assets/icons/close.svg" alt="close">
        </div>
      </div>

      <div class="delivery_methods_container">
        <button data-action="delivery_point" class="delivery_method_btn ${
          this.delivery_method === "delivery_point" ? "active" : ""
        }">В пункт выдачи</button>
        <button data-action="courier" class="delivery_method_btn ${
          this.delivery_method === "courier" ? "active" : ""
        }">Курьером</button>
      </div>
      
      <div class="content">
        <span class="content_title">Мои адреса</span>
        <div class="addresses_cards_container"></div>
      

      </div>
      
      <button class="modal_button">Выбрать</button>

    </div>
    
    <div class="overlay"></div>`;

    const container = document.querySelector(".address_container");

    container.insertAdjacentHTML("afterend", modal);
  },

  renderAddress() {
    const addressContainer = `
            <div class="white_wrapper">
          <div class="white_wrapper_header">
            <div class="white_wrapper_title">Способ доставки</div>
            <div data-action="address-modal" class="white_wrapper_change_btn change-btn">Изменить</div>
          </div>
          <div class='pickup_point_container'>
            <div class="pickup_point_section">
              <div class="pickup_left_container">
                <div class="pickup_point_title">Пункт выдачи</div>
              </div>
              <div class="pickup_right_container">
                <div class="pickup_point_address address_span">${
                  this.addresses[this.activeAddressIndex].address
                }</div>
                <div class="pickup_point_info">
                  <img src="/assets/icons/Star.svg" alt="star">
                  <span class="address_rate">${
                    this.addresses[this.activeAddressIndex].rate
                  }</span>
                  <div class="pickup_point_work_time">
                    ${this.addresses[this.activeAddressIndex].workTime}
                  </div>
                </div>
              </div>
            </div>
            <div class="pickup_point_section mm18">
              <div class="pickup_left_container">
                <div class="pickup_point_title">Стоимость доставки</div>
              </div>
              <div class="pickup_right_container column_container">
                <div class="delivery_cost">Бесплатно</div>
              </div>

            </div>
            <div class="pickup_point_section mm18">
              <div class="pickup_left_container ">
                <div class="pickup_point_title">5—6 февраля</div>
              </div>

              <div class="pickup_right_container row_container mm12">
                <div class="product_card">
                  <img src="/assets/images/product_1.png" alt="product">
                </div>
                <div class="product_card">
                  <img src="/assets/images/product_2.png" alt="product">
                </div>
                <div class="product_card">
                  <img src="/assets/images/product_3.png" alt="product">
                </div>
              </div>

            </div>
            <div class="pickup_point_section mm24">
              <div class="pickup_left_container">
                <div class="pickup_point_title">7—8 февраля</div>
              </div>

              <div class="pickup_right_container row_container mm12">
                <div class="product_card">
                  <img src="/assets/images/product_3.png" alt="product">
                </div>
              </div>
            </div>
          </div>
          <div class="bottom_info_container">
            <img src="/assets/icons/done_green.svg" alt="done_green">
            <div>
              Обратная доставка товаров на склад при отказе — <span class="green_info tooltip">
              бесплатно
              <span class="tooltip_container tooltip_text w-300">
                Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно
              </span>
              </span>
            </div>
          </div>
        </div>
    `;

    const container = document.querySelector(".address_container");
    container.innerHTML = addressContainer;
  },
};
