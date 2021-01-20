export default class Star {
  constructor ({ containerElement, className = 'star', size = 7, minSize = 4, maxSize = 10 } = {}) {
    this.className = className
    this.size = size
    this.minSize = minSize
    this.maxSize = maxSize

    this.containerElement = containerElement
    this.el = document.createElement('div')
    this.x = this.randomPosition(this.containerElement.offsetWidth)
    this.y = this.randomPosition(this.containerElement.offsetHeight)
  }

  intersecting (starOne, starTwo) {
    const coordsOne = this.getCoordinates(starOne)
    const coordsTwo = this.getCoordinates(starTwo)

    return !(coordsTwo.left > coordsOne.right ||
						 coordsTwo.right < coordsOne.left ||
						 coordsTwo.top > coordsOne.bottom ||
						 coordsTwo.bottom < coordsOne.top)
  }

  spawn () {
    this.el.className = this.className
    this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`
    this.containerElement.appendChild(this.el)
  }

  destroy () {
    this.containerElement.removeChild(this.el)
  }

  randomPosition (widthOrHeight) {
    return Math.floor(Math.random() * widthOrHeight)
  }

  randomSize () {
    return Math.floor(Math.random() * (this.maxSize - this.minSize + 1) + this.minSize)
  }

  setSize () {
    this.el.style.width = this.size + 'px'
    this.el.style.height = this.size + 'px'
  }

  getCoordinates (star) {
    return {
      left: star.x - star.size,
      top: star.y - star.size,
      right: star.x + (star.size * 2),
      bottom: star.y + (star.size * 2)
    }
  }
}
