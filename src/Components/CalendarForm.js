import React, {useEffect, useState} from 'react'

function CalendarForm(props) {

    
    const [form, setForm] = useState({
        hkt: props.event,
        fecha: props.initDate || ""
    })
    
    useEffect(() => {
     setForm({...form, fecha: props.initDate})
    }, [props.initDate])
    

    const handleSubmit = (e)=>{
        e.preventDefault()
        

        // //POST A DB
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/createDate?hkt=${form.hkt}&fecha=${form.fecha}&horaI=${form.horaI}&horaF=${form.horaF}&título=${form.título}&desc=${form.desc}&allDay=${form.allDay}&`, 
        {method: "POST"})
        
        .then(()=>{
            alert("EVENTO CREADO")
            //Limpiar el formulario
            document.getElementById("eventForm").reset()
        }) 
        .then( document.querySelector(".cerrar-modal-calendar").click())
        .then( setTimeout(() => {
            document.querySelector("#view-admin-refresh").click()
        }, 1500) )  

    }

    const handleReset = (e)=>{
        setForm({hkt: props.event, fecha: props.initDate})
    }

  
    const handleHKTChange = (e)=>{
        setForm({...form, hkt: e.target.value})
    }
    const handleDateChange = (e)=>{
        setForm({...form, fecha: e.target.value})
    }
    const handleTimeIChange = (e)=>{
        setForm({...form, horaI: e.target.value})
    }
    const handleTimeFChange = (e)=>{
        setForm({...form, horaF: e.target.value})
    }
    const handleTitleChange = (e)=>{
        setForm({...form, título: e.target.value})
    }
    const handleDescChange = (e)=>{
        setForm({...form, desc: e.target.value})
    }
    const handleAllDayChange = (e)=>{
        setForm({...form, allDay: e.target.checked})
    }


  return (
      <form className='' action="" onSubmit={handleSubmit} onReset={handleReset} id="eventForm">
          <div className="row d-flex">

              <div className="col-5 mb-3">
                  <label className='form-label' htmlFor="">Todo el Día?</label>
                  <input className='form-check' type="checkbox" name="" onChange={handleAllDayChange} />
              </div>

              <div className="col-7 mb-3">
                  <label className='form-label' htmlFor="">Fecha:</label>
                  <input className='form-control' type="date" name="" value={form.fecha} required onChange={handleDateChange} />
              </div>
              <div className="col-6 mb-3">
                  <label className='form-label' htmlFor="">Hora Inicio:</label>
                  <input className='form-control' type="time" name="" step="300" required onChange={handleTimeIChange} />
              </div>
              {form.horaI && <div className="col-6 mb-3">
                  <label className='form-label' htmlFor="">Hora Fin:</label>
                  <input className='form-control' type="time" name="" min={form.horaI} step="300" required onChange={handleTimeFChange} />
              </div>}
              <div className="mb-3">
                  <label className='form-label' htmlFor="">Título:</label>
                  <input className='form-control' type="text" name="" required maxLength={30} placeholder="Máx. 30 caracteres" onChange={handleTitleChange} />
              </div>
              <div className="mb-3">
                  <label className='form-label' htmlFor="">Descripción:</label>
                  <textarea className='form-control' style={{ height: 100 }} required maxLength={300} placeholder="Máx. 300 caracteres" onChange={handleDescChange} />
              </div>
              <div className="col-12">
                  <button className="btn btn-primary float-end" type='submit'>Crear</button>
                  <button className="btn btn-outline-danger me-3 float-end" type="reset">Limpiar</button>
              </div>

          </div>
      </form>
  )
}

export default CalendarForm