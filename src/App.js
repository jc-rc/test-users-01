import './App.css';
import { useState, useEffect } from 'react';
import View_Admin from './View_Admin';
import View_Empresa from './View_Empresa';
import View_Retador from './View_Retador';
import View_Organizador from './View_Organizador';
import UserFormRetador from './Components/UserFormRetador';
import ChangePWForm from './Components/ChangePWForm';
import SimpleCrypto from 'simple-crypto-js';


function App() {

  const simpleCrypto = new SimpleCrypto("accepted")


  const [currentUser, setCurrentUser] = useState(null)
  const [dummy, setDummy] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState({
    username: "",
    password: "",
  })

  const [exists, setExists] = useState(true)

  const handleUsernameChange = (e) => {
    setExists(true)
    setData({ ...data, username: e.target.value })
  }
  const handlePasswordChange = (e) => {
    setExists(true)
    setData({ ...data, password: e.target.value })
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    //KEY  
    const cy1 = simpleCrypto.encrypt(`${data.username}`)
    const cy2 = simpleCrypto.encrypt(`${data.password}`)


    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/validate2?arg1=${cy1}&arg2=${cy2}`,
      { method: "POST" })
      .then(setIsLoading(true))
      .then(response => response.json())
      .then(response => {


        if (response === null) {
          setExists(false)
          setIsLoading(false)
        } else if (response.error) {
          console.log("Token Expiró, regenerando...");
          document.querySelector("#btn-login").click()

        } else {
          setExists(true)
          setCurrentUser(response)
          setIsLoading(false)
        }


      })


  }





  return (
    <div className="container  p-4" style={{ maxWidth: 1500 }}>
      <div className="row ">
        
        <div className="col-12 d-flex justify-content-center">
          {!currentUser ? <form action="" style={{ maxWidth: 600 }} className="border p-4 rounded d-block d-md-block" onSubmit={handleSubmit}>

            <div className="mb-4">
              <div className="col text-center"><img src="./logo-ctvka.png" alt="" className='img-fluid m-3' style={{ height: 150 }} /></div>
              <p className="h4 m-0 text-center">Portal Hackatón Empresarial</p>
              <hr />
            </div>
            <div className="mb-3">
              <label htmlFor="">Email</label>
              <input name="username" type="text" onChange={handleUsernameChange} className="form-control" required />

            </div>
            <div className="mb-4">
              <label htmlFor="">Contraseña</label>
              <input type="password" name="password" onChange={handlePasswordChange} className="form-control" required />

            </div>

            {!exists ? <div className='alert alert-danger' role="alert">
              Ups...
              <p className='small m-0'>Verifica tu usuario y/o contraseña</p>
            </div> : null}

            {isLoading && <div className="alert alert-info text-center p-2">
          <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="m-0 small fw-light fs-4">Autorizando...</p>
        </div>}

            <button type="submit" className="btn btn-primary mb-4 w-100 naranja-ctvka" id='btn-login'>Ingresar</button>
            <hr />

            <p className='small m-0 '>
              <a href='#' data-bs-toggle="modal" data-bs-target="#modal-add-retador">Pre-Registro Retador</a>
            </p>
            <p className='small m-0'>
              <a href='#' data-bs-toggle="modal" data-bs-target="#modal-change-pw">Cambiar Contraseña</a>
            </p>
            <p className='small m-0'>
              ¿Problemas para ingresar? <a href="mailto:jcrc@sirius-tec.com">Contacta al Administrador</a>
            </p>

            

          </form> : null}

        </div>
        <div className="col-12 d-block" id="admin">{currentUser && currentUser.role === "ADMIN" ? <View_Admin user={currentUser} /> : null}</div>
        <div className="col-12 d-block">{currentUser && currentUser.role === "EMPRESA" ? <View_Empresa user={currentUser} /> : null}</div>
        <div className="col-12 d-block">{currentUser && currentUser.role === "RETADOR" ? <View_Retador user={currentUser} /> : null}</div>
        <div className="col-12 d-block">{currentUser && currentUser.role === "ORGANIZADOR" ?
          <View_Organizador user={currentUser} />

          : null}
        </div>
        {/* <div className="col-12 d-flex d-md-none">
          <div className="row d-flex justify-content-center">
            <p className='h1 mb-3 texto-naranja'><i className="fa-solid fa-face-frown"></i> <i class="fa-solid fa-mobile-screen-button"></i></p>
            <p className="h1 texto-naranja mb-2">Oops..</p>
            <hr />
            <p>Para garantizar la mejor experiencia, le sugerimos visitar el sitio desde una PC o tablet.</p>
          </div>
        </div> */}
      </div>



      {/* MODAL ADD RETADOR */}
      <div className="modal fade" id="modal-add-retador" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title h5" id="staticBackdropLabel">Pre-Registro Retador</p>
              <button type="button" className="btn-close cerrar-modal-retador" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <UserFormRetador dummy={dummy} />
            </div>

          </div>
        </div>
      </div>


      {/* MODAL CAMBIAR CONTRASEÑA */}
      <div className="modal fade" id="modal-change-pw" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title h5" id="staticBackdropLabel">Cambiar Contraseña</p>
              <button type="button" className="btn-close cerrar-modal-contraseña" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <ChangePWForm></ChangePWForm>

          </div>
        </div>
      </div>

    </div>





  );
}

export default App;
