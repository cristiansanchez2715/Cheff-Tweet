import React from 'react'
import { useEffect } from 'react'
import silueta from '../assets/silueta.jpg'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

import logoCheffTweet from '../assets/sin-fondo/gorro_Bautizado.png'

function ProfileUser({setVisibilitySesion, userEnter}) {
  const [visibilitySettings, setVisibilitySettings] = useState(false)

//   testing datos usuario
useEffect(() => {
    console.log("profile user: "+ JSON.stringify(userEnter))
},[])
const returnHome = () => {
setVisibilitySesion(true)
}

// options function

const Opciones = () => {
    return (
      <div className='opciones-container'>
        <h3 className='opcion'>Option1</h3>
        <h3 className='opcion'>Option2</h3>
        <h3 className='opcion'>Option3</h3>
      </div>
    );
  };


    return (
    <div className='profile-user-container'>
      
      <div className='logo-cheff-container2'>
<img src={logoCheffTweet} className='logo-cheff'></img>
        </div>
<button className='btn-logout-profile' onClick={returnHome} ><NavLink to="/home">Back</NavLink></button>
<button className='btn-settings' onClick={() => {
    setVisibilitySettings(!visibilitySettings)
}}>Settings</button>
<div className='photo-user-container'>

</div>
<div className='data-user-container custom-form'>
  <div className='increase-content'>
    <div>
    <h1>Nombre: <span className='datauser-info'>{userEnter.name}</span></h1>
    <h1>Apellido:<span className='datauser-info'> {userEnter.lastname}</span></h1>
    </div>
    <div>
    <img src={silueta} className='img-profile'></img>
    </div>
  </div>
  
  <div className='increase-content-data'>
    <h2>Usuario: <span className='datauser-info'>{userEnter.username}</span></h2>
    <h2 className='user-info'>Id: <span className='datauser-info'>{userEnter.id}</span></h2>
    <h2 className='user-info'>Email: <span className='datauser-info'>{userEnter.email}</span></h2>
    <h2 className='user-info'>Fecha de Nacimiento: <span className='datauser-info'>{userEnter.birthdate.substring(0, 10)}</span></h2>
    <h2 className='user-info'>Género: <span className='datauser-info'>{userEnter.gender}</span></h2>
  </div>
</div>

<div className='recets-user'>
<div className='recet1'>
<h2 style={{color: "#45a049"}}>Recet 1</h2>
<h2>Ingredients</h2>
<h2>Description</h2>
<p>Lorem ipsum</p>
</div>

<div className='recet2'>
<h2 style={{color: "#45a049"}}>Recet 2</h2>
<h2>Ingredients</h2>
<h2>Description</h2>
<p>Lorem ipsum</p>
</div>

</div>
<div className='position-settings'>
{
    visibilitySettings && Opciones()
}
</div>
    </div>
  )
}

export default ProfileUser