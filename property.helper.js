export function getProperty(element, property) {
  return parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0
}

export function setProperty(element, property, value) {
  element.style.setProperty(property, value)
}

export function incrementProperty(element, property, increment) {
  setProperty(element, property, getProperty(element, property) + increment)
}
