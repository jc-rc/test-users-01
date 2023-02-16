import React, { useState, useEffect } from 'react'

function BlogForm(props) {

    const [autor, setAutor] = useState("")
    const [título, setTítulo] = useState("")
    const [contenido, setContenido] = useState("")
    const [fecha, setFecha] = useState(new Date().toISOString().split("T", 2)[0])
    const [url, setUrl] = useState("")



    const handleSubmit = (e) => {
        e.preventDefault()

        //CREATE POST
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/createBlog?autor=${autor}&título=${título}&contenido=${contenido}&fecha=${fecha}&url=${url}`, { method: "POST" })
            .then(response => response.json())
            .then(response => response ? alert("POST ADDED") : alert("ERROR"))
            .then(document.getElementById("form-blog").reset())
            .then(document.querySelector(".cerrar-modal-blog").click())
            .then(setTimeout(() => {
                document.querySelector("#view-admin-refresh").click()
            }, 1500))
    }
    const handleReset = (e) => { }

    const handleURL = (e) => {
        setUrl(e.target.value)
    }
    const handleTítulo = (e) => {
        setTítulo(e.target.value)
    }
    const handleContenido = (e) => {
        setContenido(e.target.value)
    }
    const handleAutor = (e) => {
        setAutor(e.target.value)
    }


    return (

        <form action="" id='form-blog' onSubmit={handleSubmit} onReset={handleReset}>
            <div className="row">
                <div className="col-12 mb-3">
                    <label htmlFor="" className='form-label'>URL de Imagen:</label>
                    <input type="text" name="" onChange={handleURL} placeholder='Opcional. Por defecto usa el logotipo de Creativika' className="form-control" />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="" className='form-label'>Título:</label>
                    <input type="text" name="" onChange={handleTítulo} className="form-control" />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="" className='form-label'>Autor:</label>
                    <input type="text" name="" onChange={handleAutor} className="form-control" />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="" className='form-label'>Contenido:</label>
                    <textarea type="text" name="" style={{height: 200}} onChange={handleContenido} placeholder="Máx. 500 caracteres." maxLength={500} className="form-control" />
                </div>
                <div className="col-12 text-end">
                    <button className="btn btn-outline-danger me-2" type='reset'>Limpiar</button>
                    <button className="btn btn-primary" type='submit'>Crear</button>
                </div>
            </div>
        </form>

    )
}

export default BlogForm