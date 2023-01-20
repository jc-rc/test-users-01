import React, { useState, useEffect } from 'react'
import { storage } from "../Firebase"
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage"

function FileTable(props) {


    const [empresa, setEmpresa] = useState(props.empresa)
    const [hkt, setHkt] = useState(props.event)
    const [role, setRole] = useState(props.role)
    var dataList = []
    var linksList = []
    var sortedLinks = []

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

                    }

                )
            }
            )



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
                <p className="h3 mb-3">Archivos Subidos:</p>
                <div className="list-group">

                    {links && data &&

                        links.map((link, key) => {
                            return (
                                <div className="row d-flex list-group-item list-group-item-action" key={key}>
                                    <div className="col-10">
                                        <a href={link} target={"_blank"} className="">
                                            <p className='text-break' >Entrega {data[key]._location.path_}</p>
                                        </a>
                                    </div>
                                    {role !== "RETADOR" && <div className="col-2">
                                        <button className='btn btn-outline-danger float-end' style={{ zIndex: 999 }} data-path={data[key]._location.path_} onClick={(e) => handleDelete(e)}>X</button>
                                    </div>}
                                </div>
                            )
                        })

                    }
                </div>
            </div>

        </div>
    )
}

export default FileTable