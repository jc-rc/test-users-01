import React, { useState, useEffect } from 'react'

function UserFormRetador(props) {

    useEffect(() => {
        setForm({ ...form, role: "RETADOR", aprobado: 0 })
    }, [props])



    const [hkt, setHkt] = useState([])
    const [empresasOptions, setEmpresasOptions] = useState([])

useEffect(() => {
        fetch("https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getHKTOptions")
            .then(response => response.json())
            .then(data => setHkt(data))
            
    }, [])

    



    var [form, setForm] = useState({
        username: "",
        password: "",
        role: "RETADOR",
        hkt: "",
        empresa_ret: "",
        team1: "",
        team2: "",
        team3: "",
        team4: "",
        team5: "",
        email: "",
        tel: "",
        aprobado: 0

    })

    const setPasswordVisibility = () => {

        document.getElementById("eyecon").classList.toggle("fa-eye-slash")
        document.getElementById("eyecon").classList.toggle("fa-eye")
        if (document.getElementById("eyecon").classList.contains("fa-eye")) {
            document.getElementById("pw").setAttribute("type", "text")
        } else {
            document.getElementById("pw").setAttribute("type", "password")
        }



    }


    const handleUsernameChange = (e) => {
        setForm({ ...form, username: e.target.value })
    }
    const handleRoleChange = (e) => {
        setForm({ ...form, role: e.target.value })

        //Poner / quitar "required"


    }
    const handlePasswordChange = (e) => {
        setForm({ ...form, password: e.target.value })
    }
    const handleEmpresaChange = (e) => {
        setForm({ ...form, empresa_ret: e.target.value })

    }
    const handleTeam1Change = (e) => {
        setForm({ ...form, team1: e.target.value });
    }
    const handleTeam2Change = (e) => {
        setForm({ ...form, team2: e.target.value });
    }
    const handleTeam3Change = (e) => {
        setForm({ ...form, team3: e.target.value });
    }
    const handleTeam4Change = (e) => {
        setForm({ ...form, team4: e.target.value });
    }
    const handleTeam5Change = (e) => {
        setForm({ ...form, team5: e.target.value });
    }
    const handleEmailChange = (e) => {
        setForm({ ...form, email: e.target.value });
    }
    const handleTelChange = (e) => {
        setForm({ ...form, tel: e.target.value });
    }
    const handleHktChange = (e) => {
        setForm({ ...form, hkt: e.target.value });
       
            fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getEmpresasOptions?hkt=${e.target.value}`)
                .then(response => response.json())
                .then(data => setEmpresasOptions(data))
       
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        //Lógica de INSERTAR usuario en DB

        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/createUser?username=${form.username}&password=${form.password}&role=${form.role}&hkt=${form.hkt}&empresa_ret=${form.empresa_ret}&team1=${form.team1}&team2=${form.team2}&team3=${form.team3}&team4=${form.team4}&team5=${form.team5}&email=${form.email}&tel=${form.tel}&aprobado=${form.aprobado}`,
            { method: "POST" })
            .then(response => response ? alert("Retador registrado, espera aprobación para acceder.") : null)
            .then(document.getElementById("userForm").reset())
            .then(setForm({ hkt: props.event }))
            .then(document.querySelector(".cerrar-modal-retador").click())
            .then(setTimeout(() => {
                document.querySelector("#view-admin-refresh").click()
            }, 3000))

    }


    const handleReset = (e) => {
        setForm({ role: "RETADOR" })
    }


    return (
        <div className="row d-flex">
            <form action="" id='userForm' onSubmit={handleSubmit} onReset={handleReset} className="col-12">

                <div className="col-12 mb-3">
                    <label className='form-label' htmlFor="">Hackatón:</label>
                    <select name="" id="" className="form-select" required onChange={handleHktChange}>
                        <option value="" hidden>Selecciona un Evento...</option>
                        {hkt && hkt.map((hkt, key)=>{
                            return (
                                <option value={hkt} key={key}>{hkt}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="col-12 mb-3">
                    <label className='form-label' htmlFor="">Nombre:</label>
                    <input className='form-control' type="text" required onChange={handleUsernameChange} maxLength={20} placeholder="Máx. 20 caracteres." />
                </div>
                <div className=" col-12 mb-3">
                    <label className='form-label' htmlFor="">Contraseña:</label>
                    <div className="input-group">
                        <input className='form-control' type="password" id="pw" required onChange={handlePasswordChange} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Debe incluir 1 número, 1 letra mayúscula, 1 letra minúscula; y al menos 8 caracteres" />
                        <button className='btn' type='button' id='btn-eye' tabIndex={-1} onClick={setPasswordVisibility}>
                            <span className="input-group-text" id="basic-addon1"><i id='eyecon' className="fas fa-eye-slash"></i></span>
                        </button>
                    </div>
                </div>
                <div className="mb-3 col-12 row">
                    <div className="col-6">
                        <label htmlFor="" className="form-label">Correo:</label>
                        <input type={"email"} className="form-control" required onChange={handleEmailChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='Correo válido: ejemplo@dominio.com' />
                    </div>

                    <div className="col-6">
                    <label htmlFor="" className="form-label">Teléfono:</label>
                    <input type="tel" name="" className='form-control' required onChange={handleTelChange} maxLength={10} pattern="[0-9]{10}" title='Teléfono MX a 10 dígitos' />
                </div>
                </div>
               
                



                <div className="mb-3">
                    <label className='form-label' htmlFor="">Empresa Retada:</label>
                    {/* <input className='form-control' id='empresa' type="text"  onChange={handleEmpresaChange} /> */}
                     <select className='form-select' name="" id="" onChange={handleEmpresaChange}>
                        <option value="" hidden>Selecciona una Empresa...</option>
                         {empresasOptions.map((option, key) => {
                            return (
                                <option value={option} key={key}>{option}</option>
                            )
                        })} 
                    </select> 
                </div>

                
                <div className="mb-3">

                    <label className='form-label' htmlFor="">Equipo:</label>

                    <div className="input-group mb-1">
                        <span className="input-group-text">#1</span>
                        <input className='form-control' type="text" id="0" placeholder='Líder del Equipo' onChange={handleTeam1Change} required/>
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text">#2</span>
                        <input className='form-control' type="text" id="1" onChange={handleTeam2Change} />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text">#3</span>
                        <input className='form-control' type="text" id="2" onChange={handleTeam3Change} />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text">#4</span>
                        <input className='form-control' type="text" id="3" onChange={handleTeam4Change} />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text">#5</span>
                        <input className='form-control' type="text" id="4" onChange={handleTeam5Change} />
                    </div>


                    <hr />

                </div>




                <button className="btn btn-primary float-end" type='submit'>Crear</button>
                <button className="btn btn-outline-danger me-3 float-end" type="reset">Limpiar</button>
            </form>
        </div>
    )
}

export default UserFormRetador