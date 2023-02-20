import React, {useState, useEffect} from 'react'

function UserFormEdit(props) {

    useEffect(()=>{
        document.getElementById("userFormEdit").reset()
        //Poblar los campos del formulario
        setForm({
            _id: props.initValues._id,
            username: props.initValues.username,
            password: props.initValues.password,
            role: props.initValues.role,
            hkt: props.event,
            team1: props.initValues.team[0] === undefined ? "" : props.initValues.team[0] ,
            team2: props.initValues.team[1] === undefined ? "" : props.initValues.team[1] ,
            team3: props.initValues.team[2] === undefined ? "" : props.initValues.team[2] ,
            team4: props.initValues.team[3] === undefined ? "" : props.initValues.team[3] ,
            team5: props.initValues.team[4] === undefined ? "" : props.initValues.team[4] ,
            empresa_ret: props.initValues.empresa_ret,
            email: props.initValues.email,
            tel: props.initValues.tel
        })


    }, [props.initValues, props.event])

    const [form, setForm] = useState({
        _id: "",
        username: "",
        password: "",
        role: "",
        hkt: props.event,
        team: [],
        empresa_ret: "",
        email:"",
        tel:""

    })

    const setPasswordVisibility = ()=>{

        document.getElementById("eyecon-edit").classList.toggle("fa-eye-slash")
        document.getElementById("eyecon-edit").classList.toggle("fa-eye")
        if(document.getElementById("eyecon-edit").classList.contains("fa-eye")){
            document.getElementById("pw-edit").setAttribute("type", "text")
        }else{
            document.getElementById("pw-edit").setAttribute("type", "password")
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
    const handleHKTChange = (e)=>{
        setForm({...form, hkt: e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
       
        //Lógica de ACTUALIZAR usuario en DB

   fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/updateUser?_id=${form._id}&username=${form.username}&password=${form.password}&role=${form.role}&hkt=${form.hkt}&team1=${form.team1}&team2=${form.team2}&team3=${form.team3}&team4=${form.team4}&team5=${form.team5}&empresa_ret=${form.empresa_ret}&email=${form.email}&tel=${form.tel}`,
        {method:"PUT"})
        .then(response => response? alert("User Modified"): null)
        .then( document.getElementById("userFormEdit").reset())
        .then( document.querySelector(".cerrar-modal-edit").click())
        .then( setTimeout(() => {
            document.querySelector("#view-admin-refresh").click()
        }, 1500) )
        

    }

    
    const handleReset = ()=>{
        setForm({
            _id: props.initValues._id,
            username: props.initValues.username,
            password: props.initValues.password,
            role: props.initValues.role,
            hkt: props.event,
            team1: props.initValues.team[0] === undefined ? "" : props.initValues.team[0] ,
            team2: props.initValues.team[1] === undefined ? "" : props.initValues.team[1] ,
            team3: props.initValues.team[2] === undefined ? "" : props.initValues.team[2] ,
            team4: props.initValues.team[3] === undefined ? "" : props.initValues.team[3] ,
            team5: props.initValues.team[4] === undefined ? "" : props.initValues.team[4] ,
            empresa_ret: props.initValues.empresa_ret,
            email: props.initValues.email,
            tel: props.initValues.tel
        })
    }


  return (
    <div className="row">
        <form action="" id='userFormEdit' onSubmit={handleSubmit} onReset={handleReset}>

            { props.user.role === "ADMIN" && <div className="mb-3">
                <label className='form-label' htmlFor="">Hackathon:</label>
                <input className='form-control' type="text" required onChange={handleHKTChange} maxLength={20} placeholder="Máx. 20 caracteres." id='ipt-hkt-edit' value={form.hkt} />
            </div>}
            
            <div className="mb-3">
                <label className='form-label' htmlFor="">Nombre:</label>
                <input className='form-control' type="text" required onChange={handleUsernameChange} maxLength={20} placeholder="Máx. 20 caracteres." id='ipt-username-edit' value={form.username}/>
            </div>
            <div className="mb-3">
                <label className='form-label' htmlFor="">Contraseña:</label>
                <div className="input-group">
                    <input className='form-control' type="password"  id="pw-edit" required onChange={handlePasswordChange} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Debe incluir 1 número, 1 letra mayúscula, 1 letra minúscula; y al menos 8 caracteres" value={form.password} />
                    <button className='btn' type='button' id='btn-eye-edit' tabIndex={-1}  onClick={setPasswordVisibility}>
                        <span class="input-group-text" id="basic-addon1"><i id='eyecon-edit' className="fas fa-eye-slash"></i></span>
                        </button>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Correo:</label>
                <input type={"email"} className="form-control" required onChange={handleEmailChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='Correo válido: ejemplo@dominio.com' value={form.email}/>
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Teléfono:</label>
                <input type="tel" name=""  className='form-control' required onChange={handleTelChange} maxLength={10} pattern="[0-9]{10}" title='Teléfono MX a 10 dígitos' value={form.tel}/>
            </div>
            <div className="mb-3">
                <label className='form-label' htmlFor="">Role:</label>
                <select className='form-select' name="" required onChange={handleRoleChange} value={form.role}>
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
                              {/* <input className='form-control' id='empresa' type="text"  onChange={handleEmpresaChange} value={form.empresa_ret}/> */}
                              <select className='form-select' name="" id="" onChange={handleEmpresaChange} value={form.empresa_ret}>
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
                                  <input className='form-control' type="text" id="0" placeholder='Líder del Equipo'  onChange={handleTeam1Change} value={form.team1}/>
                                  </div>
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#2</span>
                                  <input className='form-control' type="text" id="1"  onChange={handleTeam2Change} value={form.team2}/>
                                  </div>
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#3</span>
                                  <input className='form-control' type="text" id="2"  onChange={handleTeam3Change} value={form.team3}/>
                                  </div>
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#4</span>
                                  <input className='form-control' type="text" id="3"  onChange={handleTeam4Change} value={form.team4}/>
                                  </div>
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#5</span>
                                  <input className='form-control' type="text" id="4"  onChange={handleTeam5Change} value={form.team5}/>
                                  </div>
                                  
                                 
                              <hr />
                              
                          </div>
                      </div>
                      : null
            }

            <button className="btn btn-primary float-end" type='submit'>Actualizar</button>
            <button className="btn btn-outline-danger me-3 float-end" type="reset">Limpiar</button>
        </form>
    </div>
  )
}

export default UserFormEdit