import { generateCactus, getCactusLocation, updateCactus } from './cactus.js'
import { generateDino, getDinoLocation, setDinoLose, updateDino } from './dino.js'
import { generateGround, updateGround } from './ground.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElement = document.querySelector('[data-world]')
const scoreElement = document.querySelector('[data-score')
const startScreenElement = document.querySelector('[data-start-screen')

setPixelToWorldScale()
window.addEventListener('resize', setPixelToWorldScale)
document.addEventListener('keydown', handleStart, { once: true })

let lastTime
let speedScale
let score

function update(time) {
  if (lastTime == null) {
    lastTime = time
    // Scheduling and synchronizing animations 
    // taking advantage of the browser's rendering capabilities
    window.requestAnimationFrame(update)
    return
  }

  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)

  if (hasLost()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElement.textContent = Math.floor(score)
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  generateGround()
  generateDino()
  generateCactus()
  startScreenElement.classList.add('hide')
  window.requestAnimationFrame(update)
}

function handleLose() {
  setDinoLose()

  // Add delay to show you lost
  setTimeout(() => {
    document.addEventListener('keydown', handleStart, { once: true })
    startScreenElement.classList.remove('hide')
  }, 100)
}

function hasLost() {
  const dinoLocation = getDinoLocation()
  return getCactusLocation().some(location => hasCollided(location, dinoLocation))
}

function hasCollided(firstLocation, secondLocation) {
  return firstLocation.left < secondLocation.right &&
    firstLocation.top < secondLocation.bottom &&
    firstLocation.right > secondLocation.left &&
    firstLocation.bottom > secondLocation.top
}

// Scale world on screen dimensions
function setPixelToWorldScale() {
  const worldToPixelScale =
    window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT
      ? window.innerWidth / WORLD_WIDTH
      : window.innerHeight / WORLD_HEIGHT;

  worldElement.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElement.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}