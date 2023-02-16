import React, {useEffect, useState} from 'react'
import PostDetail from './PostDetail'
import PostForm from './PostForm'
import PostFormEdit from './PostFormEdit'

function PostTable(props) {

  useEffect(() => {
    fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readPostsBy?autor=${props.empresa}&hkt=${props.event}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        
}, [props.event, props.empresa, props.dummy])


const [posts, setPosts] = useState([])

const [initValues, setInitValues] = useState({})


const handleEditButton = (post) =>{
  setInitValues(post)
}


const handleDeleteButton = (post)=>{
  
   let confirmDelete = window.confirm(`⚠ ¿En verdad desea eliminar el post: ⚠ \n ${post.título}? `)
   if (confirmDelete) {
       fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/deletePost?_id=${post._id}`,
       {method: "DELETE"})
       .then(response => response.status <300 ? alert(`Se eliminó el post: ${post.título}, con id: ${post._id}`): alert("Algo salió mal..."))
       .then( setTimeout(() => {
        document.querySelector("#view-admin-refresh").click()
    }, 3000) )
      
   }else{
       alert(`Se canceló la operación.`)
   }
}


  return (
    <div className=''>
      <div className="col-12 d-flex justify-content-between mb-4">
        <p className="h3">Posts:</p>
        <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#modal-add-post"><i className="fa-solid fa-plus"></i> Post  </button>
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
            <div className="">
              <div className="row d-none d-md-flex justify-content-center list-group-item" id={post._id} key={key}>
                  <div className="col-2">
                    <a className='btn btn-outline-secondary' role={"button"} data-bs-toggle="modal" data-bs-target="#modal-detail-post" onClick={()=> handleEditButton(post)}>{new Date(post.fecha).toLocaleDateString()}</a>
                  </div>
                  <div className="col-3">
                    <p>{post.título}</p>
                  </div>
                  <div className="col-5">
                    <p className='truncado'>{post.contenido}</p>
                  </div>
                  <div className="col-md-1 col-6 text-center">
                    <button className="btn btn-outline-dark w-100" data-bs-toggle="modal" data-bs-target="#modal-edit-post" onClick={()=>handleEditButton(post)}><i className="fa-solid fa-pencil"></i></button></div>
                  <div className="col-md-1 col-6 text-center">
                    <button className="btn btn-outline-danger w-100" onClick={()=> handleDeleteButton(post)}><i className="fa-solid fa-trash-can"></i></button></div>
              </div>

              <div className="row rounded list-group-item d-flex d-md-none align-items-center justify-content-center p-1" id={post._id} key={key} >
                <div className="col-6 mb-2">
                <p className='small fw-bold m-0'data-bs-toggle="modal" data-bs-target="#modal-detail-post" onClick={()=> handleEditButton(post)}>{post.título}</p>
                </div>
                <div className="col-6 mb-2 text-end">
                  <button className="btn btn-sm btn-outline-dark me-2" data-bs-toggle="modal" data-bs-target="#modal-edit-post" onClick={()=>handleEditButton(post)}>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={()=> handleDeleteButton(post)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
                <div className="col-12">
                  <p className="small mb-1" role={"button"} data-bs-toggle="modal" data-bs-target="#modal-detail-post" onClick={()=> handleEditButton(post)}><div className="span badge text-bg-warning">{new Date(post.fecha).toLocaleDateString()}</div></p>
                </div>
                <div className="col-12">
                  <p className="small truncado" role={"button"} data-bs-toggle="modal" data-bs-target="#modal-detail-post" onClick={()=> handleEditButton(post)}>{post.contenido}</p>
                </div>

              </div>
              
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
                            <p className="modal-title h3" id="staticBackdropLabel">Crear Post</p>
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
                            <p className="modal-title h3" id="staticBackdropLabel">{initValues.título}</p>
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