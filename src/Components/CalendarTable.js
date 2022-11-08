import React, { useEffect, useState } from 'react'

function CalendarTable(props) {

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readEventsBy?hkt=${props.event}`)
      .then(response => response.json())
      .then(data => setEvents(data))


  }, [props])


  const [events, setEvents] = useState([])



  return (
    <div className='border'>
      <p className="h3">Eventos:</p>
      <div className="row d-none d-md-flex p-2">
        <div className="col-2">Fecha</div>
        <div className="col-1">Hora</div>
        <div className="col">Título</div>
        <div className="col">Desc.</div>
        <div className="col-1">Editar</div>
        <div className="col-1">Borrar</div>
        <hr className='mb-0' />
      </div>

      {events.map((event, key) => {
        
          return (
            <div>
              

              {event.eventos.map(sEvent=>{
                return (
                  <div className='row p-2 d-flex align-items-center justify-content-center' id={event._id}>
                    <div className="col-2">
                      <p>{event.fecha}</p>
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
              <hr />
            </div>

           
          )
        
      })}

    </div>
  )
}

export default CalendarTable