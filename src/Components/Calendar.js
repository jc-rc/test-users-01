import React, {useEffect, useState} from 'react'

function Calendar(props) {

    //FETCH FROM DB
    useEffect(() => {
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readEventsBy?hkt=${props.event}`)
            .then(response => response.json())
            .then(data => setEvents(data))


    }, [props.dummy])


    const [events, setEvents] = useState([])

  return (
    <div className=" ">
    <p className='h3 mb-3'>Calendario: {props.event}</p>
    <ul className="list-group">
        {events.map((cEvent, key)=>{
            return( cEvent.eventos.length > 0 &&
                <div className="card p-3 mb-2 list-group-item" key={key}>
                    <div className="row">
                        <div className="col-12">
                            <p className="small h6 naranja-ctvka rounded text-light p-2"> <span className=''><i className="fa-regular fa-calendar-check"></i></span> {cEvent.fecha}</p>
                            <hr />
                        </div>
                        <div className="col-12">
                            {cEvent.eventos.map((evento, key)=>{
                                return(
                                    <dl className="row m-0" key={key}>
                                <dt className="col-12 col-md-3 mb-2">{evento.hora}hrs.</dt>
                                <dd className="col-12 col-md-9">
                                    <p className='h6 mb-1 ms-4 ms-md-0'>
                                         {evento.título}</p>
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