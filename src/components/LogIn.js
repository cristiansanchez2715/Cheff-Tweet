import React from 'react'
import { useState } from 'react'
import  iconSofware  from'../assets/sin-fondo/gorro-removebg-preview.png'
import { NavLink } from 'react-router-dom/dist'
import { useEffect } from 'react'
import logoCheffTweet from '../assets/sin-fondo/gorro_Bautizado.png'
function LogIn({setVisibilitySearch, setHomeVisibility, setUserEnter, setLoginUser, usersAlreadyExist, setUsersAlreadyExist, setVisibilitySesion, setVisibilityLogIn}) {

    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
})




// Logica capturar formulario

const handelChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}



const handleSubmit = (e) => {
    e.preventDefault()
    setLoginUser({
        name: formData.username,
        contraseña: formData.password,
      });
}

// Logica comprobar formulario
const functionComprobateUser = (e) => {
    e.preventDefault()
  
  
  let usuarioExiste = usersAlreadyExist && usersAlreadyExist.find((user) => {
  return    user.username === formData.username && user.password === formData.password 
  
  })    
  if(usuarioExiste){
    setVisibilitySesion(true)
    setVisibilityLogIn(false)
    setVisibilitySearch(false) 
    setHomeVisibility(true)
    setUserEnter(usuarioExiste);
  }
  else{
    setError("El usuario registrado no existe en la base de datos");
  }
  }



    


  return (
    <form onSubmit={functionComprobateUser}>
<div className='container-img'>
    <img src={logoCheffTweet} className='img-login'></img>
</div>

    <label>
        Nombre de usuario:
        <input  type="text" name="username" onChange={handelChange} required />
    </label>
    
    <label>
        Correo electrónico:
        <input type="email" name="email" onChange={handelChange} required />
    </label>
    
    <label>
        Contraseña:
        <input type="password" name="password" onChange={handelChange} required />
    </label>
    
    <button type="submit">Registrar</button>
<br></br>
    <p style={{color: "orange", marginTop: "10px"}}>No estas registrado? <NavLink  className="navlink" to="/createUser" style={{color: "blue"}}>Registrate Aqui</NavLink></p>
    {error && (
    <div>
        <h1 style={{ color: "red" }}>{error}</h1>
    </div>
)}
</form>
  )
}

export default LogIn