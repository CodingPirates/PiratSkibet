import React from 'react'
import World from 'widgets/animations/worlds/World'
import SeaWeed from 'widgets/animations/partials/SeaWeed'
import SeaMine from 'widgets/animations/partials/SeaMine'
import TreasureChest from 'widgets/animations/partials/TreasureChest'

export default class SeaFloorWorld extends World {
  static get defaultProps () {
    return {
      ...super.defaultProps,
      classNames: 'underwater-world underwater-world--floor'
    }
  }

  renderWorld () {
    return (
      <>
        {/* Back */}
        <SeaMine scaleFactor={0.03} chainLength={19} left='43%' bottom='65%' />
        <SeaMine scaleFactor={0.04} chainLength={6} left='41%' bottom='46%' />
        <SeaWeed type={0} scaleFactor={0.13} left='2%' bottom='22%' darken={0.7} />
        <SeaWeed type={0} scaleFactor={0.10} left='20%' bottom='24%' darken={0.7} />
        <SeaWeed type={0} scaleFactor={0.10} right='0' bottom='28%' darken={0.7} />
        <SeaWeed type={1} scaleFactor={0.11} left='30%' bottom='22%' darken={0.4} />
        <SeaWeed type={2} scaleFactor={0.08} left='50%' bottom='26%' darken={0.4} />
        <SeaWeed type={2} scaleFactor={0.10} left='43%' bottom='24%' darken={0.4} />

        {/* Mid */}
        <SeaWeed type={0} scaleFactor={0.10} left='45%' bottom='8%' darken={0.5} />
        <SeaWeed type={1} scaleFactor={0.12} left='8%' bottom='10%' darken={0.4} />
        <SeaWeed type={2} scaleFactor={0.12} left='24%' bottom='10%' darken={0.2} />
        <SeaWeed type={2} scaleFactor={0.14} left='-8%' bottom='14%' darken={0.2} />
        <SeaWeed type={0} scaleFactor={0.10} left='59%' bottom='22%' darken={0.5} />
        <SeaMine scaleFactor={0.07} chainLength={12} left='12%' bottom='62%' />
        <TreasureChest scaleFactor={0.19} right='12%' bottom='10%' zIndex={3} locked />

        {/* Front */}
        <SeaWeed type={0} scaleFactor={0.15} left='-5%' bottom='-4%' zIndex={10} />
        <SeaWeed type={0} scaleFactor={0.12} left='11%' bottom='-8%' zIndex={10} />
        <SeaWeed type={0} scaleFactor={0.10} left='37%' bottom='-4%' zIndex={10} />
        <SeaWeed type={0} scaleFactor={0.08} left='38%' bottom='-6%' zIndex={10} />
        <SeaWeed type={1} scaleFactor={0.10} left='25%' bottom='-4%' darken={0.1} zIndex={10} />
        <SeaWeed type={1} scaleFactor={0.14} left='50%' bottom='-8%' darken={0.1} zIndex={10} />
        <SeaWeed type={1} scaleFactor={0.08} left='75%' bottom='-14%' darken={0.1} zIndex={10} />
        <SeaWeed type={1} scaleFactor={0.12} right='-8%' bottom='-4%' darken={0.1} zIndex={10} />
        <SeaWeed type={2} scaleFactor={0.12} right='-5%' bottom='2%' zIndex={8} />
        <SeaWeed type={2} scaleFactor={0.06} right='15%' bottom='-5%' zIndex={10} />
        <SeaWeed type={2} scaleFactor={0.09} left='64%' bottom='-4%' zIndex={8} />
        <SeaMine scaleFactor={0.1} chainLength={6} right='2%' bottom='20%' zIndex={15} />
      </>
    )
  }
}
