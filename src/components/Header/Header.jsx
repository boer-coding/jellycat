import React from 'react'
import "./header.css"; // Import the CSS file

export default function Header() {
  return (
    <div className='header'>
        <div className='headerContainer'>
            <div className='headerLeft'>
                <div className='headerTitle'>
                    <span className='titleBig'>See</span> everything <br />with 
                    <span className='titleBig'> Clarity</span>
                </div>
                <div className='headerText'>Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered.</div>
                <div className='headerButton'>Shop Now <div className='buttonIcon'></div></div>
            </div>
            <div className='headerRight'></div>
        </div>
    </div>
  )
}
