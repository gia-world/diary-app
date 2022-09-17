import React from 'react'

interface header{
    headerText:string;
    left?:string;
    right?:string;
}

const Header = ({headerText,left,right}:header) => {
  return (
    <header className='Header'>
        <div className="Header__btn--left">{left}</div>
        <div className="Header__text">{headerText}</div>
        <div className="Header__btn--right">{right}</div>
    </header>
  )
}

export default Header