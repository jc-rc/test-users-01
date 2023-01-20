import React from 'react'
import FileTable from './Components/FileTable'
import PostList from './Components/PostList'
import Calendar from './Components/Calendar'
import FileForm from './Components/FileForm'
import { useEffect, useState } from 'react'


function View_Retador(props) {

    const [dummy, setDummy] = useState(0)
 
    const handlePress = ()=>{
        document.location.reload()
    }

    const handleRefresh = ()=>{
        setDummy(dummy=> dummy + 1)
        console.log("Refresh");
    }

  return (
    <div>
        <div className="row d-flex mb-4 align-items-center justify-content-space-between">
            <div className="col-1">
            <div className="text-start"><img src="./logo-ctvka.png" alt="" className='img-fluid' style={{height: 70}}/></div>

            </div>
            <div className="col-9">
                <p className="h2 ">DashBoard Retador</p>
            </div>
            <div className="col-2 d-flex justify-content-evenly">
                     <button className='btn btn-outline-primary' id='view-admin-refresh' onClick={handleRefresh}><i className="fas fa-arrows-rotate"></i></button>
                    <button className='btn btn-outline-danger' onClick={handlePress}><i className="fas fa-door-open"></i></button>
                </div>
        </div>
        <div className="row d-flex">
            <p className='h3'>Bienvenido, <span className='fw-bold'>{props.user.username}</span></p>
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
                            <div className="row d-flex justify-content-between py-4">
                                <div className="col-7">
                                    <FileTable user={props.user.username} empresa={props.user.empresa_ret} event={props.user.hkt} role={props.user.role} dummy={dummy}></FileTable>
                                </div>
                                <div className="col-4">
                                    <FileForm user={props.user} dummy={dummy}></FileForm>
                                </div>
                            </div>
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
                                   <PostList event={props.user.hkt} empresa={props.user.empresa_ret} dummy={dummy}></PostList>
                                </div>
                            </div>
                      </div>
                  </div>
                
           </div>

        </div>
    </div>
  )
}

export default View_Retador