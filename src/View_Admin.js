import React, { useEffect, useState } from 'react'
import UserTable from './Components/UserTable'
import CalendarTable from './Components/CalendarTable'
import PostTable from './Components/PostTable'
import FileTable from './Components/FileTable'



function View_Admin(props) {

    const [hkt, setHkt] = useState("")
    const [dummy, setDummy] = useState(0)
    const [empresa, setEmpresa] = useState("")
    

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

    useEffect(() => {
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getRetadoresOptions?empresa_ret=${empresa}&hkt=${hkt}`)
        .then(response => response.json())
        .then(data => setRetadorOptions(data))
    }, [hkt, empresa])

    

    const [options, setOptions] = useState([])
    
    const [empresasOptions, setEmpresasOptions] = useState([])
    const [retadorOptions, setRetadorOptions] = useState([])
    const [retador, setRetador] = useState()


    const handlePress = () => {
        document.location.reload()
    }

    const handleRefresh = ()=>{
        setDummy(dummy=> dummy + 1)
        console.log("Refresh");
    }
   

    const handleHKTChange = (e) => {

        setHkt(e.target.value)
        setEmpresa("")
        .then(setRetador())


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
            <div className="row d-flex align-items-center justify-content-end mb-5">
            <div className="col-1">
            <div className="text-start"><img src="./logo-ctvka.png" alt="" className='img-fluid' style={{height: 70}}/></div>

            </div>
                <div className="col-9">
                    <p className="h2">Back Office ADMIN</p>
                </div>
                
                <div className="col-2 d-flex justify-content-evenly">
                    { hkt && <button className='btn btn-outline-primary' id='view-admin-refresh' onClick={handleRefresh}><i className="fas fa-arrows-rotate"></i></button>}
                    <button className='btn btn-outline-danger' onClick={handlePress}><i className="fas fa-door-open"></i></button>
                </div>
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
                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-entregas" type="button" role="tab" aria-controls="nav-entregas" aria-selected="false">Entregas</button>


                    </div>
                </nav>
                {/* CONTENIDO DE LAS PESTAÑAS */}
                <div className="tab-content" id="nav-tabContent">
                    {/* USUARIOS */}
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                        <div className="row py-4 d-flex justify-content-between">
                            
                            <div className="col-12">
                                <UserTable event={hkt} empresasOptions={empresasOptions} dummy={dummy}></UserTable>
                            </div>

                            {/* <div className="col-12 col-md-3">
                                <UserForm event={hkt}></UserForm>
                            </div> */}
                        </div>
                    </div>
                    {/* CALENDARIO */}
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                        <div className="row py-4 d-flex justify-content-between">
                            {/* <div className="col-12 col-md-8">
                                <Calendar event={hkt}></Calendar>
                            </div> */}
                            <div className="col-12 col-12">
                                <CalendarTable event={hkt} dummy={dummy}></CalendarTable>
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
                                    <option hidden value="">Selecciona la Empresa</option>
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
                                    <option hidden value="">Selecciona el Retador</option>
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

                </div>
            </div>}



            



        </div>
    )
}

export default View_Admin