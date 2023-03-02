import React, {useState, useEffect} from 'react'
import {storage} from "../Firebase"
import {ref, uploadBytes} from "firebase/storage"

function FileForm(props) {

    const [iptFile, setIptFile] = useState(null)
    const [user, setUser] = useState(props.user)
    const [dummy, setDummy] = useState(0)
    
    //VALOR DE LA FECHA límite por HKT
    const [fechaL, setFechaL] = useState("")


  // useEffect , fetch la fecha (XX-XX-XX) si existe "ENTREGA FINAL"
    useEffect(() => {
      fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getEntregaFinal?hkt=${user.hkt}`)
      .then(response => response.json())
      .then(response => response ? setFechaL(response) : null)
    }, [props])
    




    const handleUpload = () =>{
        //UPLOAD FILES
    
        if(!iptFile){
          alert("NO FILE SELECTED")
          return
        }
    
        var currentDate = new Date()
        
        var currentDay = currentDate.getDate()
        var currentMonth = currentDate.getMonth()+1
        var currentYear = currentDate.getFullYear()
        const fileRef = ref(storage, `${user.hkt}/${user.empresa_ret}/${user.username}/${user.username}_${user.empresa_ret}_${user.hkt}`)
    
        uploadBytes(fileRef, iptFile)
        .then( )
        .then()
        .then(alert("Archivo Cargado"))
        .then( setTimeout(() => {
            document.querySelector("#view-admin-refresh").click()
      }, 500) )
        
        
      }

  return (
    <div className="row">
        <div className="col-12">
            <p className="h3 mb-3">Carga de Archivos</p>
            <p className="small m-0">Día de Entrega Final : <span className="fst-italic text-danger">{fechaL ? new Date(fechaL.fechaI).toLocaleDateString() : "No Definido"}</span></p>
            <p className="small">Límite de Carga: <span className='fst-italic text-info'>{new Date(new Date(fechaL.fechaI).setDate(new Date(fechaL.fechaI).getDate())).toLocaleDateString()} 23:59:59</span></p>
        </div>
        <div className="col-12 d-flex flex-column">
              <input type="file" className="form-control mb-3" name="" id="" accept="application/pdf" onChange={(e)=> setIptFile(e.target.files[0])}/>
              <div className="alert alert-info p-2">
                <p htmlFor="" className="form-label small fst-italic mb-1">*Solo admite archivos "PDF"</p>
                <p htmlFor="" className="form-label small fst-italic ">**Las cargas se sobreescriben.</p>
              </div>
            </div>
              <div className="col-12 mb-3">
                <button className="btn btn-primary float-end" disabled={new Date() > new Date(fechaL.fechaI)} onClick={handleUpload}>Cargar</button>
                </div>
    </div>
        
  )
}

export default FileForm