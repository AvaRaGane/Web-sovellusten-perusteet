'use strict'

const url = 'https://api.freecurrencyapi.com/v1/latest'
const base_currency = 'SEK'
const api_key = "fca_live_8CZm1wWtvUuzPf7BOGKX9EYs0ZllHeU7tbYUDkn9"

const sek_input = document.querySelector('input')
const eur_output = document.querySelector('output')
const rate_span = document.querySelector('span')
const convert_button = document.querySelector('button')

convert_button.addEventListener('click', () => {
    const address = `${url}?base_currency=${base_currency}&apikey=${api_key}`
    fetch(address)
    .then(response => response.json())
    .then(json =>{
        const rate = json.data.EUR
        rate_span.innerHTML = rate
        const sek = sek_input.value
        const eur = sek * rate
        eur_output.innerHTML = eur.toFixed(2) + ' €'
    })
    .catch(error => {
        alert(error)
    })
})