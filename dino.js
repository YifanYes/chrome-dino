import { getProperty, incrementProperty, setProperty } from "./property.helper.js"

const dinoElement = document.querySelector('[data-dino]')
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

export function generateDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setProperty(dinoElement, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElement.src = 'resources/dino-stationary.png'
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElement.src = `resources/dino-run-${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }

  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementProperty(dinoElement, "--bottom", yVelocity * delta)

  // Check if dino is touching the ground to stop jumping
  if (getProperty(dinoElement, "--bottom") <= 0) {
    setProperty(dinoElement, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(event) {
  if (event.code !== "Space" || isJumping) return

  console.log('JUMPING')
  yVelocity = JUMP_SPEED
  isJumping = true
}