
import './App.css'
import {useEffect, useState} from 'react'


function App() {

const [isClippingOn, setIsClippingOn] = useState(false)

useEffect(() => {
  setIsClippingOn(false)
}
, [])

  return (
    <>
      <div className='extension-body'>
          <h1>Clippify</h1>
          {!isClippingOn ?(
          <div className='clip-btn'>
            <h3>Clip from this video</h3>
          </div>
          ):null}
      </div>
    </>
  )
}

export default App
