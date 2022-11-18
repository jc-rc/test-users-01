import React, {useEffect, useState} from 'react'
import PostDetail from './PostDetail'
import PostForm from './PostForm'
import PostFormEdit from './PostFormEdit'

function PostTable(props) {

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readPostsBy?autor=${props.empresa}&hkt=${props.event}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        
}, [props.event, props.empresa])


const [posts, setPosts] = useState([])

const [initValues, setInitValues] = useState({})


const handleEditButton = (post) =>{
  setInitValues(post)
}


const handleDeleteButton = (post)=>{
  console.log(post._id);
   let confirmDelete = window.confirm(`⚠ ¿En verdad desea eliminar el post: ⚠ \n ${post.título}? `)
   if (confirmDelete) {
       fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/deletePost?_id=${post._id}`,
       {method: "DELETE"})
       .then(response => response.status <300 ? alert(`Se eliminó el post: ${post.título}, con id: ${post._id}`): alert("Algo salió mal..."))
      
   }else{
       alert(`Se canceló la operación.`)
   }
}


  return (
    <div className=''>
      <div className="col-12 d-flex justify-content-between mb-4">
        <p className="h3">Posts:</p>
        <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#modal-add-post">Añadir Post <i className="fa-solid fa-plus-circle"></i> </button>
      </div>

      <div className="row d-none d-md-flex p-2">
        <div className="col-2 fw-bold">Fecha</div>
        <div className="col-3 fw-bold">Título</div>
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
                  <a className='btn btn-outline-secondary' role={"button"} data-bs-toggle="modal" data-bs-target="#modal-detail-post">{post.fecha}</a>
                </div>
                <div className="col-3">
                  <p>{post.título}</p>
                </div>
                <div className="col">
                  <p>{post.contenido}</p>
                </div>
                <div className="col-md-1 col-6 text-center"><button className="btn btn-outline-dark w-100" data-bs-toggle="modal" data-bs-target="#modal-edit-post" onClick={()=>handleEditButton(post)}><i className="fa-solid fa-pencil"></i></button></div>
                <div className="col-md-1 col-6 text-center"><button className="btn btn-outline-danger w-100" onClick={()=> handleDeleteButton(post)}><i className="fa-solid fa-trash-can"></i></button></div>
            </div>
          )
        }) 
      }
    </div>

        {/* MODAL ADD POST */}
        {props.event && <div className="modal  fade" id="modal-add-post" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h3" id="staticBackdropLabel">Añadir Post</p>
                            <button type="button" className="btn-close cerrar-modal-post" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <PostForm event={props.event} empresa={props.empresa}></PostForm>
                        </div>

                    </div>
                </div>
            </div>}
        {/* MODAL EDIT POST */}
        {props.event && <div className="modal  fade" id="modal-edit-post" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h3" id="staticBackdropLabel">Editar Post</p>
                            <button type="button" className="btn-close cerrar-modal-post-edit" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <PostFormEdit event={props.event} empresa={props.empresa} initValues={initValues}></PostFormEdit>
                        </div>

                    </div>
                </div>
            </div>}
        {/* MODAL DETAIL POST */}
        {props.event && <div className="modal  fade" id="modal-detail-post" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h3" id="staticBackdropLabel">Detalle Post</p>
                            <button type="button" className="btn-close cerrar-modal-post-edit" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <PostDetail event={props.event} empresa={props.empresa} initValues={initValues}></PostDetail>
                        </div>

                    </div>
                </div>
            </div>}

    </div>
  )
}

export default PostTable