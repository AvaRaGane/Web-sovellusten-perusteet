'use strict'

document.querySelector('form').addEventListener('submit',(event) =>{
    event.preventDefault()
    let valid =true
    const emailSpan= document.querySelector('input[type=email]+span')
    const passwordSpan= document.querySelector('input[type=password]+span')
    const email = document.querySelector('input[type=email]').value
    const password = document.querySelector('input[type=password]').value

    emailSpan.innerHTML=''
    passwordSpan.innerHTML=''

    if (!validateEmail(email)) {
        valid =false
        emailSpan.innerHTML = "Invalid email"
    }

    if (password.length <8) {
        valid = false
        passwordSpan.innerHTML = "Invalid password"        
    }

    if (valid){
        alert('Submitting form...')
    }

})

const validateEmail = (email) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        return true
    }else {
        return false
    }
}