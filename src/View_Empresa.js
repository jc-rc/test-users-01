import React, {useState, useEffect} from 'react'
import PostForm from './Components/PostForm'
import Calendar from './Components/Calendar'
import PostTable from './Components/PostTable'
import FileTable from './Components/FileTable'


function View_Empresa(props) {

    const [retador, setRetador] = useState("")
    const [dummy, setDummy] = useState(0)

    const handleRefresh = () => {
        setDummy(dummy => dummy + 1)
        console.log("Refresh");
    }

    const handlePress = () => {
        document.location.reload()
    }


    const handleRetadorChange = (e)=>{
        setRetador(e.target.value)
    }
    
    useEffect(()=>{
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getRetadoresOptions?empresa_ret=${props.user.username}&hkt=${props.user.hkt}`)
        .then(response => response.json())
        .then(data => setRetadorOptions(data))

    }, [retador])

    const [retadorOptions, setRetadorOptions] = useState([])


  return (
    <div>
        <div className="d-flex mb-4 align-items-center justify-content-space-between">
        <div className="col-1">
            <div className="text-start"><img src="./logo-ctvka.png" alt="" className='img-fluid' style={{height: 70}}/></div>

            </div>
            <div className="col-9">
                <p className="h2">DashBoard Empresa</p>
            </div>
            <div className="col-2 d-flex justify-content-evenly">
            <button className='btn btn-outline-primary' id='view-admin-refresh' onClick={handleRefresh}><i className="fas fa-arrows-rotate"></i></button>
                <button className='btn btn-outline-danger' onClick={handlePress}><i className="fas fa-door-open"></i></button>
            </div>
        </div>

        <div className="row d-flex">
            <p className='h3'>Bienvenido, <span className="fw-bold">{props.user.username}</span></p>
            <hr />

              <div className="container">
                  <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Entregas</button>
                          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Calendario</button>
                          <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Blog Interno</button>


                      </div>
                  </nav>

                  <div className="tab-content" id='nav-tabContent'>
                        {/*  ARCHIVOS */}
                      <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                            <div className="row d-flex justify-content-center py-4">
                                <div className="col-6">
                                    <p>Retador: </p>
                                    <select className='form-select' name="" id="" onChange={handleRetadorChange}>
                                    <option hidden value="">Selecciona el Retador</option>
                                    {retadorOptions.map((option,key) =>{
                                        return(
                                            <option key={key} value={option}>{option}</option>
                                        )
                                    })}
                                    </select>
                                </div>
                            </div>

                           {retador && <div className="row">
                                <div className="col-12">
                                    <FileTable user={retador} empresa={props.user.username} event={props.user.hkt} dummy={dummy} role={props.user.role}></FileTable>
                                </div>
                            </div>}
                      </div>
                      <div className="tab-pane fade " id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                            <div className="row py-4">
                                <div className="col-12">
                                    <Calendar event={props.user.hkt} dummy={dummy}></Calendar>
                                </div>
                            </div>
                      </div>
                      <div className="tab-pane fade  " id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">
                            <div className="row py-4">
                                <div className="col-12">
                                   <PostTable event={props.user.hkt} empresa={props.user.username} dummy={dummy}></PostTable>
                                </div>
                            </div>
                      </div>
                  </div>

              </div>
        </div>
       
        
    </div>
  )
}

export default View_Empresa