import React from 'react'
import PostList from './Components/PostList'
import Calendar from './Components/Calendar'

function View_Retador(props) {

    const handlePress = ()=>{
        document.location.reload()
    }

  return (
    <div>
        <div className="row d-flex mb-4 justify-content-space-between">
            <div className="col-10">
                <p className="h2">DashBoard Retador</p>
            </div>
            <div className="col-2 text-end">
                <button className='btn btn-outline-danger' onClick={handlePress}><i className="fas fa-door-open"></i></button>
            </div>
        </div>
        <div className="row d-flex">
            <p className='h3'>Bienvenido, <span className='fw-bold'>{props.user.username}</span></p>
            <hr />
            <p>Estás registrado en el evento: {props.user.hkt}</p>

            <div className="col-md-2 border">
                <p className='h3'>Empresa Retadora:</p>
                <p className='h5'>{props.user.empresa_ret}</p>
                <hr />
                <p className="h3">Tu Equipo: </p>
                <ul className='list-group mb-3'>
                {props.user.team.map((teammate, key)=>{
                        return (<li className='list-group-item' key={key}>{teammate}</li> )
                    })}
                </ul>
            </div>

            
            
            
            
            <div className="col-md-5">
                <Calendar event={props.user.hkt}></Calendar>
            </div>
            <div className="col-md-5">
                <PostList event={props.user.hkt} empresa={props.user.empresa_ret}></PostList>
            </div>
            

            <div className="col-md-5 border">
                <p className='h3'>Archivos Enviados:</p>
                <ul className="list-group">
                    <li className='list-group-item text-primary'>PENDIENTE</li>
                    <li className='list-group-item text-primary'>Primer_Avance.pdf</li>
                </ul>
            </div>

        </div>
    </div>
  )
}

export default View_Retador