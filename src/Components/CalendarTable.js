import React, { useEffect, useState } from 'react'
import CalendarForm from './CalendarForm'
import CalendarFormEdit from './CalendarFormEdit'

function CalendarTable(props) {

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readEventsBy?hkt=${props.event}`)
      .then(response => response.json())
      .then(data => setEvents(data))


  }, [props.event, props.dummy])


  const [events, setEvents] = useState([])

  const [initValues, setInitValues] = useState({
    hkt: props.event,
    _id: "",
    fecha: "",
    eventos: [{ hora: "", título: "", desc: "" }]
  })
  const [initKey, setInitKey] = useState(0)



  const handleEditButton = (event, key) => {
    setInitValues(event)
    setInitKey(key)
    

  }

  const handleDeleteButton = (e) => {
    

    if(window.confirm("¿En realidad desea eliminar el evento?")){

      fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/deleteEventFromDate?_id=${e.target.dataset.id}`,
      {method: "DELETE"})
      .then(response => response.json())
      .then(response=> response.deletedCount > 0 ? alert("Evento Eliminado") : alert("ERROR"))
      .then(setTimeout(() => {
          document.querySelector("#view-admin-refresh").click()
      }, 1500))
      }else{
          alert("Eliminación Cancelada")
      }
  }


  return (
    <div className=''>

      <div className="col-12 d-flex justify-content-between mb-4">
        <p className="h3">Eventos</p>
        <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#modal-add-event"><i className="fa-solid fa-plus"></i> Evento  </button>
      </div>

      <div className="row d-none d-md-flex p-2">
        <div className="col-3 fw-bold">Fecha Inicio</div>
        
        <div className="col-3 fw-bold">Título</div>
        <div className="col-5 fw-bold">Descripción</div>
        
        <div className="col-1 fw-bold">Borrar</div>

      </div>

      <div className="list-group">
        {


          events.map((event, key) => {

            let badge = ""
            event.allDay ? badge = <span className='badge text-bg-warning'>Día Entero</span> : badge= ""

            let color = ""
                event.título === "ENTREGA FINAL" ? color = 'badge text-bg-danger' : color = ""

            return (

              <div className="">
                <div className='list-group-item d-none d-md-block' key={key}>
                  <div className="row">
                    <div className="col-3"><p className='m-0'>{new Date(event.fechaI).toLocaleString().slice(0, -3)}</p>{badge}</div>
                    <div className="col-3"><span className={color}>{event.título}</span></div>
                    <div className="col-5"><p className="truncado">{event.desc}</p></div>
                    <div className="col-1"><button className="btn btn-outline-danger w-100" data-id={event._id} onClick={handleDeleteButton}><i className="fa-solid fa-trash-can" data-id={event._id}></i></button></div>
                  </div>
                </div>

                <div className='list-group-item d-block d-md-none rounded' key={key+1}>
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-8">
                      <p className={color + " small fw-bold m-0"}>{event.título}</p>
                      <p className="m-0">{badge}</p>
                    </div>
                    <div className="col-4 text-end">
                      <button className="btn btn-sm btn-outline-danger" onClick={handleDeleteButton} data-id={event._id}>
                        <i className="fa-solid fa-trash-can" data-id={event._id}></i>
                      </button>

                    </div>
                    <div className="col-12">
                      <p className="small mb-1"><span className="badge text-bg-success">{new Date(event.fechaI).toLocaleString().slice(0, -3)}</span></p>
                    </div>
                    <div className="col-12">
                      <p className={"small"}>{event.desc}</p>

                    </div>
                   
                  </div>
                </div>
              </div>

            )

          })}
      </div>


      {/* MODAL ADD EVENT */}
      {props.event && <div className="modal  fade" id="modal-add-event" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title h3" id="staticBackdropLabel">Crear Evento</p>
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