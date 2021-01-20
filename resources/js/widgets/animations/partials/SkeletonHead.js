import React from 'react'
import Animation from 'widgets/animations/Animation'

export default class SkeletonHead extends Animation {
  static get defaultProps () {
    return {
      ...super.defaultProps
    }
  }

  get transitionsProps () {
    return {}
  }

  get classNames () {
    return 'skeleton-head-'
  }

  get width () {
    return this.scaleWidth(100) + '%'
  }

  get styles () {
    return {
      ...super.styles
    }
  }

  renderContent () {
    return (
      <svg className='skeleton-head' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 338 155'>
        <g>
          <polygon
            className='skeleton-head__base' points='265.9,129.7 267,4.9 47.8,-0.3 46.7,124.5 109.9,128.4 109.7,154.3 135.5,154.5 135.7,128.6
                        161.6,128.8 161.3,154.8 187.1,155 187.3,129 213.2,129.3 213,155.2 238.7,155.4 239,129.5'
          />

          <polygon className='skeleton-head__shadow' points='173.85 155.2 186.7 155.3 186.9 129.3 212.8 129.6 212.6 155.5 238.3 155.7 238.6 129.8 265.5 130 266.6 5.2 174.41 3.01 173.85 155.2' />
          {/* <polygon className="skeleton-head__shadow" points="127.55 155.2 140.4 155.3 140.6 129.3 166.5 129.6 166.3 155.5 192 155.7 192.3 129.8 219.2 130 220.3 5.2 128.11 3.01 127.55 155.2" /> */}

          {/* <g>
                        <defs>
                            <polygon id="skeletonPath" points="46.7,124.5 109.9,128.4 109.7,154.3 135.5,154.5 135.7,128.6 161.6,128.8 161.3,154.8 187.1,155
                                187.3,129 213.2,129.3 213,155.2 238.7,155.4 239,129.5 265.9,129.7 267,4.9 47.8,-0.3"/>
                        </defs>
                        <clipPath id="skeletonPath2">
                            <use xlinkHref="#skeletonPath" />
                        </clipPath>
                        <rect x="173.4" y="-57.3" className="skeleton-head__shadow" width="188.2" height="267.3"/>
                    </g> */}

          <rect x='161.8' y='77.1' className='skeleton-head__dark' width='26' height='25.8' />
          <rect x='110.4' y='50.7' className='skeleton-head__dark skeleton-head__eye' width='26' height='25.8' />
          <rect x='213.7' y='51.6' className='skeleton-head__dark skeleton-head__eye' width='26' height='25.8' />
        </g>
        <g>
          <g>
            <path
              className='skeleton-head__dark' d='M72.8,39.5c5.9,0,10.8-4.8,10.8-10.8c0-5.9-4.8-10.8-10.8-10.8c-5.9,0-10.8,4.8-10.8,10.8
                            C62.1,34.7,66.9,39.5,72.8,39.5'
            />
            <path
              className='skeleton-head__dark' d='M72.8,41.8c-7.2,0-13-5.8-13-13c0-7.2,5.8-13,13-13c7.2,0,13,5.8,13,13C85.8,35.9,80,41.8,72.8,41.8z
                            M72.8,20.2c-4.7,0-8.5,3.8-8.5,8.5c0,4.7,3.8,8.5,8.5,8.5c4.7,0,8.5-3.8,8.5-8.5C81.3,24.1,77.5,20.2,72.8,20.2z'
            />
            <path
              className='skeleton-head__hole' d='M72.8,39.7c-7.2,0-13-5.8-13-13c0-7.2,5.8-13,13-13c7.2,0,13,5.8,13,13C85.8,33.8,80,39.7,72.8,39.7z
                            M72.8,18.2c-4.7,0-8.5,3.8-8.5,8.5c0,4.7,3.8,8.5,8.5,8.5c4.7,0,8.5-3.8,8.5-8.5C81.3,22,77.5,18.2,72.8,18.2z'
            />
            <path
              className='skeleton-head__dark' d='M72.8,112.1c-7.2,0-13-5.8-13-13c0-7.2,5.8-13,13-13c7.2,0,13,5.8,13,13C85.8,106.2,80,112.1,72.8,112.1z
                            M72.8,90.5c-4.7,0-8.5,3.8-8.5,8.5c0,4.7,3.8,8.5,8.5,8.5c4.7,0,8.5-3.8,8.5-8.5C81.3,94.3,77.5,90.5,72.8,90.5z'
            />
            <path
              className='skeleton-head__dark' d='M72.8,107.7c5.9,0,10.8-4.8,10.8-10.8c0-5.9-4.8-10.8-10.8-10.8c-5.9,0-10.8,4.8-10.8,10.8
                            C62.1,102.9,66.9,107.7,72.8,107.7'
            />
            <path
              className='skeleton-head__hole' d='M72.8,110c-7.2,0-13-5.8-13-13c0-7.2,5.8-13,13-13c7.2,0,13,5.8,13,13C85.8,104.1,80,110,72.8,110z
                            M72.8,88.5c-4.7,0-8.5,3.8-8.5,8.5c0,4.7,3.8,8.5,8.5,8.5c4.7,0,8.5-3.8,8.5-8.5C81.3,92.3,77.5,88.5,72.8,88.5z'
            />
          </g>
          <g>
            <path className='skeleton-head__yellow' d='M69.1,99.3c-1.7,0-3.1-1.4-3.1-3.1V29.3c0-1.7,1.4-3.1,3.1-3.1s3.1,1.4,3.1,3.1v66.8C72.3,97.9,70.9,99.3,69.1,99.3z' />
            <path className='skeleton-head__blue' d='M76.7,99.5c-1.7,0-3.1-1.4-3.1-3.1V28.9c0-1.7,1.4-3.1,3.1-3.1c1.7,0,3.1,1.4,3.1,3.1v67.5C79.8,98.1,78.4,99.5,76.7,99.5z' />
          </g>
        </g>
      </svg>
    )
  }
}
