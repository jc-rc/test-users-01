import React, { useEffect, useState } from 'react'
import UserTable from './Components/UserTable'
import CalendarTable from './Components/CalendarTable'
import CalendarChart from './Components/CalendarChart'
import PostTable from './Components/PostTable'
import FileTable from './Components/FileTable'
import UserFormOrganizador from './Components/UserFormOrganizador'
import DashBoard from './DashBoard'
import SimpleCrypto from 'simple-crypto-js'



function View_Organizador(props) {
    const simpleCrypto = new SimpleCrypto("accepted")


    const [hkt, setHkt] = useState(props.user.hkt)
    const [dummy, setDummy] = useState(0)
    const [empresa, setEmpresa] = useState("")
    

    
    useEffect(() => {
       

        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getEmpresasOptions?hkt=${hkt}`)
            .then(response => response.json())
            .then(data => setEmpresasOptions(data))
    }, [hkt])

    useEffect(() => {
        


        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getRetadoresOptions?empresa_ret=${empresa}&hkt=${hkt}`)
        .then(response => response.json())
        .then(data => setRetadorOptions(data))
    }, [hkt, empresa])

    

    
    
    const [empresasOptions, setEmpresasOptions] = useState([])
    const [retadorOptions, setRetadorOptions] = useState([])
    const [retador, setRetador] = useState()


    const handlePress = () => {
        document.location.reload()
    }

    const handleRefresh = ()=>{
        setDummy(dummy=> dummy + 1)
        
    }
   

    const handleEmpresaChange = (e) => {

        setEmpresa(e.target.value)
        setRetador()


    }
    const handleRetadorChange = (e) => {

        setRetador(e.target.value)


    }

   


    return (
        <div>
            <div className="row d-flex align-items-center justify-content-md-end justify-content-between mb-4">
                <div className="col col-md-1">
                    <div className="text-start"><img src="./logo_vector.svg" alt="" className='img-fluid' style={{ height: 70 }} /></div>

                </div>
                <div className=" col col-md-9 d-none d-sm-block">
                <p className="h5 d-block d-md-none">Portal {props.user.role}</p>
                <p className="h3 d-none d-md-block">Portal {props.user.role}</p>
                </div>

                <div className="col col-md-2 d-flex justify-content-end">
                    <button className='btn btn-outline-primary' id='view-admin-refresh' onClick={handleRefresh}><i className="fas fa-arrows-rotate"></i></button>
                    <button className='btn btn-outline-danger ms-md-4 ms-2' onClick={handlePress}><i className="fas fa-door-open"></i></button>
                </div>
            </div>
            
           <div className="row">
            <div className="col-12">
                <p className='h4 mb-3'>Bienvenido, <span className="fw-bold">{props.user.username}</span></p>
            </div>
           </div>

            {hkt && <div className="row">


                <div className="flex-column flex-sm-row d-flex align-items-start justify-content-between">
                    {/* MENÚ DE NAVEGACIÓN */}
                    <nav className='w-100'>
                        <div className="nav col-sm-1 col-12 flex-sm-column flex-row nav-pills bg-light  me-2 rounded justify-content-evenly" id="nav-tab" role="tablist">
                            <button className="nav-link" id="nav-home-tab" data-bs-toggle="pill" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i className="fa-solid fa-user-gear"></i> <p className='m-0 d-none d-sm-block'>Usuarios</p></button>

                            <button className="nav-link active" id="nav-profile-tab" data-bs-toggle="pill" data-bs-target="#nav-profile" type="button" onClick={()=>{document.querySelector(".fc-dayGridMonth-button").click()}} role="tab" aria-controls="nav-profile" aria-selected="false"> <i className="fa-regular fa-calendar-days"></i> <p className="m-0 d-none d-sm-block">Eventos</p></button>

                            {/* <button className="nav-link" id="nav-blog-tab" data-bs-toggle="pill" data-bs-target="#nav-blog-web" type="button" role="tab" aria-controls="nav-entregas" aria-selected="false"> <i className="fa-solid fa-bullhorn"></i> <p className="m-0">Blog WEB</p></button> */}

                            <button className="nav-link" id="nav-contact-tab" data-bs-toggle="pill" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"> <i className="fa-solid fa-comment"></i> <p className="m-0 d-none d-sm-block">Blog HKT</p></button>

                            <button className="nav-link" id="nav-entregas-tab" data-bs-toggle="pill" data-bs-target="#nav-entregas" type="button" role="tab" aria-controls="nav-entregas" aria-selected="false"> <i className="fa-regular fa-folder-open"></i> <p className="m-0 d-none d-sm-block">Entregas</p></button>

                            <button className="nav-link" id="nav-dash-tab" data-bs-toggle="pill" data-bs-target="#nav-dash" type="button" role="tab" aria-controls="nav-entregas" aria-selected="false"> <i className="fa-solid fa-chart-simple"></i> <p className="m-0 d-none d-sm-block">DashBoard</p></button>
                            <button className="nav-link d-none d-sm-block" id="nav-docs-tab" data-bs-toggle="pill" data-bs-target="#nav-docs" type="button" role="tab" aria-controls="nav-entregas" aria-selected="false"> <i className="fa-solid fa-info-circle"></i> <p className="m-0 d-none d-sm-block">Manuales</p></button>

                        </div>
                    </nav>
                    {/* CONTENIDO DE LAS PESTAÑAS */}
                    <div className="tab-content col-sm-11 col-12 bg-light rounded p-4" id="nav-tabContent">
                        {/* USUARIOS */}
                        <div className="tab-pane fade " id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                            <div className="row py-4 d-flex justify-content-between">
                    
                                <div className="col-12">
                                    <UserTable user={props.user} event={hkt} empresasOptions={empresasOptions} dummy={dummy}></UserTable>
                                </div>
                                {/* <div className="col-12 col-md-3">
                                    <UserForm event={hkt}></UserForm>
                                </div> */}
                            </div>
                        </div>
                        {/* CALENDARIO */}
                        <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                            <div className="row pb-4 d-flex justify-content-between">
                                {/* <div className="col-12 col-md-8">
                                    <Calendar event={hkt}></Calendar>
                                </div> */}
                                <div className="col-12">
                                    
                                    <nav className='nav nav-pills mb-4'>
                                        <button
                                            className="nav-link py-1 "
                                            id="nav-1-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#view-1"
                                            onClick={()=>{document.querySelector(".fc-dayGridMonth-button").click()}}
                                        >
                                            <i className="fa-solid fa-list-ul me-1"></i> <p>Lista</p>
                                        </button>
                                        <button
                                            className="nav-link py-1 active"
                                            id="nav-2-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#view-2"
                                            onClick={()=>{document.querySelector(".fc-dayGridMonth-button").click()}}
                                        >
                                           <i className="fa-solid fa-calendar me-1"></i> <p>Calendario</p>
                                        </button>

                                    </nav>

                                    

                                    <div className="tab-content">
                                        <div className="tab-pane fade show " id="view-1">
                                        <CalendarTable event={hkt} dummy={dummy}></CalendarTable>
                                        </div>
                                        <div className="tab-pane fade show active" id="view-2">
                                        <p className="h5">Eventos para: {hkt}</p>
                                        <CalendarChart event={hkt} dummy={dummy} role={props.user.role}></CalendarChart>
                                        </div>
                                    </div>
                                </div>

                               
                                {/* <div className="col-12 col-md-3">
                                    <CalendarForm event={hkt}></CalendarForm>
                                </div> */}
                            </div>
                        </div>
                        {/* BLOG INTERNO */}
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">
                            <div className="row d-flex justify-content-center my-3">
                                <div className="col-md-6">
                                    <p>Empresa:</p>
                                    <select className='form-select' name=""  onChange={handleEmpresaChange}>
                                        <option  value="">Selecciona la Empresa</option>
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
                                    <PostTable event={hkt} empresa={empresa} dummy={dummy}></PostTable>
                                </div>
                                {/* <div className="col-12 col-md-3">
                                    <PostForm event={hkt} empresa={empresa}></PostForm>
                                </div> */}
                            </div>}
                        </div>
                        {/* ENTREGAS / ARCHIVOS */}
                        <div className="tab-pane fade" id="nav-entregas" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">
                            <div className="row d-flex justify-content-center my-3">
                                <div className="col-md-6">
                                    <p>Empresa:</p>
                                    <select className='form-select' name="" id="" onChange={handleEmpresaChange}>
                                        <option  value="">Selecciona la Empresa</option>
                                        {empresasOptions.map((option, key) => {
                                            return (
                                                <option key={key} value={option}>{option}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                           { empresa && <div className="row d-flex justify-content-center my-3">
                                <div className="col-md-6">
                                    <p>Retador:</p>
                                    <select className='form-select' name="" id="" onChange={handleRetadorChange}>
                                        <option  value="">Selecciona el Retador</option>
                                        {retadorOptions.map((option, key) => {
                                            return (
                                                <option key={key} value={option}>{option}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>}
                            {empresa && retador &&<div className="row py-4 d-flex justify-content-between">
                                {/* <div className="col-12 col-md-8">
                                    <PostList event={hkt} empresa={empresa}></PostList>
                                </div> */}
                                <div className="col-12">
                                    <FileTable event={hkt} empresa={empresa} dummy={dummy} user={retador}></FileTable>
                                </div>
                                {/* <div className="col-12 col-md-3">
                                    <PostForm event={hkt} empresa={empresa}></PostForm>
                                </div> */}
                            </div>}
                        </div>

                        {/* BLOG EXTERNO */}
                        {/* <div className="tab-pane fade" id="nav-blog-web" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                            <div className="row py-4 d-flex justify-content-between">
                                
                                <div className="col-12 col-12">
                                    <BlogTable dummy={dummy}></BlogTable>
                                </div>
                                
                            </div>
                        </div> */}

                        {/* DASHBOARD */}
                        <div className="tab-pane fade" id="nav-dash" role="tabpanel" aria-labelledby="nav-dash-tab" tabIndex="0">
                            <div className="row py-4 d-flex justify-content-between">
                             
                            <div className="">
                                    <DashBoard hkt={hkt} dummy={dummy} empresas={empresasOptions}></DashBoard>
                                </div>
                            </div>
                        </div>
                        {/* Manuales */}
                        <div className="tab-pane fade" id="nav-docs" role="tabpanel" aria-labelledby="nav-dash-tab" tabIndex="0">
                            <div className="row py-4 d-flex justify-content-between">


                                <div className="">
                                    <p className="h3 mb-4">Manuales de Usuario para {props.user.role}</p>
                                   <ul>
                                    <li><a href="./Manuales/Funciones Básicas 1 de  4.pdf" target={"_blank"}>Funciones Básicas 1 | Usuarios</a></li>
                                    <li><a href="./Manuales/Funciones Básicas 2 de  4.pdf" target={"_blank"}>Funciones Básicas 2 | Blog HKT</a></li>
                                    <li><a href="./Manuales/Funciones Básicas 3 de  4.pdf" target={"_blank"}>Funciones Básicas 3 | Eventos </a></li>
                                    <li><a href="./Manuales/Funciones Básicas 4 de  4.pdf" target={"_blank"}>Funciones Básicas 4 | Entregas</a></li>
                                    
                                   
                                   </ul>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>}

            {/* MODAL USER FORM ORGANIZADOR */}
            <div className="modal fade" id="modal-form-organizador" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h5" id="staticBackdropLabel">Nuevo Organizador</p>
                            <button type="button" className="btn-close cerrar-modal-org" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <UserFormOrganizador dummy={dummy}></UserFormOrganizador>
                        </div>

                    </div>
                </div>
            </div>
            



        </div>
    )
}

export default View_Organizador