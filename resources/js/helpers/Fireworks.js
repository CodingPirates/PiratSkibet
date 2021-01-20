import confetti from 'canvas-confetti'

export default class Fireworks {
  constructor ({ amount = 5, delay = 500, particleCount = 50, colors = ['#EC008C', '#FFF200', '#00AEEF'], shapes = ['square'], ticks = 60, spread = 360, startVelocity = 30, zIndex = 3000 } = {}) {
    this.amount = amount
    this.delay = delay
    this.particleCount = particleCount
    this.colors = colors
    this.shapes = shapes
    this.ticks = ticks
    this.spread = spread
    this.startVelocity = startVelocity
    this.zIndex = zIndex

    this.iterations = 0
    this.interval
  }

  firework () {
    confetti({
      particleCount: this.particleCount,
      startVelocity: this.startVelocity,
      spread: this.spread,
      ticks: this.ticks,
      colors: this.colors,
      shapes: this.shapes,
      zIndex: this.zIndex,
      origin: {
        x: Math.random() * 0.6 + 0.2,
        y: Math.random() - 0.2
      }
    })
  }

  init () {
    this.iterations = 0

    this.interval = setInterval(() => {
      this.firework()
      this.iterations += 1

      if (this.iterations >= this.amount) {
        clearInterval(this.interval)
      }
    }, this.delay)
  }
}
