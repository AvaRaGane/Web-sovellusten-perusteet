const getRandomIntNumberInRange =(min,max) => {
    return Math.floor(Math.random() * max) + min;
}

let answers = 1
let randomized_number = getRandomIntNumberInRange(1,100)

document.querySelector('button').addEventListener('click',() => {
    const input = document.querySelector('input')
    const guess = Number(input.value)


    if (guess === randomized_number) {
        alert("You guessed right, number is " + randomized_number + " arvauksia kului " + answers + " kpl\nArvotaan uusi numero!")
        randomized_number = getRandomIntNumberInRange(1,100)
        answers = 0
    } else {
        if (guess > randomized_number) {
            alert("Not right, go lower")
            answers++
        } else {
            alert("Not right, go higher")
            answers++
        }
    }
    input.value = ''
    input.focus()
})