import React, {useEffect, useState} from 'react'

function Calendar(props) {

    //FETCH FROM DB
    useEffect(() => {
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readEventsBy?hkt=${props.event}`)
            .then(response => response.json())
            .then(data => setEvents(data))


    }, [props])


    const [events, setEvents] = useState([])

  return (
    <div className=" border">
    <p className='h3'>Calendario:</p>
    <ul className="list-group">
        {events.map((cEvent, key)=>{
            return(
                <div className="card p-2 mb-2" key={key}>
                    <div className="row">
                        <div className="col-12">
                            <p className="md-small h6 text-bg-danger p-2">{cEvent.fecha}</p>
                            <hr />
                        </div>
                        <div className="col-12">
                            {cEvent.eventos.map((evento, key)=>{
                                return(
                                    <dl className="row m-0" key={key}>
                                <dt className="col-12 col-md-3 mb-2">{evento.hora}hrs.</dt>
                                <dd className="col-12 col-md-9">
                                    <p className='h6 mb-1 ms-4 ms-md-0'>
                                        <span className='small'><i className="fa-regular fa-calendar-check"></i></span> {evento.título}</p>
                                    <p className='small ms-4 ms-md-0 mb-1 text-truncate'>{evento.desc}</p>
                                </dd>
                            </dl>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        })}
    </ul>
</div>

  )
}

export default Calendar