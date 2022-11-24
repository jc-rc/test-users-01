import React, { useState, useEffect } from 'react'
import UserForm from './UserForm'
import UserFormEdit from './UserFormEdit'
import UserDetail from './UserDetail'

function UserTable(props) {

    const [data, setData] = useState([])

    const [userToSend, setuserToSend] = useState()


    useEffect(() => {
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readUsersBy?hkt=${props.event}`)
            .then(response => response.json())
            .then(response => setData(response))
    }, [props.event, props.dummy])

    const handleEditButton = (user)=>{
        setuserToSend(user)
    }
    const handleDeleteButton = (user)=>{
        console.log(user);
        let confirmDelete = window.confirm(`⚠ ¿En verdad desea eliminar el usuario: ⚠ \n ${user.username}? `)
        if (confirmDelete) {
            fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/deleteUser?_id=${user._id}`,
            {method: "DELETE"})
            .then(response => response.status <300 ? alert(`Se eliminó el usuario: ${user.username}, con id: ${user._id}`): alert("Algo salió mal..."))
            .then( setTimeout(() => {
                document.querySelector("#view-admin-refresh").click()
            }, 3000) )
            
        }else{
            alert(`Se canceló la operación.`)
        }
    }



    return (
        <div className=''>
            <div className="col-12 d-flex justify-content-between mb-4">
                <p className="h3">Participantes</p>
                <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#modal-add-user">Añadir Usuario <i className="fa-solid fa-plus-circle"></i> </button>
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
                        <div className="row list-group-item p-1 d-flex align-items-center justify-content-center" id={user._id} key={key} >
                            <div className="col-md col-7 mb-2"><a className="m-0 btn btn-outline-secondary text-start" role={"button"} data-bs-toggle="modal" data-bs-target="#modal-detail-user" onClick={()=> handleEditButton(user)}>{user.username}</a></div>

                            <div className="col-md col-5 mb-2"><span className={"badge text-bg-" + badgeColor}>{user.role}</span></div>

                            <div className="col-md col-7 mb-2"><p className="h6 m-0">{user.empresa_ret}</p></div>

                            <div className="col-md-3 col-7 mb-2"><a className='btn btn-outline-primary' role={"button"} href={"mailto:" + user.email}>{user.email}</a></div>

                            <div className="col-md-2 col-5 mb-2"><a className='btn btn-outline-primary' role={"button"} href={"tel:+52" + user.tel}>{user.tel}</a></div>

                            <div className="col-md-1 col-6 text-center" >
                                <button  onClick={()=>handleEditButton(user)} className="btn btn-outline-dark w-100" data-bs-toggle="modal" data-bs-target="#modal-edit-user" id={key}>
                                    <i className="fa-solid fa-pencil"></i>
                                </button>
                            </div>

                            <div className="col-md-1 col-6 text-center"><button className="btn btn-outline-danger w-100" onClick={()=> handleDeleteButton(user) }>
                                <i className="fa-solid fa-trash-can"></i></button></div>
                        </div>
                    )
                })}
            </div>

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
                            <UserFormEdit event={props.event} initValues={userToSend} empresasOptions={props.empresasOptions}></UserFormEdit>
                        </div>

                    </div>
                </div>
            </div>}

            {/* MODAL DETAIL VIEW */}
            {props.event && userToSend && <div className="modal fade" id="modal-detail-user" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h5" id="staticBackdropLabel">Detalle Usuario</p>
                            <button type="button" className="btn-close cerrar-modal-detalle" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <UserDetail event={props.event} initValues={userToSend} empresasOptions={props.empresasOptions}></UserDetail>
                        </div>

                    </div>
                </div>
            </div>}

        </div>
    )
}

export default UserTable