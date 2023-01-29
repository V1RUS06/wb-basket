export const Cart = {
  cart: [
    {
      id: 1,
      name: "Футболка UZcotton мужская",
      image_source: "assets/images/product_1.png",
      details: ["Цвет: белый", "Размер: 56"],
      storage: "Коледино WB",
      seller: "OOO Вайлдберриз",
      count: 1,
      totalLeft: 2,
      newPrice: 522,
      lastPrice: 1051,
      selected: false,
    },
    {
      id: 2,
      name: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
      image_source: "assets/images/product_2.png",
      details: ["Цвет: прозрачный"],
      storage: "Коледино WB",
      seller: "OOO Вайлдберриз",
      count: 3,
      newPrice: 12000,
      totalLeft: 200,
      lastPrice: 15000,
      selected: true,
    },
    {
      id: 3,
      name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell ',
      image_source: "assets/images/product_3.png",
      details: [],
      storage: "Коледино WB",
      seller: "OOO Вайлдберриз",
      count: 1,
      newPrice: 494,
      totalLeft: 200,
      lastPrice: 950,
      selected: true,
    },
  ],
  selectedAll: false,

  deleteCartItem: (deleteItem) =>
    this.cart.filter((item) => item.id === deleteItem.id),

  getFinalBasketPrice() {
    return this.cart.reduce((sum, item) => {
      if (item.selected) {
        return sum + item.newPrice * item.count;
      }
      return sum;
    }, 0);
  },
  getSelectedItems() {
    return this.cart.reduce((acc, item) => {
      if (item.selected) {
        return (acc += 1);
      }
      return acc;
    }, 0);
  },
  getQuantityBasedPrice(id) {
    const selectedElementIndex = this.cart.findIndex((elem) => elem.id === +id);

    return {
      newPrice:
        this.cart[selectedElementIndex].count *
        this.cart[selectedElementIndex].newPrice,
      lastPrice:
        this.cart[selectedElementIndex].count *
        this.cart[selectedElementIndex].lastPrice,
    };
  },

  onSelectElement(id) {
    const selectedElementIndex = this.cart.findIndex((elem) => elem.id === +id);

    this.cart[selectedElementIndex].selected =
      !this.cart[selectedElementIndex].selected;
  },

  onSelectAll() {
    const productsCheckboxes = document.querySelectorAll(
      "[name=product-checkbox]"
    );
    if (!this.selectedAll) {
      this.cart.forEach((elem, index) => {
        productsCheckboxes[index].checked = true;
        elem.selected = true;
      });
      this.selectedAll = true;
      return;
    }
    this.cart.forEach((elem, index) => {
      productsCheckboxes[index].checked = false;
      elem.selected = false;
    });
    this.selectedAll = false;
  },

  increaseProductCount(id) {
    const selectedElementIndex = this.cart.findIndex((elem) => elem.id === +id);
    const product = this.cart[selectedElementIndex];

    this.disableCountButton({
      productIndex: selectedElementIndex,
      disableMinus: false,
    });

    if (product.totalLeft === product.count) {
      return;
    }

    product.count = product.count + 1;
    if (product.count === product.totalLeft) {
      this.disableCountButton({
        productIndex: selectedElementIndex,
        disablePlus: true,
      });
    }
  },
  decreaseProductCount(id) {
    const selectedElementIndex = this.cart.findIndex((elem) => elem.id === +id);
    const product = this.cart[selectedElementIndex];

    this.disableCountButton({
      productIndex: selectedElementIndex,
      disablePlus: false,
    });

    if (product.count === 1) {
      return;
    }

    product.count = product.count - 1;
    if (product.count === 1) {
      this.disableCountButton({
        productIndex: selectedElementIndex,
        disableMinus: true,
      });
    }
  },
  disableCountButton({ productIndex, disablePlus, disableMinus }) {
    if (typeof disablePlus !== "undefined") {
      const increaseBtn =
        document.querySelectorAll(".counter_plus")[productIndex];
      increaseBtn.disabled = disablePlus;
    }
    if (typeof disableMinus !== "undefined") {
      const decreaseBtn =
        document.querySelectorAll(".counter_minus")[productIndex];
      decreaseBtn.disabled = disableMinus;
    }
  },

  renderCart() {
    const listHtml = this.cart.map((item) => {
      return `
      <div class="item_container">
            <div class="item_left_container">
              <div class="product_card">
                <div class="product_image_container ">
                  <label class="checkbox checkbox_card_mobile">
                    <input data-id="${item.id}" ${
        item.selected ? "checked" : ""
      } class="check_input" type="checkbox" name="product-checkbox" >
                    <span class="check_box"></span>
                  </label>
                  <img src="${
                    item.image_source
                  }" alt="product" class="product_img">
                </div>
                <div class="product_info">
                  <div class="product_cost_container_mobile">
                    <span class="cost">${item.newPrice} сом</span>
                    <div class="cost_without-discount">${
                      item.lastPrice
                    } сом</div>
                  </div>
                  <div class="product_name">
                    ${item.name}
                  </div>
                  <div class="product_details">
                    ${item.details
                      .map((detail) => `<div class="details">${detail}</div>`)
                      .join("")}
                  </div>
                  <div class="seller_info">
                    <div class="info_gray">${item.storage}</div>
                    <div class="info_gray mobile_disabled">
                      ${item.seller}
                      <span class="tooltip">
                        <img src="/assets/icons/info.svg" alt="info" class="info_right_icon">
                        <div class="tooltip_container w-300">
                          <div class="tooltip_title">
                          OOO «МЕГАПРОФСТИЛЬ»</div>
                          <div class="tooltip_text">ОГРН: 5167746237148</div>
                          <div class="tooltip_text">129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34</div>
                      </div>
                      </span>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item_right_container">
              <div class="product_controls_container">
                <div class="counter">
                  <button ${item.count === 1 ? "disabled" : ""} data-id="${
        item.id
      }" class="counter_minus">−</button>
                  <div class="counter_value">${item.count}</div>
                  <button ${
                    item.count === item.totalLeft ? "disabled" : ""
                  } data-id="${item.id}"  class="counter_plus">+</button>
                </div>
                <div class="product_max">${
                  item.totalLeft < 5 ? `Осталось ${item.totalLeft} шт.` : ""
                }</div>
                <div class="product_controls_icons">
                
                  <svg class="favorites"  width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03396 2.05857C2.26589 2.75224 1.76684 3.83284 1.99493 5.42928C2.22332 7.02783 3.26494 8.68522 4.80436 10.3478C6.25865 11.9184 8.10962 13.4437 9.99996 14.874C11.8903 13.4437 13.7413 11.9184 15.1956 10.3478C16.735 8.68521 17.7766 7.02783 18.005 5.4293C18.233 3.83285 17.734 2.75224 16.9659 2.05856C16.1766 1.34572 15.055 1 14 1C12.1319 1 11.0923 2.08479 10.5177 2.68443C10.4581 2.7466 10.4035 2.80356 10.3535 2.85355C10.1582 3.04882 9.84166 3.04882 9.6464 2.85355C9.59641 2.80356 9.54182 2.7466 9.48224 2.68443C8.90757 2.08479 7.86797 1 5.99995 1C4.94495 1 3.82325 1.34573 3.03396 2.05857ZM2.36371 1.31643C3.37369 0.404274 4.75202 0 5.99995 0C8.07123 0 9.34539 1.11257 9.99996 1.77862C10.6545 1.11257 11.9287 0 14 0C15.2479 0 16.6262 0.404275 17.6362 1.31644C18.6674 2.24776 19.2668 3.66715 18.9949 5.5707C18.7233 7.47217 17.5149 9.31479 15.9294 11.0272C14.3355 12.7486 12.3064 14.3952 10.3 15.9C10.1222 16.0333 9.87773 16.0333 9.69995 15.9C7.69353 14.3952 5.66443 12.7485 4.0706 11.0272C2.48503 9.31478 1.27665 7.47217 1.00498 5.57072C0.733012 3.66716 1.33249 2.24776 2.36371 1.31643Z" fill="black"/>
                  </svg>
  
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="trash">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 3C0.5 2.72386 0.723858 2.5 1 2.5H15C15.2761 2.5 15.5 2.72386 15.5 3C15.5 3.27614 15.2761 3.5 15 3.5H1C0.723858 3.5 0.5 3.27614 0.5 3Z" fill="black"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4584 2.5H14.5059L13.6411 13.6926C13.5405 14.9947 12.4546 16 11.1486 16H4.84639C3.54299 16 2.45829 14.9986 2.35435 13.6994L1.4584 2.5ZM2.5416 3.5L3.35117 13.6196C3.41353 14.3992 4.06435 15 4.84639 15H11.1486C11.9322 15 12.5837 14.3968 12.6441 13.6155L13.4256 3.5H2.5416Z" fill="black"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11 3.5H5V1.46875C5 0.657582 5.65758 0 6.46875 0H9.53125C10.3424 0 11 0.657582 11 1.46875V3.5ZM6.46875 1C6.20987 1 6 1.20987 6 1.46875V2.5H10V1.46875C10 1.20987 9.79013 1 9.53125 1H6.46875Z" fill="black"/>
                  </svg>

                </div>
              </div>
              <div class="product_cost_container">
                <p class="cost">${item.newPrice} <span>сом</span></p>
                <span class="cost_without-discount tooltip">${
                  item.lastPrice
                } сом
                <div class="tooltip_container">
                  <div class="tooltip_discount_container">
                     <div>Скидка 55%</div>
                     <div class="tooltip_text-gray">- ${
                       item.lastPrice - item.newPrice
                     } com</div>
                  </div>
                 <div class="tooltip_discount_container">
                     <div>Скидка покупателя 10%</div>
                     <div class="tooltip_text-gray">- ${
                       item.lastPrice - item.newPrice
                     } com</div>
                    </div>
                </div>
               </span>
                
              </div>
            </div>
          </div>
      `;
    });

    const listContainer = document.querySelector(".basket_items_container");

    listContainer.innerHTML = listHtml.join("");
  },
};
