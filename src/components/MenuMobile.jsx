import React from 'react'
import Filter from "../components/Filter"

function MenuMobile( {toggleMenu} ) {
  return (
    <div className={toggleMenu === true ? 'absolute w-3/4 h-full bg-grey-white2 top-20 right-0' : 'absolute hidden w-3/4 h-full bg-grey-white2 top-20 right-0'}>
        <Filter />
    </div>
  )
}

export default MenuMobile