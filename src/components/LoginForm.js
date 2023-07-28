// LoginForm.js
import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react';

import Landing from './landing';



const LoginForm = () => {
    const errRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false)
  const [errMsg, setErrMsg] = useState('');
  //const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    // Send the login request to the backend
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
     
      if (response.ok) {
        // Save the JWT token to local storage
        localStorage.setItem('token', data.token);
        setSuccess(true)
        
        window.alert('login successfully! Click to enter')
       
      } else {
        setErrMsg('Wrong Username or Password');
      }
    } catch (error) {
        if (!error?.response) {
            setErrMsg('No Server Response');
        } else if (error.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (error.response?.status === 409) {
            setErrMsg('User already exists');
        } else {
            setErrMsg('Login Failed');
        }
        // setLoading(false)
}
  }
  return (
     <div >
        {success ? (
         
                <section>
                  
                   <Landing />
                </section>
        ):(
            <section>  
               
                <form onSubmit={handleSubmit} className='form-container '>
      <h3>Login</h3>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <label>Username</label>
      <input
        type="text" className='input-field'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        autoComplete="off"
        required
      />
      <label>Password</label>
      {/* {loading && <Loading />} */}
      <input
        type="password" className='input-field'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        autoComplete="off"
        required
      />
      <button type="submit" className='submit-btn'>Login</button>
      <p className='bottom-text'>
        Do not have an account?
        <Link to="/register">Sign up</Link>
    </p>
    </form>
    
            </section>
        )}
    
     </div>
   
  );
};

export default LoginForm;
