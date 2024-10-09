//import React from 'react'

export default function Nav({userName, setUserName}) {
  return (
    <div className='mn-nav'>
      <div className='nav-title'>{`${userName}'s POW`}</div>
    </div>
  )
}
