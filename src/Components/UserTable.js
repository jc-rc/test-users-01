import React, { useState, useEffect } from 'react'
import UserForm from './UserForm'
import UserFormEdit from './UserFormEdit'
import UserDetail from './UserDetail'

function UserTable(props) {

    const [data, setData] = useState([])
    const [dataNA, setDataNA] = useState([])

    const [userToSend, setuserToSend] = useState()


    useEffect(() => {
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readUsersBy?hkt=${props.event}`)
            .then(response => response.json())
            .then(response => setData(response))

        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readUsersNoAprobado?hkt=${props.event}`)
            .then(response => response.json())
            .then(response => setDataNA(response))



    }, [props.event, props.dummy])

    const handleEditButton = (user)=>{
        setuserToSend(user)
    }
    const handleDeleteButton = (user)=>{
        
        let confirmDelete = window.confirm(`⚠ ¿En verdad desea eliminar el usuario: ⚠ \n ${user.username}? `)
        if (confirmDelete) {
            fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/deleteUser?_id=${user._id}`,
            {method: "DELETE"})
            .then(response => response.status <300 ? alert(`Usuario Eliminado`): alert("Algo salió mal..."))
            .then( setTimeout(() => {
                document.querySelector("#view-admin-refresh").click()
            }, 1500) )
            
        }else{
            alert(`Se canceló la operación.`)
        }
    }

    const handleAprobar = (user)=>{
        

        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/aprobarUser?_id=${user._id}`,
        {method:"PUT"})
        .then(response => response? alert("Usuario Aprobado"): null)
        
        .then( setTimeout(() => {
            document.querySelector("#view-admin-refresh").click()
        }, 1500) )
    }



    return (
        <div className=''>
            {/* TABLA APROBADOS */}
            <div className=" mb-5">
                <div className="col-12 d-flex justify-content-between mb-4">
                    <p className="h3">Usuarios</p>
                    <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#modal-add-user"><i className="fa-solid fa-plus"></i> Usuario  </button>
                </div>
                <div className="row d-none d-md-flex p-2">
                    <div className="col fw-bold">Nombre</div>
                    <div className="col fw-bold">Rol</div>
                    <div className="col fw-bold">Empresa Ret.</div>
                    <div className="col-3 fw-bold">Correo</div>
                    <div className="col-2 fw-bold">Teléfono</div>
                    <div className="col-1 fw-bold">Editar</div>
                    <div className="col-1 fw-bold">Borrar</div>
                </div>
                <div className="list-group">
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
                            <div className="">
                                <div className="row list-group-item p-1 d-none d-md-flex align-items-center justify-content-center" id={user._id} key={key} >
                                    <div className="col-md col-7 mb-2"><a className="m-0 btn btn-outline-secondary text-start" role={"button"} data-bs-toggle="modal" data-bs-target="#modal-detail-user" onClick={()=> handleEditButton(user)}>{user.username}</a></div>
                                    <div className="col-md col-5 mb-2"><span className={"badge text-bg-" + badgeColor}>{user.role}</span></div>
                                    <div className="col-md col-7 mb-2 d-none d-md-block"><p className="h6 m-0">{user.empresa_ret}</p></div>
                                    <div className="col-md-3 col-7 mb-2"><a className='btn btn-outline-secondary' role={"button"} href={"mailto:" + user.email}>{user.email}</a></div>
                                    <div className="col-md-2 col-5 mb-2"><a className='btn btn-outline-secondary' role={"button"} href={"tel:+52" + user.tel}>{user.tel}</a></div>
                                    <div className="col-md-1 col-3 text-center mb-3 mb-md-0" >
                                        <button  onClick={()=>handleEditButton(user)} className="btn btn-outline-dark w-100" data-bs-toggle="modal" data-bs-target="#modal-edit-user" id={key}>
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-1 col-3 text-center mb-3 mb-md-0">
                                        <button className="btn btn-outline-danger w-100" onClick={()=> handleDeleteButton(user) }>
                                        <i className="fa-solid fa-trash-can"></i></button></div>
                                </div>

                                <div className="row rounded list-group-item d-flex d-md-none align-items-center justify-content-center p-1" id={user._id} key={key+1}>
                                        <div className="col-6">
                                            <p className='small fw-bold m-0'>{user.username}</p>
                                            </div>
                                        <div className="col-6 text-end mb-2">
                                            <button className="btn btn-sm btn-outline-dark me-2" onClick={()=>handleEditButton(user)} data-bs-toggle="modal" data-bs-target="#modal-edit-user"><i className="fa-solid fa-pencil"></i></button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={()=> handleDeleteButton(user)}><i className="fa-solid fa-trash-can"></i></button>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <p className="m-0 small"><span className={"badge text-bg-" + badgeColor}>{user.role}</span></p>
                                        </div>
                                        <div className="col-6 text-end mb-2">
                                            <p className='m-0 small'><span className="badge text-bg-info">{user.empresa_ret}</span></p>
                                        </div>
                                        <div className="col-12 mb-2">
                                            <p className="m-0 small"><a href={"mailto:" + user.email}><i className="fa-solid fa-envelope me-2"></i>{user.email}</a></p>
                                        </div>
                                        <div className="col-12 mb-2">
                                        <p className="m-0 small"><a href={"tel:+52" + user.tel}><i className="fa-solid fa-phone me-2"></i>{user.tel}</a></p>
                                        </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* TABLA NO APROBADOS */}
            { dataNA.length > 0 && <div className="">
                <div className="col-12 d-flex justify-content-between mb-4">
                    <p className="h3">Usuarios No-Aprobados</p>
                </div>
                <div className="row d-none d-md-flex p-2">
                    <div className="col fw-bold">Nombre</div>
                    <div className="col fw-bold">Rol</div>
                    <div className="col fw-bold">Empresa Ret.</div>
                    <div className="col-3 fw-bold">Correo</div>
                    <div className="col-2 fw-bold">Teléfono</div>
                    <div className="col-1 fw-bold">Aprobar</div>
                    <div className="col-1 fw-bold">Borrar</div>
                </div>
                <div className="list-group">
                    {dataNA.map((user, key) => {
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
                            <div className="">
                                <div className="row list-group-item p-1 d-none d-md-flex align-items-center justify-content-center" id={user._id} key={key+2} >
                                    <div className="col-md col-7 mb-2"><a className="m-0 btn btn-outline-secondary text-start" role={"button"} data-bs-toggle="modal" data-bs-target="#modal-detail-user" onClick={()=> handleEditButton(user)}>{user.username}</a></div>
                                    <div className="col-md col-5 mb-2"><span className={"badge text-bg-" + badgeColor}>{user.role}</span></div>
                                    <div className="col-md col-7 mb-2"><p className="h6 m-0">{user.empresa_ret}</p></div>
                                    <div className="col-md-3 col-7 mb-2"><a className='btn btn-outline-primary' role={"button"} href={"mailto:" + user.email}>{user.email}</a></div>
                                    <div className="col-md-2 col-5 mb-2"><a className='btn btn-outline-primary' role={"button"} href={"tel:+52" + user.tel}>{user.tel}</a></div>
                                    <div className="col-md-1 col-6 text-center" >
                                        <button  onClick={()=>handleAprobar(user)} className="btn btn-success w-100" >
                                            <i className="fa-solid fa-check"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-1 col-6 text-center">
                                        <button className="btn btn-outline-danger w-100" onClick={()=> handleDeleteButton(user) }>
                                        <i className="fa-solid fa-trash-can"></i></button></div>
                                </div>

                                <div className="row rounded list-group-item d-flex d-md-none align-items-center justify-content-center p-1" id={user._id} key={key+3}>
                                        <div className="col-6">
                                            <p className='small fw-bold m-0'>{user.username}</p>
                                            </div>
                                        <div className="col-6 text-end mb-2">
                                            <button className="btn btn-sm btn-success me-2" onClick={()=>handleAprobar(user)}><i className="fa-solid fa-check"></i></button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={()=> handleDeleteButton(user)}><i className="fa-solid fa-trash-can"></i></button>
                                        </div>
                                        <div className="col-6 mb-2">
                                            <p className="m-0 small"><span className={"badge text-bg-" + badgeColor}>{user.role}</span></p>
                                        </div>
                                        <div className="col-6 text-end mb-2">
                                            <p className='m-0 small'><span className="badge text-bg-info">{user.empresa_ret}</span></p>
                                        </div>
                                        <div className="col-12 mb-2">
                                            <p className="m-0 small"><a href={"mailto:" + user.email}><i className="fa-solid fa-envelope me-2"></i>{user.email}</a></p>
                                        </div>
                                        <div className="col-12 mb-2">
                                        <p className="m-0 small"><a href={"tel:+52" + user.tel}><i className="fa-solid fa-phone me-2"></i>{user.tel}</a></p>
                                        </div>
                                </div>


                            </div>
                        )
                    })}
                </div>
            </div>}







            {/* <!-- Modal ADD USER --> */}
            {props.event && <div className="modal  fade" id="modal-add-user" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h3" id="staticBackdropLabel">Añadir Usuario</p>
                            <button type="button" className="btn-close cerrar-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <UserForm event={props.event} empresasOptions={props.empresasOptions}></UserForm>
                        </div>

                    </div>
                </div>
            </div>}

            {/* <!-- Modal EDIT USER --> */}
            {props.event && userToSend && <div className="modal fade" id="modal-edit-user" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h3" id="staticBackdropLabel">Editar Usuario</p>
                            <button type="button" className="btn-close cerrar-modal-edit" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <UserFormEdit user={props.user} event={props.event} initValues={userToSend} empresasOptions={props.empresasOptions}></UserFormEdit>
                        </div>

                    </div>
                </div>
            </div>}

            {/* MODAL DETAIL VIEW */}
            {props.event && userToSend && <div className="modal fade" id="modal-detail-user" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h3" id="staticBackdropLabel">{userToSend.username}</p>
                            <button type="button" className="btn-close cerrar-modal-detalle" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <UserDetail event={props.event} initValues={userToSend} empresasOptions={props.empresasOptions}></UserDetail>
                        </div>

                    </div>
                </div>
            </div>}

            {/* MODAL APROBAR USUARIO? */}

        </div>


    )
}

export default UserTable