import { getProperty, incrementProperty, setProperty } from './property.helper.js'

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElement = document.querySelector('[data-world]')

let nextCactusTime

export function generateCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN
  document.querySelectorAll('[data-cactus]').forEach(cactus => cactus.remove())
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll('[data-cactus]').forEach(cactus => {
    incrementProperty(cactus, '--left', delta * speedScale * SPEED * -1)

    // Check if cactus is out of the screen
    if (getProperty(cactus, '--left') <= -100) {
      cactus.remove()
    }
  })

  if (nextCactusTime <= 0) {
    createCactus()
    nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
  }

  nextCactusTime -= delta
}

function createCactus() {
  const cactus = document.createElement('img')
  cactus.dataset.cactus = true
  cactus.src = 'resources/cactus.png'
  cactus.classList.add('cactus')
  setProperty(cactus, '--left', 100)
  worldElement.append(cactus)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getCactusLocation() {
  return [...document.querySelectorAll('[data-cactus')].map(cactus => cactus.getBoundingClientRect())
}