import React, { useState, useEffect } from 'react'

function UserFormOrganizador(props) {

    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "ORGANIZADOR",
        hkt: "",
        empresa_ret: "",
        team1: "",
        team2: "",
        team3: "",
        team4: "",
        team5: "",
        email: "",
        tel: "",
        
    })

    const handleHktChange = (e)=>{
        setForm({...form, hkt: e.target.value})
    }
    const handleUsernameChange = (e)=>{
        setForm({...form, username: e.target.value})
    }
    const handlePasswordChange = (e)=>{
        setForm({...form, password: e.target.value})
    }
    const handleTelChange = (e)=>{
        setForm({...form, tel: e.target.value})
    }
    const handleEmailChange = (e)=>{
        setForm({...form, email: e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/createUser?username=${form.username}&password=${form.password}&role=${form.role}&hkt=${form.hkt}&empresa_ret=${form.empresa_ret}&team1=${form.team1}&team2=${form.team2}&team3=${form.team3}&team4=${form.team4}&team5=${form.team5}&email=${form.email}&tel=${form.tel}`,
        {method:"POST"})
        .then(response => response? alert("User Created"): null)
        .then( document.getElementById("form-organizador").reset())
        .then(setForm({hkt: props.event}))
        .then( document.querySelector(".cerrar-modal-org").click())
        .then( setTimeout(() => {
            document.querySelector("#view-admin-refresh").click()
        }, 3000) )
    }
    const handleReset = (e)=>{
        setForm({
            username: "",
            password: "",
            role: "ORGANIZADOR",
            hkt: "",
            email: "",
            tel: ""
        })
    }
    
    const setPasswordVisibility = ()=>{

        document.getElementById("eyecon2").classList.toggle("fa-eye-slash")
        document.getElementById("eyecon2").classList.toggle("fa-eye")
        if(document.getElementById("eyecon2").classList.contains("fa-eye")){
            document.getElementById("pw2").setAttribute("type", "text")
        }else{
            document.getElementById("pw2").setAttribute("type", "password")
        }
        
        
        
    }


    return (
        <div className='row'>

            <div className="col-12">
                <div class="alert alert-info alert-dismissible fade show" role="alert">
                    <p className=' small m-0'><span className='h6 me-1'><i class="fa-solid fa-circle-info"></i></span> Para crear un nuevo Hackatón, se requiere crear un nuevo usuario "Organizador".</p>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>

            <form action="" id='form-organizador' onSubmit={handleSubmit} onReset={handleReset}>
                <div className="col-12 mb-3">
                    <label htmlFor="" className="form-label">Hackatón:</label>
                    <div class="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">HKT_</span>
                        <input type="text" className="form-control" placeholder="MORELOS_2022" aria-label="Username" aria-describedby="basic-addon1" onChange={handleHktChange} maxLength={20}/>
                    </div>
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="" className="form-label">Nombre Organizador:</label>
                    <input type="text" className="form-control" placeholder="CANACINTRA MOR" onChange={handleUsernameChange} maxLength={20} required/>
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="" className="form-label">Contraseña:</label>
                    <div className="input-group">
                    <input className='form-control' type="password" id="pw2" required onChange={handlePasswordChange} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Debe incluir 1 número, 1 letra mayúscula, 1 letra minúscula; y al menos 8 caracteres" />
                    <button className='btn' type='button' id='btn-eye' tabIndex={-1}  onClick={setPasswordVisibility}>
                        <span className="input-group-text" id="basic-addon1"><i id='eyecon2' className="fas fa-eye-slash"></i></span>
                        </button>
                </div>
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="" className="form-label">Teléfono:</label>
                    <input type="tel" className="form-control" placeholder='5512345678' onChange={handleTelChange} pattern="[0-9]{10}" title='Teléfono MX a 10 dígitos' maxLength={10}/>
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="" className="form-label">Correo:</label>
                    <input type="email" className="form-control" placeholder='correo@dominio.com' onChange={handleEmailChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='Correo válido: ejemplo@dominio.com'/>
                </div>
                <div className="col-12 text-end">
                    <button className="btn btn-outline-danger me-3" type='reset'>Clear</button>
                    <button className="btn btn-primary" type='submit'>Crear</button>
                </div>
            </form>

        </div>
    )
}

export default UserFormOrganizador