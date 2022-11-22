import React, { useEffect, useState } from 'react'
import CalendarForm from './Components/CalendarForm'
import PostForm from "./Components/PostForm"
import UserForm from './Components/UserForm'
import UserTable from './Components/UserTable'
import Calendar from './Components/Calendar'
import PostList from './Components/PostList'
import CalendarTable from './Components/CalendarTable'
import PostTable from './Components/PostTable'
import UserFormEdit from './Components/UserFormEdit'


function View_Admin(props) {

    const [hkt, setHkt] = useState("")
    

    useEffect(() => {
        fetch("https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getHKTOptions")
            .then(response => response.json())
            .then(data => setOptions(data))
    }, [hkt])

    useEffect(() => {
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getEmpresasOptions?hkt=${hkt}`)
            .then(response => response.json())
            .then(data => setEmpresasOptions(data))
    }, [hkt])

    

    const [options, setOptions] = useState([])
    const [empresa, setEmpresa] = useState()
    const [empresasOptions, setEmpresasOptions] = useState([])


    const handlePress = () => {
        document.location.reload()
    }

    const handleHKTChange = (e) => {

        setHkt(e.target.value)


    }
    const handleEmpresaChange = (e) => {

        setEmpresa(e.target.value)
    }

   


    return (
        <div>
            <div className="row d-flex justify-content-evenly">
                <div className="col">
                    <p className="h2">Back Office ADMIN</p>
                </div>
                <div className="col-2 text-end">
                    <button className='btn btn-outline-danger' onClick={handlePress}><i className="fas fa-door-open"></i></button>
                </div>
            </div>
            <div className="row">
                <p>Bienvenido {props.user.username}</p>
            </div>
            <div className="row d-flex justify-content-center mb-5">

                <div className="col-md-6">
                    <p>Maneja el HACKATON:</p>
                    <select className='form-select' name="" id="" onChange={handleHKTChange}>
                        <option hidden value="">Selecciona el Evento</option>
                        {options.map((option, key) => {
                            return (
                                <option key={key} value={option}>{option}</option>
                            )
                        })}
                    </select>
                </div>
            </div>

            {hkt && <div className="container">
                {/* MENÚ DE NAVEGACIÓN */}
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Participantes</button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Calendario</button>
                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Blog Interno</button>


                    </div>
                </nav>
                {/* CONTENIDO DE LAS PESTAÑAS */}
                <div className="tab-content" id="nav-tabContent">
                    {/* USUARIOS */}
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                        <div className="row py-4 d-flex justify-content-between">
                            
                            <div className="col-12">
                                <UserTable event={hkt} empresasOptions={empresasOptions}></UserTable>
                            </div>

                            {/* <div className="col-12 col-md-3">
                                <UserForm event={hkt}></UserForm>
                            </div> */}
                        </div>
                    </div>
                    {/* CALENDARIO */}
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                        <div className="row py-4 d-flex justify-content-between">
                            {/* <div className="col-12 col-md-8">
                                <Calendar event={hkt}></Calendar>
                            </div> */}
                            <div className="col-12 col-12">
                                <CalendarTable event={hkt}></CalendarTable>
                            </div>
                            {/* <div className="col-12 col-md-3">
                                <CalendarForm event={hkt}></CalendarForm>
                            </div> */}
                        </div>
                    </div>
                    {/* BLOG INTERNO */}
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">

                        <div className="row d-flex justify-content-center my-3">
                            <div className="col-md-6">
                                <p>Empresa:</p>
                                <select className='form-select' name="" id="" onChange={handleEmpresaChange}>
                                    <option hidden value="">Selecciona la Empresa</option>
                                    {empresasOptions.map((option, key) => {
                                        return (
                                            <option key={key} value={option}>{option}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        {empresa && <div className="row py-4 d-flex justify-content-between">
                            {/* <div className="col-12 col-md-8">
                                <PostList event={hkt} empresa={empresa}></PostList>
                            </div> */}
                            <div className="col-12">
                                <PostTable event={hkt} empresa={empresa}></PostTable>
                            </div>
                            {/* <div className="col-12 col-md-3">
                                <PostForm event={hkt} empresa={empresa}></PostForm>
                            </div> */}
                        </div>}
                    </div>

                </div>
            </div>}



            



        </div>
    )
}

export default View_Admin