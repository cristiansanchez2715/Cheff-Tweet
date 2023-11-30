import './App.css';
import React, { Profiler } from 'react';
import IncreaseData from './components/IncreaseData';
import Home from './components/Home'
import BarNav from './components/BarNav';
import ViewRecet from './components/ViewRecet';
import { useState } from 'react';
import LogIn from './components/LogIn';
import { useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogUp from './components/LogUp'
// import axios from 'axios';
import ProfileUser from './components/ProfileUser';

function App() {

  let today = new Date
  let [visibilitySesion, setVisibilitySesion] = useState(false)
  let [visibilityLogIn, setVisibilityLogIn] = useState(true)
  let [loginUser, setLoginUser] = useState({username: "", pasword: "", email: ""})
  let [newUser, setNewUser] = useState({username: "", name:"", lastname: "", email : "", password: "", birthdate: "", gender: "male", })
  let [usersAlreadyExist, setUsersAlreadyExist] = useState([])
  const [error, setError] = useState(null);
let [userEnter, setUserEnter] = useState(null)
let [newRecet, setNewRecet] = useState({name: null, ingredients: null, descripcion: null, usuario: null})
let [recetsAlreadyExist, setRecetsAlreadyExist] = useState([])
const [visibilitySearch, setVisibilitySearch] = useState(false)
const [homeVisibility, setHomeVisibility] = useState(true)


// enviar estado login al backend 
  useEffect(() => {
    if (loginUser.username && loginUser.password && loginUser.email) {
      // Enviar datos del usuario al backend
      axios.post('http://localhost:4000/login', loginUser)
        .then(response => {
          // Manejar la respuesta del servidor
          console.log(response.data);
          // Aquí podrías ajustar el estado o realizar otras acciones según la respuesta del servidor
        })
        .catch(error => {
          // Manejar errores
          console.error(error);
        });
    }
  }, [loginUser]);



// ENVIANDO NUEVOS USUARIOS AL BACKEND
useEffect(() => {
  if (newUser) {
    const sendApiNewUser = async () => {
      try {
        console.log("Enviando nuevo usuario:", newUser); // Agrega este log para verificar el objeto newUser
        const apiUrl = 'http://localhost:4000/store-user';
        await axios.post(apiUrl, newUser);
        setNewUser(null);
        console.log("Datos enviados a la API");
      } catch (error) {
        console.error("El error es: ", error);
      }
    };
    sendApiNewUser();
  }
}, [newUser]);


// TRAER USUARIOS DESDE EL BACKEND HASTA EL FRONTEND

useEffect(() => {
  const fetchUsers = () => {
      axios.get('http://localhost:4000/get_users')
          .then(response => {
              setUsersAlreadyExist(response.data.users);
          })
          .catch(error => {
              console.error("Error al obtener los usuarios:", error);
          });
  };

  fetchUsers();
}, []);

const sesionIniciated = () => {
  return (
    <div className='sesioniniciada'>
    <BarNav setVisibilityLogIn={setVisibilityLogIn} setVisibilitySesion={setVisibilitySesion} />
    <IncreaseData userEnter={userEnter} setNewRecet={setNewRecet} newRecet={newRecet} />
    
    <Home homeVisibility={homeVisibility} setHomeVisibility={setHomeVisibility} visibilitySearch={visibilitySearch} setVisibilitySearch={setVisibilitySearch} recetsAlreadyExist={recetsAlreadyExist}></Home>
<ViewRecet />
    </div>
  )
}

const logIn = () => {
  return (
    <LogIn setVisibilitySearch={setVisibilitySearch} setHomeVisibility={setHomeVisibility} setUserEnter={setUserEnter}  setVisibilitySesion={setVisibilitySesion}  usersAlreadyExist={usersAlreadyExist} setUsersAlreadyExist={setUsersAlreadyExist} setVisibilityLogIn={setVisibilityLogIn} setLoginUser={setLoginUser} />
    )
}



// LOGICA RECETAS


// Enviando Recetas Al Backend

useEffect(() => {
  if (newRecet && newRecet.name && newRecet.descripcion && newRecet.ingredients) {
    const sendApiNewUser = async () => {
      try {
        console.log("Enviando nuevo usuario:", newRecet); // Agrega este log para verificar el objeto newUser
        const apiUrl = 'http://localhost:4000/store-recets';
        await axios.post(apiUrl, newRecet);
        setNewRecet(null);
        console.log("Receta enviada a la API");
      } catch (error) {
        console.error("El error es: ", error);
      }
    };
    sendApiNewUser();
  
  }
}, [newRecet]);


// traer recetas desde la base de datos


useEffect(() => {
  const fetchRecets = () => {
      axios.get('http://localhost:4000/get_recets')
          .then(response => {
              setRecetsAlreadyExist(response.data.recets);
          })
          .catch(error => {
              console.error("Error al obtener los usuarios:", error);
          });
  };

  fetchRecets();
}, []);

useEffect(() => {
  const fetchRecets = () => {
      axios.get('http://localhost:4000/get_recets')
          .then(response => {
              setRecetsAlreadyExist(response.data.recets);
          })
          .catch(error => {
              console.error("Error al obtener los usuarios:", error);
          });
  };

  fetchRecets();
}, [newRecet]);



// RETURN CENTRAL 

  return (
    <div className="App">
<BrowserRouter>
  <Routes>
    <Route element={<LogUp usersAlreadyExist={usersAlreadyExist} setUsersAlreadyExist={setUsersAlreadyExist}  newUser={newUser} setNewUser={setNewUser}  setVisibilityLogIn={setVisibilityLogIn} />} path="/createUser"></Route>
    <Route element={<LogIn />} path="/signIn"></Route>
    <Route element={<sesionIniciated />} path='/home'></Route>
    <Route element={<ProfileUser setRecetsAlreadyExist={setRecetsAlreadyExist} recetsAlreadyExist={recetsAlreadyExist} setVisibilitySesion={setVisibilitySesion} userEnter={userEnter} setUserEnter={setUserEnter}/>}  path="/UserProfile"></Route>
  </Routes>
  {/* <React.Fragment> */}
    {visibilityLogIn ? logIn() : null}
{visibilitySesion && sesionIniciated()}
    
     {/* </React.Fragment> */}
    
</BrowserRouter>
    </div>
  );
}

export default App;

