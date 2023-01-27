import React, {useState, useEffect} from 'react'

function UserDetail(props) {

    const [data, setData] = useState("")

    useEffect(()=>{
        setData(props.initValues)
    }, [props])

    let badgeColor = ""
                    switch (data.role) {
                        case "ORGANIZADOR":
                            badgeColor = "success"
                            break;
                        case "EMPRESA":
                            badgeColor = "primary"
                            break;
                        case "RETADOR":
                            badgeColor = "warning"
                            break;

                        default:
                            break;
                    }


  return (
    <div className='row'>
        <div className="col-12 my-0"><p className="h3">{data.username}</p></div>
        <div className="col-12 mb-3"><span className={"badge text-bg-" + badgeColor}>{data.role}</span></div>
            <hr />
            <div className="col-12 mb-2">Contacto:</div>
        <div className="row d-flex justify-content-evenly">
            <div className="col"><a className='btn btn-outline-primary' role={"button"} href={"mailto:"+data.email}>{data.email}</a></div>
            <div className="col mb-3"><a className='btn btn-outline-primary' role={"button"} href={"tel:+52"+data.tel}>{data.tel}</a></div>
        </div>
        

        
        {data.empresa_ret ?  <div className="row">
        <hr />
            <div className="col-12 mb-2">Empresa Retadora:</div>
            <div className="col-6"><p className="h5">{data.empresa_ret}</p></div>
            <hr />
              <div className="col-12">
              <p>Equipo:</p>
                  <ul className="list-group">
                     {data.team.map((teammate, key)=>{
                        let leaderText = ""
                        if(key===0){
                            leaderText = "Líder"
                        }else{
                            leaderText = ""
                        }
                        return ( teammate != "undefined" ? <li className="list-group-item" key={key}>{teammate} <span className='badge small text-bg-primary fst-italic fw-normal ms-1'>{leaderText}</span></li> : null )
                             })}
                               </ul>
              </div>
        </div> : null}
 
    </div>
  )
}

export default UserDetail