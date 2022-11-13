import React, {useState, useEffect} from 'react'

function UserFormEdit(props) {

    useEffect(()=>{
        document.getElementById("userFormEdit").reset()
        //Poblar los campos del formulario
        setForm(props.initValues)


    }, [props.initValues, props.event])

    const [form, setForm] = useState({
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

    const handleSubmit = (e)=>{
        e.preventDefault()
       
        //Lógica de ACTUALIZAR usuario en DB

   fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/createUser?username=${form.username}&password=${form.password}&role=${form.role}&hkt=${form.hkt}&empresa_ret=${form.empresa_ret}&team1=${form.team1}&team2=${form.team2}&team3=${form.team3}&team4=${form.team4}&team5=${form.team5}&email=${form.email}&tel=${form.tel}`,
        {method:"POST"})
        .then(response => response? alert("User Created"): null)
        .then( document.getElementById("userFormEdit").reset())
        .then(setForm({hkt: props.event}))

    }

    
    const handleReset = ()=>{
        setForm({hkt: props.event})
    }


  return (
    <div className="row">
        <form action="" id='userFormEdit' onSubmit={handleSubmit} onReset={handleReset}>
            
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
                              <input className='form-control' id='empresa' type="text"  onChange={handleEmpresaChange} value={form.empresa_ret}/>
                          </div>
                          <div className="mb-3">
                              
                                  <label className='form-label' htmlFor="">Equipo:</label>
                                  
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#1</span>
                                  <input className='form-control' type="text" id="0" placeholder='Líder del Equipo'  onChange={handleTeam1Change} value={form.team[0]}/>
                                  </div>
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#2</span>
                                  <input className='form-control' type="text" id="1"  onChange={handleTeam2Change} value={form.team[1]}/>
                                  </div>
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#3</span>
                                  <input className='form-control' type="text" id="2"  onChange={handleTeam3Change} value={form.team[2]}/>
                                  </div>
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#4</span>
                                  <input className='form-control' type="text" id="3"  onChange={handleTeam4Change} value={form.team[3]}/>
                                  </div>
                                  <div className="input-group mb-1">
                                    <span className="input-group-text">#5</span>
                                  <input className='form-control' type="text" id="4"  onChange={handleTeam5Change} value={form.team[4]}/>
                                  </div>
                                  
                                 
                              <hr />
                              
                          </div>
                      </div>
                      : null
            }

            <button className="btn btn-info float-end" type='submit'>Update</button>
            <button className="btn btn-outline-danger me-3 float-end" type="reset">Clear</button>
        </form>
    </div>
  )
}

export default UserFormEdit