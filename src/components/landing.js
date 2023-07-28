import React from 'react'
//import LoginForm from './LoginForm';



import { Link } from 'react-router-dom'




function Landing() {
  return (
    <div className='bg'>
        
           <div  className='back-img'>
            <h1 className='header'>AWWonders</h1>
            <p className='description'>Unlock the Secrets of Our Planet: Journey through Time and Space to Discover the Most Breathtaking World Wonders that Will Leave You in Awe!</p>
             <Link to="/" className='landing-link'>View Posts</Link>
             
           </div>
       
    </div>
  )
}

export default Landing

