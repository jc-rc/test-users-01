import React from 'react'
import PostForm from './Components/PostForm'

function View_Empresa(props) {

    const handlePress = ()=>{
        document.location.reload()
    }

  return (
    <div>
        <div className="row">
            <div className="col-10">
                <p className="h2">DashBoard Empresa</p>
            </div>
            <div className="col-2">
                <button className='btn btn-outline-danger' onClick={handlePress}><i className="fas fa-door-open"></i></button>
            </div>
        </div>
        <div className="row">
            <p>Bienvenido {props.user.username}</p>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6">
                <PostForm empresa={props.user.username} event={props.user.hkt}></PostForm>
            </div>
        </div>
        
    </div>
  )
}

export default View_Empresa