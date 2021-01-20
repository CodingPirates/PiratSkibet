export default class NavigationScrollHandler {
  constructor ({ scrollDistance = 100, onEnter = () => {}, onExit = () => {} } = {}) {
    this.onEnter = onEnter
    this.onExit = onExit
    this.scrollDistance = scrollDistance
    this.lastKnownScrollY = 0
    this.ticking = false
    this.onScroll = this.onScroll.bind(this)
  }

  init () {
    window.addEventListener('scroll', this.onScroll, false)
  }

  destroy () {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll () {
    this.lastKnownScrollY = window.pageYOffset
    this.requestTick()
  }

  requestTick () {
    if (!this.ticking) {
      requestAnimationFrame(this.update.bind(this))
    }

    this.ticking = true
  }

  update () {
    const currentScrollY = this.lastKnownScrollY
    this.ticking = false
    this.checkScrollDistance(currentScrollY)
  }

  checkScrollDistance (scrolledDistance) {
    if (this.scrollDistance < 1) {
      return false
    }

    if (scrolledDistance > this.scrollDistance) {
      this.onEnter()
    } else if (scrolledDistance < this.scrollDistance) {
      this.onExit()
    }
  }
}
