import React, {useState, useEffect} from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from '@fullcalendar/list'
import interactionPlugin from "@fullcalendar/interaction"
import {Modal} from "bootstrap"
import CalendarForm from './CalendarForm'


function CalendarChart(props) {

    

    const [data, setData] = useState([])

const [detail, setDetail] = useState()
const [date, setDate] = useState()


 useEffect(() => {

    
    

    
  fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readEventsBy?hkt=${props.event}`)
   .then(response => response.json())
   .then(response => setData(response))
   
  
 }, [props])


 

const handleDateClick = (e)=>{
    if((props.role === "ADMIN") || (props.role === "ORGANIZADOR")){

        setDate(e.dateStr)
        const myModal2 = new Modal("#modal-add-event-new")
        myModal2.show()
    }
    
}
const handleEventClick = (e)=>{
    
    setDetail(e.event)
    const myModal = new Modal("#modal-calendar-detalle")
        myModal.show()
        
}

const handleLoad = (e)=>{
    
}


  return (


    <div className="p-0">
        <FullCalendar
        
            plugins={[ dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin]}
            initialView = "dayGridMonth"
            
            handleWindowResize = {true}
            contentHeight = "auto"
            buttonText={{
                month: "Mes",
                day: "Día",
                list: "Lista",
                today: "Hoy",
                week: "Sem."
            }}
            headerToolbar={{
                right: "dayGridMonth,timeGridWeek,timeGridDay",
                left: "title",
                center: ""
            }}
            footerToolbar={{
                right: "prev,today,next"
            }}
            showNonCurrentDates = {false}
            fixedWeekCount = {false}
            timeZone= "local"
            slotMinTime={"07:00:00"}
            slotMaxTime={"19:00:00"}
            slotDuration={"00:30:00"}
            slotLabelFormat={[
                { hour: "2-digit", minute: "2-digit" }]
            }
            nowIndicator = {true}
            eventColor = "#F06A15"
            eventTimeFormat={{hour: "numeric", minute: "2-digit", omitZeroMinute: true, meridiem: false}}
            progressiveEventRendering= {false}
            locale= "mx"
            firstDay={1}
            events = {data.map((evento)=>{
                let color = ""
                evento.título === "ENTREGA FINAL" ? color = "#dc3545" : color = ""
                return({
                id: evento._id,
                allDay: evento.allDay,
                start: evento.fechaI,
                end: evento.fechaF,
                title: evento.título,
                display: "block",
                color: `${color}`,
                extendedProps: {desc: evento.desc},
                className: "evento"
            })})}
            dateClick= {handleDateClick}
            eventClick={handleEventClick}
        
        
        />



            {/* MODAL ADD EVENT */}

            {date && <div className="modal  fade" id="modal-add-event-new" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                      <div className="modal-header">
                          <p className="modal-title h3" id="staticBackdropLabel">Crear Evento</p>
                          <button type="button" className="btn-close cerrar-modal-calendar-detalle" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <div className="row">
                            <div className="col-12">
                                <CalendarForm event={props.event} initDate={date}></CalendarForm>
                            </div>
                          </div>
                      </div>

                  </div>
              </div>
          </div>}

            {/* MODAL DETALLE */}

          { detail && <div className="modal  fade" id="modal-calendar-detalle" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                      <div className="modal-header">
                          <p className="modal-title h3" id="staticBackdropLabel">{detail.title}</p>
                          <button type="button" className="btn-close cerrar-modal-calendar-detalle" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <div className="row">
                            <div className="col-12">
                                
                                <div className="m-0 d-flex">
                                    
                                    <p className=' m-0 me-2'> <span className="badge text-bg-primary small"><i className="fa-solid fa-calendar-day mb-0 me-1"></i> {detail.start.toLocaleDateString()}</span></p>
                                    <p className='m-0'>{detail.allDay ? <span className='badge text-bg-warning small'> <i className="fa-solid fa-calendar-check me-1"></i> Todo el Día</span> : <span className='badge text-bg-success small'><i className="fa-solid fa-clock"></i> {detail.start.toLocaleTimeString().slice(0, -3)} <i className="fa-solid fa-right-long mx-1"></i> {detail.end.toLocaleTimeString().slice(0, -3)}</span>}</p>
                                </div>
                                <hr />
                                <p className="">{detail.extendedProps.desc}</p>
                            </div>
                          </div>
                      </div>

                  </div>
              </div>
          </div>}


    </div>


  )
}

export default CalendarChart