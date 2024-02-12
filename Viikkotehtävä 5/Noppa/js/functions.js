'use strict'

const getRandomIntNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById('dice').addEventListener('click', () => {
    let randomized_number = getRandomIntNumberInRange(1, 6);
    let element = document.getElementById('dice').querySelector('img');

    element.src = "./img/perspective-dice-six-faces-random.png";

    setTimeout(() => {
        switch (randomized_number) {
            case 1:
                element.src = "./img/perspective-dice-six-faces-1.png";
                break;
            case 2:
                element.src = "./img/perspective-dice-six-faces-2.png";
                break;
            case 3:
                element.src = "./img/perspective-dice-six-faces-3.png";
                break;
            case 4:
                element.src = "./img/perspective-dice-six-faces-4.png";
                break;
            case 5:
                element.src = "./img/perspective-dice-six-faces-5.png";
                break;
            case 6:
                element.src = "./img/perspective-dice-six-faces-6.png";
                break;
        }
    }, 300);
});
