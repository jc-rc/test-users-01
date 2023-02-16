import React, {useState, useEffect} from 'react'

function PostFormEdit(props) {

    useEffect(()=>{
        setForm({
            _id: props.initValues._id,
            hkt: props.event,
            autor: props.empresa,
            fecha: props.initValues.fecha,
            título: props.initValues.título,
            contenido: props.initValues.contenido
        })
    }, [props])

    const [form, setForm] = useState({
        _id: props.initValues._id,
        hkt: props.event,
        autor: props.empresa,
        fecha: "",
        título: "",
        contenido: ""

    })

    const handleSubmit = (e)=>{
        e.preventDefault();

         fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/updatePost?_id=${form._id}&hkt=${form.hkt}&autor=${form.autor}&fecha=${form.fecha}&título=${form.título}&contenido=${form.contenido}`,
         {method:"PUT"})
         .then(response => response? alert("Post Modified"): null)
         .then( document.getElementById("postFormEdit").reset())
         .then( document.querySelector(".cerrar-modal-post-edit").click())
         .then( setTimeout(() => {
            document.querySelector("#view-admin-refresh").click()
        }, 3000) )
    }
    const handleReset = ()=>{
        setForm({
            _id: props.initValues._id, 
            hkt: props.event,
            autor: props.empresa,
            fecha: "",
            título: "",
            contenido: ""
        })
    }
    const handleTitleChange = (e)=>{
        setForm({...form, título: e.target.value})
    }
    const handleContentChange = (e)=>{
        setForm({...form, contenido: e.target.value})
    }

  return (
    <div className="row">
        <form action="" onSubmit={handleSubmit} id="postFormEdit" onReset={handleReset}>
            
            <div className="mb-3">
                <label htmlFor="" className="form-label">Autor:</label>
                <input type="text" className='form-control' name='autor' value={form.autor} disabled /> 
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Título:</label>
                <input type="text" className='form-control' required maxLength={30} value={form.título} placeholder="Máx. 30 caracteres"  onChange={handleTitleChange}/> 
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Contenido:</label>
                <textarea className='form-control' style={{height: 200}} required maxLength={300} value={form.contenido} placeholder="Máx. 300 caracteres" onChange={handleContentChange}></textarea>
            </div>
            <button className="btn btn-primary float-end" type='submit'>Actualizar</button>
            <button className="btn btn-outline-danger me-3 float-end" type='reset' >Limpiar</button>
        </form>
    </div>
  )
}

export default PostFormEdit