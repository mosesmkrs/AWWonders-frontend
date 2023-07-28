import { Link } from 'react-router-dom'
import React,{ useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
    const handleSignOut = () => {
        // Remove the JWT token from local storage
        localStorage.removeItem('token');
        // Optionally, you can also redirect the user to the login page or any other page after sign-out
        window.alert('confirm signout')
         window.location.href = '/login'; // Redirect to the login page
      };

    const [showMenu, setShowMenu] = useState(false);
    
    const isMobile = useMediaQuery({ maxWidth: '640px' });

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };
    
  return (
    <header>
      <div className="nav-container">
        <Link to="/" className='title-head'><h2 className='aw'>AW</h2><h2 className='wonders'>Wonders</h2></Link>
        <p className='title'>Sharing Amazing World Wonders!</p>
        
        {isMobile ? (
          <>
          <MenuIcon className="hamburger-menu" onClick={handleMenuToggle}>
              <div className={`menu-icon ${showMenu ? 'open' : ''}`}></div>
            </MenuIcon>
            {showMenu && (
              <div className="mobile-menu">
                <Link to="/post" className='shown-post-btn'>Add Post</Link>
                <p onClick={handleSignOut} className='shown-sign-out'>Sign Out</p>
              </div>
            )}
          </>
        ) : (
          <>
            <Link to="/post" className='post-btn'>Add Post</Link>
            <button onClick={handleSignOut} className='sign-out'>Sign Out</button>
          </>
        )}

        
          
        
        
      </div>
    </header>
  );
};


export default Navbar