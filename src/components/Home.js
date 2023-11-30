import React from 'react'
import logoCheffTweet from '../assets/sin-fondo/gorro_Bautizado.png'
import iconRecetDefect from '../assets/sin-fondo/receta-uicon-removebg-preview.png'
import { useState } from 'react'

function Home({homeVisibility, setHomeVisibility, recetsAlreadyExist, visibilitySearch, setVisibilitySearch}) {
  let [visibilityDetails, setVisibilityDetails] = useState(false)
  const [selectedRecet, setSelectedRecet] = useState(null);
  const[searchInput, setSearchInput] = useState("")
  let [encontrada, setEncontrada] = useState(null) 
  const functionVisibilityDetails = (index) => {
    setVisibilityDetails(index)
    setSelectedRecet(recetsAlreadyExist[index]);

  }


  const searchFunction = (e) => {
    e.preventDefault()
    const recetaFind = recetsAlreadyExist.filter((rec) => {
      // Aquí, se compara el término de búsqueda con el nombre de la receta en minúsculas.
      return rec.name.toLowerCase().includes(searchInput.toLowerCase());
    });
  
   const recetaEncontrada = recetaFind.map((rec, ind) => (
      <div key={ind}>
        <h1>{rec.name}</h1>
        <h1>ID: {rec.id}</h1>
        <p>{rec.descripcion}</p>
      </div>
    ));
    setEncontrada(recetaEncontrada)
    if(encontrada){
        setVisibilitySearch(true)
        setHomeVisibility(false)
    }
  }
  
    return (     
   <div class="recipe-container">
    
        {visibilitySearch && <div className='search-result'>
                <button onClick={() => {
                    setVisibilitySearch(false)
                    setHomeVisibility(true)
                }}>X</button>
                <p>{encontrada}</p></div>}
     
        <div className='containeer-search'>
            
        <h1 style={{color: "green"}}>Recets</h1>
        <div className='search-form'>
            <div className='search-container' style={{display: "flex", flexDirection: "row"}}>
            <input className='input-search'  placeholder='search' onChange={(e) => {
setSearchInput(e.target.value)
            }}></input>
            <button className='search-button' onClick={searchFunction}>Search</button>
            </div>
            
        </div>
        </div>

<div className='contenedor-column'> 
{homeVisibility && recetsAlreadyExist.map((recet, index) => {

return(
    <div key={index} className='recipe-into-container'>
        
    <div className='item-container'>
<h1>Name Recet: {recet.name}</h1>
<h1>Name Usuario: {JSON.stringify(recet.usuario)}</h1>
<p>Recet Ingredients: {recet.ingredients} </p>
</div>
<div className='view-recet-container'>
    <img src={iconRecetDefect} className='icon' alt='icono'></img>
    <button className='nav-button' onClick={() => functionVisibilityDetails(index)}>View Recet</button>
</div>

{visibilityDetails === index && (<div className='descripcion-container'>
    <button className='btn-close-details' onClick={() => setVisibilityDetails(false)}>X</button>
    <p>{recet.descripcion}</p>
    </div>)}

</div>
)
})
}

</div>
    </div>
  )
}

export default Home


