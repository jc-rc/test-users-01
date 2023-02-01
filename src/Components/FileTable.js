import React, { useState, useEffect } from 'react'
import { storage } from "../Firebase"
import { ref, listAll, getDownloadURL, deleteObject, getMetadata } from "firebase/storage"
import FeedbackForm from './FeedbackForm'

function FileTable(props) {


    const [empresa, setEmpresa] = useState(props.empresa)
    const [hkt, setHkt] = useState(props.event)
    const [role, setRole] = useState(props.role)
    var dataList = []
    var linksList = []
    var sortedLinks = []

    const [retroData, setRetroData] = useState([])

    useEffect(() => {
        //LIST ALL FILES
        setLinks([])
        setData([])

        listAll(ref(storage, `${hkt}/${empresa}/${props.user}/`))
            .then(response => {
                setData(response.items)
                response.items.map(
                    item => {
                        console.log(item, "phase 1")
                        getMetadata(item)
                            .then(metadata => setMeta(metadata))
                            .then(console.log(meta))

                        getDownloadURL(item)
                            .then(url => setLinks(prev => [...prev, url]))
                            .then(console.log(links))
                    }
                )
            }
            )


        //LIST COMMENTS
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getFeedback?hkt=${hkt}&retador=${props.user}&empresa=${empresa}`)
            .then(response => response.json())
            .then(response => setRetroData(response))





    }, [props.user, props.dummy, props.empresa, props.event])


    const [data, setData] = useState([])
    const [links, setLinks] = useState([])
    const [meta, setMeta] = useState([])



    const handleDelete = (e) => {

        console.log(e.target.dataset.path + ".pdf")

        const deleteRef = ref(storage, `${e.target.dataset.path}`)

        if (window.confirm(`¿En realidad desea eliminar el archivo?`)) {
            deleteObject(deleteRef)
                .then(alert("FILE DELETED"))
                .then(setTimeout(() => {
                    document.querySelector("#view-admin-refresh").click()
                }, 1500))
        } else {
            alert("Eliminación Cancelada")
        }
    }
    const handleDeleteFeed = (e) => {

        console.log(e.target.dataset.id)

        if (window.confirm("¿En realidad desea eliminar el comentario?")) {
            //Delete Feedback
            fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/deleteFeedback?_id=${e.target.dataset.id}`,
                { method: "DELETE" })
                .then(response => response.json())
                .then(response => response.deletedCount > 0 ? alert("Comentario Eliminado") : alert("ERROR"))
                .then(setTimeout(() => {
                    document.querySelector("#view-admin-refresh").click()
                }, 1500))
        } else {
            alert("Eliminación Cancelada")
        }


    }

    var isoString = new Date(meta.timeCreated)
    var localString = isoString.toLocaleString()


    return (
        <div className="row">
            <div className="col-12">

                <ul className="list-group">

                    {links && data && meta &&

                        links.map((link, key) => {
                            return (
                              

                                <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">

                                    <a href={link} target={"_blank"} class="h4 me-3 btn btn-primary"><i className="fa-solid fa-file-pdf"></i></a>
                                    <div class="ms-2 me-auto">
                                        <a href={link} target={"_blank"} class="fw-bold">{data[0].name}</a>
                                        <p className="m-0 small fst-italic">Subido: {localString} </p>
                                    </div>


                                   {role === "EMPRESA" && <button class="btn btn-outline-info me-3" data-bs-toggle="modal" data-bs-target="#modal-form-feedback"><i className="fa-regular fa-comment"></i></button>}

                                   {role != "RETADOR" && <button class="btn btn-outline-danger" data-path={data[key]._location.path_} onClick={(e) => handleDelete(e)}><i data-path={data[key]._location.path_} className="fa-solid fa-close"></i></button>}


                                </li>

                            )
                        })

                    }

                    <li className='list-group-item'>
                        <div className="row">
                            
                            {retroData.map((retro, key) => {

                                return (
                                    <div className="col-12 mb-0">
                                        <div className="alert alert-info my-1">
                                            <div className="row d-flex align-items-base justify-content-between">
                                                <div className="col-11">
                                                    <p className='small me-auto'>{retro.contenido}</p>
                                                    <p className='small m-0 fst-italic'>{retro.empresa}</p>
                                                    <p className='small m-0'>{retro.fecha}</p>
                                                </div>
                                                <div className="col text-end">
                                                   {role != "RETADOR" && <button className='btn btn-outline-danger' data-id={retro._id} onClick={handleDeleteFeed}><i className="fa-solid fa-close" data-id={retro._id}></i></button>}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </li>
                </ul>
            </div>



            {/* MODAL FEEDBACK */}
            <div className="modal fade" id="modal-form-feedback" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h5" id="staticBackdropLabel">Nuevo Comentario</p>
                            <button type="button" className="btn-close cerrar-modal-feedback" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FeedbackForm hkt={hkt} empresa={empresa} retador={props.user} />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default FileTable