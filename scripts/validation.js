let form = document.querySelector('.form_container'),
    formInputs = document.querySelectorAll('.js-input'),
    formLabels = document.querySelectorAll('.js-input-label'),
    inputEmail = document.querySelector('.js-input-email'),
    inputPhone = document.querySelector('.js-input-phone'),
    payButton = document.getElementById('pay_button');

payButton.addEventListener('click', e => {
  validateInputs();
  addListenersFocusout();
  addListenersOnChange();
})

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const isValid =  re.test(String(email).toLowerCase())

  if (!isValid){
    if (inputEmail.parentElement.classList.contains('error')){
      return
    }
    inputEmail.parentElement.classList.add('error')
    inputEmail.nextElementSibling.innerHTML = 'Проверьте адрес электронной почты'
  }
}

function validatePhone(phone) {
  let re = /^[0-9\s]*$/;

  const isValid = re.test(String(phone));
  if (!isValid) {
    if (inputPhone.parentElement.classList.contains('error')){
      return
    }
    inputPhone.parentElement.classList.add('error')
    inputPhone.nextElementSibling.innerHTML = 'Формат: +9 999 999 99 99'
  }
}

function checkedIsNotEmpty() {
  const emailValue = inputEmail.value;
  const phoneValue = inputEmail.value;
  formInputs.forEach(input => {
    if (input.value === '') {
      input.parentElement.classList.add('error')
    } else {
      input.parentElement.classList.remove('error')
    }
  })
}


function validateInputs(){
  const emailValue = inputEmail.value;
  const phoneValue = inputEmail.value;
  formInputs.forEach(input => {
    if (input.value === '') {
      input.parentElement.classList.add('error')
    } else {
      input.parentElement.classList.remove('error')
    }
  })
  validateEmail(emailValue)
  validatePhone(phoneValue)

}

function addListenersFocusout(){
  formInputs.forEach(input => {
    input.addEventListener('focusout', e => {
      console.log(e.target)
      validateInputs()
    })
  })
}
function addListenersOnChange(){
  console.log('asss')
  const emailValue = inputEmail.value;
  const phoneValue = inputEmail.value;
    inputEmail.addEventListener('change', e => {
      console.log('sss')
      validateEmail(e.target.value)
      console.log('ssss')
    })
    inputPhone.addEventListener('change', e => {
      validatePhone(phoneValue)

    })
}
