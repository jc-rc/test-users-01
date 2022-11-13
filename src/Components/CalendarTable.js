import React, { useEffect, useState } from 'react'

function CalendarTable(props) {

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readEventsBy?hkt=${props.event}`)
      .then(response => response.json())
      .then(data => setEvents(data))


  }, [props.event])


  const [events, setEvents] = useState([])



  return (
    <div className=''>
      <p className="h3">Eventos:</p>
      <div className="row d-none d-md-flex p-2">
        <div className="col-2 fw-bold">Fecha</div>
        <div className="col-1 fw-bold">Hora</div>
        <div className="col fw-bold">Título</div>
        <div className="col fw-bold">Desc.</div>
        <div className="col-1 fw-bold">Editar</div>
        <div className="col-1 fw-bold">Borrar</div>
        
      </div>

      <div className="list-group">
        {events.map((event, key) => {
        
            return (
              <div className='list-group-item' key={key}>
        
                {event.eventos.map((sEvent, key)=>{
                  return (
                    <div className='row p-2 d-flex align-items-center justify-content-center ' id={event._id} key={key}>
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
                      <div className="col-md-1 col-6 text-center"><button className="btn btn-outline-dark w-100"><i className="fa-solid fa-pencil"></i></button></div>
                          <div className="col-md-1 col-6 text-center"><button className="btn btn-outline-danger w-100"><i className="fa-solid fa-trash-can"></i></button></div>
                    </div>
                  )
                })}
                
              </div>
        
            )
        
        })}
      </div>

    </div>
  )
}

export default CalendarTable