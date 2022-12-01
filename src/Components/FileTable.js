import React, { useState, useEffect } from 'react'
import { storage } from "../Firebase"
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage"

function FileTable(props) {

    const [user, setUser] = useState(props.user)
    const [dummy, setDummy] = useState(0)

    useEffect(() => {
        //LIST ALL FILES

        setLinks([])
        setData([])



        listAll(ref(storage, `${user.hkt}/${user.empresa_ret}/${user.username}/`))
            .then(response => {
                setData(response.items)
                response.items.forEach(item => {
                    getDownloadURL(item)
                        .then(url => setLinks(prev => [...prev, url]))
                })
            })
    }, [props.user, dummy])

    const [data, setData] = useState([])
    const [links, setLinks] = useState([])


    const handleDelete = (e) => {
        console.log(e.target.name + ".pdf");
        const deleteRef = ref(storage, `${e.target.name}`)

        if (window.confirm(`¿En realidad desea eliminar: el archivo?`)) {
            deleteObject(deleteRef)
                .then(alert("FILE DELETED"))
                .then(setTimeout(() => {
                    setDummy(dummy => dummy + 1)
                }, 1500))
        } else {
            alert("Eliminación Cancelada")
        }
    }


    return (
        <div className="col">
            <p className="h3 mb-3">Archivos Subidos</p>
            <ul className="list-group">
                {links.length === 0 ? <p className="fst-italic">
                    ¡No hay Archivos!
                </p> :
                    links.map((link, key) => {
                        return (
                            <li className="list-group-item" key={key}>
                                <div className="row">
                                    <div className="col-12 d-flex align-items-center justify-content-between">
                                        <a href={link} target="_blank" download>{"Entrega " + data[key]._location.path_.substring(data[key]._location.path_.length - 10)}</a>
                                        <button className="btn btn-outline-danger float-end" id={key} name={data[key]._location.path_} onClick={(e) => handleDelete(e)}>X</button>
                                    </div>



                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default FileTable