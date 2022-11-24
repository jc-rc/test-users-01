import React, {useEffect, useState} from 'react'

function CalendarForm(props) {

    useEffect(()=>{
        setForm({...form, hkt: props.event})
    }, [props])

    const [form, setForm] = useState({
        fecha: "",
        hora: "",
        título: "",
        desc: "",
        hkt: props.event
    })

    

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log("Data Received",form);

        // //POST A DB
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/addEventToDate?fecha=${form.fecha}&hkt=${form.hkt}&hora=${form.hora}&título=${form.título}&desc=${form.desc}`,{ method: "POST" })
        .then(response=>{
            if (response.status >=400){
                console.log("FECHA NO ENCONTRADA, CREANDO FECHA y EVENTO...")

                fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/createDate?fecha=${form.fecha}&hkt=${form.hkt}&hora=${form.hora}&título=${form.título}&desc=${form.desc}`, {method: "POST"})
                .then(()=>{
                    alert("Date Created and Event Added")
                })

            }else{
                alert("Event Added to this date: " + form.fecha)
            }
        })
        .then(()=>{
            //Limpiar el formulario
            document.getElementById("eventForm").reset()
        }) 
        .then( document.querySelector(".cerrar-modal-calendar").click())
        .then( setTimeout(() => {
            document.querySelector("#view-admin-refresh").click()
        }, 3000) )  


    }

  
    const handleHKTChange = (e)=>{
        setForm({...form, hkt: e.target.value})
    }
    const handleDateChange = (e)=>{
        setForm({...form, fecha: e.target.value})
    }
    const handleTimeChange = (e)=>{
        setForm({...form, hora: e.target.value})
    }
    const handleTitleChange = (e)=>{
        setForm({...form, título: e.target.value})
    }
    const handleDescChange = (e)=>{
        setForm({...form, desc: e.target.value})
    }


  return (
    <div className="row">
        <form action="" onSubmit={handleSubmit} id="eventForm">
            <p className="h3">Create New Event:</p>
            <hr />
            
            <div className="mb-3">
                <label className='form-label' htmlFor="">Fecha:</label>
                <input className='form-control' type="date" name=""  required onChange={handleDateChange}/>
            </div>
            <div className="mb-3">
                <label className='form-label' htmlFor="">Hora:</label>
                <input className='form-control' type="time" name=""  step="600" required onChange={handleTimeChange}/>
            </div>
            <div className="mb-3">
                <label className='form-label' htmlFor="">Título</label>
                <input className='form-control' type="text" name=""  required maxLength={30} placeholder="Máx. 30 caracteres"  onChange={handleTitleChange}/>
            </div>
            <div className="mb-3">
                <label className='form-label' htmlFor="">Descripción</label>
                <textarea className='form-control' style={{height: 200}} required maxLength={300} placeholder="Máx. 300 caracteres" onChange={handleDescChange}/>
            </div>
            <button className="btn btn-primary float-end" type='submit'>Create</button>
            <button className="btn btn-outline-danger me-3 float-end" type="reset">Clear</button>
        </form>
    </div>
  )
}

export default CalendarForm