import React, { useEffect, useState } from 'react'
import CalendarForm from './CalendarForm'
import CalendarFormEdit from './CalendarFormEdit'

function CalendarTable(props) {

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readEventsBy?hkt=${props.event}`)
      .then(response => response.json())
      .then(data => setEvents(data))


  }, [props.event])


  const [events, setEvents] = useState([])

  const [initValues, setInitValues] = useState({
      hkt: props.event,
      _id: "",
      fecha:"",
      eventos: [{hora:"", título:"", desc: ""}]
  })
  const [initKey, setInitKey] = useState(0)



  const handleEditButton = (event, key) => {
    setInitValues(event)
    setInitKey(key)
    console.log("Editando Fecha @" + event.fecha, ", Evento #" + key)

  }

  const handleDeleteButton = (event, key) => {
    setInitValues(event)
    console.log("Editando Fecha @" + event.fecha, ", Evento #" + key)

    let confirmDelete = window.confirm(`⚠ ¿En verdad desea eliminar el evento: ⚠ \n "${event.eventos[key].título}"? `)
    if (confirmDelete) {
      fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/deleteEventFromDate?_id=${event._id}&fecha=${event.fecha}&hora=${event.eventos[key].hora}&título=${event.eventos[key].título}&desc=${event.eventos[key].desc}`,
        { method: "DELETE" })
        .then(response => response.json())
        .then(response => {
          if (response.modifiedCount === 0) {
            alert("No hay eventos en esta fecha; borrando la fecha...")
          } else {
            alert("Evento Borrado")

          }
        })

    } else {
      alert(`Se canceló la operación.`)
    }
  }


  return (
    <div className=''>

      <div className="col-12 d-flex justify-content-between mb-4">
        <p className="h3">Events:</p>
        <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#modal-add-event">Añadir Evento <i className="fa-solid fa-plus-circle"></i> </button>
      </div>

      <div className="row d-none d-md-flex p-2">
        <div className="col-2 fw-bold">Fecha</div>
        <div className="col-1 fw-bold">Hora</div>
        <div className="col fw-bold">Título</div>
        <div className="col fw-bold">Desc.</div>
        <div className="col-1 fw-bold">Editar</div>
        <div className="col-1 fw-bold">Borrar</div>

      </div>

      <div className="list-group">
        {
        
          
      events.map((event, key) => {
        
            return (

        event.eventos.length !=0 ? <div className='list-group-item' key={key}>

          {event.eventos.map((sEvent, key2) => {
            return (
              <div className='row p-2 d-flex align-items-center justify-content-center ' id={event._id} key={key2}>
                <div className="col-2">
                  <p className='h6'>{event.fecha}</p>
                </div>
                <div className="col-1">
                  <p>{sEvent.hora}</p>
                </div>
                <div className="col">
                  <p className='small'>{sEvent.título}</p>
                </div>
                <div className="col">
                  <p className='small'>{sEvent.desc}</p>
                </div>
                <div className="col-md-1 col-6 text-center"><button className="btn btn-outline-dark w-100" onClick={() => handleEditButton(event, key2)} data-bs-toggle="modal" data-bs-target="#modal-edit-event"><i className="fa-solid fa-pencil"></i></button></div>
                <div className="col-md-1 col-6 text-center"><button className="btn btn-outline-danger w-100" onClick={() => handleDeleteButton(event, key2)}><i className="fa-solid fa-trash-can" ></i></button></div>
              </div>
            )
          })}

        </div>

        : null)
        
        }) }
      </div>


      {/* MODAL ADD EVENT */}
      {props.event && <div className="modal  fade" id="modal-add-event" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title h3" id="staticBackdropLabel">Añadir Evento</p>
              <button type="button" className="btn-close cerrar-modal-calendar" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <CalendarForm event={props.event}></CalendarForm>
            </div>

          </div>
        </div>
      </div>}
      {/* MODAL EDIT EVENT */}
      {props.event && <div className="modal  fade" id="modal-edit-event" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title h3" id="staticBackdropLabel">Editar Evento</p>
              <button type="button" className="btn-close cerrar-modal-calendar-edit" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <CalendarFormEdit event={props.event} initValues={initValues} initKey={initKey}></CalendarFormEdit>
            </div>

          </div>
        </div>
      </div>}
      {/* MODAL DETAIL EVENT */}

    </div>
  )
}

export default CalendarTable