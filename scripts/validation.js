const form = document.querySelector('.form_container'),
    formInputs = document.querySelectorAll('.js-input'),
    formLabels = document.querySelectorAll('.js-input-label'),
    inputEmail = document.querySelector('.js-input-email'),
    inputPhone = document.querySelector('.js-input-phone'),
    payButton = document.getElementById('pay_button');

payButton.addEventListener('click', e => {
  validateInputs();
  addValidationListeners('input');
})

if (window.innerWidth < 430){
  window.addEventListener('touchend', e => {
    const payMobileButton = document.getElementById('pay_mobile_button');

    if (e.target === payMobileButton) {
      validateInputs(true);
      addValidationListeners('input');
    }
  })
}


window.addEventListener('load', e => {
  inputPhone.addEventListener('input', e => {
    const newValue = changePhone(e.target.value)

    inputPhone.value = newValue
  })
})

function validateEmail(email, mobile = false) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValid =  re.test(String(email.value).toLowerCase())


  if (email.value === '') {
    email.parentElement.classList.add('error')
    email.nextElementSibling.innerHTML = 'Укажите электронную почту'
    if (mobile) {
      form.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
    return
  }

  if (!isValid){
    if (mobile) {
      form.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
    inputEmail.parentElement.classList.add('error')
    inputEmail.nextElementSibling.innerHTML = 'Проверьте адрес электронной почты'
  } else {
    inputEmail.parentElement.classList.remove('error')
  }
}

function validatePhone(phone, mobile = false) {
  let re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  const isValid = re.test(String(phone.value));

  if (phone.value === '') {
    phone.parentElement.classList.add('error')
    phone.nextElementSibling.innerHTML = 'Укажите номер телефона'
    if (mobile) {
      form.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
    return
  }
  if (!isValid) {
    if (mobile) {
      form.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
    phone.parentElement.classList.add('error')
    phone.nextElementSibling.innerHTML = 'Формат: +9 999 999 99 99'
  } else {
    phone.parentElement.classList.remove('error')
  }
}


function validateInputs(mobile = false){
  formInputs.forEach(input => {
    if (input.value === '') {
      input.parentElement.classList.add('error')
      if (mobile) {
        form.scrollIntoView({behavior: 'smooth', block: 'center'})
      }
    } else {
      input.parentElement.classList.remove('error')
      if (input === inputEmail) {
        if (mobile){
          validateEmail(inputEmail, true)
          return
        }
        validateEmail(inputEmail)
      }
    if (input === inputPhone) {
      if (mobile) {
        validatePhone(inputPhone, true)
        return;
      }
      validatePhone(inputPhone)
    }
    }

  })

}

function validateTextInput(input, mobile = false) {
  if (input.value === '') {
      input.parentElement.classList.add('error')
      if (mobile) {
        form.scrollIntoView({behavior: 'smooth', block: 'center'})
      }
    } else {
      input.parentElement.classList.remove('error')
    }
}


let prevValue = '';

function changePhone(phone) {
  const russian_number = '+7 '
  if (phone.length > 16) {
    return prevValue
  }

  if (phone.length < prevValue.length && prevValue !== russian_number) {
    prevValue = phone
    return phone
  }

  if (phone.length <= russian_number.length) {
    prevValue = russian_number

    return russian_number
  }

  if (phone.length === 6
    || phone.length === 10
    || phone.length === 13
    || phone.length === 15
  ) {
    prevValue = russian_number + phone + ' '

    return phone + ' '
  }
  prevValue = phone

  return phone
}



function addValidationListeners(eventType, mobile = false) {
  formInputs.forEach(input => {
    input.addEventListener(eventType, e => {
       switch (e.target.dataset.type) {
         case 'name':
         case 'second-name':
         case 'INN': {
           validateTextInput(e.target, mobile)
           break;
         }
         case 'email': {

           validateEmail(e.target, mobile)
           break;
         }
         case 'phone': {
           validatePhone(e.target, mobile)
           break;
         }
       }

    })
  })
}
