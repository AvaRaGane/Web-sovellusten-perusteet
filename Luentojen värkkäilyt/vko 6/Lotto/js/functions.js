'use strict'

const table_numbers = document.querySelector('table#numbers')
const additional_p = document.querySelector('p#additional')
const plus_p = document.querySelector('p#plus')
const numbers = []

while (numbers.length < 9) {
    const random_number = Math.floor(Math.random() * 40) + 1
    if (!(numbers.includes(random_number))){
        numbers.push(random_number)
    }

}

const additiona_number = numbers[7]
const plus_number = numbers[8]
const first_seven_numbers = numbers.slice(0,7)

first_seven_numbers.sort((a,b) => a-b)

const tr = table_numbers.insertRow()
for (let i=0;i<first_seven_numbers.length;i++){
    const td = tr.insertCell()
    td.innerHTML = first_seven_numbers[i]
}

additional_p.innerHTML = additiona_number
plus_p.innerHTML = plus_number