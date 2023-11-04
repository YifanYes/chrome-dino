import { generateGround, updateGround } from "./ground.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30

const worldElement = document.querySelector('[data-world]')

generateGround()

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }

  const delta = time - lastTime
  updateGround(delta, 1)

  lastTime = time
  window.requestAnimationFrame(update)
}

// Scheduling and synchronizing animations 
// taking advantage of the browser's rendering capabilities
window.requestAnimationFrame(update)

// Scale world on screen dimensions
function setPixelToWorldScale() {
  const worldToPixelScale =
    window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT
      ? window.innerWidth / WORLD_WIDTH
      : window.innerHeight / WORLD_HEIGHT;

  worldElement.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElement.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}