import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function LogUp({setVisibilityLogIn, setNewUser, newUser, usersAlreadyExist, setUsersAlreadyExist}) {
const [register, setRegister] = useState({username: "", name:"", lastName: "", email : "", password: "", confirmPassword: "", birthdate: "", gender: "male"})
const [error, setError] = useState(null)
const [formComplete, setFormComplete] = useState(null)
// const navigate = useNavigate()

// CONDICIONALES DE REGISTRO
const functionComprobateUsernmeAndEmail = (e) => {
    e.preventDefault();

  let userPresente = usersAlreadyExist.find((exist) => register.username === exist.username);
  let emailPresent = usersAlreadyExist.find((exist) => register.email === exist.email);

  if (userPresente || emailPresent) {
    setError("Lo sentimos, el usuario o el correo electrónico ya está registrado");
  } else {
    setError(null);
    submitForm(e);
  }
}


const changeVisibility = () => {
    setVisibilityLogIn(false)
}


useEffect(() => {
    changeVisibility()
} ,[])


const changeForm = (e) => {
    setRegister(prevState => ({ 
        ...prevState,
        [e.target.name]: e.target.value
    }));
}


const submitForm = (e) => {
e.preventDefault()
setNewUser({
    username: register.username,
    name: register.username,
    lastname: register.lastName,
    email: register.email,
    password: register.password,
    birthdate: register.birthdate,
    gender: register.gender

})
setError(null)
setFormComplete("Usuario Registrado con Exito")
// navigate("localhost:3000")
}

const comprobarContraseñas = (e) => {
    e.preventDefault()
    if(register.password === register.confirmPassword){
functionComprobateUsernmeAndEmail(e)
    }
    else{
        setError("Las contraseñas no coinciden")
    }
}


    return (
    <form onSubmit={(e) => comprobarContraseñas(e)}>   
             <label>
    Nombre de Usuario:
    <input type="text"  name="username" required  onChange={changeForm}/>
</label>
        
             <label>
    Nombre:
    <input type="text" name="name" required onChange={changeForm} />
</label>

<label>
    Apellido:
    <input type="text" name="lastName" required onChange={changeForm} />
</label>

<label>
    Correo electrónico:
    <input type="email" name="email" required onChange={changeForm} />
</label>

<label>
    Contraseña:
    <input type="password" name="password" required onChange={changeForm} />
</label>

<label>
    Confirmar Contraseña:
    <input type="password" name="confirmPassword" required onChange={changeForm} />
</label>

<label>
    Fecha de Nacimiento:
    <input type="date" name="birthdate" required onChange={changeForm} />
</label>

<label>
    Género:
    </label>
    <select name="gender" required onChange={changeForm} >
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
        <option value="other">Otro</option>
    </select>


<button type="submit">Registrar</button>
{error && (<div>
    <br></br>
    <h1 style={{color: "red"}}>{error}</h1></div>)}
{formComplete && (
    <div>
        <br></br>
        <h1 style={{color: "red"}}>{formComplete}</h1>
        </div>
    )}

</form>
  )
}

export default LogUp