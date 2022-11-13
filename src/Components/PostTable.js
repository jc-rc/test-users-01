import React, {useEffect, useState} from 'react'

function PostTable(props) {

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readPostsBy?autor=${props.empresa}&hkt=${props.event}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        


}, [props.event, props.empresa])


const [posts, setPosts] = useState([])


  return (
    <div className=''>
      <p className="h3">Posts:</p>
      <div className="row d-none d-md-flex p-2">
        <div className="col-2 fw-bold">Fecha</div>
        <div className="col fw-bold">Título</div>
        <div className="col fw-bold">Contenido</div>
        <div className="col-1 fw-bold">Editar</div>
        <div className="col-1 fw-bold">Borrar</div>
        
      </div>
      
    <div className="list-group">
      { posts.length === 0 ? <p className="h4 mt-4">No hay posts de {props.empresa} en el evento: {props.event}</p> :
        posts.map((post, key)=>{
          return(
            <div className="row d-flex justify-content-center list-group-item" id={post._id} key={key}>
                <div className="col-2">
                  <p>{post.fecha}</p>
                </div>
                <div className="col">
                  <p>{post.título}</p>
                </div>
                <div className="col">
                  <p>{post.contenido}</p>
                </div>
                <div className="col-md-1 col-6 text-center"><button className="btn btn-outline-dark w-100"><i className="fa-solid fa-pencil"></i></button></div>
                          <div className="col-md-1 col-6 text-center"><button className="btn btn-outline-danger w-100"><i className="fa-solid fa-trash-can"></i></button></div>
            </div>
          )
        }) 
      }
    </div>

    </div>
  )
}

export default PostTable