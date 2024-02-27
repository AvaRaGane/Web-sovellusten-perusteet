'use strict'

const brand_p = document.querySelector('#brand')
const name_p = document.querySelector('#name')
const style_p = document.querySelector('#style')
const alcohol_p = document.querySelector('#alcohol')

const url = 'http://random-data-api.com/api/v2/beers'

const getData = () => {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            brand_p.innerHTML = json.brand
            name_p.innerHTML = json.name
            style_p.innerHTML = json.style
            alcohol_p.innerHTML = json.alcohol
        }).catch(error => {
            alert(error)
        })
}

getData()