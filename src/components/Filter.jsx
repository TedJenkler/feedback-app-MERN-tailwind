import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Filter() {
    const feedback = useSelector((state => state.state.data.productRequests))
    const [filterBy, setFilterBy] = useState("ALL")
    console.log(feedback)
  return (
    <div>
        <button onClick={(e) => {setFilterBy("ALL")}} value={filterBy}>All</button>
        <button onClick={(e) => {setFilterBy("UI")}} value={filterBy}>UI</button>
        <button onClick={(e) => {setFilterBy("UX")}} value={filterBy}>UX</button>
        <button onClick={(e) => {setFilterBy("Enhancement")}} value={filterBy}>Enhancement</button>
        <button onClick={(e) => {setFilterBy("Bug")}} value={filterBy}>Bug</button>
        <button onClick={(e) => {setFilterBy("Feature")}} value={filterBy}>Feature</button>
    </div>
  )
}

export default Filter