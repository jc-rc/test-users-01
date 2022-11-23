import React, {useEffect, useState} from 'react'

function PostDetail(props) {

    const [data, setData] = useState({})

    useEffect(()=>{
        setData(props.initValues)
    })

  return (
    <div className="row">
        <div className="col-12 h4">{data.título}</div>
        <div className="col-6 small mb-3 fst-italic">{data.autor} | {data.fecha}</div>
        <hr />
        
        <div className="col-12">{data.contenido}</div>
    </div>
  )
}

export default PostDetail