import './App.css';
import { useState, useEffect } from 'react';
import View_Admin from './View_Admin';
import View_Empresa from './View_Empresa';
import View_Retador from './View_Retador';
import View_Organizador from './View_Organizador';

function App() {

  

const [currentUser, setCurrentUser] = useState(null)

const [data, setData] = useState({
  username: "",
  password: "",
})

const [exists, setExists] = useState(true)

const handleUsernameChange = (e)=>{
  setExists(true)
  setData({...data, username: e.target.value})
}
const handlePasswordChange = (e)=>{
  setExists(true)
  setData({...data, password: e.target.value})
}


const handleSubmit = (e)=>{
  e.preventDefault()

  fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/validateUser?username=${data.username}&password=${data.password}`,
  {method: "POST"})
  .then(response => response.json())
  .then(response=>{
    if(response === null){
      setExists(false)
    }else{
      setExists(true)
      setCurrentUser(response)
    }
  })
  
    
}



  return (
    <div className="container  p-4" style={{maxWidth: 1300}}>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          {!currentUser ? <form action="" style={{maxWidth: 600}} className="border p-4 rounded" onSubmit={handleSubmit}>
            <h2>Bienvenido a CREATIVIKA</h2>
            <div className="mb-3">
             
            </div>
            <div className="mb-3">
              <label htmlFor="">Username</label>
              <input name="username" type="text" onChange={handleUsernameChange} className="form-control" required/>
              
            </div>
            <div className="mb-4">
              <label htmlFor="">Password</label>
              <input type="password" name="password" onChange={handlePasswordChange} className="form-control" required />
              
            </div>

           { !exists ? <div className='alert alert-danger' role="alert">
                Ups... 
                <p className='small m-0'>Verifica tu usuario y/o contraseña</p>
            </div> : null}
            
            <button type="submit"  className="btn btn-primary mb-4 w-100">Ingresar</button>
            
            
            <p className='small'>
              ¿Problemas para ingresar? <a href="mailto:jcrc@sirius-tec.com">Contacta al Administrador</a>
            </p>
            
            </form> : null}
          
        </div>
          <div className="col-12 d-none d-md-block" id="admin">{currentUser && currentUser.role === "ADMIN" ? <View_Admin user={currentUser}/> : null}</div>
          <div className="col-12 d-none d-md-block">{currentUser && currentUser.role === "EMPRESA" ? <View_Empresa user={currentUser}/> : null}</div>
          <div className="col-12 d-none d-md-block">{currentUser && currentUser.role === "RETADOR" ? <View_Retador user={currentUser}/> : null}</div>
          <div className="col-12 d-none d-md-block">{currentUser && currentUser.role === "ORGANIZADOR" ? <View_Organizador user={currentUser}/> : null}</div>
          <div className="col-12 d-flex d-md-none">
            <div className="row d-flex justify-content-center">
                  <p className="h2">Oops..</p>
                  <hr />
                  <p>Para garantizar la mejor experiencia, le sugerimos visitar el sitio desde una PC o tablet.</p>
            </div>
            </div>
      </div>
      
    </div>

    
    
  );
}

export default App;
