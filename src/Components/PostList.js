import React, { useEffect, useState } from 'react'


function PostList(props) {

    //FETCH FROM DB
    useEffect(() => {
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/readPostsBy?autor=${props.empresa}&hkt=${props.event}`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .then(setLoading(false))


    }, [props.event, props.empresa])


    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    

    return (
                
        <div className="col border">
            <p className='h3'>Posts de {props.empresa}:</p>
            <div className="row d-flex">

                {loading  ? 
                <div className="row p-4">
                    <div className='col-3'><p>Loading...</p></div>
                </div>
                : posts.map((post, key) => {
                    return (
                        <div className="col-12 col-md-4" key={key}>
                            <div className="card mb-2" >
                                <div className="card-body">
                                    <p className="card-title h6 mb-0">{post.título}</p>
                                    <p className="card-text small mb-2 fst-italic">Publicado: {post.fecha}</p>
                                    <p className="card-text small text-truncate">{post.contenido}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* {posts.map((post, key) => {
                    return (
                        <div className="col-12 col-md-6" key={key}>
                            <div className="card mb-2" >
                                <div className="card-body">
                                    <p className="card-title h6 mb-0">{post.título}</p>
                                    <p className="card-text small mb-2 fst-italic">Publicado: {post.fecha}</p>
                                    <p className="card-text small text-truncate">{post.contenido}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
                } */}

            </div>
        </div>
    )
}

export default PostList