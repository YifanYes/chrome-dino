import { getProperty, incrementProperty, setProperty } from './property.helper.js'

const SPEED = 0.05
const groundElements = document.querySelectorAll('[data-ground]')

export function generateGround() {
  setProperty(groundElements[0], '--left', 0)
  setProperty(groundElements[1], '--left', 300)
}

export function updateGround(delta, speedScale) {
  groundElements.forEach(ground => {
    incrementProperty(ground, '--left', delta * speedScale * SPEED * -1)

    if (getProperty(ground, '--left') <= -300) {
      incrementProperty(ground, '--left', 600)
    }
  })

}