import React, { useEffect } from 'react'
import { useState } from 'react'
import logoCheffTweet from '../assets/sin-fondo/gorro_Bautizado.png'
import { json } from 'react-router-dom'

// import { unstable_renderSubtreeIntoContainer } from 'react-dom'

function IncreaseData({newRecet, setNewRecet, userEnter}) {
  let [readingRecet, setReadingRecet] = useState({name: "", ingredients: "", descripcion: "", usuario: ""})
  let[error, setError] = useState(null)
  let [recetCreate, setRecetCreate] = useState(null)

// funcion comprobacion formulario
const functionComprobacion = (e)  => {
  e.preventDefault()
  if(readingRecet.name.length > 3){
    if(readingRecet.ingredients.length > 10){
      if(readingRecet.descripcion.length > 30){
        submitForm()
      }
    }
  }
  else if(!readingRecet.name || !readingRecet.ingredients || !readingRecet.descripcion){
    setRecetCreate(null)
    setError("Diligencia todos los campos del formulario")
  }
} 


  // Capturar el formulario
  const changeForm = (e) => {
    setReadingRecet(prevState => ({ 
        ...prevState,
        [e.target.name]: e.target.value
    }));
}

const submitForm = async () => {
  try {
    setNewRecet({
      name: readingRecet.name,
      ingredients: readingRecet.ingredients,
      descripcion: readingRecet.descripcion,
      usuario: userEnter.username
    });
    setError(null);
    setRecetCreate("La Receta Ha Sido Creada Con Exito");
  } catch (error) {
    console.error("Error al enviar la receta a la API:", error);
    setError("Hubo un error al crear la receta. Por favor, inténtalo de nuevo.");
  } finally {
    console.log("Limpiando campos del formulario");
    setReadingRecet({ name: null, ingredients: null, descripcion: null, usuario: null });
  }
};


// Confirmacion del Formulario




  return (
    <form class="custom-form" onSubmit={functionComprobacion}>
 <div className='logo-cheff-container'>
<img src={logoCheffTweet} className='logo-cheff'></img>
        </div>

        <h1 class="form-title">Increase Your Receipts Of Cook</h1>
        <label>Nombre Receta</label>
        <input placeholder='Superior a 3 caracteres' class="input-content" onChange={changeForm} type='text' name='name'></input>
        <label>Ingredients</label>
        <input placeholder='superior a 10 caracteres' class="input-content" onChange={changeForm} type='text' name='ingredients'></input>
        <textarea placeholder="superior a 30 caracteres" class="increase-content" onChange={changeForm} name='descripcion'></textarea>
        <button class="increase-button" type='submit'>Increase</button>
        {recetCreate && <div>
          <h1 style={{color: "green"}}>La Receta Ha Sido Creada Con Exito</h1>
          </div>}
          {error && <div>
            <h1 style={{color: "red"}}>{error}</h1></div>}
            <div>
            {/* {visibilityConfirmacion && (
  <div>
    {funcionConfirmacion()}
  </div>
)} */}
</div>
    </form>
  )
}

export default IncreaseData