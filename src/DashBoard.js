import React, {useState, useEffect} from 'react'
import { storage } from "./Firebase"
import { ref, listAll} from "firebase/storage"

function DashBoard(props) {

    const [retados, setRetados] = useState([])
    const [events, setEvents] = useState([])
    const [posts, setPosts] = useState([])
    const [files, setFiles] = useState("")

    var sum = 0


    useEffect(() => {
      //fetch usuarios (filtrar empresas y retados), posts, eventos

      
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getRetadores?hkt=${props.hkt}`)
        .then(response => response.json())
        .then(data => setRetados(data))


        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readEventsBy?hkt=${props.hkt}`)
      .then(response => response.json())
      .then(data => setEvents(data))

      fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readPostsBy?hkt=${props.hkt}`)
            .then(response => response.json())
            .then(data => setPosts(data))
    


      //Get files

      for(let i=0; i<props.empresas.length; i++){

        listAll(ref(storage, `${props.hkt}/${props.empresas[i]}`))
        .then(response=>{
            sum += response.prefixes.length
            setFiles(sum)
        })
      
         }
      
        
      
      
    }, [props])
    



    return (
        <div className="row d-flex">
            <div className="col-12 mb-4">
                <p className="m-0 h3">DashBoard</p>
                <p className="m-0 small">({props.hkt})</p>
            </div>

            <div className="col-12 col-sm-3 text-center border rounded p-3 d-flex flex-column justify-content-center">
                <p className="m-0 h6 fw-normal">Archivos Cargados</p>
                <p className="m-0 h1">{files}</p>
            </div>

            <div className="col-12 col-sm-3 text-center border rounded p-3 d-flex flex-column justify-content-center">
                <p className="h6 fw-normal">Usuarios Registrados</p>
                <p className="m-0 h2">{props.empresas.length} <span className="fs-5">Empresa(s)</span></p>
                <p className="m-0 h2">{retados.length} <span className="fs-5">Retado(s)</span></p>
            </div>
            <div className="col-12 col-sm-3 text-center border rounded p-3 d-flex flex-column justify-content-center">
                <p className="m-0 h6 fw-normal">Posts Internos</p>
                <p className="m-0 h1">{posts.length}</p>
            </div>
            <div className="col-12 col-sm-3 text-center border rounded p-3 d-flex flex-column justify-content-center">
                <p className="m-0 h6 fw-normal">Eventos de Calendario</p>
                <p className="m-0 h1">{events.length}</p>
            </div>
        </div>)
}

export default DashBoard