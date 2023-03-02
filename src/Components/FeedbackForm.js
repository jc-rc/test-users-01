import React, {useState, useEffect} from 'react'

function FeedbackForm(props) {
    const [hkt, setHkt] = useState(props.hkt)
    const [empresa, setEmpresa] = useState(props.empresa)
    const [retador, setRetador] = useState(props.retador)
    const [contenido, setContenido] = useState("")
    const [fecha, setFecha] = useState(new Date().toISOString().split("T", 2)[0])
    
    useEffect(() => {
      setHkt(props.hkt)
      setEmpresa(props.empresa)
      setRetador(props.retador)
      setFecha(new Date().toISOString().split("T", 2)[0])
      
        }, [props])


const handleContenido = (e)=>{
    setContenido(e.target.value)
}

const handleSubmit = (e)=>{
    e.preventDefault()

    //CREAR FEEDBACK
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/createFeedback?hkt=${hkt}&retador=${retador}&empresa=${empresa}&fecha=${fecha}&contenido=${contenido}`,
     {method: "POST"})
     .then(response=> response.json())
     .then(response => response? alert("Comentario Creado") : alert("ERROR"))
     .then( document.getElementById("postForm").reset())
        .then( document.querySelector(".cerrar-modal-feedback").click())
        .then( setTimeout(() => {
            document.querySelector("#view-admin-refresh").click()
        }, 1500) )
}

  return (
    <form action="" onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-12 mb-3">
                <label htmlFor="" className="form-label">Contenido:</label>
                <textarea type="text" name="" id="" className='form-control' maxLength={300} style={{height: 200}} placeholder="Máx. 300 caracteres." required onChange={handleContenido}/>
            </div>
            <div className="col-12 mb-3 text-end">
                <button className="btn btn-outline-danger me-2" type='reset'>Limpiar</button>
                <button className="btn btn-primary" type='submit'>Enviar</button>
            </div>
        </div>
    </form>
  )
}

export default FeedbackForm