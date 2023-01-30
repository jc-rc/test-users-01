import React, { useState, useEffect } from 'react'
import { storage } from "../Firebase"
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage"
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
                        console.log(item)
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



    const handleDelete = (e) => {

        console.log(e.target.dataset.path + ".pdf")

        const deleteRef = ref(storage, `${e.target.dataset.path}`)

        if (window.confirm(`¿En realidad desea eliminar: el archivo?`)) {
            deleteObject(deleteRef)
                .then(alert("FILE DELETED"))
                .then(setTimeout(() => {
                    document.querySelector("#view-admin-refresh").click()
                }, 2500))
        } else {
            alert("Eliminación Cancelada")
        }
    }


    return (
        <div className="row">
            <div className="col-12">
                
                <div className="list-group">

                    {(links && data) &&

                        links.map((link, key) => {
                            return (
                                <div className="row d-flex list-group-item list-group-item-action p-3" key={key}>
                                    <div className="col-10 mb-3">
                                        <p className="h5 m-0">{((link.split("/o/", 2)[1]).split("%2F", 4)[3]).split("?", 1)}</p>
                                        <p className="small mb-3"> Subido: {link.split("_", 4)[3].split("?", 2)[0]}</p>
                                        <a href={link} target={"_blank"} className="btn btn-primary border rounded p-2">
                                            <p className='text-break m-0' ><i class="fa-solid fa-file-pdf h6 me-2"></i> Descargar</p>
                                        </a>
                                    </div>
                                    {role !== "RETADOR" && <div className="col-2">
                                        <button className='btn btn-outline-danger float-end fw-bold' style={{ zIndex: 999 }} data-path={data[key]._location.path_} onClick={(e) => handleDelete(e)}>X</button>
                                    </div>}
                                    <hr />

                                    <div className="col-9 mb-3 mt-auto">
                                        <p className='h5'>Comentarios de {props.empresa}:</p>
                                    </div>

                                   { role !== "RETADOR" && <div className="col-3 mb-3 text-end">
                                        <button className='btn btn-info text-light' data-bs-toggle="modal" data-bs-target="#modal-form-feedback"><i className="fa-solid fa-comment"> +</i></button>
                                    </div>}


                                    {
                                        retroData.map((retro, key) => {

                                            return (
                                                <div className="col-12 alert alert-info p-2 mb-1" key={key}>
                                                    <div className="row d-flex align-items-end">
                                                        <div className="col-8">
                                                            <p className='small m-0'>{retro.contenido}</p>
                                                        </div>
                                                        <div className="col-4">
                                                            <p className='small m-0 fst-italic text-end'> Publicado: {retro.fecha} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                            )
                        })

                    }
                </div>
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
                           <FeedbackForm hkt={hkt} empresa={empresa} retador={props.user}/>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default FileTable