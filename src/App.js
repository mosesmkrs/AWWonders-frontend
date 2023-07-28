import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '../src/pages/home'

import Post from './components/workoutForm'
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Landing from './components/landing';
// import Navbar from './components/navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <div className='pages'>
      {/* <Navbar /> */}
         <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post' element={<Post />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          
         </Routes>
      </div>
      </BrowserRouter>
      <BrowserRouter>
      <Routes>
      <Route path="/landing" element={<Landing />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
