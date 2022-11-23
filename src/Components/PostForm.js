import React, {useState, useEffect} from 'react'

function PostForm(props) {

    useEffect(()=>{
        setForm({...form, hkt: props.event, autor: props.empresa})
    }, [props])


    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    

    const [form, setForm] = useState({
        autor: props.empresa,
        fecha: `${currentDate}`,
        título: "",
        contenido: "",
        hkt: props.event
    })    

    const handleSubmit = (e)=>{
        e.preventDefault()
       setForm({...form, autor: e.target.autor.value})
        console.log("Received Data:",form);

        //POST A DB
        fetch(`https://us-central1.gcp.data.mongodb-api.com/app/creativika-socba/endpoint/createPost?autor=${form.autor}&título=${form.título}&contenido=${form.contenido}&fecha=${form.fecha}&hkt=${form.hkt}`,
        {method: "POST"})
     .then((response)=> {
        response? alert("Post Added") : alert("ERROR")
    })
    .then( document.getElementById("postForm").reset())
        .then( document.querySelector(".cerrar-modal-post").click())

        //ALERT O ALGÚN FEEDBACK
         
    }

    const handleTitleChange = (e)=>{
        setForm({...form, título: e.target.value})
    }
    
    const handleContentChange = (e)=>{
        setForm({...form, contenido: e.target.value})
    }

    const handleReset = (e)=>{
        setForm({hkt: props.event,
            autor: props.empresa,
            fecha: `${currentDate}`,
            título: "",
            contenido: ""
        })
    }



   

  return (
    <div className="row">
        <form action="" onSubmit={handleSubmit} id="postForm" onReset={handleReset}>
            
            <div className="mb-3">
                <label htmlFor="" className="form-label">Autor:</label>
                <input type="text" className='form-control' name='autor' value={form.autor} disabled /> 
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Título:</label>
                <input type="text" className='form-control' required maxLength={30} value={form.título} placeholder="Máx. 30 caracteres"  onChange={handleTitleChange}/> 
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Contenido:</label>
                <textarea className='form-control' style={{height: 200}} required maxLength={300} value={form.contenido} placeholder="Máx. 300 caracteres" onChange={handleContentChange}></textarea>
            </div>
            <button className="btn btn-primary float-end" type='submit'>Create!</button>
            <button className="btn btn-outline-danger me-3 float-end" type='reset' >Clear</button>
        </form>
    </div>
  )
}

export default PostForm