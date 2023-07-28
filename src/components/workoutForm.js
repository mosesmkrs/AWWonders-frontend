import { useState } from "react"
import Navbar from "./navbar"
import base_url from "../config"


const WorkoutForm = () => {
    const [username,setUsername] = useState('')
    const [description,setDescription] = useState('')
    const [url,setUrl] = useState('')
    const [caption,setCaption] = useState('')
    const [error,setError] = useState('')
   


    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {username,description,url,caption}

        const response = await fetch(`${base_url}/api/workouts`,{
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'content-Type':'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setUsername('')
            setDescription('')
            setUrl('')
            setCaption('')
            
            console.log('new post added',json)
        }else{
            setError('failed to load post')
        }
    }
    return(
        <div className='fom-bg'>

       <Navbar/>
         <form className="create" onSubmit={handleSubmit}>
            <h3>Add Post</h3>
            <p  className={error ? "error" : "offscreen"} aria-live="assertive">{error}</p> 
            <label>username</label>
            <input
                placeholder="your username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                />

            <label>title</label>
            <input
                placeholder="name of the wonder"
                type="text"
                onChange={(e) => setCaption(e.target.value)}
                value={caption}
                /> 

            <label>description</label>
            <input
                placeholder="describe the uniqueness"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                />    

            <label>url</label>
            <input
                placeholder="enter the image address"
                type="text"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                />

            <button>Add post</button>   
           
            
         </form>
         </div>
    )
}

export default WorkoutForm