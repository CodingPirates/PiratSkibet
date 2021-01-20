import React from 'react'
import PropTypes from 'prop-types'

export default class Checkmark extends React.PureComponent {
  get className () {
    return this.props.checked ? 'checkmark checkmark--completed' : 'checkmark checkmark--disabled'
  }

  render () {
    return (
      <svg className={this.className} xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 512 512'>
        <g>
          <polygon className='checkmark__background' points='478.609,155.826 478.609,100.174 445.217,100.174 445.217,66.783 411.826,66.783 411.826,33.391 356.174,33.391 356.174,0 155.826,0 155.826,33.391 100.174,33.391 100.174,66.783 66.783,66.783 66.783,100.174 33.391,100.174 33.391,155.826 0.008,155.829 0.008,356.177 33.391,356.177 33.391,411.826 66.783,411.826 66.783,422.957 66.783,445.217 100.174,445.217 100.174,456.348 100.174,478.609 155.826,478.609 155.826,489.739 155.826,512 356.174,512 356.174,489.739 356.174,478.609 411.826,478.609 411.826,456.348 411.826,445.217 445.217,445.217 445.217,422.957 445.217,411.826 478.609,411.826 478.609,356.177 489.746,356.177 489.746,356.174 512,356.174 512,155.826' />

          <g>
            <polygon className='checkmark__highlight' points='155.826,33.391 100.174,33.391 100.174,66.783 66.783,66.783 66.783,100.174 33.391,100.174 33.391,155.826 0,155.826 0,256 33.391,256 66.783,256 66.783,155.826 100.174,155.826 100.174,100.174 155.826,100.174 155.826,66.783 256,66.783 256,33.391 256,0 155.826,0' />
            <polygon className='checkmark__highlight' points='289.391,0 289.391,33.391 289.391,66.783 322.783,66.783 322.783,33.391 322.783,0' />
            <polygon className='checkmark__highlight' points='0,289.391 0,322.783 33.391,322.783 66.783,322.783 66.783,289.391 33.391,289.391' />
          </g>

          <rect className='checkmark__border' x='100.174' y='33.391' width='55.652' height='33.391' />
          <rect className='checkmark__border' x='66.783' y='66.783' width='33.391' height='33.391' />
          <rect className='checkmark__border' x='33.391' y='100.174' width='33.391' height='55.652' />
          <rect className='checkmark__border' x='33.391' y='356.174' width='33.391' height='55.652' />
          <rect className='checkmark__border' x='66.783' y='411.826' width='33.391' height='33.391' />
          <rect className='checkmark__border' x='100.174' y='445.217' width='55.652' height='33.391' />
          <rect className='checkmark__border' x='155.826' width='200.348' height='33.391' />
          <rect className='checkmark__border' x='155.826' y='478.609' width='200.348' height='33.391' />
          <rect className='checkmark__border' y='155.826' width='33.391' height='200.348' />
          <rect className='checkmark__border' x='356.174' y='33.391' width='55.652' height='33.391' />
          <rect className='checkmark__border' x='411.826' y='66.783' width='33.391' height='33.391' />
          <rect className='checkmark__border' x='445.217' y='100.174' width='33.391' height='55.652' />
          <rect className='checkmark__border' x='445.217' y='356.174' width='33.391' height='55.652' />
          <rect className='checkmark__border' x='411.826' y='411.826' width='33.391' height='33.391' />
          <rect className='checkmark__border' x='356.174' y='445.217' width='55.652' height='33.391' />
          <rect className='checkmark__border' x='478.609' y='155.826' width='33.391' height='200.348' />

          <polygon className='checkmark__check' points='345.043,133.565 345.043,166.957 311.652,166.957 311.652,200.348 278.261,200.348 278.261,233.739 244.87,233.739 244.87,267.13 211.478,267.13 211.478,300.522 178.087,300.522 178.087,267.13 144.696,267.13   144.696,233.739 100.174,233.739 100.174,311.652 133.565,311.652 133.565,345.043 166.957,345.043 166.957,378.435   222.609,378.435 222.609,345.043 256,345.043 256,311.652 289.391,311.652 289.391,278.261 322.783,278.261 322.783,244.87 356.174,244.87 356.174,211.478 389.565,211.478 389.565,133.565 ' />
        </g>
      </svg>
    )
  }
}

Checkmark.propTypes = {
  checked: PropTypes.bool
}

Checkmark.defaultProps = {
  checked: true
}
