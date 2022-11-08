import React, {useEffect, useState} from 'react'

function PostTable(props) {

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readPostsBy?autor=${props.empresa}&hkt=${props.event}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        


}, [props.event, props.empresa])


const [posts, setPosts] = useState([])


  return (
    <div className='border'>
      <p className="h3">Posts:</p>
      <div className="row d-none d-md-flex p-2">
        <div className="col-2">Fecha</div>
        <div className="col">Título</div>
        <div className="col">Contenido</div>
        <div className="col-1">Editar</div>
        <div className="col-1">Borrar</div>
        <hr className='mb-0' />
      </div>

    {
      posts.map((post)=>{
        return(
          <div className="row d-flex">
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
  )
}

export default PostTable