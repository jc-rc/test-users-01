import React, { useState, useEffect } from 'react'
import BlogForm from './BlogForm'

function BlogTable(props) {

    const [data, setData] = useState([ ])

    useEffect(() => {
      //Cargar BLOG
        fetch("https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/getBLOG")
        .then(response => response.json())
        .then(response => setData(response))
      
    }, [props])

    const handleDeletePost = (e)=>{
        console.log(e.target.dataset.id)

        if(window.confirm("¿En realidad desea eliminar el post?")){

        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/deleteBLOG?_id=${e.target.dataset.id}`,
        {method: "DELETE"})
        .then(response => response.json())
        .then(response=> response.deletedCount > 0 ? alert("Post Eliminado") : alert("ERROR"))
        .then(setTimeout(() => {
            document.querySelector("#view-admin-refresh").click()
        }, 1500))
        }else{
            alert("Eliminación Cancelada")
        }
    }
    


    return (
        <div className=""> 
            <div className="col-12 d-flex justify-content-between mb-4">
                <p className="h3">Blog Externo</p> 
                <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#modal-add-blog">Añadir Post <i className="fa-solid fa-plus-circle"></i> </button>
            </div>

            <div className="row d-flex">


                {
                    data.map((post, key) => {

                        let imageURL = ""
                        post.url === "" ? imageURL = "./logo-ctvka.png" : imageURL = post.url

                        return (
                            < div className="col-4 mb-3 position-relative" key={key}>
                                <span className='badge rounded-pill position-relative trash-badge text-bg-danger px-3 py-2' onClick={handleDeletePost} data-id={post._id}>X </span>
                                <div className="card">
                                    
                                    <img src={imageURL} style={{ height: 250, width: "auto", objectFit: "cover" }} alt="" className="card-img-top" />
                                    <div className="card-body">
                                        <p className="h5 card-title mb-0">{post.título}</p>
                                        <p className="small fst-italic"> {post.autor} / {post.fecha}</p>
                                        <p className="card-text small">{post.contenido}</p>
                                        <a href="">Ver más...</a>
                                    </div>
                                    
                                </div>

                            </div>
                        )
                    })

                }


            </div>

            {/* MODAL CREAR BLOG POST */}
            <div className="modal  fade" id="modal-add-blog" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h3" id="staticBackdropLabel">Añadir Post</p>
                            <button type="button" className="btn-close cerrar-modal-blog" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <BlogForm ></BlogForm>
                        </div>

                    </div>
                </div>
            </div>

            {/* MODAL DETALLE BLOG POST */}

        </div >
    )
}

export default BlogTable