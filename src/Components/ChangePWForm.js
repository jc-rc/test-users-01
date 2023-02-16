import React, {useState, useEffect} from 'react'

function ChangePWForm(props) {

    const [email, setEmail] = useState("")
    const [prevPW, setPrevPW] = useState("")
    const [newPW, setNewPW] = useState("")

    const handlePWForm = (e) =>{
        e.preventDefault()
        //FETCH
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/changePW?email=${email}&prevPW=${prevPW}&newPW=${newPW}`, {method: "PUT"})
        .then(response => response.json())
        .then(response => response.error ? alert("ERROR: Correo o Contraseña Incorrectos") : alert("Contraseña Actualizada"))
      }
    
      const setPasswordVisibility = (e) =>{
        document.getElementById("eyecon3").classList.toggle("fa-eye-slash")
            document.getElementById("eyecon3").classList.toggle("fa-eye")
            if(document.getElementById("eyecon3").classList.contains("fa-eye")){
                document.getElementById("pw3").setAttribute("type", "text")
            }else{
                document.getElementById("pw3").setAttribute("type", "password")
            }
      }
      const setPasswordVisibility2 = (e) =>{
        document.getElementById("eyecon4").classList.toggle("fa-eye-slash")
            document.getElementById("eyecon4").classList.toggle("fa-eye")
            if(document.getElementById("eyecon4").classList.contains("fa-eye")){
                document.getElementById("pw4").setAttribute("type", "text")
            }else{
                document.getElementById("pw4").setAttribute("type", "password")
            }
      }

      const handleEmail = (e)=>{
        setEmail(e.target.value)

      }
      const handlePrevPW = (e)=>{
        setPrevPW(e.target.value)

      }
      const handleNewPW = (e)=>{
        setNewPW(e.target.value)

      }

  return (
    <div className="modal-body">
              <form action="" onSubmit={handlePWForm}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="">Correo:</label>
                    <input className='form-control' type="email" onChange={handleEmail}/>
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="">Contraseña Anterior:</label>
                    <div className="input-group">
                    <input className='form-control' type="password" id="pw3" required  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Debe incluir 1 número, 1 letra mayúscula, 1 letra minúscula; y al menos 8 caracteres" onChange={handlePrevPW} />
                    <button className='btn' type='button' id='btn-eye' tabIndex={-1}  onClick={setPasswordVisibility}>
                        <span className="input-group-text" id="basic-addon1"><i id='eyecon3' className="fas fa-eye-slash"></i></span>
                        </button>
                </div>
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="">Nueva Contraseña:</label>
                    <div className="input-group">
                    <input className='form-control' type="password" id="pw4" required  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Debe incluir 1 número, 1 letra mayúscula, 1 letra minúscula; y al menos 8 caracteres" onChange={handleNewPW}/>
                    <button className='btn' type='button' id='btn-eye' tabIndex={-1}  onClick={setPasswordVisibility2}>
                        <span className="input-group-text" id="basic-addon1"><i id='eyecon4' className="fas fa-eye-slash"></i></span>
                        </button>
                </div>
                  </div>
                  <div className="col-12 text-end">
                    <button className="btn btn-primary">Enviar</button>
                  </div>
                </div>
              </form>
            </div>
  )
}

export default ChangePWForm