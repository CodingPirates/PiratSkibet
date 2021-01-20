import Star from 'helpers/starfield/Star'

export default class StarField {
  constructor ({ container = '#star-wrapper', totalStars = 20, starClassName = 'star', starSize = 7, starMinSize = 4, starMaxSize = 10 } = {}) {
    this.container = container
    this.totalStars = totalStars
    this.starClassName = starClassName
    this.starSize = starSize
    this.starMinSize = starMinSize
    this.starMaxSize = starMaxSize

    this.starsArray = []
    this.containerElement = document.querySelector(this.container)
  }

  createStarArray () {
    let maxAttempts = this.totalStars * 3

    while (this.starsArray.length < this.totalStars && maxAttempts > 0) {
      let available = true

      const star = new Star({
        containerElement: this.containerElement,
        className: this.starClassName,
        minSize: this.starMinSize,
        maxSize: this.starMaxSize
      })

      star.size = star.randomSize()
      star.setSize()

      for (let i = 0; i < this.starsArray.length; i++) {
        const secondStar = this.starsArray[i]

        if (star.intersecting(star, secondStar)) {
          available = false
          break
        }
      }

      if (available) {
        this.starsArray.push(star)
      }

      maxAttempts -= 1
    }
  }

  spawnStars () {
    for (let i = 0; i < this.starsArray.length; i++) {
      const star = this.starsArray[i]
      star.spawn()
    }
  }

  destroyStars () {
    for (let i = 0; i < this.starsArray.length; i++) {
      const star = this.starsArray[i]
      star.destroy()
    }

    this.starsArray = []
  }
}
