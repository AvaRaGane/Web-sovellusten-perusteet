'use strict'
const input = document.querySelector('input')
let rand_num1=0
let rand_num2=0
let quests=0
let rightAnswers=0

const getRandomIntNumberInRange = (min, max) =>{
    return Math.floor(Math.random() * max) + min;
}

const randomizeNumbers = () => {
    rand_num1 = getRandomIntNumberInRange(1,10)
    rand_num2 = getRandomIntNumberInRange(1,10)
    document.querySelector('#num1').innerHTML = rand_num1
    document.querySelector('#num2').innerHTML = rand_num2
    quests++
}

addEventListener("DOMContentLoaded", () => {
    randomizeNumbers()
    quests=1
    answers=0
});

document.querySelector('button').addEventListener('click',() => {
    const answer = Number(input.value)
    const correctAnswer = rand_num1 + rand_num2
        if (answer===correctAnswer) {
            rightAnswers++
            alert('Oikein!\nKysymyksiä: '+ quests+'\nOikeita vastauksia: '+rightAnswers)
    }else {
        alert('Väärin!\nKokeillaampa toista laskua!\nKysymyksiä: '+ quests+'\nOikeita vastauksia: '+rightAnswers)
    }
    randomizeNumbers()
    input.value=''
    input.focus()
})