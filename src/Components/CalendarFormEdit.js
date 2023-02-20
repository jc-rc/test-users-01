import React, {useState, useEffect} from 'react'

function CalendarFormEdit(props) {

     useEffect(()=>{
         setForm({
             hkt: props.event,
             fecha: props.initValues.fecha,
             _id: props.initValues._id,
             hora: props.initValues.eventos[props.initKey].hora,
             título: props.initValues.eventos[props.initKey].título,
             desc: props.initValues.eventos[props.initKey].desc
         }) 
         
     }, [props.initKey, props.initValues])

   

   const [form, setForm] = useState({
    hkt: props.event,
    fecha: "",
    _id: "",
    hora: "",
    título: "",
    desc: ""
   })
   const [newForm, setNewForm] = useState({})
   
   useEffect(()=>{
    setNewForm(form)
 }, [form])

   

    const handleDateChange = ()=>{}
    const handleTimeChange = (e)=>{
        setNewForm({...newForm, hora: e.target.value})
    }
    const handleTitleChange = (e)=>{
        setNewForm({...newForm, título: e.target.value})
    }
    const handleDescChange = (e)=>{
        setNewForm({...newForm, desc: e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()

        //Fetch para ACTUALIZAR
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/updateEvent?_id=${form._id}&hora=${form.hora}&título=${form.título}&desc=${form.desc}&newHora=${newForm.hora}&newTítulo=${newForm.título}&newDesc=${newForm.desc}`,
        {method: "PUT"})
        .then(response => response.json())
        .then(response =>  response.modifiedCount === 1 ? alert("Se Editó el Evento") : alert("Algo salío mal..."))

        //Fetch para ORDENAR

        
       .then( fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/sortEvents?_id=${form._id}`))
       .then( document.querySelector(".cerrar-modal-calendar-edit").click())
       .then( setTimeout(() => {document.querySelector("#view-admin-refresh").click()}, 1500) ) 
   
        
        
    }

  return (
    <div className="row">
        <form action="" onSubmit={handleSubmit} id="eventEditForm">
                        
            <div className="mb-3">
                <label className='form-label' htmlFor="">Fecha:</label>
                <input className='form-control' type="date" name="" disabled required value={form.fecha}/>
            </div>
            <div className="mb-3">
                <label className='form-label' htmlFor="">Hora:</label>
                <input className='form-control' type="time" name=""  step="600" required onChange={handleTimeChange} value={newForm.hora}/>
            </div>
            <div className="mb-3">
                <label className='form-label' htmlFor="">Título</label>
                <input className='form-control' type="text" name=""  required maxLength={30} placeholder="Máx. 30 caracteres"  onChange={handleTitleChange} value={newForm.título}/>
            </div>
            <div className="mb-3">
                <label className='form-label' htmlFor="">Descripción</label>
                <textarea className='form-control' style={{height: 200}} required maxLength={300} placeholder="Máx. 300 caracteres" onChange={handleDescChange} value={newForm.desc}/>
            </div>
            <button className="btn btn-info float-end" type='submit'>Update!</button>
            <button className="btn btn-outline-danger me-3 float-end" type="reset">Clear</button>
        </form>
    </div>

  )
}

export default CalendarFormEdit