import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function BarNav({setVisibilitySesion, setVisibilityLogIn}) {
const [visibilityInstruccions, setVisibilityInstruccions] = useState(false)


const closeSesion = () => {
  setVisibilitySesion(false)
  setVisibilityLogIn(true)
}

  const profileShowMe = () => {
    setVisibilitySesion(false)
  }

  const increaseExplication = () => {
    return (
      <div className="increaseExplication-container">
        <button
          className="increaseExplication-closeButton"
          onClick={() => {
            setVisibilityInstruccions(false);
          }}
        >
          X
        </button>
        <h1 className="increaseExplication-title">Instrucciones de uso:</h1>
        <p className="increaseExplication-paragraph">
          Las recetas se almacenan en una base de datos y se muestran en la sección del home de la aplicación. Debes rellenar todos los campos del formulario y tu receta será enviada a un monitor que la aprobará o desaprobará.
        </p>
      </div>
    );
  };
  

  return (
    <nav class="navbar">
        <button onClick={profileShowMe}  class="nav-button"><NavLink to='/UserProfile'>Profile</NavLink></button>
        <button class="nav-button" onClick={() => setVisibilityInstruccions(!visibilityInstruccions)}>Increase</button>
        <button onClick={closeSesion} class="nav-button">Log Out</button>
        {/* <button class="nav-button">Options</button> */}

        {visibilityInstruccions && increaseExplication()}
    </nav>
  )
}

export default BarNav