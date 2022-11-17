import React, {useState, useEffect} from 'react'

function UserDetail(props) {



  return (
    <div className='row'>
        <div className="col-12"><p className="h3">{props.initValues.username}</p></div>
        <div className="col">
            <span className="badge text-bg-secondary">{props.initValues.role}</span>
            </div>
        <div className="col">{props.initValues.email}</div>
        <div className="col">{props.initValues.tel}</div>


        {/* {props.initialValues.empresa_ret ? <div className="col">{props.initValues.empresa_ret}</div> : null}

        {props.initialValues.team ? props.team.map((teammate, key)=>{
            return ( <div className="col">{teammate}</div> )
        })
        : null} */}
    </div>
  )
}

export default UserDetail