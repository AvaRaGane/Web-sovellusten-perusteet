'use strict'

let seconds = 0
let timer_id

const start_button = document.querySelector('#start')
const time_p = document.querySelector('p')
const stop_button = document.querySelector('#stop')
const reset_button = document.querySelector('#reset')

const formatTime = () => {
    const secondsInt = Number(seconds)
    const hrs = String(Math.floor(secondsInt / 3600))
    const mins = String(Math.floor((secondsInt / 60) % 60))
    const snds = String(secondsInt % 60)

    return hrs.padStart(2, '0') + ':' + mins.padStart(2, '0') + ':' + snds.padStart(2, '0')
}

time_p.innerHTML = formatTime()

start_button.addEventListener('click', () => {
    timer_id = setInterval(() => {
        seconds++
        time_p.innerHTML = formatTime()
    }, 1000)
    setButtons(true, false, true)
})

stop_button.addEventListener('click', () => {
    clearInterval(timer_id)
    setButtons(false, true, false)
})

reset_button.addEventListener('click', () => {
    seconds = 0
    time_p.innerHTML = formatTime()
    setButtons(false, true, true)
})

const setButtons = (start_state, stop_state, reset_state) => {
    start_button.disabled = start_state
    stop_button.disabled = stop_state
    reset_button.disabled = reset_state
}

setButtons(false, true, true)
