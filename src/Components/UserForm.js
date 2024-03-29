import React, {useState, useEffect} from 'react'

function UserForm(props) {

    useEffect(()=>{
        setForm({...form, hkt: props.event})
    }, [props])
    

    var [form, setForm] = useState({
        username: "",
        password: "",
        role: "",
        hkt: "",
        empresa_ret: "",
        team1: "",
        team2: "",
        team3: "",
        team4: "",
        team5: "",
        email: "",
        tel: "",
        repEmpresa: "",
        pEmpresa: "",
        rfcEmpresa: "",
        repOrga: "",
        pOrga: "",

    })

    const setPasswordVisibility = ()=>{

        document.getElementById("eyecon").classList.toggle("fa-eye-slash")
        document.getElementById("eyecon").classList.toggle("fa-eye")
        if(document.getElementById("eyecon").classList.contains("fa-eye")){
            document.getElementById("pw").setAttribute("type", "text")
        }else{
            document.getElementById("pw").setAttribute("type", "password")
        }
        
        
        
    }


    const handleUsernameChange = (e)=>{
        setForm({...form, username: e.target.value})
    }
    const handleRoleChange = (e)=>{
        setForm({...form, role: e.target.value})

        //Poner / quitar "required"
          
      
    }
    const handlePasswordChange = (e)=>{
        setForm({...form, password: e.target.value})
    }
    const handleEmpresaChange = (e)=>{
        setForm({...form, empresa_ret: e.target.value})
        
    }
    const handleTeam1Change = (e)=>{
        setForm({...form, team1: e.target.value});
    }
    const handleTeam2Change = (e)=>{
        setForm({...form, team2: e.target.value});
    }
    const handleTeam3Change = (e)=>{
        setForm({...form, team3: e.target.value});
    }
    const handleTeam4Change = (e)=>{
        setForm({...form, team4: e.target.value});
    }
    const handleTeam5Change = (e)=>{
        setForm({...form, team5: e.target.value});
    }
    const handleEmailChange = (e)=>{
        setForm({...form, email: e.target.value});
    }
    const handleTelChange = (e)=>{
        setForm({...form, tel: e.target.value});
    }
    const handleRepEmpresa = (e)=>{
        setForm({...form, repEmpresa: e.target.value});
    }
    const handlePEmpresa = (e)=>{
        setForm({...form, pEmpresa: e.target.value});
    }
    const handleRFCEmpresa = (e)=>{
        setForm({...form, rfcEmpresa: e.target.value});
    }
    const handleRepOrga = (e)=>{
        setForm({...form, repOrga: e.target.value});
    }
    const handlePOrga = (e)=>{
        setForm({...form, pOrga: e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
       
        //Lógica de INSERTAR usuario en DB

   fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/createUser?username=${form.username}&password=${form.password}&role=${form.role}&hkt=${form.hkt}&empresa_ret=${form.empresa_ret}&team1=${form.team1}&team2=${form.team2}&team3=${form.team3}&team4=${form.team4}&team5=${form.team5}&email=${form.email}&tel=${form.tel}&repEmpresa=${form.repEmpresa}&pEmpresa=${form.pEmpresa}&rfcEmpresa=${form.rfcEmpresa}&repOrga=${form.repOrga}&pOrga=${form.pOrga}`,
        {method:"POST"})
        .then(response => response.json())
        .then(response => response.error ? alert("ERROR, Usuario o Correo ya registrados"): alert("Usuario Creado"))
        .then( document.getElementById("userForm").reset())
        .then(setForm({hkt: props.event}))
        .then( document.querySelector(".cerrar-modal").click())
        .then( setTimeout(() => {
            document.querySelector("#view-admin-refresh").click()
        }, 1500) )

    }

    
    const handleReset = (e)=>{
        setForm({hkt: props.event})
    }


  return (
    <div className="row">
        <form action="" id='userForm' onSubmit={handleSubmit} onReset={handleReset}>
            
            <div className="mb-3">
                <label className='form-label' htmlFor="">Nombre:</label>
                <input className='form-control' type="text" required onChange={handleUsernameChange} maxLength={20} placeholder="Máx. 20 caracteres."/>
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Correo:</label>
                <input type={"email"} className="form-control" required onChange={handleEmailChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='Correo válido: ejemplo@dominio.com'/>
            </div>
            <div className="mb-3">
                <label className='form-label' htmlFor="">Contraseña:</label>
                <div className="input-group">
                    <input className='form-control' type="password" id="pw" required onChange={handlePasswordChange} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Debe incluir 1 número, 1 letra mayúscula, 1 letra minúscula; y al menos 8 caracteres" />
                    <button className='btn' type='button' id='btn-eye' tabIndex={-1}  onClick={setPasswordVisibility}>
                        <span className="input-group-text" id="basic-addon1"><i id='eyecon' className="fas fa-eye-slash"></i></span>
                        </button>
                </div>
            </div>
            
            <div className="mb-3">
                <label htmlFor="" className="form-label">Teléfono:</label>
                <input type="tel" name="" className='form-control' required onChange={handleTelChange} maxLength={10} pattern="[0-9]{10}" title='Teléfono MX a 10 dígitos' />
            </div>
            <div className="mb-3">
                <label className='form-label' htmlFor="">Rol:</label>
                <select className='form-select' name="" required onChange={handleRoleChange}>
                    <option hidden value="">Selecciona el Rol</option>
                    <option value="ORGANIZADOR">ORGANIZADOR</option>
                    <option value="EMPRESA">EMPRESA</option>
                    <option value="RETADOR">RETADOR</option>
                </select>
            </div>

            {
                  form.role === "RETADOR" ?
                      <div>
                          <div className="mb-3">
                              <label className='form-label' htmlFor="">Empresa Retada:</label>
                              {/* <input className='form-control' id='empresa' type="text"  onChange={handleEmpresaChange} /> */}
                              <select className='form-select' name="" required title='Si no hay opciones de Empresa, asegúrate de crear / aprobar un usuario con rol "Empresa".' onChange={handleEmpresaChange}>
                                    <option value="" hidden>Selecciona una Empresa</option>
                                    {props.empresasOptions.map((option, key)=>{
                                        return(
                                            <option value={option} key={key}>{option}</option>
                                        )
                                    })}
                              </select>
                          </div>
                          <div className="mb-3">
                              
                                  <label className='form-label' htmlFor="">Equipo:</label>
                                  
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#1</span>
                                  <input className='form-control' type="text" id="0" placeholder='Líder del Equipo'  onChange={handleTeam1Change} />
                                  </div>
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#2</span>
                                  <input className='form-control' type="text" id="1"  onChange={handleTeam2Change} />
                                  </div>
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#3</span>
                                  <input className='form-control' type="text" id="2"  onChange={handleTeam3Change} />
                                  </div>
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#4</span>
                                  <input className='form-control' type="text" id="3"  onChange={handleTeam4Change} />
                                  </div>
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#5</span>
                                  <input className='form-control' type="text" id="4"  onChange={handleTeam5Change} />
                                  </div>
                                  
                                 
                              <hr />
                              
                          </div>
                      </div>
                      : null
            }

            {form.role === "EMPRESA" && <div>
                
                
               <div className="mb-3">
                <label htmlFor="" className='form-label'>Representante de la Empresa:</label>
                <input type="text" className="form-control" required={form.role === "EMPRESA"} onChange={handleRepEmpresa} />
               </div>
               <div className="mb-3">
                <label htmlFor="" className='form-label'>Puesto en la Empresa:</label>
                <input type="text" className="form-control" required={form.role === "EMPRESA"} onChange={handlePEmpresa}/>
               </div>
               <div className="mb-3">
                <label htmlFor="" className='form-label'>RFC de la Empresa:</label>
                <input type="text" className="form-control" required={form.role === "EMPRESA"} minLength={13} maxLength={13} pattern="[0-9A-Z]{13}" title='RFC válido; letras mayúsculas y números; 13 caracteres.'  onChange={handleRFCEmpresa}/>
               </div>
                
                </div>}
            {form.role === "ORGANIZADOR" && <div>
                
                
               <div className="mb-3">
                <label htmlFor="" className='form-label'>Representante de la Delegación:</label>
                <input type="text" className="form-control" required={form.role === "ORGANIZADOR"} onChange={handleRepOrga} />
               </div>
               <div className="mb-3">
                <label htmlFor="" className='form-label'>Puesto:</label>
                <input type="text" className="form-control" required={form.role === "ORGANIZADOR"} onChange={handlePOrga}/>
               </div>
                               
                </div>}

            <button className="btn btn-primary float-end" type='submit'>Crear</button>
            <button className="btn btn-outline-danger me-3 float-end" type="reset">Limpiar</button>
        </form>
    </div>
  )
}

export default UserForm