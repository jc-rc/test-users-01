import React, {useState, useEffect} from 'react'
import {storage} from "../Firebase"
import {ref, uploadBytes} from "firebase/storage"

function FileForm(props) {

    const [iptFile, setIptFile] = useState(null)
    const [user, setUser] = useState(props.user)
    const [dummy, setDummy] = useState(0)

    const handleUpload = () =>{
        //UPLOAD FILES
    
        if(!iptFile){
          alert("NO FILE SELECTED")
          return
        }
    
        var currentDate = new Date()
        console.log(currentDate);
        var currentDay = currentDate.getDate()
        var currentMonth = currentDate.getMonth()+1
        var currentYear = currentDate.getFullYear()
        const fileRef = ref(storage, `${user.hkt}/${user.empresa_ret}/${user.username}/${user.username}_${user.empresa_ret}_${user.hkt}_${currentDay}-${currentMonth}-${currentYear}`)
    
        uploadBytes(fileRef, iptFile)
        .then(response=> console.log(response))
        .then()
        .then(alert("FILE ULPOADED"))
        .then( setTimeout(() => {
            document.querySelector("#view-admin-refresh").click()
      }, 500) )
        
        
      }

  return (
    <div className="row">
        <div className="col-12">
            <p className="h3 mb-3">Carga de Archivos</p>
        </div>
        <div className="col-12 d-flex flex-column">
              <input type="file" className="form-control mb-3" name="" id="" accept="application/pdf" onChange={(e)=> setIptFile(e.target.files[0])}/>
              <label htmlFor="" className="form-label small fst-italic mb-1">*Solo admite archivos "PDF"</label>
              <label htmlFor="" className="form-label small fst-italic mb-3">**Admite 1 carga diaria, cualquier carga durante el mismo día se sobreescribe.</label>
            </div>
              <div className="col-12 mb-3">
                <button className="btn btn-primary float-end" onClick={handleUpload}>UPLOAD!</button>
                </div>
    </div>
        
  )
}

export default FileForm