import React, { useState, useEffect } from 'react'

function UserTable(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readUsersBy?hkt=${props.event}`)
            .then(response => response.json())
            .then(response => setData(response))
    }, [props.event])

    return (
        <div className='border'>

            <p className="h3">Participantes:</p>
            <div className="row d-none d-md-flex p-2">
                <div className="col">Nombre</div>
                <div className="col">Rol</div>
                <div className="col-3">Correo</div>
                <div className="col">Teléfono</div>
                <div className="col-1">Editar</div>
                <div className="col-1">Borrar</div>
                <hr className='mb-0' />
            </div>


            {data.map((user, key) => {

                let badgeColor = ""
                switch (user.role) {
                    case "ORGANIZADOR":
                        badgeColor = "success"
                        break;
                    case "EMPRESA":
                        badgeColor = "primary"
                        break;
                    case "RETADOR":
                        badgeColor = "warning"
                        break;
                
                    default:
                        break;
                }

                return (
                    <div className="row p-2 d-flex align-items-center justify-content-center" id={user._id} key={key}>
                        <div className="col-md col-7 mb-2"><p className="h6 m-0">{user.username}</p></div>
                        <div className="col-md col-5 mb-2"><span className={"badge text-bg-"+badgeColor}>{user.role}</span></div>
                        <div className="col-md-3 col-7 mb-2"><a href={"mailto:"+user.email}>{user.email}</a></div>
                        <div className="col-md col-5 mb-2 text-end"><a href={"tel:+52"+user.tel}>{user.tel}</a></div>
                        <div className="col-md-1 col-6 text-center"><button className="btn btn-outline-dark w-100"><i className="fa-solid fa-pencil"></i></button></div>
                        <div className="col-md-1 col-6 text-center"><button className="btn btn-outline-danger w-100"><i className="fa-solid fa-trash-can"></i></button></div>
                    </div>
                )
            })}


        </div>
    )
}

export default UserTable