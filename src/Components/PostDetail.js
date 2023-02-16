import React, {useEffect, useState} from 'react'

function PostDetail(props) {

    const [data, setData] = useState({})

    useEffect(()=>{
        setData(props.initValues)
    })

  return (
    <div className="div">
        
        <p className="small fst-italic mb-0">Autor: {data.autor} </p>
        <span className="badge text-bg-warning">{new Date(data.fecha).toLocaleString().slice(0, -3)}</span>
        <hr />
        
        <div className="col-12 mb-3">{data.contenido}</div>
    </div>
  )
}

export default PostDetail