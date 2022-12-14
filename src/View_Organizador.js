import React, {useState, useEffect} from 'react'
import UserForm from './Components/UserForm'
import UserTable from './Components/UserTable'
import Calendar from './Components/Calendar'
import CalendarForm from './Components/CalendarForm'
import PostList from './Components/PostList'
import PostForm from './Components/PostForm'

function View_Organizador(props) {

    useEffect(() => {
         fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getEmpresasOptions?hkt=${props.user.hkt}`)
         .then(response => response.json())
         .then(data => setEmpresasOptions(data))

    }, [])

    const [empresa, setEmpresa] = useState()
    const [empresasOptions, setEmpresasOptions] = useState([])

    const handlePress = () => {
        document.location.reload()
    }
const handleEmpresaChange = (e) => {

        setEmpresa(e.target.value)
    }


  return (
    <div>
        <div className="row">
                <div className="col-10">
                    <p className="h2">Back Office ORGANIZADOR</p>
                </div>
                <div className="col-2">
                    <button className='btn btn-outline-danger' onClick={handlePress}><i className="fas fa-door-open"></i></button>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <p>Bienvenido, {props.user.username}</p>
                </div>
                <div className="col-3">
                    <p>Organizas el evento: {props.user.hkt}</p>
                </div>
            </div>

            { <div className="container">
                {/* MENÚ DE NAVEGACIÓN */}
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Participantes</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Calendario</button>
                        <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Blog Interno</button>


                    </div>
                </nav>
                {/* CONTENIDO DE LAS PESTAÑAS */}
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                        <div className="row py-4 d-flex justify-content-between">
                            <div className="col-12 col-md-8">
                                <UserTable event={props.user.hkt}></UserTable>
                            </div>

                            <div className="col-12 col-md-3">
                                <UserForm event={props.user.hkt}></UserForm>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                        <div className="row py-4 d-flex justify-content-between">
                            <div className="col-12 col-md-8">
                                <Calendar event={props.user.hkt}></Calendar>
                            </div>
                            <div className="col-12 col-md-3">
                                <CalendarForm event={props.user.hkt}></CalendarForm>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">

                        <div className="row d-flex justify-content-center my-3">
                            <div className="col-md-6">
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
                        {empresa&&<div className="row py-4 d-flex justify-content-between">
                            <div className="col-12 col-md-8">
                                <PostList event={props.user.hkt} empresa={empresa}></PostList>
                            </div>
                            <div className="col-12 col-md-3">
                                <PostForm event={props.user.hkt} empresa={empresa}></PostForm>
                            </div>
                        </div>}
                    </div>

                </div>
            </div>}


    </div>
  )
}

export default View_Organizador