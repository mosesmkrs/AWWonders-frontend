// RegisterForm.js
import { Link } from 'react-router-dom'
import React, {  useState } from 'react';
import LoginForm from '../components/LoginForm';


const RegisterForm = () => {
   
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false)
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the registration request to the backend
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        
      });
     
        

    // Check if the response indicates an error (status not in the range 200-299)
    if (!response.ok) {
      // If the response status is 409, it means the username is already taken
      if (response.status === 409) {
        setErrMsg('Account already exists');
      } else {
        setErrMsg('Registration Failed');
      }
      return;
    }

    const data = await response.json();
    console.log(data)
    // Registration was successful
    setSuccess(true);
  } catch (err) {
    // Network error or other issues
    setErrMsg('No Server Response');
  }
    //   const data = await response.json();
    //   // console.log(data); // Handle the response
    //   setSuccess(true)
    // } catch (err) {
    //     if (!err?.response) {
    //         setErrMsg('No Server Response');
    //     } else if (err.response?.status === 409) {
    //         setErrMsg('Username Taken');
    //     } else {
    //         setErrMsg('Registration Failed')
    //     }
    // }
  };

  return (
    <div >
         {success ? (
                <section>
                   <LoginForm />
                </section>
         ):(
            <section>
               
                 <form onSubmit={handleSubmit} className="form-container">
      <h3>Sign Up</h3>
      <p  className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <label>Username</label>
      <input className='input-field'
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        autoComplete="off"
        required
      />
      <label>Password</label>
      <input className='input-field'
        type="password"
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <button type="submit"  className="submit-btn">Sign Up</button>
      <p className="bottom-text">
        Already have an account?
        <Link to="/login">Login</Link>
    </p>
    </form>
   
         
            </section>
         )}
       
    </div>
    
    
  );
};

export default RegisterForm;
